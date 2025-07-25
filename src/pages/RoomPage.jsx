import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import { socket } from "../socket"
import SERVER_URL from '../SERVER_URL'
import { useParams } from 'react-router-dom'
import { CircleChevronRight, MessageCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"

import ChatBox from '../components/ChatBox'
import api from '../api/api'

export default function RoomPage({ user, password }) {
  const { roomId } = useParams()
  const [peers, setPeers] = useState({})
  const myVideo = useRef(null)
  const videosRef = useRef(null)
  const peerRef = useRef(null)
  const streamRef = useRef(null)
  const [chatOpen, setChatOpen] = useState(false);
  const [roomName, setRoomName] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    //const videoContainer = videosRef.current
    const joinRoom = async () => {
      try {
        const res = await api.post("/api/rooms/join", { code: roomId, password })
        setRoomName(res.data.name)
        console.log("Joined room:", res.data)

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            streamRef.current = stream
            myVideo.current.srcObject = stream
            myVideo.current.muted = true

            //const peer = new Peer(undefined, {
            //  host: "liabilities-pre-pushing-textiles.trycloudflare.com",
            //  port: 443,
            //  path: "/",
            //  secure: true,
            //})

            const peer = new Peer(undefined, {
              host: "localhost",
              port: 9000,
              path: "/",
              secure: false,
            })

            peerRef.current = peer

            peer.on("error", (err) => {
              console.error("PeerJS Error:", err);
            });

            peer.on("open", id => {
              console.log("Yeppa peer is initialed")
              api.post("/api/rooms/addUser", { code: roomId, user: localStorage.getItem("username") })
              socket.emit("joinRoom", {
                roomId,
                peerId: id,
                username: localStorage.getItem("username"),
              })
            })

            //When user join the room
            peer.on("call", call => {
              console.log("A user joined!!! peer.on call", call.peer);
              call.answer(stream);
              call.once("stream", userVideoStream => {
                console.log("Stream received from peer:", call.peer);
                addVideo(userVideoStream, call.peer);
              });
            });

            //When user already in the room
            socket.on("user-connect", peerId => {
              if (peerId !== peer.id) {
                console.log("A user called!!! socket.on user-connect");
                const call = peer.call(peerId, stream);
                call.once("stream", userVideoStream => {
                  console.log("Calling peer and got stream:", peerId);
                  addVideo(userVideoStream, peerId);
                });
              }
            });

            peer.on("close", () => {
              console.log("closed a video")
              const vid = document.getElementById(peer.id);
              if (vid) vid.remove();
            });

            socket.on("user-disconnected", peerId => {
              console.log("user is gone mate")
              const vid = document.getElementById(peerId);
              if (vid) vid.remove();
            });

          })
          .catch(err => console.error("Failed to get user media:", err))

        return () => {
          socket.disconnect()
          if (peerRef.current)
            peerRef.current.destroy()
        }

      } catch (err) {
        if (err.response && err.response.status === 404) {
          alert("❌ Wrong credentials or room not found!")
          navigate("/")

        } else {
          alert("⚠️ Something went wrong.")
        }

        return
      }

    }
    joinRoom()
  }, [])

    useEffect(() => {
      const handleBeforeUnload = () => {
        api.post("/api/rooms/removeUser", { code: roomId, user: localStorage.getItem("username") })
        socket.disconnect()
      }

      window.addEventListener("beforeunload", handleBeforeUnload)

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload)
      }
    }, [roomId])


    useEffect(() => {
      const interval = setInterval(() => {
        socket.emit("heartbeat", {
          user: localStorage.getItem("username"),
        })
      }, 30000) // 30s

      return () => clearInterval(interval)
    }, [])

  function addVideo(stream, id) {
    if (peers[id]) return

    const videoWrapper = document.createElement("div")
    videoWrapper.id = id
    videoWrapper.className = "w-full h-full max-w-160 max-h-106 rounded-lg overflow-hidden bg-black"

    const video = document.createElement("video")
    video.srcObject = stream
    video.playsInline = true
    video.autoplay = true
    video.className = "w-full h-full object-cover rounded-lg shadow-md"

    videoWrapper.appendChild(video)
    videosRef.current?.appendChild(videoWrapper)

    setPeers(prev => ({ ...prev, [id]: video }))
  }

  const leaveRoom = () => {
    api.post("/api/rooms/removeUser", { code: roomId, user: localStorage.getItem("username") })
    navigate("/");
  };

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <div className="flex-1 p-4 overflow-auto flex flex-col items-center">
          <div className="mb-4 h-1/20 text-lg font-semibold">Room: {roomName}</div>
          <video
            ref={myVideo}
            autoPlay
            playsInline
            muted
            width="200"
            className="absolute bottom-5 right-5 rounded-lg shadow-lg mb-4 transform scale-x-[-1]"
          />
          <div
            ref={videosRef}
            className="grid w-full h-19/20 p-2 gap-2
         grid-cols-[repeat(auto-fit,_minmax(22em,_1fr))]
         auto-rows-[minmax(15em,_1fr)] place-items-center
            "
          />
        </div>

        <div
          className={`fixed top-0 right-0 h-screen bg-gray-800 shadow-2xl transition-transform duration-300 ease-in-out
            ${chatOpen ? "translate-x-0" : "translate-x-full"}
          `}
          style={{ width: "350px", maxWidth: "100vw" }}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-700 h-1/10">
            <h2 className="text-xl font-bold">Chat</h2>
            <button
              onClick={() => setChatOpen(prev => !prev)}
              className={`absolute bottom-1/2 ${chatOpen ? "right-15/16" : "right-23/24 transform scale-x-[-1]"} z-10 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white`}
              aria-label="Close Chat"
            >
              <CircleChevronRight className='w-6 h-6' />
            </button>
          </div>

          <ChatBox user={user} roomId={roomId} />
        </div>
      </div>
      <button
        onClick={leaveRoom}
        className="fixed top-4 left-4 z-50 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </>
  )
}

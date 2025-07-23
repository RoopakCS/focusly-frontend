import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import { socket } from "../socket"
import SERVER_URL from '../SERVER_URL'
import { useParams } from 'react-router-dom'

export default function RoomPage() {
  const { roomId } = useParams()
  const [peers, setPeers] = useState({})
  const myVideo = useRef(null)
  const videosRef = useRef(null)
  const peerRef = useRef(null)
  const streamRef = useRef(null) // fix: store stream here

  useEffect(() => {
    //const videoContainer = videosRef.current

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        streamRef.current = stream
        myVideo.current.srcObject = stream
        myVideo.current.muted = true

        const peer = new Peer(undefined, {
          host: "0cfcf4cc6eea.ngrok-free.app",
          path: "/",
          secure: true,
        })

        peerRef.current = peer

        peer.on("open", id => {
          console.log("Yeppa peer is initialed")
          socket.emit("joinRoom", { roomId, peerId: id })
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
  }, [])

  function addVideo(stream, id) {
    if (peers[id]) return

    const video = document.createElement("video")
    video.id = id
    video.srcObject = stream
    video.playsInline = true
    video.autoplay = true
    video.width = 200

    videosRef.current?.appendChild(video)

    setPeers(prev => ({ ...prev, [id]: video }))
    console.log(videosRef)
  }

  return (
    <>
      <div>Room: {roomId}</div>
      {
        <video ref={myVideo} autoPlay playsInline muted width="200" style={{ transform: "scaleX(-1)" }} />
      }
      <div ref={videosRef}></div>
    </>
  )
}

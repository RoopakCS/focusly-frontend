import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import { socket } from "../socket"

export default function RoomPage({ }) {
  const [peers, setPeers] = useState({})
  const myVideo = useRef(null)
  const videosRef = useRef(null)
  const peerRef = useRef(null)

  useEffect(() => {
    const videoContainer = videosRef.current

    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          myVideo.current.srcObject = stream
          myVideo.current.muted = true
        })
    }
    catch (err) {
      console.error(err.message)
    }
  }, [])

  function addVideo(stream, id) {
    if (peers[id]) return

    const video = document.createElement("video")
    video.srcObject = stream
    video.playsInline = true
    video.autoplay = true
    video.videoWidth = 200

    videosRef.current?.appendChild(video)

    setPeers(prev => ({ ...prev, [id]: video }))
  }

  return (
    <>
      <div>RoomPages</div>
      <video ref={myVideo} autoPlay playsInline muted width="200" />
      <div ref={videosRef}></div>
    </>
  )
}


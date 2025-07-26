import { useEffect, useState } from "react"
import api from "../api/api"
import { Info } from 'lucide-react';

function RoomHeader({ roomId }) {
  const [showPopup, setShowPopup] = useState(false)
  const [roomName, setRoomName] = useState("")
  const [password, setPassword] = useState("")

  const updateRoom = async () => {
    try {
      await api.put(`api/rooms/${roomId}`, {
        name: roomName,
        password: password,
      })
      setShowPopup(false)
    } catch (err) {
      console.error("Failed to update room", err)
    }
  }

  useEffect(()=>{
    api.post("/api/rooms/room", { code:roomId }).then((res)=>{
      setRoomName(res.data.name)
      setPassword(res.data.password)
    })
  }, [])

  return (
    <div className="mb-4 h-1/20 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
      <span>Room: {roomName}</span>
      <button
        className="ml-2 relative right-2 bottom-1 text-blue-500 hover:underline"
        onClick={() => setShowPopup(true)}
      >
        <Info className="w-3 h-3"/>
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl w-96 border border-zinc-300 dark:border-zinc-700">
            <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Edit Room {roomId} </h2>

            <label className="block mb-2 font-medium text-zinc-800 dark:text-zinc-300">Room Name</label>
            <input
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />

            <label className="block mb-2 font-medium text-zinc-800 dark:text-zinc-300">Password</label>
            <input
              className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg hover:opacity-80"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={updateRoom}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomHeader

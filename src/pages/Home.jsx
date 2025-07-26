import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import PublicRooms from "../components/PublicRooms"

function Home({password, setPassword}) {
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleCreateRoom = async () => {
    try {
      const res = await api.post("/api/rooms", { name, password })
      const roomCode = res.data.roomCode
      navigate(`/room/${roomCode}`)
    } catch (err) {
      console.error("Error creating room:", err)
    }
  }

  const joinRoom = async () => {
    if (name.trim()){
      try{
        const res = await api.post("/api/rooms/join", { code: name, password })
        navigate(`/room/${res.data.code}`);
      }
      catch (err) {
        if (err.response && err.response.status === 404) {
          alert("❌ Wrong credentials or room not found!")
          navigate("/")

        } else {
          alert("⚠️ Something went wrong.")
        }
      }
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-background text-foreground px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700 transition-all">
          <h1 className="text-sm font-bold text-center text-gray-800 dark:text-white">Join or Create a Room</h1>

          <input
            type="text"
            placeholder="Enter Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition"
            onClick={joinRoom}
          >
            Join Room
          </button>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
        </div>
      </div>
      {
      <PublicRooms />
      }
    </>
  )
}

export default Home

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import TodoList from "../components/TodoList"

function Home() {
  const [name, setName] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const navigate = useNavigate()

  const handleCreateRoom = async () => {
    try {
      const res = await api.post("/api/rooms", { name, isPrivate })
      const roomCode = res.data.roomCode
      navigate(`/room/${roomCode}`)
    } catch (err) {
      console.error("Error creating room:", err)
    }
  }

  const joinRoom = () => {
    if (name.trim()) navigate(`/room/${name}`);
  };

  return (
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

        <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          />
          <span>Private Room</span>
        </label>

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
  )
}

export default Home

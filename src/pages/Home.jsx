import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"

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
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Room Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 mb-4 border rounded"
      />
      <label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
          className="mr-2"
        />
        Private Room
      </label>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={joinRoom}>
        Join Room
      </button>
      <button
        onClick={handleCreateRoom}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Room
      </button>
    </div>
  )
}

export default Home

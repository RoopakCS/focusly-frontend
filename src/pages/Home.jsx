import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
// import PomodoroTimer from "../components/PomodoroTimer";
import TodoList from "../components/TodoList";
import ChatBox from "../components/ChatBox";
export default function Home() {
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    const res = await API.post("/rooms", {
      name: roomName,
      isPrivate: false,
    });
    navigate(`/room/${res.data.roomCode}`);
  };

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <h1 className="text-3xl font-bold" align = "center">Focustgtg5tgly</h1>
      <input
        type="text"
        className="border px-3 py-2 rounded"
        placeholder="Enter Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button
        className="bg-pink-500 text-white px-4 py-2 rounded"
        onClick={createRoom}
      >
        Create Room
      </button>
      {/* <PomodoroTimer /> */}
      <TodoList/>
      <ChatBox align="centre"/>
    </div>
  );
}

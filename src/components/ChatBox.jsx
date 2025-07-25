import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { socket } from "../socket";
import { Picker } from "emoji-mart";
import api from "../api/api";

const ChatBox = ({ user = "Guest", roomId = "general-room" }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    api.get(`/api/messages/${roomId}`).then((res) => {
      setMessages(Array.isArray(res.data.chat) ? res.data.chat : []);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { roomId, user, msg: input };
    socket.emit("sendMessage", msg);
    setMessages((prev) => [...prev, {user, msg: input}]);
    setInput("");
  };

  return (
    <div className="flex flex-col max-w-md mx-auto bg-gray-900 shadow-lg h-9/10">
      <div className="flex-1 p-4 h-9/10 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-2"
            title={new Date(msg.time).toLocaleTimeString()}
          >
            <span className="font-semibold text-indigo-400">{msg.user}:</span>
            <p className="text-gray-300 break-words">{msg.msg}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center h-1/10 border-t border-gray-700 p-3 bg-gray-800 sticky">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-grow max-w-47 bg-gray-700 text-gray-200 placeholder-gray-400 rounded-lg px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={sendMessage}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

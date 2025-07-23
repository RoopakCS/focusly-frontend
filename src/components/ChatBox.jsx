import { useState, useEffect, useRef } from "react";
import { socket } from "../socket";
import { Picker } from "emoji-mart";
import api from "../api/api";

const ChatBox = ({ user = "Guest", roomId = "general-room" }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch old messages from backend
    api.get(`/api/messages/${roomId}`).then((res) => {
      setMessages(Array.isArray(res.data.chat) ? res.data.chat : []);
    });

    // Listen for new messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
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
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx}><strong>{msg.user}:</strong> {msg.msg}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;

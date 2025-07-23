import { useState, useEffect, useRef } from "react";
import socket from "../socket";
import { Picker } from "emoji-mart"; // v5+ doesn't need the CSS import

const ChatBox = ({ username = "Guest", roomId = "general-room" }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const messagesEndRef = useRef(null);

  // ... rest of your code

  return (
    <div>
      {/* your chat UI */}
    </div>
  );
};

export default ChatBox;

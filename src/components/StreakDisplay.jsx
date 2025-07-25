import { useEffect, useState } from "react";

const StreakDisplay = ({ username }) => {
  const [streak, setStreak] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateStreak = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/streak/update/${username}`, {
          method: "POST",
        });
        const data = await res.json();
        setStreak(data.streak);
      } catch (err) {
        console.error("Failed to update streak", err);
        setError("Error");
      }
    };

    updateStreak();
  }, [username]);

  const containerStyle = {
    position: "fixed",
    bottom : "20px",
    right: "1px",
    backgroundColor: "light brown",
    padding: "10px 10px",
    borderRadius: "9px",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
    fontFamily: "Arial, sans-serif",
    zIndex: 1000,
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    border: "4px solid #000000ff", // orange
  };

  return (
    <div style={containerStyle}>
      {error
        ? error
        : streak !== null
        ? `🔥 ${streak} Day Streak`
        : "Loading..."}
    </div>
  );
};

export default StreakDisplay;

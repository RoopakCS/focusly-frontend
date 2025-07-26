import { useEffect, useState } from "react";
import api from "../api/api";

const StreakDisplay = ({ username }) => {
  const [streak, setStreak] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateStreak = async () => {
      try {
        const data = await api.post(`/api/streak/update/${username}`);
        setStreak(data.data.streak);
      } catch (err) {
        console.error("Failed to update streak", err);
        setError("Error");
      }
    };

    updateStreak();
  }, [username]);

  return (
    <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl shadow-lg  bg-zinc-900 text-white font-semibold text-sm transition-transform duration-200 hover:scale-110 hover:shadow-xl">
      {error
        ? error
        : streak !== null
        ? `🔥 ${streak}`
        : "Loading..."}
    </div>
  );
};

export default StreakDisplay;

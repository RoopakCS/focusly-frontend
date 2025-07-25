import { X, Edit } from "lucide-react";

import PomodoroTimer from "../components/PomodoroTimer";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";
import StreakDisplay from "../components/streakDisplay";
import StatsDashboard from "../components/StatsDashboard";

function Dashboard({ onClose, user, setUser }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (e) => {
    setIsVisible(!isVisible);
    localStorage.setItem("username", user);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="relative">
      <div className="fixed inset-0 z-40 bg-white border shadow-2xl rounded-2xl m-4 p-6 overflow-y-auto transition-all duration-300">
        <div>
          {isVisible ? (
            <input
              type="text"
              placeholder="Enter user name"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
            />
          ) : (
            <h1>{user}</h1>
          )}
          <button onClick={toggleVisibility}>
            {isVisible ? "Update Username" : "✏️"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <TodoList />
          <PomodoroTimer />
          <StatsDashboard/>
          <StreakDisplay/>
        </div>
      </div>
      </div>
  );
}

export default Dashboard;

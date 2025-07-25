import { X, Edit } from "lucide-react";

import PomodoroTimer from "../components/PomodoroTimer";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";
import StatsDashboard from "../components/StatsDashboard";
import StreakDisplay from "../components/StreakDisplay";

function Dashboard({ onClose, user, setUser }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    localStorage.setItem("username", user);
  };

  return (
    <div className="fixed inset-0 z-40 bg-white dark:bg-zinc-900 border dark:border-zinc-700 shadow-2xl rounded-2xl m-4 p-6 overflow-y-auto transition-all duration-300">
      <div className="flex items-center mb-4">
        {isVisible ? (
          <input
            type="text"
            placeholder="Enter user name"
            className="bg-zinc-800 text-white px-3 py-2 rounded"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
        ) : (
          <h1 className="text-xl text-white" onClick={toggleVisibility}>{user}</h1>
        )}
        <button
          onClick={toggleVisibility}
          className="ml-2 text-sm text-blue-400 hover:text-blue-200 p-1"
        >
          {isVisible ? "Update Username" : <Edit className="w-6 h-6" />}
        </button>
      </div>

      {
        onClose &&
        <button
          onClick={onClose}
          className="fixed top-10 right-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>

      }

      <h1 className="text-3xl font-bold text-white mb-6 col-span-2">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <TodoList />
        <PomodoroTimer />
        <StatsDashboard username={user} />
      </div>
      <StreakDisplay username={user} />
    </div>
  );
}

export default Dashboard;

import { useState } from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import TodoList from "../components/TodoList";

function Dashboard() {
  const [user, setUser] = useState("Guest");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Focusly Dashboard</h1>
      <div>
        {isVisible ? (
          <input
            type="text"
            placeholder="Enter user name"
            onChange={(e) => {
              setUser(e.target.value);
              localStorage.setItem("username", e.target.value);
            }}
            value={user}
          />
        ) : (
          <h1>{localStorage.getItem("username")}</h1>
        )}
        <button onClick={toggleVisibility}>
          {isVisible ? "Update Username" : "✏️"}
        </button>
      </div>

      <TodoList />
      <PomodoroTimer />
    </div>
  );
}

export default Dashboard;

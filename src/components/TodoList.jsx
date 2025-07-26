import React, { useEffect, useState } from "react";
import api from "../api/api";

const API_URL = "/api/todo";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      api
      .get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;
    api
      .post(API_URL, { text: task })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setTask("");
      })
      .catch((err) => console.error("Add error:", err));
  };

  const toggleComplete = (id) => {
    const todo = tasks.find((t) => t._id === id);
   api 
      .patch(`${API_URL}/${id}`, { completed: !todo.completed })
      .then(() =>
        setTasks(
          tasks.map((t) =>
            t._id === id ? { ...t, completed: !t.completed } : t
          )
        )
      )
      .catch((err) => console.error("Toggle error:", err));
  };

  const deleteTask = (id) => {
    api
      .delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter((t) => t._id !== id)))
      .catch((err) => console.error("Delete error", err));
  };

  const clearAll = () => {
    Promise.all(tasks.map((t) => api.delete(`${API_URL}/${t._id}`)))
      .then(() => setTasks([]))
      .catch((err) => console.error("Clear all errors:", err));
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 bg-opacity-80 backdrop-blur-md shadow-xl rounded-2xl p-6 transition-transform duration-200 hover:scale-102 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-zinc-800 dark:text-white">
          ✨ To-Do List
        </h2>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            ➕
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between px-4 py-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm"
            >
              <label className="flex items-center gap-2 flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item._id)}
                  className="w-5 h-5 text-blue-500"
                />
                <span
                  className={`text-sm sm:text-base break-words ${
                    item.completed
                      ? "line-through text-zinc-400"
                      : "text-zinc-900 dark:text-white"
                  }`}
                >
                  {item.text}
                </span>
              </label>
              <button
                onClick={() => deleteTask(item._id)}
                className="text-red-500 hover:text-red-700 text-lg"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button
            onClick={clearAll}
            className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            🧹 Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;

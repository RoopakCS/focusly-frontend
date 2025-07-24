import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/todo";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;
    axios
      .post(API_URL, { text: task })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setTask("");
      })
      .catch((err) => console.error("Add error:", err));
  };

  const toggleComplete = (id) => {
    const todo = tasks.find((t) => t._id === id);
    axios
      .patch(`${API_URL}/${id}`, { completed: !todo.completed })
      .then((res) =>
        setTasks(
          tasks.map((t) =>
            t._id === id ? { ...t, completed: !t.completed } : t
          )
        )
      )
      .catch((err) => console.error("Toggle error:", err));
  };

  const deleteTask = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter((t) => t._id !== id)))
      .catch((err) => console.error("Delete error", err));
  };

  const clearAll = () => {
    Promise.all(tasks.map((t) => axios.delete(`${API_URL}/${t._id}`)))
      .then(() => setTasks([]))
      .catch((err) => console.error("Clear all errors:", err));
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>To-Do List</h2>

        <div style={styles.inputArea}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addButton}>
            ➕
          </button>
        </div>

        <ul style={styles.taskList}>
          {tasks.map((item, index) => (
            <li key={item._id} style={styles.taskItem}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item._id)}
                  style={styles.checkbox}
                />
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: item.completed ? "line-through" : "none",
                    color: item.completed ? "#aaa" : "#333",
                  }}
                >
                  {item.text}
                </span>
              </label>
              <button
                onClick={() => deleteTask(item._id)}
                style={styles.deleteBtn}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button onClick={clearAll} style={styles.clearBtn}>
            🧹 Clear All
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    width: "400px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
    padding: "30px 20px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
  },
  inputArea: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    marginRight: "10px",
  },
  addButton: {
    padding: "10px 14px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "none",
    background: "#4caf50",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
  },
  taskItem: {
    backgroundColor: "#fff",
    marginBottom: "10px",
    padding: "10px 12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.1s ease-in-out",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    cursor: "pointer",
  },
  checkbox: {
    transform: "scale(1.2)",
    cursor: "pointer",
  },
  taskText: {
    fontSize: "16px",
    wordBreak: "break-word",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "#ff4444",
  },
  clearBtn: {
    marginTop: "15px",
    background: "#ff4444",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "8px 16px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default TodoList;

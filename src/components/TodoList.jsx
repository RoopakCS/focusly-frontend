import React, { useState } from "react";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleComplete = (index) => {
    const updated = tasks.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>✨ To-Do List</h2>

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
            <li key={index} style={styles.taskItem}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
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
              <button onClick={() => deleteTask(index)} style={styles.deleteBtn}>
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
    minHeight: "100vh",
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

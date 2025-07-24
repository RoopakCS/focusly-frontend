# 📑 Focusly App - Backend Documentation
## Desciiption

The frontend of Focusly is a modern, responsive web interface built with React (Vite) and Tailwind CSS, designed to deliver a smooth, real-time productivity experience.

## 🚀 Key Features

🎥 Live Video & Audio Communication (via WebRTC + PeerJS)
🤝 Real-time multi-user room collaboration (Socket.IO)
🧠 Focus Timer & Productivity Tools (Pomodoro mode)
👥 User presence tracking & typing indicators
📋 Task sharing, notes, and session history
📱 Responsive Design – Works on desktop & mobile

## 🛠️ Technologies Used

- **React.js**
- **Vite**	
- **Tailwind CSS**	
- **Socket.IO** 
- **PeerJS**	
- **WebRTC**
- **React Context/State**

---

## 📁 Project Structure

src/
├── components/
│   ├── ChatBox.jsx
│   ├── PomodoroTimer.jsx
│   ├── TodoList.jsx
├── pages/
│   ├── Home.jsx
│   ├── RoomPage.jsx
│   └── Dashboard.jsx
├── App.jsx
├── main.jsx
├── socket.js         
├── api.js            
└── styles/
    └── tailwind.css

---
## 🔁 Events

| Method        | Endpoint/Event Name | Description                                                                |
| ------------- | ------------------- | -------------------------------------------------------------------------- |
| `socket.emit` | `join-room`         | Emitted when a user joins a specific video room with a room ID and user ID |
| `socket.on`   | `user-connected`    | Triggered when another user joins the same room                            |
| `socket.on`   | `user-disconnected` | Triggered when a user leaves/disconnects from the room                     |
| `peer.on`     | `call`              | Fires when a peer initiates a call to another peer                         |
| `call.on`     | `stream`            | Receives the remote user's video/audio stream                              |
| `custom`      | `open-stream`       | Custom trigger to open the user's camera and mic                           |
| `custom`      | `timer-start`       | Starts the Pomodoro focus timer                                            |
| `custom`      | `timer-end`         | Indicates the end of a focus or break session                              |
| `custom`      | `task-add`          | Adds a new task to the to-do list                                          |
| `custom`      | `task-complete`     | Marks a task as completed                                                  |
| `custom`      | `streak-update`     | Updates streak when a Pomodoro session or task is completed                |
| `socket.emit` | `send-message`      | Sends a chat message to the room                                           |
| `socket.on`   | `receive-message`   | Receives an incoming chat message                                          |


## 📦 Pages Overview

## Home.jsx

- UI to create or join a study room
- Inputs room name/code and triggers navigation to RoomPage

## RoomPage.jsx

Core of the app

Includes:
- VideoGrid (if implemented)
- PomodoroTimer
- ChatBox
- TodoList
- Dashboard.jsx

## Uses Recharts or Chart.js

- Displays:
- Total focused time (daily/weekly)
- Streaks
- Task completion rate

## 🧩 Components

## PomodoroTimer.jsx

- React timer synced via Socket.IO
- Default 25/5 sessions
- Shows current session + total focus time

## ChatBox.jsx

- Real-time messaging using Socket.IO
- UI for sending/receiving messages
- TodoList.jsx
- Add, mark complete, and delete tasks
- Local or backend-connected todo list
---



---
## ✅ Summary

- The frontend connects to the backend using Socket.
- IO and PeerJS, handling UI rendering, user actions, and state updates.
- It’s built for speed (using Vite), styled with utility-first CSS, and is mobile-friendly by design.

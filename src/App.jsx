import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RoomPage from "./pages/RoomPage";
import Dashboard from "./pages/Dashboard";
import DashboardToggle from "./components/DashboardToggle";

function App() {
  const [user, setUser] = useState(localStorage.getItem("username") ?? "Guest");
  const location = useLocation()
  return (
        <div className="h-screen w-full bg-background text-foreground flex flex-col">
        { location.pathname !== "/dashboard" && (
            <DashboardToggle user={user} setUser={setUser} />
          )}

          <main className="flex-1 h-[calc(100vh-64px)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/room/:roomId" element={<RoomPage user={user} />} />
              <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
            </Routes>
          </main>
        </div>
      
  );
}

export default App;

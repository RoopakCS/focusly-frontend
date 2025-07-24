import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoomPage from "./pages/RoomPage";
import Dashboard from "./pages/Dashboard";
import DashboardToggle from "./components/DashboardToggle";

function App() {
  return (
      <Router>
        <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
          <header className="p-4 shadow-md bg-white dark:bg-gray-900">
            <DashboardToggle />
          </header>

          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/room/:roomId" element={<RoomPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;

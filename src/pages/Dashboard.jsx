import { X } from "lucide-react"
import PomodoroTimer from "../components/PomodoroTimer"
import TodoList from "../components/TodoList"

function Dashboard({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 bg-white border shadow-2xl rounded-2xl m-4 p-6 overflow-y-auto transition-all duration-300">
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
      </div>
    </div>
  )
}

export default Dashboard

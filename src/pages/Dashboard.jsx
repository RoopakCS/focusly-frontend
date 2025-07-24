import PomodoroTimer from "../components/PomodoroTimer";
import TodoList from "../components/TodoList";

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Focusly Dashboard</h1>
      <TodoList />
      <PomodoroTimer />
    </div>
  );
}

export default Dashboard;

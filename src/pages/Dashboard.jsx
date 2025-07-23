import TodoList from "../components/TodoList";

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Focusly Dashboard</h1>
      <TodoList />
    </div>
  );
}

export default Dashboard;

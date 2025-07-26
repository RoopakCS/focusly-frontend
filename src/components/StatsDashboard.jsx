// src/components/StatsDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa"];

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function StatsDashboard({ username }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/stats/${username}`);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, [username]);

  if (!stats) return <p className="text-center text-gray-500">Loading stats...</p>;

  const pieData = Object.entries(stats.byType).map(([type, value], idx) => ({
    name: type,
    value
  }));

  const barData = stats.byDay.map((duration, i) => ({
    day: dayLabels[i],
    duration
  }));

  return (
    <div className="p-6 max-w-5xl mx-auto grid gap-8 col-span-1 md:col-span-2">
      {/* Totals */}
      <div className="bg-zinc-900 shadow-xl rounded-2xl p-6 col-span-2 text-center transition-transform duration-200 hover:scale-110 hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">🧠 Weekly Focus Summary</h2>
        <div className="flex justify-around text-lg">
          <span>📅 Today: <strong>{stats.today} mins</strong></span>
          <span>🕒 Yesterday: <strong>{stats.yesterday} mins</strong></span>
          <span>📈 Week Total: <strong>{stats.week} mins</strong></span>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-zinc-900 rounded-2xl shadow-xl p-4 transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-center mb-2">By Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-zinc-900 rounded-2xl shadow-xl p-4 transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-center mb-2">By Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duration" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

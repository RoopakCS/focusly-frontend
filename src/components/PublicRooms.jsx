import { useEffect, useState } from "react";
import api from "../api/api";

const PublicRooms = () => {
  const [publicRooms, setPublicRooms] = useState(null);

  useEffect(() => {
    api.get("/api/rooms/publicrooms").then((res) => {
      setPublicRooms(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-zinc-800 dark:text-white">
        Public Rooms
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {publicRooms?.map((room, i) => (
          <a
            key={i}
            href={`http://localhost:5173/room/${room.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl p-6 m-2 bg-white dark:bg-zinc-900 shadow hover:shadow-xl transition border dark:border-zinc-700 text-center hover:scale-[1.02] duration-150"
          >
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
              {room.name}
            </h3>
            <p className="text-base text-zinc-700 dark:text-zinc-300 mt-2">
              Code: <span className="font-medium">{room.code}</span>
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PublicRooms;

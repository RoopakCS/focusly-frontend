import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          <Link
            key={i}
            to={`/room/${room.code}`}
            className="relative rounded-2xl p-6 m-2 bg-white dark:bg-zinc-900 shadow hover:shadow-xl transition border dark:border-zinc-700 text-center hover:scale-[1.02] duration-150"
              title={
                room.members.length > 2
                  ? `${room.members.slice(0, 2).join(", ")}, and ${room.members.length - 2} more`
                  : room.members.join(", ")
              }
            >
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
              {room.name}
            </h3>
            <p className="text-base text-zinc-700 dark:text-zinc-300 mt-2">
              Code: <span className="font-medium">{room.code}</span>
            </p>
            <div className="absolute right-[-0.5em] top-[-0.4em] text-center rounded-full w-7 h-7 bg-white dark:bg-zinc-900 border dark:border-zinc-700" >{room.members.length}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PublicRooms;

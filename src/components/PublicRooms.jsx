import { useEffect, useState } from "react"
import api from "../api/api"

const PublicRooms = () => {

  const [publicRooms, setPublicRooms] = useState(null)

  useEffect(()=>{
    api.get("/api/rooms/publicrooms").then(res=>{
      setPublicRooms(res.data)
      console.log(res.data)
    })
  }, [])

  return (
      <div>
        PUBLIC ROOMS:
        <ul>
          {publicRooms && publicRooms.map((room, i) => {
            return(
              <li>{room.name}({room.code})</li>
            )
          })}
        </ul>
      </div>
  )
}

export default PublicRooms

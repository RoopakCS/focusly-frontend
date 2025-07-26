import { useState } from "react"
import { PanelRightOpen } from "lucide-react"
import Dashboard from "../pages/Dashboard"

function DashboardToggle({user, setUser}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="z-50">
      {
        open ? 
          <Dashboard onClose={() => setOpen(false)} user={user} setUser={setUser} /> 
        :
          <button
            onClick={() => setOpen(true)}
            className="fixed top-4 right-4 z-50 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
          >
            <PanelRightOpen className="w-6 h-6" />
          </button>

      }
    </div>
  )
}

export default DashboardToggle

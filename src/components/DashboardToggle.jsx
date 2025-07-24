import { useState } from "react"
import { PanelRightOpen } from "lucide-react"
import Dashboard from "../pages/Dashboard"

function DashboardToggle() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {
        open ? 
          <Dashboard onClose={() => setOpen(false)} /> 
        :
          <button
            onClick={() => setOpen(true)}
            className="fixed top-4 right-4 z-50 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
          >
            <PanelRightOpen className="w-6 h-6 text-black" />
          </button>

      }
    </>
  )
}

export default DashboardToggle

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RoomPage from './pages/RoomPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      HELLO WORLD
      <RoomPage />
    </>
  )
}

export default App

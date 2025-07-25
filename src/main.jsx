import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)

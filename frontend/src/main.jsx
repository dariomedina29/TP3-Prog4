import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@picocss/pico";
import './index.css'
import { Layout } from "./Layout.jsx";
import { Home } from "./Home.jsx";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@picocss/pico";
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

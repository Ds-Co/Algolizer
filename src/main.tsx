import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandPage from './components/LandPage'
import 'bootstrap/dist/css/bootstrap.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <LandPage/>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandPage from './components/LandPage/LandPage'
import ParticleSystem from './components/LandPage/BackGroundAnimation'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
    <LandPage/>
    <ParticleSystem/>
    
    </>
  
  </StrictMode>,
)

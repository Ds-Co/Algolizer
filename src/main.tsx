import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandPage from './components/LandPage'
import ParticleSystem from './components/BackGroundAnimation'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
    <LandPage/>
    <ParticleSystem/>
    
    </>
  
  </StrictMode>,
)

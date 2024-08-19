import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IconButtons from './components/IconButton'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IconButtons></IconButtons>
  </StrictMode>,
)

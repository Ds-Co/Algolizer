import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IconButtons from './components/IconButton'
import 'bootstrap/dist/css/bootstrap.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IconButtons></IconButtons>
  </StrictMode>,
)

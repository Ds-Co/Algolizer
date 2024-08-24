import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandPage from './components/LandPage/LandPage'
import SplitScreen from './components/SplitScreen/SplitScreen'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<LandPage/>}></Route>
        <Route path='/SplitScreen' element={<SplitScreen/>}></Route>
      </Routes>
    </Router>
  </StrictMode>
)

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Nivel from './pages/Nivel'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nivel/:id" element={<Nivel />} />
    </Routes>
  )
}

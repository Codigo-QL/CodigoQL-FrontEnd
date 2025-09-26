import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home'
import Nivel from './pages/Nivel'
import Capitulos from './pages/Capitulos'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capitulos" element={<Capitulos />} />
        <Route path="/nivel/:id" element={<Nivel />} />
      </Routes>
    </AuthProvider>
  )
}

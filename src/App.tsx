import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SearchModal from './components/ui/SearchModal'
import Home from './pages/Home'
import Eras from './pages/Eras'
import EraDetail from './pages/EraDetail'
import Timeline from './pages/Timeline'
import Films from './pages/Films'
import FilmDetail from './pages/FilmDetail'
import Series from './pages/Series'
import SeriesDetail from './pages/SeriesDetail'
import Games from './pages/Games'
import GameDetail from './pages/GameDetail'
import WatchPaths from './pages/WatchPaths'
import Databank from './pages/Databank'
import GalaxyMap from './pages/GalaxyMap'
import Legal from './pages/Legal'

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onSearchClick={() => setSearchOpen(true)} theme={theme} onThemeToggle={toggle} />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eras" element={<Eras />} />
          <Route path="/eras/:slug" element={<EraDetail />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:slug" element={<FilmDetail />} />
          <Route path="/series" element={<Series />} />
          <Route path="/series/:slug" element={<SeriesDetail />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:slug" element={<GameDetail />} />
          <Route path="/watch-paths" element={<WatchPaths />} />
          <Route path="/databank" element={<Databank />} />
          <Route path="/galaxy-map" element={<GalaxyMap />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </div>
      <Footer />
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

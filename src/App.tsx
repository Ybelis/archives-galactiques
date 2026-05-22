import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Films from './pages/Films'
import Series from './pages/Series'
import Paths from './pages/Paths'
import Glossary from './pages/Glossary'

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chronologie" element={<Timeline />} />
            <Route path="/films" element={<Films />} />
            <Route path="/series" element={<Series />} />
            <Route path="/parcours" element={<Paths />} />
            <Route path="/lexique" element={<Glossary />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  )
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { BottomNav } from './components/BottomNav'
import { SearchPage } from './components/SearchPage'
import { FavoritesPage } from './components/FavoritesPage'
import { DetailPage } from './components/DetailPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-16">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/destination/:title" element={<DetailPage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
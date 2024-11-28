import { Search, Heart } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-2">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/' ? 'text-rose-500' : 'text-gray-600'
            }`}
          >
            <Search size={24} />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button
            onClick={() => navigate('/favorites')}
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/favorites' ? 'text-rose-500' : 'text-gray-600'
            }`}
          >
            <Heart size={24} />
            <span className="text-xs mt-1">Favorites</span>
          </button>
        </div>
      </div>
    </div>
  )
}
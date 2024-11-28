import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Destination } from '../types'

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.some((fav: Destination) => fav.title === destination.title))
  }, [destination.title])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    let newFavorites

    if (isFavorite) {
      newFavorites = favorites.filter((fav: Destination) => fav.title !== destination.title)
    } else {
      newFavorites = [...favorites, destination]
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  const handleClick = () => {
    navigate(`/destination/${encodeURIComponent(destination.title)}`)
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative h-48 md:h-64">
        <img
          src={`https://picsum.photos/seed/${destination.title}/800/600`}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}
          />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{destination.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{destination.description}</p>
      </div>
    </div>
  );
}
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Heart, ArrowLeft, Loader2 } from 'lucide-react'
import { getDestinationDetails } from '../services/wikiApi'
import { Destination } from '../types'

export function DetailPage() {
  const { title } = useParams<{ title: string }>()
  const navigate = useNavigate()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      if (title) {
        setLoading(true)
        try {
          const details = await getDestinationDetails(decodeURIComponent(title))
          setDestination(details)
          // Check if it's in favorites
          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
          setIsFavorite(favorites.some((fav: Destination) => fav.title === details.title))
        } catch (error) {
          console.error('Error fetching destination details:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchDetails()
  }, [title])

  const toggleFavorite = () => {
    if (!destination) return
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-rose-500" size={48} />
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="p-4 text-center">
        <p>Destination not found</p>
      </div>
    )
  }

  return (
    <div className="pb-16">
      <div className="relative h-72 md:h-96">
        <img
          src={`https://picsum.photos/seed/${destination.title}/1200/800`}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
          <div className="p-4 flex justify-between items-start">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
            >
              <ArrowLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
            >
              <Heart
                size={24}
                className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-800'}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{destination.title}</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">{destination.description}</p>
        </div>
      </div>
    </div>
  )
}
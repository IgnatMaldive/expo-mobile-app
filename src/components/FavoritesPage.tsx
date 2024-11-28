import { useEffect, useState } from 'react'
import { DestinationCard } from './DestinationCard'
import { Destination } from '../types'

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<Destination[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 bg-white shadow-sm py-4 px-4 md:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-rose-500">Favorites</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {favorites.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No favorites yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((destination, index) => (
              <DestinationCard
                key={index}
                destination={destination}
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
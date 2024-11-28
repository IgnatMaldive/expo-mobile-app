import { useState, useEffect } from 'react'
import { SearchHeader } from './SearchHeader'
import { DestinationCard } from './DestinationCard'
import { searchDestinations } from '../services/wikiApi'
import { Loader2 } from 'lucide-react'
import { Destination } from '../types'

export function SearchPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('popular tourist destinations');

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const results = await searchDestinations(searchQuery);
        setDestinations(results);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchDestinations, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <>
      <SearchHeader onSearch={setSearchQuery} />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-rose-500" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
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
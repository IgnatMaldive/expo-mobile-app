import { Search } from 'lucide-react';

export function SearchHeader({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <header className="sticky top-0 bg-white shadow-sm py-4 px-4 md:px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-rose-500 mb-4">ExpoGuide</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search destinations..."
            className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    </header>
  );
}
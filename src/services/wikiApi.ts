const WIKI_API_BASE = 'https://en.wikipedia.org/w/api.php';

export async function searchDestinations(query: string) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrnamespace: '0',
    gsrlimit: '10',
    gsrsearch: `${query} tourism`,
    prop: 'extracts',
    exintro: '1',
    explaintext: '1',
    exlimit: '20',
    origin: '*',
  });

  try {
    const response = await fetch(`${WIKI_API_BASE}?${params}`);
    const data = await response.json();
    
    if (!data.query) return [];

    return Object.values(data.query.pages).map((page: any) => ({
      title: page.title,
      description: page.extract || 'No description available',
      imageUrl: `https://picsum.photos/seed/${page.title}/800/600`,
    }));
  } catch (error) {
    console.error('Error fetching from Wikipedia:', error);
    return [];
  }
}

export async function getDestinationDetails(title: string) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    titles: title,
    prop: 'extracts',
    explaintext: '1',
    origin: '*',
  });

  try {
    const response = await fetch(`${WIKI_API_BASE}?${params}`);
    const data = await response.json();
    
    if (!data.query?.pages) {
      throw new Error('No data found');
    }

    const page = Object.values(data.query.pages)[0] as any;
    
    return {
      title: page.title,
      description: page.extract || 'No description available',
      imageUrl: `https://picsum.photos/seed/${page.title}/800/600`,
    };
  } catch (error) {
    console.error('Error fetching destination details:', error);
    throw error;
  }
}
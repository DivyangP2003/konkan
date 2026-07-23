import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Map as MapIcon, Grid3X3, ChevronDown } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { DestinationCard } from '../components/destination-card';
import { DestinationMap } from '../components/destination-map';
import {
  DestinationFiltersSidebar,
  DestinationFiltersMobile,
  type DestinationFilters,
} from '../components/destination-filters';
import { sampleDestinations, type Destination } from '../data/destinations';
import { useLocation } from 'wouter';

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'distance', label: 'Distance from Mumbai' },
  { value: 'trending', label: 'Trending' },
];

export default function DestinationsPage() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  
  const [filters, setFilters] = useState<DestinationFilters>({
    regions: [],
    types: [],
    difficulties: [],
    activities: [],
    featured: false,
    trending: false,
    hidden: false,
  });

  const resetFilters = () => {
    setFilters({
      regions: [],
      types: [],
      difficulties: [],
      activities: [],
      featured: false,
      trending: false,
      hidden: false,
    });
  };

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    let results = [...sampleDestinations];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query) ||
          dest.highlights.some((h) => h.toLowerCase().includes(query))
      );
    }

    // Region filter
    if (filters.regions.length > 0) {
      results = results.filter((dest) => filters.regions.includes(dest.region));
    }

    // Type filter
    if (filters.types.length > 0) {
      results = results.filter((dest) => filters.types.includes(dest.type));
    }

    // Difficulty filter
    if (filters.difficulties.length > 0) {
      results = results.filter((dest) => dest.difficulty && filters.difficulties.includes(dest.difficulty));
    }

    // Activities filter
    if (filters.activities.length > 0) {
      results = results.filter((dest) =>
        filters.activities.some((activity) => dest.activities.includes(activity))
      );
    }

    // Featured filter
    if (filters.featured) {
      results = results.filter((dest) => dest.featured);
    }

    // Trending filter
    if (filters.trending) {
      results = results.filter((dest) => dest.trending);
    }

    // Hidden filter
    if (filters.hidden) {
      results = results.filter((dest) => dest.hidden);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        results.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case 'distance':
        results.sort((a, b) => (a.distanceFromMumbai || 999) - (b.distanceFromMumbai || 999));
        break;
      case 'trending':
        results.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return (b.averageRating || 0) - (a.averageRating || 0);
        });
        break;
    }

    return results;
  }, [searchQuery, filters, sortBy]);

  const handleDestinationClick = (destination: Destination) => {
    navigate(`/place/${destination.slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('destinations.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('destinations.subtitle')}</p>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('destinations.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Mobile Filter Button */}
            <DestinationFiltersMobile filters={filters} onChange={setFilters} onReset={resetFilters} />

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('destinations.sort')} />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Map Toggle */}
            <Button
              variant={showMap ? 'default' : 'outline'}
              onClick={() => setShowMap(!showMap)}
              className="w-full sm:w-auto"
            >
              {showMap ? <Grid3X3 className="w-4 h-4 mr-2" /> : <MapIcon className="w-4 h-4 mr-2" />}
              {showMap ? t('destinations.hideMap') : t('destinations.showMap')}
            </Button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredDestinations.length} {filteredDestinations.length === 1 ? 'destination' : 'destinations'} found
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <DestinationFiltersSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />

        {/* Destinations Grid/Map */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {showMap ? (
            <DestinationMap
              destinations={filteredDestinations}
              height="calc(100vh - 300px)"
              onMarkerClick={handleDestinationClick}
            />
          ) : filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onClick={() => handleDestinationClick(destination)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">{t('destinations.noResults')}</p>
              <Button onClick={resetFilters} variant="outline" className="mt-4">
                {t('filter.reset')}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

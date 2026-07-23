import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Map as MapIcon, Grid3X3 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { AccommodationCard } from '../components/accommodation-card';
import { DestinationMap } from '../components/destination-map';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import {
  sampleAccommodations,
  accommodationTypeOptions,
  priceRangeOptions,
  amenitiesOptions,
  type Accommodation,
} from '../data/accommodations';

export default function StayPage() {
  const { t } = useTranslation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFeatured, setShowFeatured] = useState(false);
  const [showPetFriendly, setShowPetFriendly] = useState(false);
  const [showFamilyFriendly, setShowFamilyFriendly] = useState(false);

  const toggleFilter = (value: string, currentList: string[], setter: (list: string[]) => void) => {
    if (currentList.includes(value)) {
      setter(currentList.filter(v => v !== value));
    } else {
      setter([...currentList, value]);
    }
  };

  const filteredAccommodations = useMemo(() => {
    let results = [...sampleAccommodations];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (acc) =>
          acc.name.toLowerCase().includes(query) ||
          acc.description.toLowerCase().includes(query) ||
          acc.destinationName?.toLowerCase().includes(query)
      );
    }

    if (selectedTypes.length > 0) {
      results = results.filter((acc) => selectedTypes.includes(acc.type));
    }

    if (selectedPriceRanges.length > 0) {
      results = results.filter((acc) => selectedPriceRanges.includes(acc.priceRange));
    }

    if (selectedAmenities.length > 0) {
      results = results.filter((acc) =>
        selectedAmenities.every((amenity) => acc.amenities.includes(amenity))
      );
    }

    if (showFeatured) {
      results = results.filter((acc) => acc.featured);
    }

    if (showPetFriendly) {
      results = results.filter((acc) => acc.petFriendly);
    }

    if (showFamilyFriendly) {
      results = results.filter((acc) => acc.familyFriendly);
    }

    switch (sortBy) {
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        results.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case 'price_low':
        results.sort((a, b) => (a.priceMin || 0) - (b.priceMin || 0));
        break;
      case 'price_high':
        results.sort((a, b) => (b.priceMax || 0) - (a.priceMax || 0));
        break;
    }

    return results;
  }, [searchQuery, selectedTypes, selectedPriceRanges, selectedAmenities, showFeatured, showPetFriendly, showFamilyFriendly, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Where to Stay in Konkan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From luxury beach resorts to cozy homestays - find your perfect accommodation
          </p>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search accommodations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price_low">Price (Low to High)</SelectItem>
                <SelectItem value="price_high">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showMap ? 'default' : 'outline'}
              onClick={() => setShowMap(!showMap)}
              className="w-full sm:w-auto"
            >
              {showMap ? <Grid3X3 className="w-4 h-4 mr-2" /> : <MapIcon className="w-4 h-4 mr-2" />}
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            {filteredAccommodations.length} accommodation{filteredAccommodations.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block w-80 border-r border-border bg-card p-6">
          <h2 className="text-xl font-bold mb-6">Filters</h2>
          
          <div className="space-y-6">
            {/* Quick Filters */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Quick Filters</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={showFeatured}
                    onCheckedChange={(checked) => setShowFeatured(!!checked)}
                  />
                  <label htmlFor="featured" className="text-sm cursor-pointer">Featured</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pet"
                    checked={showPetFriendly}
                    onCheckedChange={(checked) => setShowPetFriendly(!!checked)}
                  />
                  <label htmlFor="pet" className="text-sm cursor-pointer">Pet Friendly</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="family"
                    checked={showFamilyFriendly}
                    onCheckedChange={(checked) => setShowFamilyFriendly(!!checked)}
                  />
                  <label htmlFor="family" className="text-sm cursor-pointer">Family Friendly</label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Type Filter */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Accommodation Type</Label>
              <div className="space-y-2">
                {accommodationTypeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${option.value}`}
                      checked={selectedTypes.includes(option.value)}
                      onCheckedChange={() => toggleFilter(option.value, selectedTypes, setSelectedTypes)}
                    />
                    <label htmlFor={`type-${option.value}`} className="text-sm cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Price Range</Label>
              <div className="space-y-2">
                {priceRangeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`price-${option.value}`}
                      checked={selectedPriceRanges.includes(option.value)}
                      onCheckedChange={() => toggleFilter(option.value, selectedPriceRanges, setSelectedPriceRanges)}
                    />
                    <label htmlFor={`price-${option.value}`} className="text-sm cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Amenities</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {amenitiesOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleFilter(amenity, selectedAmenities, setSelectedAmenities)}
                    />
                    <label htmlFor={`amenity-${amenity}`} className="text-sm cursor-pointer">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Accommodations Grid/Map */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {showMap ? (
            <DestinationMap
              destinations={filteredAccommodations.map(acc => ({
                id: acc.id,
                slug: acc.slug,
                name: acc.name,
                region: 'central' as const,
                type: 'city' as const,
                coordinates: acc.coordinates,
                description: acc.description,
                highlights: acc.amenities,
                bestTime: [],
                activities: [],
                images: acc.images,
              }))}
              height="calc(100vh - 300px)"
            />
          ) : filteredAccommodations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAccommodations.map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
                  accommodation={accommodation}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No accommodations found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
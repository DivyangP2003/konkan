import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, UtensilsCrossed } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { RestaurantCard } from '../components/restaurant-card';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  sampleRestaurants,
  cuisineTypeOptions,
  restaurantPriceRangeOptions,
  type Restaurant,
} from '../data/restaurants';

export default function FoodPage() {
  const { t } = useTranslation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [showFeatured, setShowFeatured] = useState(false);

  const toggleFilter = (value: string, currentList: string[], setter: (list: string[]) => void) => {
    if (currentList.includes(value)) {
      setter(currentList.filter(v => v !== value));
    } else {
      setter([...currentList, value]);
    }
  };

  const filteredRestaurants = useMemo(() => {
    let results = [...sampleRestaurants];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (rest) =>
          rest.name.toLowerCase().includes(query) ||
          rest.description.toLowerCase().includes(query) ||
          rest.destinationName?.toLowerCase().includes(query) ||
          rest.specialties.some(s => s.toLowerCase().includes(query))
      );
    }

    if (selectedCuisines.length > 0) {
      results = results.filter((rest) => selectedCuisines.includes(rest.cuisineType));
    }

    if (selectedPriceRanges.length > 0) {
      results = results.filter((rest) => selectedPriceRanges.includes(rest.priceRange));
    }

    if (showFeatured) {
      results = results.filter((rest) => rest.featured);
    }

    switch (sortBy) {
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        results.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
    }

    return results;
  }, [searchQuery, selectedCuisines, selectedPriceRanges, showFeatured, sortBy]);

  // Get unique specialties for must-try dishes section
  const mustTryDishes = useMemo(() => {
    const allSpecialties = sampleRestaurants.flatMap(r => r.specialties);
    return [...new Set(allSpecialties)].slice(0, 12);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Konkan Culinary Guide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover authentic Konkani flavors, fresh seafood, and traditional recipes
          </p>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="restaurants" className="w-full">
        <div className="border-b bg-card sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
              <TabsTrigger value="restaurants" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                Restaurants
              </TabsTrigger>
              <TabsTrigger value="dishes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                Must-Try Dishes
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Restaurants Tab */}
        <TabsContent value="restaurants" className="mt-0">
          {/* Search and Controls */}
          <div className="border-b bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search restaurants or dishes..."
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
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block w-80 border-r border-border bg-card p-6">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              
              <div className="space-y-6">
                {/* Featured */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Quick Filters</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={showFeatured}
                        onCheckedChange={(checked) => setShowFeatured(!!checked)}
                      />
                      <label htmlFor="featured" className="text-sm cursor-pointer">Featured Only</label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cuisine Type */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Cuisine Type</Label>
                  <div className="space-y-2">
                    {cuisineTypeOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cuisine-${option.value}`}
                          checked={selectedCuisines.includes(option.value)}
                          onCheckedChange={() => toggleFilter(option.value, selectedCuisines, setSelectedCuisines)}
                        />
                        <label htmlFor={`cuisine-${option.value}`} className="text-sm cursor-pointer">
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
                    {restaurantPriceRangeOptions.map((option) => (
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
              </div>
            </aside>

            {/* Restaurants Grid */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {filteredRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">No restaurants found</p>
                </div>
              )}
            </main>
          </div>
        </TabsContent>

        {/* Must-Try Dishes Tab */}
        <TabsContent value="dishes" className="mt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Must-Try Konkani Dishes</h2>
              <p className="text-muted-foreground">
                Authentic flavors that define the Konkan culinary heritage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mustTryDishes.map((dish, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src="/assets/konkani-thali.jpg"
                      alt={dish}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <UtensilsCrossed className="w-5 h-5 text-primary" />
                      {dish}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Traditional Konkani specialty
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Food Culture Section */}
            <div className="mt-16 border-t pt-12">
              <h2 className="text-3xl font-bold mb-6">Konkan Food Culture</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Fresh from the Sea</h3>
                  <p className="text-muted-foreground mb-4">
                    Being a coastal region, seafood dominates Konkan cuisine. Fresh catch of the day,
                    traditional fishing methods, and age-old recipes create an unforgettable culinary experience.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Pomfret, Surmai, Bangda, and Prawns are most popular</li>
                    <li>• Coconut-based gravies and Sol Kadhi for digestion</li>
                    <li>• Malvani masala - the signature spice blend</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Seasonal Specialties</h3>
                  <p className="text-muted-foreground mb-4">
                    Konkan cuisine celebrates seasons with special dishes. Alphonso mangoes in summer,
                    monsoon delicacies, and festival foods create a year-round culinary calendar.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Alphonso Mango season (April-May)</li>
                    <li>• Monsoon: Bhajis and hot chai</li>
                    <li>• Festival foods: Modak, Puran Poli, Ukdiche Modak</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
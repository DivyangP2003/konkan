import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Calendar } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ActivityCard } from '../components/activity-card';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import {
  sampleActivities,
  activityCategoryOptions,
  activityDifficultyOptions,
  type Activity,
} from '../data/activities';

export default function ActivitiesPage() {
  const { t } = useTranslation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [showFeatured, setShowFeatured] = useState(false);
  const [showFamilyFriendly, setShowFamilyFriendly] = useState(false);
  const [showBookingRequired, setShowBookingRequired] = useState(false);

  const toggleFilter = (value: string, currentList: string[], setter: (list: string[]) => void) => {
    if (currentList.includes(value)) {
      setter(currentList.filter(v => v !== value));
    } else {
      setter([...currentList, value]);
    }
  };

  const filteredActivities = useMemo(() => {
    let results = [...sampleActivities];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (act) =>
          act.name.toLowerCase().includes(query) ||
          act.description.toLowerCase().includes(query) ||
          act.destinationName?.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      results = results.filter((act) => selectedCategories.includes(act.category));
    }

    if (selectedDifficulties.length > 0) {
      results = results.filter((act) => selectedDifficulties.includes(act.difficulty));
    }

    if (showFeatured) {
      results = results.filter((act) => act.featured);
    }

    if (showFamilyFriendly) {
      results = results.filter((act) => act.familyFriendly);
    }

    if (showBookingRequired) {
      results = results.filter((act) => act.bookingRequired);
    }

    switch (sortBy) {
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        results.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case 'price_low':
        results.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'difficulty':
        const difficultyOrder = { easy: 0, moderate: 1, difficult: 2 };
        results.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
    }

    return results;
  }, [searchQuery, selectedCategories, selectedDifficulties, showFeatured, showFamilyFriendly, showBookingRequired, sortBy]);

  // Get activities by category for overview
  const activitiesByCategory = useMemo(() => {
    return activityCategoryOptions.map(cat => ({
      ...cat,
      count: sampleActivities.filter(a => a.category === cat.value).length,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Things to Do in Konkan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Adventure, culture, nature, and wellness - discover unforgettable experiences
          </p>
          
          {/* Quick Category Overview */}
          <div className="mt-8 flex flex-wrap gap-3">
            {activitiesByCategory.map((cat) => (
              <Badge
                key={cat.value}
                variant="secondary"
                className="text-sm py-2 px-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => {
                  if (selectedCategories.includes(cat.value)) {
                    setSelectedCategories(selectedCategories.filter(c => c !== cat.value));
                  } else {
                    setSelectedCategories([...selectedCategories, cat.value]);
                  }
                }}
              >
                {cat.label} ({cat.count})
              </Badge>
            ))}
          </div>
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
                placeholder="Search activities..."
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
                <SelectItem value="difficulty">Difficulty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            {filteredActivities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'} found
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
                    id="family"
                    checked={showFamilyFriendly}
                    onCheckedChange={(checked) => setShowFamilyFriendly(!!checked)}
                  />
                  <label htmlFor="family" className="text-sm cursor-pointer">Family Friendly</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="booking"
                    checked={showBookingRequired}
                    onCheckedChange={(checked) => setShowBookingRequired(!!checked)}
                  />
                  <label htmlFor="booking" className="text-sm cursor-pointer">Booking Required</label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Category Filter */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Category</Label>
              <div className="space-y-2">
                {activityCategoryOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${option.value}`}
                      checked={selectedCategories.includes(option.value)}
                      onCheckedChange={() => toggleFilter(option.value, selectedCategories, setSelectedCategories)}
                    />
                    <label htmlFor={`category-${option.value}`} className="text-sm cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Difficulty Filter */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Difficulty Level</Label>
              <div className="space-y-2">
                {activityDifficultyOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`difficulty-${option.value}`}
                      checked={selectedDifficulties.includes(option.value)}
                      onCheckedChange={() => toggleFilter(option.value, selectedDifficulties, setSelectedDifficulties)}
                    />
                    <label htmlFor={`difficulty-${option.value}`} className="text-sm cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Seasonal Guide */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <Label className="text-sm font-semibold">Best Season</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Most activities are available year-round. Water sports: Oct-Apr. Monsoon treks: Jun-Sep.
              </p>
            </div>
          </div>
        </aside>

        {/* Activities Grid */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No activities found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
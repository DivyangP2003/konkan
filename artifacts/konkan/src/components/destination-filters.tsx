import { useTranslation } from 'react-i18next';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import {
  regionOptions,
  typeOptions,
  difficultyOptions,
  activityOptions,
} from '../data/destinations';

export interface DestinationFilters {
  regions: string[];
  types: string[];
  difficulties: string[];
  activities: string[];
  featured: boolean;
  trending: boolean;
  hidden: boolean;
}

interface DestinationFiltersSidebarProps {
  filters: DestinationFilters;
  onChange: (filters: DestinationFilters) => void;
  onReset: () => void;
}

function FilterContent({ filters, onChange, onReset }: DestinationFiltersSidebarProps) {
  const { t } = useTranslation();

  const toggleArrayFilter = (key: keyof Pick<DestinationFilters, 'regions' | 'types' | 'difficulties' | 'activities'>, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const toggleBooleanFilter = (key: keyof Pick<DestinationFilters, 'featured' | 'trending' | 'hidden'>) => {
    onChange({ ...filters, [key]: !filters[key] });
  };

  return (
    <div className="space-y-6">
      {/* Quick Filters */}
      <div>
        <Label className="text-base font-semibold mb-3 block">{t('filter.quickFilters', 'Quick Filters')}</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featured}
              onCheckedChange={() => toggleBooleanFilter('featured')}
            />
            <label htmlFor="featured" className="text-sm cursor-pointer">
              {t('destinations.featured')}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trending"
              checked={filters.trending}
              onCheckedChange={() => toggleBooleanFilter('trending')}
            />
            <label htmlFor="trending" className="text-sm cursor-pointer">
              {t('destinations.trending')}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hidden"
              checked={filters.hidden}
              onCheckedChange={() => toggleBooleanFilter('hidden')}
            />
            <label htmlFor="hidden" className="text-sm cursor-pointer">
              {t('destinations.hidden')}
            </label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Region Filter */}
      <div>
        <Label className="text-base font-semibold mb-3 block">{t('filter.region')}</Label>
        <div className="space-y-2">
          {regionOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`region-${option.value}`}
                checked={filters.regions.includes(option.value)}
                onCheckedChange={() => toggleArrayFilter('regions', option.value)}
              />
              <label htmlFor={`region-${option.value}`} className="text-sm cursor-pointer">
                {t(`region.${option.value}`, option.label)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Type Filter */}
      <div>
        <Label className="text-base font-semibold mb-3 block">{t('filter.type')}</Label>
        <div className="space-y-2">
          {typeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${option.value}`}
                checked={filters.types.includes(option.value)}
                onCheckedChange={() => toggleArrayFilter('types', option.value)}
              />
              <label htmlFor={`type-${option.value}`} className="text-sm cursor-pointer">
                {t(`type.${option.value}`, option.label)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Difficulty Filter */}
      <div>
        <Label className="text-base font-semibold mb-3 block">{t('filter.difficulty')}</Label>
        <div className="space-y-2">
          {difficultyOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`difficulty-${option.value}`}
                checked={filters.difficulties.includes(option.value)}
                onCheckedChange={() => toggleArrayFilter('difficulties', option.value)}
              />
              <label htmlFor={`difficulty-${option.value}`} className="text-sm cursor-pointer">
                {t(`difficulty.${option.value}`, option.label)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Activities Filter */}
      <div>
        <Label className="text-base font-semibold mb-3 block">{t('filter.activities')}</Label>
        <ScrollArea className="h-48">
          <div className="space-y-2 pr-4">
            {activityOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`activity-${option.value}`}
                  checked={filters.activities.includes(option.value)}
                  onCheckedChange={() => toggleArrayFilter('activities', option.value)}
                />
                <label htmlFor={`activity-${option.value}`} className="text-sm cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      {/* Reset Button */}
      <Button onClick={onReset} variant="outline" className="w-full">
        <X className="w-4 h-4 mr-2" />
        {t('filter.reset')}
      </Button>
    </div>
  );
}

// Desktop Sidebar
export function DestinationFiltersSidebar(props: DestinationFiltersSidebarProps) {
  return (
    <aside className="hidden lg:block w-80 border-r border-border bg-card h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </h2>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <FilterContent {...props} />
        </ScrollArea>
      </div>
    </aside>
  );
}

// Mobile Sheet
export function DestinationFiltersMobile(props: DestinationFiltersSidebarProps) {
  const { t } = useTranslation();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          {t('destinations.filter')}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-6">
          <FilterContent {...props} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

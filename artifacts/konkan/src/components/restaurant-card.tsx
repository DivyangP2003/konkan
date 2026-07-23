import { useTranslation } from 'react-i18next';
import { MapPin, Star, Phone, Clock, UtensilsCrossed } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Restaurant } from '../data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const { t, i18n } = useTranslation();
  
  const displayName = i18n.language !== 'en' && restaurant.nameTranslations?.[i18n.language as 'kn' | 'mr' | 'hi']
    ? restaurant.nameTranslations[i18n.language as 'kn' | 'mr' | 'hi']
    : restaurant.name;

  const getPriceRangeLabel = (range: string) => {
    switch (range) {
      case 'budget': return '₹';
      case 'mid': return '₹₹';
      case 'expensive': return '₹₹₹';
      default: return '₹';
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.images[0]}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {restaurant.featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge variant="secondary" className="capitalize">
            {restaurant.cuisineType.replace('_', ' ')}
          </Badge>
        </div>

        {restaurant.averageRating && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-semibold">{restaurant.averageRating}</span>
            <span className="text-white/70 text-xs">({restaurant.reviewCount})</span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1 line-clamp-1">{displayName}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.destinationName}</span>
              <span>•</span>
              <span className="text-primary font-semibold">{getPriceRangeLabel(restaurant.priceRange)}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {restaurant.description}
        </p>
        
        <div className="mb-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <UtensilsCrossed className="w-3 h-3" />
            <span className="font-semibold">Must Try:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {restaurant.specialties.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{restaurant.specialties.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {restaurant.openingHours && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{Object.values(restaurant.openingHours)[0]}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3 border-t gap-2">
        {restaurant.contactPhone && (
          <Button size="sm" variant="outline" className="flex-1">
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
        )}
        <Button size="sm" className="flex-1" onClick={onClick}>
          View Menu
        </Button>
      </CardFooter>
    </Card>
  );
}
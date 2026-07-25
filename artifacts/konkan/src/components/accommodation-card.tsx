import { MapPin, Star, Wifi, Users, Dog, Phone } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { SaveButton } from './save-button';
import type { Accommodation } from '../data/accommodations';

interface AccommodationCardProps {
  accommodation: Accommodation;
  onClick?: () => void;
  onAuthRequired?: () => void;
}

export function AccommodationCard({ accommodation, onClick, onAuthRequired }: AccommodationCardProps) {
  const getPriceRangeLabel = (range: string) => {
    switch (range) {
      case 'budget': return '₹₹';
      case 'mid': return '₹₹₹';
      case 'luxury': return '₹₹₹₹';
      default: return '₹₹';
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="relative h-56 overflow-hidden">
        <img
          src={accommodation.images[0]}
          alt={accommodation.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {accommodation.featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge variant="secondary" className="capitalize">
            {accommodation.type.replace('_', ' ')}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 flex items-start gap-2">
          {accommodation.averageRating && (
            <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-sm font-semibold">{accommodation.averageRating}</span>
              <span className="text-white/70 text-xs">({accommodation.reviewCount})</span>
            </div>
          )}
          <SaveButton
            itemType="stay"
            itemId={accommodation.id}
            itemName={accommodation.name}
            itemImage={accommodation.images[0]}
            onAuthRequired={() => onAuthRequired?.()}
          />
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1 line-clamp-1">{accommodation.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{accommodation.destinationName}</span>
              <span>•</span>
              <span className="text-primary font-semibold">{getPriceRangeLabel(accommodation.priceRange)}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {accommodation.description}
        </p>

        {accommodation.priceMin && accommodation.priceMax && (
          <div className="text-sm font-semibold mb-3">
            ₹{accommodation.priceMin.toLocaleString()} - ₹{accommodation.priceMax.toLocaleString()} per night
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {accommodation.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {accommodation.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{accommodation.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {accommodation.amenities.includes('WiFi') && <Wifi className="w-3 h-3" />}
          {accommodation.amenities.includes('Family Friendly') && <Users className="w-3 h-3" />}
          {accommodation.amenities.includes('Pet Friendly') && <Dog className="w-3 h-3" />}
          {accommodation.contactPhone && <Phone className="w-3 h-3" />}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <Button size="sm" className="w-full" onClick={onClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

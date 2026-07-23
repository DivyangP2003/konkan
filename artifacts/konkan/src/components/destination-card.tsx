import { useTranslation } from 'react-i18next';
import { MapPin, Star, TrendingUp, Eye, Compass } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Destination } from '../data/destinations';

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
}

export function DestinationCard({ destination, onClick }: DestinationCardProps) {
  const { t, i18n } = useTranslation();
  
  const displayName = i18n.language !== 'en' && destination.nameTranslations?.[i18n.language as 'kn' | 'mr' | 'hi']
    ? destination.nameTranslations[i18n.language as 'kn' | 'mr' | 'hi']
    : destination.name;

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.images[0]}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {destination.featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600">
              <Star className="w-3 h-3 mr-1" />
              {t('destinations.featured')}
            </Badge>
          )}
          {destination.trending && (
            <Badge className="bg-green-500 hover:bg-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              {t('destinations.trending')}
            </Badge>
          )}
          {destination.hidden && (
            <Badge className="bg-purple-500 hover:bg-purple-600">
              <Eye className="w-3 h-3 mr-1" />
              {t('destinations.hidden')}
            </Badge>
          )}
        </div>

        {destination.averageRating && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-semibold">{destination.averageRating}</span>
            <span className="text-white/70 text-xs">({destination.reviewCount})</span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1 line-clamp-1">{displayName}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="capitalize">{t(`region.${destination.region}`)}</span>
              <span>•</span>
              <span className="capitalize">{t(`type.${destination.type}`)}</span>
            </div>
          </div>
          <Badge variant="outline" className="capitalize">
            {destination.difficulty && t(`difficulty.${destination.difficulty}`)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {destination.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {destination.highlights.slice(0, 2).map((highlight, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {highlight}
            </Badge>
          ))}
          {destination.highlights.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{destination.highlights.length - 2} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Compass className="w-4 h-4" />
          <span>{destination.distanceFromMumbai} km from Mumbai</span>
        </div>
        <Button size="sm" onClick={onClick}>
          {t('common.viewDetails')}
        </Button>
      </CardFooter>
    </Card>
  );
}

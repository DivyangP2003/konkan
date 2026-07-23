import { useTranslation } from 'react-i18next';
import { MapPin, Star, Clock, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Activity } from '../data/activities';

interface ActivityCardProps {
  activity: Activity;
  onClick?: () => void;
}

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const { t, i18n } = useTranslation();
  
  const displayName = i18n.language !== 'en' && activity.nameTranslations?.[i18n.language as 'kn' | 'mr' | 'hi']
    ? activity.nameTranslations[i18n.language as 'kn' | 'mr' | 'hi']
    : activity.name;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'difficult': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="relative h-56 overflow-hidden">
        <img
          src={activity.images[0]}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {activity.featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge variant="secondary" className="capitalize">
            {activity.category}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {activity.averageRating && (
            <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-sm font-semibold">{activity.averageRating}</span>
            </div>
          )}
          <div className={`${getDifficultyColor(activity.difficulty)} rounded-full px-3 py-1 text-white text-xs font-semibold`}>
            {activity.difficulty.toUpperCase()}
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1 line-clamp-1">{displayName}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{activity.destinationName}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{activity.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {activity.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          {activity.price && (
            <div className="text-lg font-bold text-primary">
              ₹{activity.price.toLocaleString()}
              <span className="text-xs text-muted-foreground font-normal"> per person</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {activity.familyFriendly && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Family Friendly</span>
            </div>
          )}
          {activity.bookingRequired && (
            <div className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>Booking Required</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div className="text-xs text-muted-foreground">
          Best: {activity.season.slice(0, 2).join(', ')}
          {activity.season.length > 2 && ` +${activity.season.length - 2}`}
        </div>
        <Button size="sm" onClick={onClick}>
          {t('common.viewDetails')}
        </Button>
      </CardFooter>
    </Card>
  );
}
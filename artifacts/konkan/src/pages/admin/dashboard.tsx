import { AdminLayout } from '../../components/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { MapPin, Hotel, UtensilsCrossed, Activity, Users, Star } from 'lucide-react';
import { sampleDestinations } from '../../data/destinations';
import { sampleAccommodations } from '../../data/accommodations';
import { sampleRestaurants } from '../../data/restaurants';
import { sampleActivities } from '../../data/activities';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Destinations',
      value: sampleDestinations.length,
      icon: MapPin,
      color: 'text-blue-500',
    },
    {
      title: 'Accommodations',
      value: sampleAccommodations.length,
      icon: Hotel,
      color: 'text-green-500',
    },
    {
      title: 'Restaurants',
      value: sampleRestaurants.length,
      icon: UtensilsCrossed,
      color: 'text-orange-500',
    },
    {
      title: 'Activities',
      value: sampleActivities.length,
      icon: Activity,
      color: 'text-purple-500',
    },
  ];

  const recentReviews = [
    { user: 'John Doe', rating: 5, comment: 'Amazing experience!', entity: 'Tarkarli Beach' },
    { user: 'Jane Smith', rating: 4, comment: 'Great food', entity: 'Patil Khanaval' },
    { user: 'Bob Wilson', rating: 5, comment: 'Highly recommended', entity: 'Mango Beach House' },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your travel content</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm">{review.user}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{review.entity}</p>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-muted transition-colors">
                  <div className="font-semibold mb-1">Add New Destination</div>
                  <div className="text-xs text-muted-foreground">Create a new travel destination</div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-muted transition-colors">
                  <div className="font-semibold mb-1">Add Accommodation</div>
                  <div className="text-xs text-muted-foreground">Add a new place to stay</div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-muted transition-colors">
                  <div className="font-semibold mb-1">Add Restaurant</div>
                  <div className="text-xs text-muted-foreground">Add a new dining option</div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-muted transition-colors">
                  <div className="font-semibold mb-1">Add Activity</div>
                  <div className="text-xs text-muted-foreground">Create a new experience</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Status */}
        <Card>
          <CardHeader>
            <CardTitle>Content Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Featured Content</span>
                  <span className="text-sm text-muted-foreground">
                    {sampleDestinations.filter(d => d.featured).length + 
                     sampleAccommodations.filter(a => a.featured).length +
                     sampleRestaurants.filter(r => r.featured).length +
                     sampleActivities.filter(a => a.featured).length} items
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '60%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Translations Complete</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">With Reviews</span>
                  <span className="text-sm text-muted-foreground">
                    {sampleDestinations.filter(d => d.reviewCount && d.reviewCount > 0).length +
                     sampleAccommodations.filter(a => a.reviewCount && a.reviewCount > 0).length +
                     sampleRestaurants.filter(r => r.reviewCount && r.reviewCount > 0).length +
                     sampleActivities.filter(a => a.reviewCount && a.reviewCount > 0).length} items
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
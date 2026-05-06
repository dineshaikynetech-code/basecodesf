import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Plus, Star, MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Review {
  id: number;
  name: string;
  avatar: string;
  reviewCount: number;
  rating: number;
  date: string;
  badge?: string;
  text: string;
  photos?: number;
}

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Anne-Sophie D",
    avatar: "https://i.pravatar.cc/48?u=anne",
    reviewCount: 5,
    rating: 5,
    date: "3 weeks ago",
    badge: "NEW",
    text: "The best facial I've ever had in Bangalore. Very relaxing and high quality products. does the treatments has the fingers of a fairy!",
  },
  {
    id: 2,
    name: "Farzana G",
    avatar: "https://i.pravatar.cc/48?u=farzana",
    reviewCount: 7,
    rating: 5,
    date: "2 months ago",
    text: "The service is very good, their products and consultation about the skin is so helpful. ...More",
  },
  {
    id: 3,
    name: "Gabriel Hema",
    avatar: "https://i.pravatar.cc/48?u=gabriel",
    reviewCount: 6,
    rating: 5,
    date: "2 months ago",
    text: "The facial service was really good. Doctor explained the process well. Highly recommended",
  },
  {
    id: 4,
    name: "Christopher Benny",
    avatar: "https://i.pravatar.cc/48?u=christopher",
    reviewCount: 7,
    rating: 5,
    date: "4 months ago",
    text: "The best facial I've ever had in Bangalore. Very relaxing and high quality products. does the treatments",
    photos: 2,
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "fill-[#FBBF24] text-[#FBBF24]" : "text-muted-foreground/30"
        )}
      />
    ))}
  </div>
);

const ReviewsContent: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar - Stats */}
      <div className="w-full lg:w-[340px] flex-shrink-0 space-y-4">
        {/* Top Action Cards */}
        <Card className="border border-border shadow-sm rounded-md">
          <CardHeader className="flex items-center justify-between">
            <div className="text-base font-semibold">Overall Rating</div>

            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
        </Card>

        <Card className="border border-border shadow-sm rounded-md">
          <CardHeader className="flex items-center justify-between">
            <div className="text-base font-semibold">Most Rated</div>

            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
        </Card>



        {/* Stat Cards */}
        <div className="space-y-4 pt-2">
          <Card className="border border-border rounded-md shadow-sm p-6">
            <div className="flex flex-col justify-center items-center">

              <div className="text-5xl font-bold text-foreground">24</div>
              <div className="text-sm text-muted-foreground mt-1">Total Reviews</div>

              <Button variant="outline" size="sm" className="rounded-xs mt-1">
                View
              </Button>
            </div>
          </Card>

          <Card className="border border-border rounded-md shadow-sm p-6">
            <div className="flex flex-col justify-center items-center">

              <div className="text-5xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground mt-1">UnReplied Reviews</div>

              <Button variant="outline" size="sm" className="rounded-xs mt-1">
                View
              </Button>
            </div>
          </Card>

          <Card className="border border-border rounded-md shadow-sm p-6">
            <div className="flex flex-col justify-center items-center">

              <div className="text-5xl font-bold text-foreground">05</div>
              <div className="text-sm text-muted-foreground mt-1">UnReplied negative Reviews</div>

              <Button variant="outline" size="sm" className="rounded-xs mt-1">
                View
              </Button>
            </div>
          </Card>

        </div>
      </div>

      {/* Right Side - Reviews List */}
      <div className="flex-1 min-w-0">
        <Card className="border-border shadow-sm overflow-hidden">
          <CardHeader className="border-b py-5 px-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl">
                <MessageSquare className="w-5 h-5" />
                Customer Reviews
              </CardTitle>
              <Button variant="outline" size="sm" className="rounded-3xl gap-1.5">
                Sort by Newest <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 divide-y divide-border">
            {mockReviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-muted/50 transition-colors">
                <div className="flex gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full ring-1 ring-border flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="flex justify-between gap-5 font-semibold">{review.name} {review.badge && (
                          <div className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full">
                            {review.badge}
                          </div>
                        )}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                          {review.reviewCount} reviews • {review.date}
                          {review.photos && (
                            <span className="text-[10px] bg-muted px-1.5 rounded">• {review.photos} photos</span>
                          )}
                        </div>
                        
                      </div>


                    </div>

                    <StarRating rating={review.rating} />

                    <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
                      {review.text}
                    </p>

                    <div className="flex justify-end mt-4">
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 rounded-3xl px-5">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewsContent;
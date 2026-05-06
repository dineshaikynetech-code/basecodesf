import {
  Home,
  MonitorPlay,
} from 'lucide-react';

import type { NavModule } from './appConfig';

export const BASE_NAVIGATION: NavModule[] = [

  {
    id: 'location-hub',
    name: 'Location Hub',
    icon: Home,
    children: [
      { id: 'listing-dashboard', name: 'Listing Dashboard', path: '/location/listing-dashboard', showInNav: true },
      {
        id: 'add-business',
        name: 'Add Business',
        path: '/location/listing-dashboard/add-business',
        showInNav: false           // ← This will be hidden from secondary sidebar
      },
      { id: 'listings', name: 'Listings', path: '/location/listings', showInNav: true },
      { id: 'business-info', name: 'Business Info', path: '/location/business-info', showInNav: true },
      { id: 'reviews', name: 'Reviews', path: '/location/reviews', showInNav: true },
      { id: 'reputation', name: 'Reputation', path: '/location/reputation', showInNav: true },
      { id: 'competitors', name: 'Competitors', path: '/location/competitors', showInNav: true },
    ],
  },
  {
    id: 'smm',
    name: 'SMM',
    icon: MonitorPlay,
    children: [
      { id: 'insights', name: 'Insights', path: '/smm/insights', showInNav: true },
      { id: 'connect', name: 'Connect', path: '/smm/connect', showInNav: true },
      { id: 'creative', name: 'Creative', path: '/smm/creative', showInNav: true },
      { id: 'content', name: 'Content', path: '/smm/content', showInNav: true },
      { id: 'engagement', name: 'Engagement', path: '/smm/engagement', showInNav: true },
      { id: 'smm-analytics', name: 'Analytics', path: '/smm/analytics', showInNav: true },
    ],
  },
  // add more modules here 
];  
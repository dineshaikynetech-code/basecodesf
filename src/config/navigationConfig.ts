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
      { id: 'listing-dashboard', name: 'Listing Dashboard', path: '/location/listing-dashboard' },
      { id: 'listings', name: 'Listings', path: '/location/listings' },
      { id: 'business-info', name: 'Business Info', path: '/location/business-info' },
      { id: 'reviews', name: 'Reviews', path: '/location/reviews' },
      { id: 'reputation', name: 'Reputation', path: '/location/reputation' },
      { id: 'competitors', name: 'Competitors', path: '/location/competitors' },
    ],
  },
  {
    id: 'smm',
    name: 'SMM',
    icon: MonitorPlay,
    children: [
      { id: 'insights', name: 'Insights', path: '/smm/insights' },
      { id: 'connect', name: 'Connect', path: '/smm/connect' },
      { id: 'creative', name: 'Creative', path: '/smm/creative' },
      { id: 'content', name: 'Content', path: '/smm/content' },
      { id: 'engagement', name: 'Engagement', path: '/smm/engagement' },
      { id: 'smm-analytics', name: 'Analytics', path: '/smm/analytics' },
    ],
  },
  // add more modules here 
];  
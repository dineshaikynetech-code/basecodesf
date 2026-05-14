import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';

import type { NavModule } from '@/config/appConfig';
import { BASE_NAVIGATION } from '@/config/navigationConfig';
import { DashboardPageSkeleton } from '@/features/dashboard/components/DashBoardPageSkeleton';
import { SmmPageSkeleton } from '@/features/smm/components/SmmPageSkeleton';
import { BarChart3, Info, MessageSquare, ShieldCheck, Users } from 'lucide-react';

type PageLoader = () => Promise<{ default: ComponentType }>;

const pageComponentMap: Record<string, PageLoader> = {
  // Location Hub children
  'listing-dashboard': () => import('@/features/local-business/pages/ListingDashboard'),
  listings: () => import('@/features/local-business/pages/BusinessInfoContent'),
  'business-info': () => import('@/features/local-business/pages/BusinessInfoContent'),
  analytics: () => import('@/features/local-business/pages/AnalyticsContent'),
  reviews: () => import('@/features/local-business/pages/ReviewContent'),
  reputation: () => import('@/features/local-business/pages/ReputationContent'),
  competitors: () => import('@/features/dashboard/pages/Competitors'),

  

  // SMM children
  insights: () => import('@/features/smm/pages/Insights'),
  connect: () => import('@/features/smm/pages/Connect'),
  creative: () => import('@/features/smm/pages/Creative'),
  content: () => import('@/features/smm/pages/Content'),
  engagement: () => import('@/features/smm/pages/Engagement'),
  'smm-analytics': () => import('@/features/smm/pages/Analystics'),

  'connected-accounts': () => import('@/features/integration/pages/ConnectedAccountsPage'),
  connections: () => import('@/features/integration/pages/ConnectionsPage'),

  // Standalone module pages
  'sample-hub': () => import('@/features/sample-hub/SampleHubPage'),
};

const getRouteFallback = (routeId: string) => {
  if (
    [
      'listing-dashboard',
      'listings',
      'business-info',
      'analytics',
      'reviews',
      'reputation',
      'competitors',
    ].includes(routeId)
  ) {
    return <DashboardPageSkeleton />;
  }

  if (
    ['insights', 'connect', 'creative', 'content', 'engagement', 'smm-analytics'].includes(
      routeId,
    )
  ) {
    return <SmmPageSkeleton />;
  }

  return <div className="p-6 text-sm text-muted-foreground">Loading page...</div>;
};

const createRouteElement = (routeId: string) => {
  const loadPage = pageComponentMap[routeId];

  if (!loadPage) {
    return null;
  }

  const Component = lazy(loadPage);

  return (
    <Suspense fallback={getRouteFallback(routeId)}>
      <Component />
    </Suspense>
  );
};

export const generateRoutes = () => {
  const routes: Array<{ path: string; element: ReactNode }> = [];

  BASE_NAVIGATION.forEach((module: NavModule) => {
    const children = module.children ?? [];

    if (children.length > 0) {
      children.forEach((child) => {
        if (!child.path) return;

        const element = createRouteElement(child.id);

        if (element) {
          routes.push({
            path: child.path,
            element,
          });
        }
        
        else {
          console.warn(`No component found for route: ${child.id} → ${child.path}`);
        }
      });

      return;
    }

    if (!module.path) {
      return;
    }

    const element = createRouteElement(module.id);

    if (element) {
      routes.push({
        path: module.path,
        element,
      });
    } else {
      console.warn(`No component found for module route: ${module.id} → ${module.path}`);
    }
  });

  return routes;
};

export const LOCATION_TABS = [
  { id: "business-info", label: "Business info", icon: <Info className="w-4 h-4" />, path: "/location/business-info" },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" />, path: "/location/analytics" },
  { id: "reviews", label: "Reviews", icon: <MessageSquare className="w-4 h-4" />, path: "/location/reviews" },
  { id: "reputation", label: "Reputation", icon: <ShieldCheck className="w-4 h-4" />, path: "/location/reputation" },
  { id: "competitors", label: "Competitors", icon: <Users className="w-4 h-4" />, path: "/location/competitors" },
];

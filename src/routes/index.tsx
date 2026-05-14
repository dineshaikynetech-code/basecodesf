/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { generateRoutes } from '@/config/routeConfig';
import { DashboardPageSkeleton } from '@/features/dashboard/components/DashBoardPageSkeleton';
import AppLayout from '@/shared/layouts/AppLayout';
import ErrorElement from '@/shared/placholders/ErrorElement';
import { useAuthStore } from '@/shared/store/authStore';
import { useOnboardingStore } from '@/shared/store/onboardingStore';
import PricingPlansPage from '@/features/settings/pages/PricingPlanPage';
import AddBusiness from '@/features/local-business/pages/AddBusiness';

const LoginPage = lazy(() => import('@/features/auth/pages/Login'));
const RegisterPage = lazy(() => import('@/features/auth/pages/SignUp'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPassword'));
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'));
const OnboardingPage = lazy(() => import('@/features/onboarding/pages/OnBoarding'));

// === Lazy-loaded Settings Sub Pages ===
const PersonalInformationPage = lazy(() => import('@/features/settings/pages/PersonalInformationPage'));
const WorkspaceSettingsPage = lazy(() => import('@/features/settings/pages/WorkspaceSettingsPage'));
const SubscriptionPage = lazy(() => import('@/features/settings/pages/SubscriptionPage'));
const AiBrandAgentPage = lazy(() => import('@/features/settings/pages/AiBrandAgentPage'));
const SecurityPage = lazy(() => import('@/features/settings/pages/SecurityPage'));
const TeamMembersPage = lazy(() => import('@/features/settings/pages/TeamMembersPage'));
const ManageRolesPage = lazy(() => import('@/features/settings/pages/ManageRolesPage'));
const SocialAccountsPage = lazy(() => import('@/features/integration/pages/ConnectedAccountsPage'));
const ThemeSettingsPage = lazy(() => import('@/features/settings/pages/ThemeSettingsPage'));
const PublishingPage = lazy(() => import('@/features/settings/pages/PublishingPage'));

const RouteLoader = () => (
  <div className="flex min-h-[40vh] items-center justify-center px-6 text-sm text-muted-foreground">
    Loading page...
  </div>
);

const withSuspense = (element: ReactNode, fallback: ReactNode = <RouteLoader />) => (
  <Suspense fallback={fallback}>{element}</Suspense>
);

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const { isOnboarded } = useOnboardingStore();
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
};

const OnboardingRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const { isOnboarded } = useOnboardingStore();
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  if (isOnboarded) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const { isOnboarded } = useOnboardingStore();

  if (isAuthenticated) {
    return <Navigate to={isOnboarded ? "/" : "/onboarding"} replace />;
  }

  return <>{children}</>;
};

const childRoutes = generateRoutes();

export const router = createBrowserRouter([
  {
    path: '/auth',
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'login',
        element: withSuspense(
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        ),
      },
      {
        path: 'register',
        element: withSuspense(
          <AuthRoute>
            <RegisterPage />
          </AuthRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: withSuspense(
          <AuthRoute>
            <ForgotPasswordPage />
          </AuthRoute>
        ),
      },
    ],
  },
  {
    path: '/onboarding',
    element: withSuspense(
      <OnboardingRoute>
        <OnboardingPage />
      </OnboardingRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Navigate to="/location/listing-dashboard" replace /> },
      ...childRoutes,
      {
        path: 'settings',
        children: [
          {
            index: true,
            element: withSuspense(<SettingsPage />, <DashboardPageSkeleton />),
          },
          {
            path: 'personal-information',
            element: withSuspense(<PersonalInformationPage />, <DashboardPageSkeleton />),
          },
          {
            path: 'workspace',
            element: withSuspense(<WorkspaceSettingsPage />, <DashboardPageSkeleton />),
          },
          {
            path: 'subscription',
            element: withSuspense(<SubscriptionPage />, <DashboardPageSkeleton />),
            children: [
              { path: 'pricing', element: withSuspense(<PricingPlansPage />, <DashboardPageSkeleton />) },
            ]
          },
          {
            path: 'ai-brand-agent',
            element: withSuspense(<AiBrandAgentPage />, <DashboardPageSkeleton />),
          },
          {
            path: 'security',
            element: withSuspense(<SecurityPage />, <DashboardPageSkeleton />),
          },
          {
            path: 'team-members',
            element: withSuspense(<TeamMembersPage />, <DashboardPageSkeleton />),
          },
          {
            path: 'manage-roles',
            element: withSuspense(<ManageRolesPage />, <DashboardPageSkeleton />),
          },
          {
            path: 'theme',
            element: withSuspense(<ThemeSettingsPage />, <DashboardPageSkeleton />),
          },
          {
            path: 'publishing',
            element: withSuspense(<PublishingPage />, <DashboardPageSkeleton />),
          },
        ],
      },
      {
        path: '/location/listing-dashboard/add-business',
        element: withSuspense(<AddBusiness/>, <DashboardPageSkeleton />),
      },
      { path: '*', element: <Navigate to="/location/listing-dashboard" replace /> },
    ],
  }
]);

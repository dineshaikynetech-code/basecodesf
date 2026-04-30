/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { generateRoutes } from '@/config/routeConfig';
import { DashboardPageSkeleton } from '@/features/dashboard/components/DashBoardPageSkeleton';
import AppLayout from '@/shared/layouts/AppLayout';
import ErrorElement from '@/shared/placholders/ErrorElement';
import { useAuthStore } from '@/shared/store/authStore';
import { useOnboardingStore } from '@/shared/store/onboardingStore';

const LoginPage = lazy(() => import('@/features/auth/pages/Login'));
const RegisterPage = lazy(() => import('@/features/auth/pages/SignUp'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPassword'));
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage'));
const OnboardingPage = lazy(() => import('@/features/onboarding/pages/OnBoarding'));

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
        element: withSuspense(<SettingsPage />, <DashboardPageSkeleton />),
      },
      { path: '*', element: <Navigate to="/location/listing-dashboard" replace /> },
    ],
  },
]);

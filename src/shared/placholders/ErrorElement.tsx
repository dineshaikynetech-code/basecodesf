import { AlertTriangle } from 'lucide-react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong';

  const description = isRouteErrorResponse(error)
    ? error.data?.message || 'The page you are looking for could not be loaded.'
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred while loading this page.';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Go back
        </Button>
        <Button type="button" onClick={() => navigate('/')}>
          Go to home
        </Button>
      </div>
    </div>
  );
};

export default ErrorElement;

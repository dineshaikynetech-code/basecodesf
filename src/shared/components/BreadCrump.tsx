// src/shared/components/Breadcrumb.tsx
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import type { NavModule } from '@/config/appConfig';
import { BASE_NAVIGATION } from '@/config/navigationConfig';
import { cn } from '@/shared/lib/utils';

const routeLabelMap: Record<string, string> = {
  'listing-dashboard': 'Listing Dashboard',
  'business-info': 'Business Info',
  'smm-analytics': 'Analytics',
};

function getSegmentLabel(segment: string): string {
  return (
    routeLabelMap[segment] ||
    segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}

function matchesPath(targetPath: string | undefined, currentPath: string): boolean {
  if (!targetPath) return false;
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}

function getModuleTarget(module: NavModule | undefined): string {
  if (!module) return '/';
  return module.children?.[0]?.path || module.path || '/';
}

function findCurrentModule(pathname: string): NavModule | undefined {
  return BASE_NAVIGATION.find(
    (module) =>
      matchesPath(module.path, pathname) ||
      module.children?.some((child) => matchesPath(child.path, pathname))
  );
}

function findCurrentChild(module: NavModule | undefined, pathname: string): NavModule | undefined {
  return module?.children?.find((child) => matchesPath(child.path, pathname));
}

export default function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  const currentModule = findCurrentModule(location.pathname);
  const currentChild = findCurrentChild(currentModule, location.pathname);
  const moduleTarget = getModuleTarget(currentModule);

  if (pathnames.length === 0) return null;

  if (currentModule) {
    return (
      <nav className="flex items-center text-caption text-muted-foreground">
        <Link to={moduleTarget} className="hover:text-foreground transition-colors">
          Home
        </Link>

        <span className="flex items-center">
          <ChevronRight className="mx-2 w-3 h-3 text-muted-foreground" />
          <Link
            to={moduleTarget}
            className={cn(
              "hover:text-foreground transition-colors",
              "hover:underline underline-offset-2"
            )}
          >
            {currentModule.name}
          </Link>
        </span>

        {currentChild && (
          <span className="flex items-center">
            <ChevronRight className="mx-2 w-3 h-3 text-muted-foreground" />
            <Link
              to={currentChild.path || location.pathname}
              className={cn(
                "font-medium text-foreground transition-colors",
                "hover:underline underline-offset-2"
              )}
            >
              {currentChild.name}
            </Link>
          </span>
        )}
      </nav>
    );
  }

  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      <Link to="/" className="hover:text-foreground transition-colors">
        Home
      </Link>

      {pathnames.map((segment, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = getSegmentLabel(segment);

        return (
          <span key={to} className="flex items-center">
            <ChevronRight className="mx-2 w-3 h-3 text-muted-foreground" />
            <Link
              to={to}
              className={cn(
                "hover:text-foreground transition-colors",
                "hover:underline underline-offset-2",
                index === pathnames.length - 1 && "font-medium text-foreground"
              )}
            >
              {label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

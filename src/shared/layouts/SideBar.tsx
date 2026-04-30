import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import type { NavModule } from '@/config/appConfig';
import { useConfig } from '@/config/configProvider';
import { ANIMATION, getDuration } from '@/design/animation';
import { Button } from '@/shared/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';
import { useUIStore } from '@/shared/store/uiStore';
import { ChevronsRight } from 'lucide-react';
interface SecondaryPanelItem {
  id: string;
  name: string;
  path: string;
}

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { sidebarCollapsed} = useUIStore();
  const location = useLocation();
  const { config } = useConfig();

  return (
    <TooltipProvider delayDuration={ANIMATION.tooltipDelay}>
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 256 }}
        transition={{
          duration: sidebarCollapsed ? getDuration('close') : getDuration('open'),
          ease: ANIMATION.easing
        }}
        className={cn("h-screen border-r border-border bg-card flex flex-col overflow-hidden relative", className)}
      >
        {/* Header - Unchanged */}
        <div className="h-14 border-b border-border flex items-center px-4 gap-3">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-2xl">S</span>
          </div>

          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: getDuration('open') * 0.8, ease: ANIMATION.easing }}
                className="font-semibold text-lg tracking-tight"
              >
                Storefries
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation - Only top-level from config */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto relative">
         
          {config.navigationModules.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              collapsed={sidebarCollapsed}
              currentPath={location.pathname}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border text-xs text-muted-foreground text-center">
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Storefries Social • v0.1
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}

function NavLink({
  item,
  collapsed,
  currentPath,
}: {
  item: NavModule;
  collapsed: boolean;
  currentPath: string;
}) {
  const navigate = useNavigate();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipEnabled, setTooltipEnabled] = useState(collapsed);
  const { openSecondaryPanel, closeSecondaryPanel } = useUIStore();
  useEffect(() => {
    setIsTooltipOpen(false);
    setTooltipEnabled(false);

    if (!collapsed) {
      return;
    }

    const timeout = window.setTimeout(
      () => setTooltipEnabled(true),
      getDuration('close') * 1000 + ANIMATION.tooltipDelay,
    );

    return () => window.clearTimeout(timeout);
  }, [collapsed]);

  const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');

  const anyChildActive = item.children?.some(
    (child: NavModule) => currentPath === child.path || currentPath.startsWith(`${child.path}/`),
  );

  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      const firstChildPath = item.children?.[0]?.path;
      const targetPath = firstChildPath || item.path;
      
      if (targetPath) {
        navigate(targetPath);
      }

      openSecondaryPanel({
        title: item.name,
        items: item.children!.map((child: any) => ({
          id: child.id,
          name: child.name,
          path: child.path || '#',
        })),
      });

      return;
    }
    closeSecondaryPanel();
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <Tooltip
      open={collapsed && tooltipEnabled ? isTooltipOpen : false}
      onOpenChange={(open) => {
        if (!collapsed || !tooltipEnabled) {
          setIsTooltipOpen(false);
          return;
        }

        setIsTooltipOpen(open);
      }}
    >
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={!hasChildren && isActive ? "default" : "ghost"}
          className={cn(
            "nav-link w-full h-11 gap-3 font-medium transition-all justify-start px-3",
            collapsed && "pl-4",
            (isActive || anyChildActive) && "nav-link-active"
          )}
          onClick={handleClick}
          aria-current={!hasChildren && isActive ? "page" : undefined}
        >
          <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", (isActive || anyChildActive) && "text-inherit")} />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: ANIMATION.sidebar.open * 0.85, ease: ANIMATION.easing }}
                className="truncate ml-3 text-caption"
              >
                {item.name}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </TooltipTrigger>

      {collapsed && (
        <TooltipContent side="right" className="font-medium">
          {item.name}
        </TooltipContent>
      )}
    </Tooltip>
  );
}

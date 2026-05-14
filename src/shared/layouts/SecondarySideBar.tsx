import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { useUIStore } from '@/shared/store/uiStore';
import { useMemo } from 'react';

interface SecondarySidebarItem {
  id: string;
  name: string;
  path: string;
  showInNav?: boolean;
}

interface SecondarySideBarProps {
  isOpen: boolean;
  title: string;
  items: SecondarySidebarItem[];
}

export function SecondarySideBar({ isOpen, title, items }: SecondarySideBarProps) {
  const location = useLocation();
const { sidebarCollapsed, closeSecondaryPanel,activeModuleTab } = useUIStore();
  const sidebarWidth = sidebarCollapsed ? 72 : 256;

  // Merge parent items + active module tabs
  const allItems = useMemo(() => {
    const parentItems = items || [];
    const moduleTabs = activeModuleTab?.tabs || [];

    // Remove any duplicate items (by id)
    const itemMap = new Map();

    // Add parent items first (Listing Dashboard, etc.)
    parentItems.forEach(item => itemMap.set(item.id, item));

    // Add/override with module tabs
    moduleTabs.forEach(tab => {
      itemMap.set(tab.id, {
        id: tab.id,
        name: tab.label,
        path: tab.path,
      });
    });

    return Array.from(itemMap.values());
  }, [items, activeModuleTab]);

  const currentModuleTitle = activeModuleTab ? activeModuleTab.moduleKey.toUpperCase().replace('-', ' ') : title;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1, left: sidebarWidth }}
          exit={{ x: 130, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 30 }}
          className={cn(
            'fixed top-0 h-full w-64 z-40 flex flex-col overflow-hidden',
            'bg-card/70 backdrop-blur-md backdrop-saturate-150',
            'border-r border-white/10 shadow-2xl',
          )}
        >
          {/* Header */}
          <div className="h-14 border-b border-white/10 flex items-center px-4 justify-between bg-white/5">
            <div className="font-bold text-muted-foreground text-xs uppercase tracking-widest opacity-80">
              {currentModuleTitle}
            </div>
            <Button variant="ghost" size="icon" onClick={closeSecondaryPanel} className="h-8 w-8 hover:bg-white/10">
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
            {allItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={closeSecondaryPanel}
                  className={cn(
                    "flex items-center w-full h-10 px-4 text-[12px] font-medium rounded-lg",
                    "transition-all duration-300 ease-out transform-gpu",
                    "hover:scale-[1.04] hover:shadow-xl hover:bg-white/10",
                    "active:scale-[0.98]", 
                    
                    isActive 
                      ? "text-primary bg-primary/15 shadow-lg border border-primary/30 scale-[1.02]" 
                      : "text-muted-foreground hover:text-foreground border border-transparent hover:border-white/20"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

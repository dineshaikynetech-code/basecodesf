// src/shared/hocs/withModuleTabs.tsx
import React, { useEffect, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs";
import { useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '@/shared/store/uiStore';
import { cn } from '@/shared/lib/utils';

export interface ModuleTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface WithModuleTabsProps<P = {}> {
  WrappedComponent: React.ComponentType<P>;
  tabs: ModuleTab[];
  moduleKey: string;           // Unique identifier e.g. "location-hub"
  defaultTab?: string;
  secondaryTitle?: string;
}

export function withModuleTabs<P extends object>({
  WrappedComponent,
  tabs,
  moduleKey,
  defaultTab,
  secondaryTitle = "MODULE",
}: WithModuleTabsProps<P>) {
  const defaultTabId = defaultTab || tabs[0]?.id;

  return function ModuleTabsWrapper(props: P) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setModuleTabs, setActiveModuleTab, activeModuleTab } = useUIStore();

    const currentTabId = useMemo(() => {
      const path = location.pathname;
      const matched = tabs.find(tab => path.includes(tab.id) || path.endsWith(tab.id));
      return matched?.id || defaultTabId;
    }, [location.pathname, tabs, defaultTabId]);

    // Sync Module Tabs Context (Does NOT overwrite secondaryPanel)
    useEffect(() => {
      setModuleTabs({
        moduleKey,
        activeTabId: currentTabId,
        tabs,
      });
    }, [moduleKey, currentTabId, tabs, setModuleTabs]);

    const handleTabChange = (value: string) => {
      setActiveModuleTab(value);
      const tab = tabs.find(t => t.id === value);
      if (tab) navigate(tab.path);
    };

    return (
      <div className="w-full min-h-screen bg-[var(--background)] p-4 md:p-6 space-y-6">
        <Tabs value={currentTabId} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full justify-start h-14 bg-card border-b border-[var(--border)] rounded-none px-0 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "flex items-center gap-2 px-6 h-full border-b-2 border-transparent",
                  "data-[state=active]:border-[var(--primary)] data-[state=active]:bg-[var(--primary)]/5",
                  "data-[state=active]:text-[var(--primary)] rounded-none transition-all"
                )}
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent 
              key={tab.id} 
              value={tab.id} 
              className="pt-6 focus-visible:outline-none"
            >
              {tab.id === currentTabId && <WrappedComponent {...props} />}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  };
}
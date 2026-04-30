import { useEffect, useRef, useState } from 'react';
import { Languages, LogOut, Settings } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppSelect } from '../components/AppSelect';
import BreadCrumb from '../components/BreadCrump';
import { MenuToggle } from './MenuToggle';
import { SecondarySideBar } from './SecondarySideBar';
import { Sidebar } from './SideBar';
import { useUIStore } from '@/shared/store/uiStore';
import { useConfig } from '@/config/configProvider';

import { ChevronsRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '../lib/utils';
import { useAuthStore } from '../store/authStore';

export default function AppLayout() {
  const { secondaryPanel, closeSecondaryPanel, isSecondaryOpen, sidebarCollapsed } = useUIStore();
  const { config } = useConfig();
  const { logout } = useAuthStore();

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const hasRedirected = useRef(false);
  const { reopenSecondaryPanel } = useUIStore();

  useEffect(() => {
    if (hasRedirected.current) return;
    if (location.pathname !== '/') return;

    const firstModuleWithChildren = config.navigationModules.find(
      (m) => m.children && m.children.length > 0
    );

    const firstChildPath = firstModuleWithChildren?.children?.[0]?.path;
    if (firstChildPath) {
      hasRedirected.current = true;
      navigate(firstChildPath, { replace: true });
    }

  }, [config.navigationModules, secondaryPanel]);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">

      {/* Main Sidebar */}
      <Sidebar />
      {secondaryPanel && !isSecondaryOpen && (
        <div className={cn(
          "absolute top-14 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          sidebarCollapsed ? "left-[64px]" : "left-[248px]"
        )}>
          <Button
            variant="secondary"
            size="icon"
            onClick={reopenSecondaryPanel}
            className="h-8 w-8 rounded-full shadow-lg border"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      {/* Secondary Sidebar (appears right next to main sidebar) */}
      <SecondarySideBar
        isOpen={isSecondaryOpen}
        title={secondaryPanel?.title || ''}
        items={secondaryPanel?.items || []}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MenuToggle />
          </div>
          <div className="flex-1 px-8">
            <BreadCrumb />
          </div>
          <div className="flex items-center gap-4">
            <AppSelect
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
              options={[
                { value: 'en', label: 'English' },
                { value: 'ta', label: 'Tamil - தமிழ்', disabled: true },
                { value: 'hi', label: 'Hindi - हिन्दी', disabled: true },
                { value: 'te', label: 'Telugu - తెలుగు', disabled: true },
                { value: 'ml', label: 'Malayalam - മലയാളം', disabled: true },
                { value: 'kn', label: 'Kannada - ಕನ್ನಡ', disabled: true },
              ]}
              icon={
                <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
              }
            />
            <Link to="/settings" onClick={closeSecondaryPanel}>
              <span className="hover:text-primary">
                <Settings size={20} />
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-destructive transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
            <div className="w-8 h-8 bg-muted rounded-full" />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  
  );
}

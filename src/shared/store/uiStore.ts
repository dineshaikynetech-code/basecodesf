import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SecondaryPanel {
  title: string;
  items: Array<{ id: string; name: string; path: string }>;
}

interface ModuleTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path: string;
}

interface TabContext {
  moduleKey: string;
  activeTabId: string;
  tabs: ModuleTab[];
}

interface UIState {
  sidebarCollapsed: boolean;
  secondaryPanel: SecondaryPanel | null;
  isSecondaryOpen: boolean;

  // for tabs ( secondary sidebar context )
  activeModuleTab: TabContext | null;

  toggleSidebar: () => void;

  openSecondaryPanel: (panel: SecondaryPanel) => void;
  closeSecondaryPanel: () => void;
  // toggleSecondaryPanel: () => void;
  reopenSecondaryPanel: () => void;
  setModuleTabs: (context: TabContext) => void;
  setActiveModuleTab: (tabId: string) => void;
  clearModuleTabs: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      secondaryPanel: null,
      isSecondaryOpen: false,
      activeModuleTab: null,

      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),


      openSecondaryPanel: (panel) => set({ secondaryPanel: panel, isSecondaryOpen: true }),

      closeSecondaryPanel: () => set({ isSecondaryOpen: false }),

      reopenSecondaryPanel: () => {
        const panel = get().secondaryPanel;

        if (panel) {
          set({
            isSecondaryOpen: true
          });
        }
      },

      // toggleSecondaryPanel: () => {
      //   const { isSecondaryOpen } = get();
      //   set({ isSecondaryOpen: !isSecondaryOpen });
      // },
      setModuleTabs: (context) => set({ activeModuleTab: context }),
      setActiveModuleTab: (tabId) =>
        set((state) => ({
          activeModuleTab: state.activeModuleTab
            ? { ...state.activeModuleTab, activeTabId: tabId }
            : null
        })),
      clearModuleTabs: () => set({ activeModuleTab: null }),

    }),
    {
      name: 'ui-storage',

    }
  )
);
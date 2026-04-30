import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SecondaryPanel {
  title: string;
  items: Array<{ id: string; name: string; path: string }>;
}

interface UIState {
  sidebarCollapsed: boolean;
  secondaryPanel: SecondaryPanel | null;
  isSecondaryOpen: boolean;

  toggleSidebar: () => void;

  openSecondaryPanel: (panel: SecondaryPanel) => void;
  closeSecondaryPanel: () => void;
  // toggleSecondaryPanel: () => void;
  reopenSecondaryPanel: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      secondaryPanel: null,
      isSecondaryOpen: false,

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
    }),
    {
      name: 'ui-storage',

    }
  )
);
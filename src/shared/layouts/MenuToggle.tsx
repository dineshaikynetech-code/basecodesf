import styles from './MenuToggle.module.css';

import { cn } from '@/shared/lib/utils';
import { useUIStore } from '@/shared/store/uiStore';

export function MenuToggle() {
  // Selective state extraction for performance
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <button
      onClick={toggleSidebar}
      className={cn(styles.menu, !sidebarCollapsed && styles.isOpen)}
      aria-label="Toggle Sidebar"
    >
      <span className={styles.menuItem} />
      <span className={styles.menuItem} />
      <span className={styles.menuItem} />
    </button>
  );
}
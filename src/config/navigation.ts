import { type LucideIcon, HouseHeart, ListVideo } from 'lucide-react';
export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  children?: NavItem[];
  isEnabled?: boolean; 
};

export const navigationConfig: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: HouseHeart,
    path: '/',
  },
  {
    id: 'smm',
    label: 'SMM',
    icon: ListVideo,
    path: '/smm',
  }
];
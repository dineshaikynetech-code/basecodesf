import { Building2, Briefcase, Store } from "lucide-react";

export const BUSINESS_TYPES = [
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Large Organizations with multiple teams",
    icon: Building2,
    gradient: "from-blue-500 via-sky-500 to-blue-400",
    iconColor: "text-blue-500",
    bg: "bg-blue-500/5",
    border: "border-blue-500/30",
  },
  {
    id: "agency",
    title: "Agency",
    description: "Marketing & Creative agency managing multiple clients",
    icon: Briefcase,
    gradient: "from-yellow-500 via-orange-500 to-amber-400",
    iconColor: "text-yellow-500",
    bg: "bg-yellow-500/5",
    border: "border-yellow-500/30",
  },
  {
    id: "franchise",
    title: "Franchise",
    description: "Local Business manage with multiple locations",
    icon: Store,
    gradient: "from-teal-500 via-emerald-500 to-green-400",
    iconColor: "text-teal-500",
    bg: "bg-teal-500/5",
    border: "border-teal-500/30",
  },
];
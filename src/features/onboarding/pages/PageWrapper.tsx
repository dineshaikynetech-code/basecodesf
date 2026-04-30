import { useAuthStore } from "@/shared/store/authStore";
import { LogOut } from "lucide-react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex items-center justify-center relative px-6">
      {/* Modernized Logout Button per Workspace screenshot */}
      <button
        onClick={logout}
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-[var(--radius-lg)] text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all group"
      >
        <LogOut className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        Log out
      </button>

      {children}
    </div>
  );
}
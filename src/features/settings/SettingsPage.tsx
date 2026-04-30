import ThemeSettingsCard from "./theme/ThemeSettingsCard";


export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
        
      {/* THEME CARD */}
      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <ThemeSettingsCard />
      </div>

      {/* ACCOUNT CARD (placeholder) */}
      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Account</h2>
        <p className="text-sm opacity-70">
          Account settings coming soon...
        </p>
      </div>

    </div>
  )
}
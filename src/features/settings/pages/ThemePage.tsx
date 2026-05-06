import ThemeSettingsCard from "../theme/ThemeSettingsCard";


export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
        
      {/* THEME CARD */}
      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <ThemeSettingsCard />
      </div>

     

    </div>
  )
}
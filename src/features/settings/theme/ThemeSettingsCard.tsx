import { useTheme } from "@/shared/providers/ThemeProvider"
import { useState } from "react"
import CreateThemeDialog from "./CreateThemeDialog"
import ResponsiveGrid from "@/shared/layouts/ResponsiveGrid"
import { ThemeCard } from "./components/ThemeCard"
import { getThemeDescription } from "./theme.utils"
import { ThemeSettingsCardSkeleton } from "./ThemeSettingsCardSkeleton"

export default function ThemeSettingsCard() {
    const { theme: activeTheme, setTheme, themes, removeTheme, loading } = useTheme()
    const [open, setOpen] = useState(false)

    /* SKELETON LOADER */
    if (loading) return <ThemeSettingsCardSkeleton />

    return (
        <div>
            {/* HEADER */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    🎨 Theme Settings
                </h2>
                <p className="text-sm opacity-70 mt-1">
                    Switch between built-in themes or create your own custom theme.
                    Pick colors, preview live, and save.
                </p>
            </div>

            {/* THEMES GRID */}
            <ResponsiveGrid
                cols={{ sm: 2, md: 4, lg: 5 }}
                gap={4}
            >
                {themes.map((t) => (
                    <ThemeCard
                        key={t.id}
                        themeData={t}
                        isActive={activeTheme?.id === t.id}
                        onSelect={setTheme}
                        onRemove={removeTheme}
                        description={getThemeDescription(t.id)}
                    />
                ))}

                {/* CREATE NEW CARD */}
                <button
                    onClick={() => setOpen(true)}
                    className="border-dashed border-2 rounded-xl flex flex-col items-center justify-center p-6 min-h-[180px] hover:border-primary hover:bg-primary/5 transition-all group"
                >
                    <div className="text-3xl font-light group-hover:scale-110 transition-transform">+</div>
                    <p className="mt-2 text-sm font-medium">Create New Theme</p>
                </button>
            </ResponsiveGrid>
            {/* DIALOG */}
            <CreateThemeDialog open={open} onOpenChange={setOpen} />
        </div >
    )
}


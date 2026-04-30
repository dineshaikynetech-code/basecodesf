import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Theme } from "@/features/settings/theme/theme.types"
import { themeService } from "@/features/settings/theme/theme.service"
import { DEFAULTTHEMES } from '@/features/settings/theme/constants';
import { applyTheme } from '@/features/settings/theme/theme.utils';


interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: Theme[]
  addTheme: (theme: Theme) => Promise<void>
  removeTheme: (id: string) => Promise<void>
  loading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// ------------------ Main Function Starts Here ---------------------- //
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themes, setThemes] = useState<Theme[]>(DEFAULTTHEMES)
  const [loading, setLoading] = useState(true)

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("app-theme")
    return saved ? JSON.parse(saved) : DEFAULTTHEMES[0]
  })

   useEffect(() => {
    const loadThemes = async () => {
      try {
        const userThemes = await themeService.fetchThemes()
        setThemes([...DEFAULTTHEMES, ...userThemes])
      } catch (err) {
        console.error("Failed to load themes", err)
      } finally {
        setLoading(false)
      }
    }

    loadThemes()
  }, [])



  const addTheme = async (newTheme: Theme) => {
    const saved = await themeService.saveTheme(newTheme)
    setThemes((prev) => [...prev, saved])
  }
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("app-theme", JSON.stringify(newTheme))
  }

   const removeTheme = async (id: string) => {
    try {
      await themeService.deleteTheme?.(id)

      setThemes((prev) => prev.filter((t) => t.id !== id))

     
      if (theme.id === id) {
        const fallback = DEFAULTTHEMES[0]
        setThemeState(fallback)
        localStorage.setItem("app-theme", JSON.stringify(fallback))
      }

    } catch (err) {
      console.error("Failed to delete theme", err)
    }
  }


  useEffect(() => {
    applyTheme(theme)
  }, [theme])


  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, addTheme,removeTheme,loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
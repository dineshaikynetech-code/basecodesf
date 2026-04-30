import type { Theme } from "@/features/settings/theme/theme.types"
import { STORAGE_KEY } from "./constants"


let mockDB: Theme[] = []


const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const themeService = {


  async fetchThemes(): Promise<Theme[]> {
    await wait(500)

    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  },

  async saveTheme(theme: Theme): Promise<Theme> {
    await wait(500)

    const existing = localStorage.getItem(STORAGE_KEY)
    const themes = existing ? JSON.parse(existing) : []

    const updated = [...themes, theme]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    return theme
  },

  async deleteTheme(id: string) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 500)
    })
  },


  async fetchCreateThemeDefaultState(isMockEnabled: boolean): Promise<Theme> {
    if (isMockEnabled) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDB[0]), 500)
      })
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDB[0]), 500)
    })

  },
}
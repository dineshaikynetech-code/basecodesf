import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      theme: {
        settings: "Theme Settings",
        createNew: "Create New Theme",
        save: "Save Theme",
        name: "Theme Name",
        background: "Background",
        foreground: "Foreground",
        primary: "Primary",
        secondary: "Secondary",
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
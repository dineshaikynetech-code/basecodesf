
// MOCK STORAGE KEY
const STORAGE_KEY = "user-themes"

const  DEFAULTCREATETHEMESTATE={
  name: '',
  background: '#ffffff',
  foreground: '#1a1a2e',
  primary: '#4CAF50',
  primaryForeground: '#ffffff',
  secondary: '#f1f5f9',
  muted: '#f1f5f9',
  accent: '#f1f5f9',
  card: '#ffffff',
  border: '#e2e8f0',
};

const DEFAULTTHEMES = [
  {
    id: "light",
    name: "Light",
    tokens: {
      primary: "#16a34a",
      background: "#f5f5f5",
      text: "#1f2937",
      card: "#ffffff",
    },
  },
  {
    id: "dark",
    name: "Dark",
    tokens: {
      primary: "#4ade80",
      background: "#0f172a",
      text: "#e5e7eb",
      card: "#111827",
    },
  },
  {
    id: "sky",
    name: "Sky",
    tokens: {
      primary: "#0ea5e9",
      background: "#e0f2fe",
      text: "#0c4a6e",
      card: "#bae6fd",
    },
  },
  {
    id: "retro",
    name: "Retro",
    tokens: {
      primary: "#ea580c",
      background: "#f5efe6",
      text: "#3f2a1d",
      card: "#eaddcf",
    },
  },
]


export {STORAGE_KEY,DEFAULTCREATETHEMESTATE,DEFAULTTHEMES}
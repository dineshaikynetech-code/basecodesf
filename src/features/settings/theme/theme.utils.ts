import type { Theme } from "./theme.types";

export function hslStringToHex(hsl: string): string {
  const parts = hsl.trim().split(/\s+/);
  if (parts.length < 3) return '#4CAF50';
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToHslString(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// export const applyTheme = (theme:Theme) => {
//   const root = document.documentElement
//   const t = theme.tokens

//   root.style.setProperty("--color-primary-base", t.primary)
//   root.style.setProperty("--color-primary", t.primary)

//   root.style.setProperty("--background", t.background)
//   root.style.setProperty("--foreground", t.foreground || t.text)
//   root.style.setProperty("--card", t.card)

//   //new tokens
//   if (t.secondary) root.style.setProperty("--secondary", t.secondary)
//   if (t.muted) root.style.setProperty("--muted", t.muted)
//   if (t.accent) root.style.setProperty("--accent", t.accent)
//   if (t.border) root.style.setProperty("--border", t.border)
// }

export const applyTheme = (theme: Theme) => {

  const root =
    document.documentElement

  const t =
    theme.tokens


  if (t.primary) {

    root.style.setProperty(
      "--primary",
      t.primary
    )

    root.style.setProperty(
      "--color-primary-base",
      t.primary
    )

    root.style.setProperty(
      "--color-primary",
      t.primary
    )

  }


  if (t.background) {

    root.style.setProperty(
      "--background",
      t.background
    )

  }


  if (t.foreground || t.text) {

    root.style.setProperty(
      "--foreground",
      t.foreground || t.text
    )

  }


  if (t.card) {

    root.style.setProperty(
      "--card",
      t.card
    )

  }


  if (t.primaryForeground) {

    root.style.setProperty(
      "--primary-foreground",
      t.primaryForeground
    )

  }


  if (t.secondary) {

    root.style.setProperty(
      "--secondary",
      t.secondary
    )

  }

  if (t.muted) {

    root.style.setProperty(
      "--muted",
      t.muted
    )

  }

  if (t.accent) {

    root.style.setProperty(
      "--accent",
      t.accent
    )

  }

  if (t.border) {

    root.style.setProperty(
      "--border",
      t.border
    )

  }

}


export const getThemeDescription = (id: string) => {
  const desc: Record<string, string> = {
    light: "Clean, professional light theme",
    dark: "Easy on the eyes dark theme",
    sky: "Fresh blue sky theme",
    retro: "Warm retro-inspired theme",
  };
  return desc[id] || "Custom theme";
}
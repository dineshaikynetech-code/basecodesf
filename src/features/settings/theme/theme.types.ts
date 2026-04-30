export type Theme = {
  id: string
  name: string
  tokens: {
    primary: string
    background: string
    text: string
    card: string
    foreground?: string
    primaryForeground?: string
    secondary?: string
    muted?: string
    accent?: string
    border?: string
  }
  isCustom?: boolean
}

export type CreateThemeState = {
  name: string
  background: string
  foreground: string
  primary: string
  primaryForeground: string
  secondary: string
  muted: string
  accent: string
  card: string
  border: string
}

export type CreateThemeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}


export type ThemeCardProps = {
  themeData: Theme;
  isActive: boolean;
  onSelect: (t: Theme) => void;
  onRemove?: (id: string) => void;
  description: string;
}
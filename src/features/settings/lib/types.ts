// brand voice form 


export interface BrandVoice {
  id: string;
  title: string;
  description: string;
  topics: string[];
  editedAt: string;
}


export interface BrandVoiceFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBack?: () => void;   
    onVoiceGenerated: (newVoice: BrandVoice) => void;       
}

export type TagSection = 'tones' | 'languages' | 'emotions' | 'competitors';


//Brand voice card

export interface BrandVoiceCardProps {
  voice: BrandVoice;
  onEdit?: (voice: BrandVoice) => void;
  onDelete?: (id: string) => void;
}


export interface BrandStyleCardProps {
    style: BrandStyle;
    onDelete?: (id: string) => void;
    onEdit?: (voice: BrandStyle) => void;
}


export interface BrandStyle {
    id: string;
    title: string;
    logoUrl?: string;
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    createdAt: string;
}

export interface BrandStyleCardProps {
  style: BrandStyle;
  onEdit?: (style: BrandStyle) => void;
  onDelete?: (id: string) => void;
}
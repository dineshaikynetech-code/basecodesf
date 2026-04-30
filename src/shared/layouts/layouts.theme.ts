import type React from "react"

export type DialogLayoutProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    TitleIcon: React.ReactNode;
    children: React.ReactNode;
}
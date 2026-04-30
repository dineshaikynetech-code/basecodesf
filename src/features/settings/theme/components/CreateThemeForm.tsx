// ... imports (Input, Label, Button, etc.)

import type { CreateThemeState, Theme } from "@/features/settings/theme/theme.types";
import { useTheme } from "@/shared/providers/ThemeProvider";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { toast } from 'sonner';
import { DEFAULTCREATETHEMESTATE } from "../constants";

export default function CreateThemeForm({onSave}:{onSave:(status:boolean)=>void}) {
    const { t } = useTranslation();
    const { addTheme, setTheme } = useTheme();

    const [createState, setCreateState] = useState<CreateThemeState>(DEFAULTCREATETHEMESTATE);

    const updateField = useCallback(
        (field: keyof CreateThemeState, value: string) => {
            setCreateState((prev) => ({ ...prev, [field]: value }))
        },
        []
    )

    const handleCreateTheme = useCallback(async () => {
        if (!createState.name.trim()) {
            console.log("hi.....")
            toast.error('Please enter a theme name');
            return;
        }



        const newTheme = {
            id: crypto.randomUUID(),
            name: createState.name,
            isCustom: true,
            tokens: {
                primary: createState.primary,
                background: createState.background,
                text: createState.foreground,
                card: createState.card,

                foreground: createState.foreground,
                primaryForeground: createState.primaryForeground,
                secondary: createState.secondary,
                muted: createState.muted,
                accent: createState.accent,
                border: createState.border,
            },
        }

        await addTheme(newTheme);
        setTheme(newTheme);

        setCreateState(DEFAULTCREATETHEMESTATE);

        toast.success(`Theme "${createState.name}" created!`);
        onSave(false)
    }, [createState, addTheme, setTheme]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-6 items-start">
            {/* Left Column - Controls */}
            <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                    <Label className="text-base font-medium">{t('theme.name')}</Label>
                    <Input
                        value={createState.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="My Custom Theme"
                        className="h-11 text-base"
                    />
                </div>

                {([
                    ['background', t('theme.background')],
                    ['foreground', t('theme.foreground')],
                    ['primary', t('theme.primary')],
                    ['primaryForeground', 'Primary Text'],
                    ['secondary', t('theme.secondary')],
                    ['muted', 'Muted'],
                    ['accent', 'Accent'],
                    ['card', 'Card'],
                    ['border', 'Border'],
                ] as [keyof CreateThemeState, string][]).map(([field, label]) => (
                    <div
                        key={field}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/50 transition-colors group"
                    >
                        <input
                            type="color"
                            value={createState[field]}
                            onChange={(e) => updateField(field, e.target.value)}
                            className="w-12 h-12 shrink-0 cursor-pointer appearance-none bg-transparent border-none 
             [&::-webkit-color-swatch-wrapper]:p-0 
             [&::-webkit-color-swatch]:border-2 
             [&::-webkit-color-swatch]:border-border/50 
             [&::-webkit-color-swatch]:rounded-2xl 
             transition-transform active:scale-90"
                        />
                        <Label className="flex-1 text-sm font-medium text-foreground cursor-pointer group-hover:text-foreground">
                            {label}
                        </Label>
                        <code className="px-2 py-1 bg-muted/30 text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider rounded-lg border border-border/50">
                            {createState[field]}
                        </code>
                    </div>
                ))}
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-0 space-y-6 pb-4">
                <Label className="font-semibold text-base tracking-tight flex items-center gap-2">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                    Live Preview
                </Label>

                <div
                    className="rounded-3xl border-2 shadow-2xl p-6 lg:p-8 min-h-[340px] lg:min-h-[380px] space-y-6 flex flex-col"
                    style={{ backgroundColor: createState.background, color: createState.foreground }}
                >
                    <p className="text-base font-medium leading-relaxed">
                        This is a live preview. Pick colors on the left to see changes here.
                    </p>

                    <div
                        className="rounded-2xl p-5 shadow-inner flex-1 flex flex-col justify-between"
                        style={{ backgroundColor: createState.card, border: `2px solid ${createState.border}` }}
                    >
                        <p className="text-sm font-semibold">Card Component</p>
                        <p className="text-xs mt-1 opacity-60">
                            This is muted text inside a card.
                        </p>
                    </div>

                    <button
                        className="px-6 py-3.5 rounded-2xl text-sm font-semibold shadow-lg active:scale-[0.97] transition-all self-start"
                        style={{ backgroundColor: createState.primary, color: createState.primaryForeground }}
                    >
                        I am a Button
                    </button>

                    <div className="flex gap-3 mt-2">
                        <div className="h-4 w-4 rounded-2xl shadow-sm ring-1 ring-border/30" style={{ backgroundColor: createState.secondary }} />
                        <div className="h-4 w-4 rounded-2xl shadow-sm ring-1 ring-border/30" style={{ backgroundColor: createState.muted }} />
                        <div className="h-4 w-4 rounded-2xl shadow-sm ring-1 ring-border/30" style={{ backgroundColor: createState.accent }} />
                    </div>

                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-sm font-medium underline underline-offset-4 hover:underline-offset-8 transition-all self-start"
                        style={{ color: createState.primary }}
                    >
                        I am a Link
                    </a>
                </div>

                <Button onClick={handleCreateTheme} className="w-full h-12 text-base font-semibold shadow-md">
                    {/* {t('theme.save')} */}
                    Save
                </Button>
            </div>
        </div>
    );
}
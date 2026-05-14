import React, { useCallback, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { BrandVoice, BrandVoiceFormDialogProps, TagSection } from '../lib/types';



const BrandVoiceFormDialog: React.FC<BrandVoiceFormDialogProps> = ({
    open,
    onOpenChange,
    onBack,
    onVoiceGenerated,
}) => {

    const [formData, setFormData] = useState({
        authorsVoice: "Storefries communicates with an enthusiastic, results-driven voice that combines professional expertise with accessible, friendly guidance...",
        niche: "Storefries is an AI-driven hyperlocal marketing platform...",
        audience: "Local businesses and multi-location brands, including restaurants, retail stores...",
    });

    const [tags, setTags] = useState({
        tones: ["Professional", "Enthusiastic", "Confident", "Results-oriented", "Empowering"],
        languages: ["Direct", "Action-oriented", "Solution-focused", "Accessible", "Metrics-driven"],
        emotions: ["Empowerment", "Confidence", "Excitement", "Trust", "Success"],
        competitors: ["Hootsuite", "Buffer", "Sprout Social", "Later", "Socialbakers", "Hubspot", "Mailchimp", "Canva"],
    });

    const [inputValues, setInputValues] = useState<Record<TagSection, string>>({
        tones: '',
        languages: '',
        emotions: '',
        competitors: '',
    });


   

    const addTag = useCallback((section: TagSection, value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;

        setTags(prev => ({
            ...prev,
            [section]: prev[section].includes(trimmed) ? prev[section] : [...prev[section], trimmed]
        }));

        setInputValues(prev => ({ ...prev, [section]: '' }));
    }, []);

    const removeTag = useCallback((section: TagSection, tagToRemove: string) => {
        setTags(prev => ({
            ...prev,
            [section]: prev[section].filter(tag => tag !== tagToRemove)
        }));
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, section: TagSection) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(section, inputValues[section]);
        }
    };

 

     const handleGenerate = () => {
        const newVoice: BrandVoice = {
            id: `voice-${Date.now()}`,
            title: "StoreFries AI", // You can make this dynamic
            description: "Local businesses and multi-location brands, including restaurants, retail stores, healthcare providers, fitness centers and more.",
            topics: ["AI Marketing", "Hyperlocal", "Automation"],
            editedAt: "Edited Today",
        };

        onVoiceGenerated(newVoice);
        onOpenChange(false);
    };


    const renderTagSection = (title: string, section: TagSection, placeholder: string) => (
        <div>
            <label className="text-sm font-semibold mb-3 block">{title}</label>

            <div className="flex flex-wrap gap-2 mb-3">
                {tags[section].map((tag) => (
                    <div
                        key={tag}
                        className="bg-muted px-4 py-1.5 rounded-3xl text-sm flex items-center gap-1 group"
                    >
                        {tag}
                        <button
                            onClick={() => removeTag(section, tag)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <Input
                value={inputValues[section]}
                onChange={(e) => setInputValues(prev => ({ ...prev, [section]: e.target.value }))}
                onKeyDown={(e) => handleKeyDown(e, section)}
                placeholder={placeholder}
                className="rounded-3xl"
            />
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[70vw] max-h-[80vh] flex flex-col rounded-3xl p-0 overflow-hidden">
                <DialogHeader className="px-8 pt-8 pb-5 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-semibold">Add Brand Voice</DialogTitle>
                        <DialogClose asChild>
                            {/* <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button> */}
                        </DialogClose>
                    </div>
                </DialogHeader>

                <div className="flex-1 flex flex-col min-h-0" >
                    {/* Author's Voice */}
                    <div className="p-8 space-y-8 flex-1 overflow-y-auto  ">
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Author's Voice</label>
                            <Textarea
                                value={formData.authorsVoice}
                                onChange={(e) => setFormData({ ...formData, authorsVoice: e.target.value })}
                                className="min-h-[110px] rounded-3xl resize-y"
                            />
                        </div>

                        {/* Niche */}
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Niche</label>
                            <Textarea
                                value={formData.niche}
                                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                                className="min-h-[100px] rounded-3xl resize-y"
                            />
                        </div>

                        {/* Audience */}
                        <div>
                            <label className="text-sm font-semibold mb-2 block">Audience</label>
                            <Textarea
                                value={formData.audience}
                                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                className="min-h-[100px] rounded-3xl resize-y"
                            />
                        </div>

                        {/* Dynamic Tag Sections */}
                        {renderTagSection("Tone", "tones", "Enter tone and press Enter")}
                        {renderTagSection("Language", "languages", "Enter language and press Enter")}
                        {renderTagSection("Emotion", "emotions", "Enter emotion and press Enter")}
                        {renderTagSection("Competitors", "competitors", "Enter competitor and press Enter")}
                    </div>

                    {/* Buttons */}
                    <div className="pb-4 pt-0 px-8 border-t bg-white">
                        <div className="flex gap-3 pt-4">
                            <Button
                                onClick={handleGenerate}
                                className="flex-1 h-12 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                            >
                                Generate Voice
                            </Button>

                            <Button
                                variant="outline"
                                onClick={onBack}
                                className="flex-1 h-12 rounded-3xl"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BrandVoiceFormDialog;
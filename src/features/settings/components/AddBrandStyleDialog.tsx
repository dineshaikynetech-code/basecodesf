import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Upload } from 'lucide-react';
import type { BrandStyle } from '../lib/types';

interface AddBrandStyleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onStyleGenerated: (style: BrandStyle) => void;
}

const AddBrandStyleDialog: React.FC<AddBrandStyleDialogProps> = ({ open, onOpenChange, onStyleGenerated }) => {
    const [styleType, setStyleType] = useState<'website' | 'custom'>('website');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [brandColor, setBrandColor] = useState('#10b981');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#f97316');

    const handleGenerate = () => {
        const newStyle: BrandStyle = {
            id: Math.random().toString(36).substr(2, 9),
            title: styleType === 'website' ? websiteUrl : "Custom Style",
            primaryColor: brandColor,
            backgroundColor: backgroundColor,
            textColor: textColor,
            createdAt: new Date().toISOString(),
        };
        onStyleGenerated(newStyle);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="md:max-w-xl rounded-sm">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Add New Style</DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    <div className="flex gap-2">
                        <Button variant={styleType === 'website' ? 'default' : 'outline'} onClick={() => setStyleType('website')} className="rounded-full px-6">Website</Button>
                        <Button variant={styleType === 'custom' ? 'default' : 'outline'} onClick={() => setStyleType('custom')} className="rounded-full px-6">Custom Style</Button>
                    </div>

                    {styleType === 'website' ? (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Website URL</label>
                            <Input placeholder="e.g. www.brandname.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="border-2 border-dashed rounded-sm p-8 text-center cursor-pointer">
                                <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                                <p className="font-medium">Upload Logo</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium block mb-2">Brand</label>
                                    <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Bg</label>
                                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Text</label>
                                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleGenerate} className="bg-emerald-600 hover:bg-emerald-700">Generate Style</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddBrandStyleDialog;
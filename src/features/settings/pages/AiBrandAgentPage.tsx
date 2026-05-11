import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft, Plus, Upload } from 'lucide-react';
import { SettingsLayout } from '../components/SettingsLayout';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';

import addNewStyleImg from '@/assets/images/settings_aibrandagent_add_new_style.png';
import addNewVoiceImg from '@/assets/images/settings_aibrandagent_add_new_voice.png';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
const AiBrandAgent: React.FC = () => {
    const navigate = useNavigate();
    const [isStyleDialogOpen, setIsStyleDialogOpen] = useState(false);
    const [styleType, setStyleType] = useState<'website' | 'custom'>('website');
    const [websiteUrl, setWebsiteUrl] = useState('');

    // Custom Style State
    const [brandColor, setBrandColor] = useState('#10b981');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#f97316');

    const handleAddNewStyle = () => {
        setIsStyleDialogOpen(true);
        setWebsiteUrl('');
    };

    const handleGenerateStyle = () => {
        if (styleType === 'website' && websiteUrl.trim()) {
            console.log('Generating style for:', websiteUrl);
            // TODO: Integrate with AI API later
            alert('Style generation started! (Demo)');
        } else {
            alert('Please enter a valid website URL');
        }
        setIsStyleDialogOpen(false);
    };
    return (
        <SettingsLayout>
            <LocalBusinessPageWrapper>
                <Card className="border border-border shadow-none rounded-sm overflow-hidden bg-card py-0">
                    {/* Header - Exact PersonalInformation pattern */}
                    <div className="flex items-center justify-between p-3 border-b border-border">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate('/settings')}
                                className="h-8 w-8 text-foreground"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <h2 className="text-base font-semibold text-foreground">AI Brand Agent</h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 pb-8 pt-0 space-y-8 flex flex-col">
                        {/* Brand Styles */}
                        <div className='md:w-1/4 w-2/4'>
                            <h3 className="text-base font-semibold mb-4">Brand Styles</h3>
                            <div
                                onClick={handleAddNewStyle}
                                className="border-2 border-dashed border-border rounded-sm p-4 hover:border-primary/30 transition-colors group cursor-pointer">
                                <div className="flex flex-col md:flex-row items-center justify-evenly md:space-x-12 space-x-6">
                                    {/* Add New Style */}
                                    <div className="flex flex-col items-center text-center group-hover:scale-105 transition-transform">
                                        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                                            <Plus className="w-7 h-7 text-emerald-600" />
                                        </div>
                                        <p className="font-medium text-foreground">Add New Style</p>
                                    </div>


                                    <img
                                        src={addNewStyleImg}
                                        alt="Brand Style"
                                        className="w-32 h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Brand Voice */}
                        <div className='md:w-1/4 w-2/4'>
                            <h3 className="text-base font-semibold mb-4">Brand Voice</h3>
                            <div className="border-2 border-dashed border-border rounded-sm p-4 hover:border-primary/30 transition-colors group cursor-pointer">
                                <div className="flex flex-col md:flex-row items-center justify-evenly gap-6">
                                    {/* Add New Voice */}
                                    <div className="flex flex-col items-center text-center group-hover:scale-105 transition-transform">
                                        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                                            <Plus className="w-7 h-7 text-emerald-600" />
                                        </div>
                                        <p className="font-medium text-foreground">Add New Voice</p>
                                    </div>

                                    <img
                                        src={addNewVoiceImg}
                                        alt="Brand Voice"
                                        className="w-32 h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                {/* Add New Style Dialog */}
                <Dialog open={isStyleDialogOpen} onOpenChange={setIsStyleDialogOpen}>
                    <DialogContent className="md:max-w-xl rounded-sm">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">Add New Style</DialogTitle>
                        </DialogHeader>

                        <div className="py-4 space-y-6">
                            {/* Style Type Tabs */}
                            <div className="flex gap-2">
                                <Button
                                    variant={styleType === 'website' ? 'default' : 'outline'}
                                    onClick={() => setStyleType('website')}
                                    className="rounded-full px-6"
                                >
                                    Website
                                </Button>
                                <Button
                                    variant={styleType === 'custom' ? 'default' : 'outline'}
                                    onClick={() => setStyleType('custom')}
                                    className="rounded-full px-6"
                                >
                                    Custom Style
                                </Button>
                            </div>

                            {/* Website URL Input */}
                            {styleType === 'website' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Website URL</label>
                                    <Input
                                        placeholder="e.g. www.brandname.com"
                                        value={websiteUrl}
                                        onChange={(e) => setWebsiteUrl(e.target.value)}
                                        className="rounded-md"
                                    />
                                </div>
                            )}

                            {styleType === 'custom' && (
                                <div className="space-y-6">
                                    {/* Brand Logo Upload */}
                                    <div>
                                        <label className="text-sm font-medium block mb-2">Brand Logo</label>
                                        <div className="border-2 border-dashed border-border rounded-sm p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                            <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                                            <p className="font-medium">Upload Logo</p>
                                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                                        </div>
                                    </div>

                                    {/* Color Pickers */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-sm font-medium block mb-2">Brand Colour</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={brandColor}
                                                    onChange={(e) => setBrandColor(e.target.value)}
                                                    className="w-10 h-10 rounded-md overflow-hidden border border-border cursor-pointer"
                                                />
                                                <Input value={brandColor} className="rounded-md font-mono text-sm" readOnly />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium block mb-2">Background Colour</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={backgroundColor}
                                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                                    className="w-10 h-10 rounded-md overflow-hidden border border-border cursor-pointer"
                                                />
                                                <Input value={backgroundColor} className="rounded-md font-mono text-sm" readOnly />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium block mb-2">Text Colour</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={textColor}
                                                    onChange={(e) => setTextColor(e.target.value)}
                                                    className="w-10 h-10 rounded-md overflow-hidden border border-border cursor-pointer"
                                                />
                                                <Input value={textColor} className="rounded-md font-mono text-sm" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <DialogFooter className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setIsStyleDialogOpen(false)}
                                className="rounded-md"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleGenerateStyle}
                                disabled={styleType === 'website' && !websiteUrl.trim()}
                                className="bg-emerald-600 hover:bg-emerald-700 rounded-md"
                            >
                                Generate Style
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </LocalBusinessPageWrapper>
        </SettingsLayout>
    );
};

export default AiBrandAgent;
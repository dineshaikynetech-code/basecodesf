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
import AddBrandVoiceDialog from '../components/AddBrandVoiceDialog';
import BrandVoiceFormDialog from '../components/BrandVoiceFormDialog';
import type { BrandStyle, BrandVoice } from '../lib/types';
import BrandVoiceCard from '../components/BrandVoiceCard';
import BrandStyleCard from '../components/BrandStyleCard';
import AddBrandStyleDialog from '../components/AddBrandStyleDialog';
const AiBrandAgent: React.FC = () => {
    const navigate = useNavigate();
    const [styleType, setStyleType] = useState<'website' | 'custom'>('website');
    const [websiteUrl, setWebsiteUrl] = useState('');

    // Custom Style State
    const [brandColor, setBrandColor] = useState('#10b981');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#f97316');

    //dialog
    const [showVoiceStarter, setShowVoiceStarter] = useState(false);
    const [showVoiceForm, setShowVoiceForm] = useState(false);




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


    const handleGenerateFromStarter = () => {
        setShowVoiceStarter(false);
        setShowVoiceForm(true);        // Open second dialog
    };


    // added voice card
    const [voices, setVoices] = useState<BrandVoice[]>([
        {
            id: '1',
            title: "Z Tours and Travels",
            description: "Local businesses and multi-location brands, including restaurants, retail stores",
            topics: ["8 Topics"],
            editedAt: "Edited Today",
        },
    ]);

    const handleVoiceGenerated = (newVoice: BrandVoice) => {
        setVoices(prev => [newVoice, ...prev]); // Add at top
    };

    // add style card

    const [isStyleDialogOpen, setIsStyleDialogOpen] = useState(false);
    const [styles, setStyles] = useState<BrandStyle[]>([
        {
            id: '1',
            title: "ZTours and Travels",
            primaryColor: "#10b981",
            backgroundColor: "#ffffff",
            textColor: "#f97316",
            createdAt: "2026-05-13"
        }
    ]);

    const handleStyleGenerated = (newStyle: BrandStyle) => {
        setStyles(prev => [newStyle, ...prev]);
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
                        <div className="space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-base font-semibold mb-4">Brand Styles</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {styles.map(style => (
                                    <BrandStyleCard
                                        key={style.id}
                                        style={style}
                                        onEdit={(v) => console.log('Edit', v)}
                                        onDelete={(id) => setStyles(prev => prev.filter(s => s.id !== id))}
                                    />
                                ))}
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

                        </div>

                        {/* Brand Voice */}
                        <div className="space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-base font-semibold mb-4">Brand Voice</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {/* Existing Voices */}
                                {voices.map(voice => (
                                    <BrandVoiceCard
                                        key={voice.id}
                                        voice={voice}
                                        onEdit={(v) => console.log('Edit', v)}
                                        onDelete={(id) => setVoices(prev => prev.filter(v => v.id !== id))}
                                    />
                                ))}

                                {/* Add New Voice Card */}
                                <div
                                    onClick={() => setShowVoiceStarter(true)}
                                    className="border-2 border-dashed border-border rounded-sm p-4 hover:border-primary/30 transition-colors group cursor-pointer">
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
                    </div>
                </Card>
                {/* Add New Style Dialog */}
                <AddBrandStyleDialog
                    open={isStyleDialogOpen}
                    onOpenChange={setIsStyleDialogOpen}
                    onStyleGenerated={handleStyleGenerated}
                />
                <AddBrandVoiceDialog
                    open={showVoiceStarter}
                    onOpenChange={setShowVoiceStarter}
                    onGenerate={handleGenerateFromStarter}
                />
                <BrandVoiceFormDialog
                    open={showVoiceForm}
                    onOpenChange={setShowVoiceForm}
                    onBack={() => {
                        setShowVoiceForm(false);
                        setShowVoiceStarter(true);
                    }}
                    onVoiceGenerated={handleVoiceGenerated}
                />
            </LocalBusinessPageWrapper>
        </SettingsLayout >
    );
};

export default AiBrandAgent;
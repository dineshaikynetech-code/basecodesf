import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';
import { ArrowLeft, Camera } from 'lucide-react';
import { SettingsLayout } from '../components/SettingsLayout';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';

const PersonalInformation: React.FC = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "ZTravels",
        lastName: "official",
        email: "ZTravels@gmail.com",
        timeZone: "Asia/Kolkata",
        timeFormat: "12",
        dateFormat: "DD/MM/YYYY",
    });

    const [avatar, setAvatar] = useState(
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    );

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setAvatar(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <SettingsLayout>
            <LocalBusinessPageWrapper>
                <Card className="border border-border shadow-none rounded-sm overflow-hidden bg-card py-0">
                    {/* Card Header Section */}
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
                            <h2 className="text-base font-semibold text-foreground">Personal Information</h2>
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(!isEditing)}
                            className={`rounded-md px-8 py-1 h-9 border-primary text-primary hover:bg-primary/5 font-medium transition-colors`}
                        >
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                    </div>

                    {/* Main Content: 3 Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 min-h-[400px]">

                        {/* Column 1: Avatar */}
                        <div className="px-8 pt-1 pb-8 flex flex-col items-start border-b md:border-b-0 md:border-r border-border">
                            <h3 className="text-base font-semibold mb-6">Avatar</h3>
                            <div className="w-full max-w-[240px]">
                                <div className="relative aspect-square rounded-sm border border-border overflow-hidden bg-muted/30 p-2 flex flex-col shadow-lg">
                                    <div className="w-full h-full rounded-sm overflow-hidden relative">
                                        <img
                                            src={avatar}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                        {isEditing && (
                                            <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer transition-opacity">
                                                <Camera className="w-8 h-8 text-white mb-1" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleAvatarChange}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <p className="text-[13px] text-muted-foreground mt-4 text-center">
                                        Allowed file types: png, jpg, jpeg
                                    </p>

                                </div>

                            </div>
                        </div>

                        {/* Column 2: Personal Details */}
                        <div className="px-8 md:pt-1 pt-8 pb-8 flex flex-col border-b md:border-b-0 md:border-r border-border">
                            <h3 className="text-base font-semibold mb-8">Personal Details</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm text-foreground/80 w-24 shrink-0">First Name</Label>
                                    <Input
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        disabled={!isEditing}
                                        className="bg-muted/10 border-border focus:border-primary"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Label className="text-sm text-foreground/80 w-24 shrink-0">Last Name</Label>
                                    <Input
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        disabled={!isEditing}
                                        className="bg-muted/10 border-border focus:border-primary"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Label className="text-sm text-foreground/80 w-24 shrink-0">Email ID</Label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        disabled={!isEditing}
                                        className=" bg-muted/10 border-border focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Column 3: App Preference */}
                        <div className="px-8 md:pt-1 pt-8 pb-8 flex flex-col">
                            <h3 className="text-base font-semibold mb-8">App Preference</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Label className="text-sm text-foreground/80 w-24 shrink-0">Time Zone</Label>
                                    <Select
                                        value={formData.timeZone}
                                        onValueChange={(v) => handleInputChange('timeZone', v)}
                                        disabled={!isEditing}

                                    >
                                        <SelectTrigger className="h-10 bg-muted/10 border-border rounded-md">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-md" >
                                            <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                                            <SelectItem value="UTC">UTC</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Label className="text-sm text-foreground/80 w-24 shrink-0">Time Format</Label>
                                    <Select
                                        value={formData.timeFormat}
                                        onValueChange={(v) => handleInputChange('timeFormat', v)}
                                        disabled={!isEditing}
                                    >
                                        <SelectTrigger className="h-10 bg-muted/10 border-border rounded-md">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-md">
                                            <SelectItem value="12">12 Hour</SelectItem>
                                            <SelectItem value="24">24 Hour</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Label className="text-sm text-foreground/80 w-24 shrink-0">Date Format</Label>
                                    <Select
                                        value={formData.dateFormat}
                                        onValueChange={(v) => handleInputChange('dateFormat', v)}
                                        disabled={!isEditing}
                                    >
                                        <SelectTrigger className="h-10 bg-muted/10 border-border rounded-md">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-md">
                                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                    </div>
                </Card>
            </LocalBusinessPageWrapper>
        </SettingsLayout>
    );
};

export default PersonalInformation;
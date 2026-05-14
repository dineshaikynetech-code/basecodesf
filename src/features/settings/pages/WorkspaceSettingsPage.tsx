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

const WorkspaceSettings: React.FC = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        storeName: "Nike",
        description: "say about store",
        addressLine1: "Airport Rd, Meenambakkam, Chennai, Tamil Nadu 600027, India",
        addressLine2: "Chennai",
        city: "Chennai",
        state: "Tamil Nadu",
        zipcode: "600027",
        country: "India",
        phone: "98545871255",
        website: "",
        retailCategory: "General Merchandise",
    });

    const [brandLogo, setBrandLogo] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2560px-Logo_NIKE.svg.png"
    );

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setBrandLogo(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <SettingsLayout>
            <LocalBusinessPageWrapper>
                <Card className="border border-border shadow-none rounded-sm overflow-hidden bg-card py-0">
                    {/* Card Header */}
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
                            <h2 className="text-base font-semibold text-foreground">Workspace Settings</h2>
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-8 py-1 h-9 font-medium transition-colors rounded-md border-primary/90 text-primary hover:text-primary-foreground hover:bg-primary`}
                            
                        >
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                    </div>

                    {/* Main Content - 3 Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 min-h-[480px]">

                        {/* Column 1: Brand Logo */}
                        <div className="px-8 pt-1 pb-8 flex flex-col items-start border-b md:border-b-0 md:border-r border-border">
                            <h3 className="text-base font-semibold mb-6">Brand Logo</h3>
                            <div className="w-full max-w-[240px]">
                                <div className="relative aspect-square rounded-sm border border-border overflow-hidden bg-muted/30 p-3 flex flex-col shadow-lg">
                                    <div className="w-full h-full rounded-sm overflow-hidden relative bg-white flex items-center justify-center">
                                        <img
                                            src={brandLogo}
                                            alt="Brand Logo"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                        {isEditing && (
                                            <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer transition-opacity">
                                                <Camera className="w-8 h-8 text-white mb-1" />
                                                <span className="text-white text-xs">Change Logo</span>
                                                <input
                                                    type="file"
                                                    accept="image/png, image/jpeg"
                                                    className="hidden"
                                                    onChange={handleLogoChange}
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

                        {/* Column 2 & 3: Brand Information */}
                        {/* Column 2 & 3: Brand Information */}
                        <div className="md:col-span-2 px-8 md:pt-1 pt-8 pb-8">
                            <h3 className="text-base font-semibold mb-8">Brand Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                                {/* LEFT COLUMN */}
                                <div className="space-y-6">
                                    <div>
                                        <Label className="text-sm text-foreground/80">Store Name</Label>
                                        <Input
                                            value={formData.storeName}
                                            onChange={(e) => handleInputChange('storeName', e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1.5 bg-muted/10 border-border focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Description</Label>
                                        <Input
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1.5 bg-muted/10 border-border focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Addressline 1</Label>
                                        <Input
                                            value={formData.addressLine1}
                                            onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1.5 bg-muted/10 border-border focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Addressline 2</Label>
                                        <Input
                                            value={formData.addressLine2}
                                            onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1.5 bg-muted/10 border-border focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Enter City</Label>
                                        <Input
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1.5 bg-muted/10 border-border focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Choose State</Label>
                                        <Input
                                            value={formData.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1.5 bg-muted/10 border-border focus:border-primary"
                                        />
                                    </div>
                                </div>

                                {/* RIGHT COLUMN */}
                                <div className="space-y-6">
                                    <div>
                                        <Label className="text-sm text-foreground/80">Enter Zipcode</Label>
                                        <Input
                                            value={formData.zipcode}
                                            onChange={(e) => handleInputChange('zipcode', e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1.5 bg-muted/10 border-border focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Choose Country</Label>
                                        <Input
                                            value={formData.country}
                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1.5 bg-muted/10 border-border focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Phone Number</Label>
                                        <div className="flex mt-1.5">
                                            <div className="bg-muted/10 border border-border border-r-0 rounded-l-md px-3 flex items-center text-sm">
                                                🇮🇳
                                            </div>
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                disabled={!isEditing}
                                                className="rounded-l-none bg-muted/10 border-border focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Store Website</Label>
                                        <Input
                                            placeholder="Enter store website"
                                            value={formData.website}
                                            onChange={(e) => handleInputChange('website', e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1.5 bg-muted/10 border-border focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Retail Category</Label>
                                        <Select
                                            value={formData.retailCategory}
                                            onValueChange={(v) => handleInputChange('retailCategory', v)}
                                            disabled={!isEditing}
                                            
                                        >
                                            <SelectTrigger className="mt-1.5 bg-muted/10 border-border rounded-md">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="General Merchandise">General Merchandise</SelectItem>
                                                <SelectItem value="Fashion">Fashion</SelectItem>
                                                <SelectItem value="Sports">Sports</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </LocalBusinessPageWrapper>
        </SettingsLayout>
    );
};

export default WorkspaceSettings;
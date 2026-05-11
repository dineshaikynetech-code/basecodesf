import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import ResponsiveGrid from '@/shared/layouts/ResponsiveGrid';
import { ArrowLeft, Plus ,Trash2} from 'lucide-react';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';

// ICONS
import fbIcon from '@/assets/images/fb-icon-integration-connections.png';
import instaIcon from '@/assets/images/insta-icon-integration-connections.png';
import xIcon from '@/assets/images/x-icon-integration-connections.png';
import gmpIcon from '@/assets/images/gmp-icon-integration-connections.png';
import pinterestIcon from '@/assets/images/pinterest-icon-integration-connections.png';
import youtubeIcon from '@/assets/images/youtube-icon-integration-connections.png';
import linkedinPageIcon from '@/assets/images/LinkedInpage-icon-integration-connections.png';
import linkedinProfileIcon from '@/assets/images/LinkedInprofile-icon-integration-connections.png';
import tiktokIcon from '@/assets/images/tiktok-icon-integration-connections.png';
import { Input } from '@/shared/components/ui/input';
import { Switch } from '@/shared/components/ui/switch';

const connectedAccounts = [
    { id: 1, name: "Golden nest", platform: "Facebook", image: "https://picsum.photos/id/1015/300/200", icon: fbIcon },
    { id: 2, name: "Sakthivel", platform: "Instagram", image: "https://picsum.photos/id/106/300/200", icon: instaIcon },
    { id: 3, name: "AK Groups", platform: "LinkedIn Page", image: "https://picsum.photos/id/107/300/200", icon: linkedinPageIcon },
    { id: 4, name: "Macho Techno", platform: "LinkedIn Profile", image: "https://picsum.photos/id/201/300/200", icon: linkedinProfileIcon },
    { id: 5, name: "Daniel Labs", platform: "YouTube", image: "https://picsum.photos/id/180/300/200", icon: youtubeIcon },
    { id: 6, name: "Golden Grid", platform: "GMB", image: "https://picsum.photos/id/1016/300/200", icon: gmpIcon },
    { id: 7, name: "Joy Store", platform: "Pinterest", image: "https://picsum.photos/id/133/300/200", icon: pinterestIcon },
    { id: 8, name: "Teaboy Official", platform: "TikTok", image: "https://picsum.photos/id/292/300/200", icon: tiktokIcon },
];

const tabs = [
    { label: 'All' },
    { label: 'Facebook', icon: fbIcon },
    { label: 'Instagram', icon: instaIcon },
    { label: 'LinkedIn Page', icon: linkedinPageIcon },
    { label: 'LinkedIn Profile', icon: linkedinProfileIcon },
    { label: 'X', icon: xIcon },
    { label: 'GMB', icon: gmpIcon },
    { label: 'YouTube', icon: youtubeIcon },
    { label: 'Pinterest', icon: pinterestIcon },
    { label: 'TikTok', icon: tiktokIcon },
];

const ConnectedAccounts: React.FC = () => {
    const navigate = useNavigate();
    const [connectedAcc, setConnectedAcc] = React.useState<any>(connectedAccounts);
    const [selectedPlatform, setSelectedPlatform] = React.useState<string>("All");
    const [selectedAccount, setSelectedAccount] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [defaultLocationEnabled, setDefaultLocationEnabled] = useState(false);
    const [searchLocation, setSearchLocation] = useState('');
    const handleMediaAccountClick = (platform: string) => {
        if (platform === "All") {
            setConnectedAcc(connectedAccounts);
            setSelectedPlatform("All");
        } else {
            const filtered = connectedAccounts.filter((acc) => acc.platform == platform);
            setConnectedAcc(filtered);
            setSelectedPlatform(platform);
        }
    }
    const handleCardClick = (account: any) => {
        setSelectedAccount(account);
        setIsDialogOpen(true);
        setSearchLocation('');
    };

    const handleSave = () => {
        console.log("Saving location for", selectedAccount?.name, searchLocation);
        setIsDialogOpen(false);
    };
    return (
        <LocalBusinessPageWrapper>
            <div className="flex items-center gap-2 justify-between">
                <div className='flex flex-row items-center py-2 m-0'>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/settings')}
                        className="h-8 w-8 text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />

                    </Button>
                    <h2 className="text-base font-semibold text-foreground">Connected Social Media Accounts</h2>
                </div>
                <div className='flex flex-row items-center py-2 m-0'>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/integration/connections')}
                        className="rounded-md border-primary hover:text-primary-foreground hover:bg-primary/90">
                        Add New Channel
                    </Button>
                </div>
            </div>
            <Card className="border border-border shadow-none rounded-sm overflow-hidden bg-card py-0">


                {/* Filter Tabs */}
                <div className="border-b border-border px-6 py-4 overflow-x-auto">
                    <div className="flex gap-2 whitespace-nowrap">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.label}
                                onClick={() => handleMediaAccountClick(tab.label)}
                                variant={selectedPlatform === tab.label ? "default" : "outline"}
                                className={cn(
                                    "rounded-md text-sm font-medium whitespace-nowrap",
                                    selectedPlatform === tab.label &&
                                    'bg-primary text-primary-foreground'
                                )}
                            >
                                {tab.icon && (
                                    <img
                                        src={tab.icon}
                                        alt={tab.label}
                                        className="h-4 w-4 object-contain"
                                    />
                                )}

                                <span>{tab.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Accounts Grid */}
                <div className="px-6 pb-6 max-h-[65vh] overflow-y-auto">
                    <ResponsiveGrid cols={{ sm: 2, md: 3, lg: 4 }} gap={4}>
                        {connectedAcc.map((account: any) => (
                            <Card key={account.id}
                                onClick={() => handleCardClick(account)}
                                className="relative aspect-square rounded-sm overflow-hidden border border-border hover:shadow-md transition-all group cursor-pointer bg-muted/30 px-4 pt-4  flex flex-col">
                                <div className="w-full h-full rounded-tr-sm rounded-tl-sm overflow-hidden relative">
                                    <img
                                        src={account.image}
                                        alt={account.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Badge variant="secondary" className="text-xs font-medium">
                                            {account.platform}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 pt-1">
                                    <img
                                        src={account.icon}
                                        alt={account.platform}
                                        className="h-4 w-4 shrink-0 object-contain"
                                    />

                                    <p className="truncate text-caption font-medium text-foreground">
                                        {account.name}
                                    </p>
                                </div>
                                {/* <p className="font-medium text-foreground py-1">{account.name}</p> */}

                            </Card>



                        ))}
                    </ResponsiveGrid>
                </div>
            </Card>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg rounded-sm p-0 overflow-hidden">
                    {selectedAccount && (
                        <>
                            <DialogHeader className="px-6 pt-6 pb-4 border-b">
                                <div className="flex items-center justify-start space-x-4">
                                    <DialogTitle className="text-xl font-semibold">{selectedAccount.name}</DialogTitle>
                                    <Button className="hover:bg-primary bg-primary/90 rounded-md cursor-pointer px-6">
                                        Reauthorize
                                    </Button>
                                </div>
                            </DialogHeader>

                            <div className="px-6 pb-6 pt-0 space-y-6">
                                <div className="flex gap-4 mb-3 ">
                                    <div className="w-32 h-32 rounded-md overflow-hidden border border-border flex-shrink-0">
                                        <img
                                            src={selectedAccount.image}
                                            alt={selectedAccount.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 space-y-1 md:space-y-5">

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Default Location</span>
                                            <Switch
                                                checked={defaultLocationEnabled}
                                                onCheckedChange={setDefaultLocationEnabled}
                                            />
                                        </div>

                                        <div className='flex md:flex-row items-center md:space-x-2 md:space-y-0 flex-col space-x-0 space-y-2'>
                                            <Input
                                                placeholder="Search for Location"
                                                value={searchLocation}
                                                onChange={(e) => setSearchLocation(e.target.value)}
                                                className="rounded-md md:width-3/4 w-full"
                                            />
                                            <Button
                                                onClick={handleSave}
                                                className="md:w-1/4 w-full hover:bg-primary bg-primary/90 rounded-md cursor-pointer"
                                            >
                                                Save
                                            </Button>
                                        </div>


                                        <button className="text-destructive hover:text-destructive/80 text-sm font-medium flex items-center gap-1.5">
                                           <Trash2 className='w-4 h-4' /> Remove Account
                                        </button>
                                    </div>
                                </div>


                                <div className="flex items-center gap-2">
                                    <img src={selectedAccount.icon} alt="" className="h-5 w-5" />
                                    <span className="font-medium">{selectedAccount.platform}</span>
                                </div>
                            </div>


                        </>
                    )}
                </DialogContent>
            </Dialog>
        </LocalBusinessPageWrapper>
    );
};

export default ConnectedAccounts;
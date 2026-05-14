import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';

interface LocationHub {
    id: string;
    name: string;
    subtitle: string;
    region: string;
    rating: number;
    reviews: number;
    status: 'VERIFIED' | 'UNVERIFIED';
}

interface SelectLocationHubsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedHubs: LocationHub[];
    onSelectionChange: (hubs: LocationHub[]) => void;
}

const mockLocations: LocationHub[] = [
    {
        id: '1',
        name: 'Software Smart Training',
        subtitle: 'no.305, akshaya hq, chennai',
        region: 'OMR',
        rating: 4,
        reviews: 1,
        status: 'VERIFIED',
    },
    {
        id: '2',
        name: 'Storefries',
        subtitle: 'AKSHAYA HQ, 3rd Floor, Office #4, OMR, Kazhipattur, Chennai, Tamil Nadu 603103',
        region: 'Chengalpattu',
        rating: 5,
        reviews: 4,
        status: 'UNVERIFIED',
    },
    {
        id: '3',
        name: 'training',
        subtitle: 'Akshaya HQ',
        region: 'Kazhipattur',
        rating: 0,
        reviews: 0,
        status: 'UNVERIFIED',
    },
];

export const SelectLocationHubsDialog: React.FC<SelectLocationHubsDialogProps> = ({
    open,
    onOpenChange,
    selectedHubs,
    onSelectionChange,
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(
        selectedHubs.map((h) => h.id)
    );
    const [search, setSearch] = useState('');

    const handleAddSelected = () => {
        const newSelected = mockLocations.filter((loc) => selectedIds.includes(loc.id));
        onSelectionChange(newSelected);
        onOpenChange(false);
    };

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const selectedCount = selectedIds.length;

    const citiesOptions = [
        {
            name: "OMR",

        },
        {
            name: "Kazhipattur",

        },
        {
            name: "Chengalpattu",

        }
    ]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-[60vw] max-w-[60vw] max-h-[85vh] overflow-auto rounded-3xl p-0 flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold">Select Location Hubs</DialogTitle>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="flex flex-1 overflow-hidden">
                    {/* Left Filters */}
                    <div className="w-80 border-r p-6 space-y-6 overflow-auto">
                        <div>
                            <Label>Search</Label>
                            <div className="relative mt-2">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 rounded-md"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Cities</Label>
                            <Select>
                                <SelectTrigger className=" w-full mt-2 rounded-md">
                                    <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        citiesOptions.map((city) =>
                                            <SelectItem value={city.name.toLowerCase()}>{city.name}</SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Postal Codes</Label>
                            <Select>
                                <SelectTrigger className="w-full mt-2 rounded-md">
                                    <SelectValue placeholder="Select postal code" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="603103">603103</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Verification Status</Label>
                            <Select>
                                <SelectTrigger className="w-full mt-2 rounded-md">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">COMPLETED</SelectItem>
                                    <SelectItem value="verified">PENDING</SelectItem>
                                    <SelectItem value="unverified">FAILED</SelectItem>
                                    <SelectItem value="unverified">STATE_UNSPECIFIED</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Ratings</Label>
                            <Select>
                                <SelectTrigger className="w-full mt-2 rounded-md">
                                    <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0-1">0-1</SelectItem>
                                    <SelectItem value="1-2">1-2</SelectItem>
                                    <SelectItem value="2-3">2-3</SelectItem>
                                    <SelectItem value="3-4">3-4</SelectItem>
                                    <SelectItem value="4-5">4-5</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button className="w-full hover:bg-primary bg-primary/90 rounded-md cursor-pointer">
                            Apply Filters
                        </Button>
                    </div>

                    {/* Right Table */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-auto p-6">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left text-sm text-muted-foreground">
                                        <th className="pb-3 w-8"></th>
                                        <th className="pb-3">LOCATION</th>
                                        <th className="pb-3">REGION</th>
                                        <th className="pb-3">RATING</th>
                                        <th className="pb-3">REVIEWS</th>
                                        <th className="pb-3">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {mockLocations.map((loc) => (
                                        <tr key={loc.id} className="hover:bg-muted/50">
                                            <td>
                                                <Checkbox
                                                    checked={selectedIds.includes(loc.id)}
                                                    onCheckedChange={() => toggleSelect(loc.id)}
                                                />
                                            </td>
                                            <td className="py-4">
                                                <div className="font-medium">{loc.name}</div>
                                                <div className="text-sm text-muted-foreground">{loc.subtitle}</div>
                                            </td>
                                            <td className="text-sm">{loc.region}</td>
                                            <td className="text-sm">⭐ {loc.rating}</td>
                                            <td className="text-sm">{loc.reviews}</td>
                                            <td>
                                                <span
                                                    className={cn(
                                                        "text-xs px-3 py-1 rounded-full font-medium",
                                                        loc.status === 'VERIFIED'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    )}
                                                >
                                                    {loc.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t p-4 flex justify-end gap-3 bg-muted/30">
                            <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-md px-8">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddSelected}
                                className="hover:bg-primary bg-primary/90 rounded-md cursor-pointer px-8"
                            >
                                Add Selected ({selectedCount})
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
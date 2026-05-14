import React from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { MoreVertical, ImageIcon, MapPin } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import type { BrandStyle, BrandStyleCardProps } from '../lib/types';



const BrandStyleCard: React.FC<BrandStyleCardProps> = ({ style, onEdit, onDelete }) => {
    return (
        <Card className="p-5 border border-border hover:border-primary/30 transition-all group rounded-sm relative">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    {/* Logo Section */}
                    <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        {style.logoUrl ? (
                            <img src={style.logoUrl} alt="logo" className="w-full h-full object-contain" />
                        ) : (
                            <MapPin className="w-5 h-5 text-emerald-600" />
                        )}
                    </div>

                    {/* Text & Swatches Section - Added flex-col and justify-center */}
                    <div className="flex flex-col justify-center">
                        <h4 className="font-semibold text-foreground leading-none mb-2">
                            {style.title}
                        </h4>

                        {/* Swatches - Added flex-row and items-center */}
                        <div className="flex flex-row items-center gap-1.5">
                            <div
                                className="w-4 h-4 rounded-sm border border-black/5 flex-shrink-0"
                                style={{ backgroundColor: style.primaryColor }}
                            />
                            <div
                                className="w-4 h-4 rounded-sm border border-black/5 flex-shrink-0"
                                style={{ backgroundColor: style.backgroundColor }}
                            />
                            <div
                                className="w-4 h-4 rounded-sm border border-black/5 flex-shrink-0"
                                style={{ backgroundColor: style.textColor }}
                            />
                        </div>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(style)}>
                            Edit Style
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600" onClick={() => onDelete(style.id)}>
                            Delete Style
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    );
};

export default BrandStyleCard;
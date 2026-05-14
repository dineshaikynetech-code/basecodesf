import React, { useState } from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { MoreVertical, MapPin } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import type { BrandVoiceCardProps } from '../lib/types';



const BrandVoiceCard: React.FC<BrandVoiceCardProps> = ({ voice, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <Card className="p-5 border border-border hover:border-primary/30 transition-all group rounded-sm relative">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">{voice.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-snug">
                            {voice.description}
                        </p>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl">
                        <DropdownMenuItem onClick={() => onEdit?.(voice)}>
                            Edit Voice
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600" onClick={() => onDelete?.(voice.id)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="flex flex-wrap gap-1.5">
                    {voice.topics.map((topic, i) => (
                        <div key={i} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-3xl font-medium">
                            {topic}
                        </div>
                    ))}
                </div>
                <span className="text-xs text-muted-foreground">{voice.editedAt}</span>
            </div>
        </Card>
    );
};

export default BrandVoiceCard;
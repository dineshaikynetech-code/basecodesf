import React, { useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { SelectLocationHubsDialog } from './SelectLocationHubsDialog';
import type { AddTeamMemberDialogProps, LocationHub } from '../lib/types';
import { addTeamMemberSchema, type AddTeamMemberFormData } from '../config/add-member-schema';




export const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({
  open,
  onOpenChange,
  onAddMember,
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Administrator');
  const [socialMedia, setSocialMedia] = useState<string[]>([]);
  const [locationHubs, setLocationHubs] = useState<LocationHub[]>([]);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AddTeamMemberFormData, string>>>({});



  const handleSubmit = () => {


    onAddMember({
      email: email.trim(),
      role,
      socialMedia: socialMedia || undefined,
      locationHubs: locationHubs.length > 0 ? locationHubs : undefined,
    });

    // Reset
    setEmail('');
    setRole('Administrator');
    setSocialMedia([]);
    setLocationHubs([]);
    setErrors({});
    onOpenChange(false);
  };

  const removeLocationHub = (id: string) => {
    setLocationHubs((prev) => prev.filter((hub) => hub.id !== id));
  };

  const SOCIAL_ACCOUNTS = [
    { id: '1', name: 'Aikyne Technology', username: 'aikyne_tech', platform: 'facebook', avatar: '/path-to-avatar.png' },
    { id: '2', name: 'aikyne_45', username: 'aikyne_45', platform: 'instagram', avatar: '/path-to-avatar2.png' },
    // ... more accounts
  ];


  const handleSocialSelect = (id: string) => {
    if (!socialMedia.includes(id)) {
      setSocialMedia(prev => [...prev, id]);
    }
  };

  const removeSocial = (id: string) => {
    setSocialMedia(prev => prev.filter(item => item !== id));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[60vw] rounded-3xl p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">Add New Member</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols md:grid-cols-2 gap-6">
              {/* Email Address */}
              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-md text-caption bg-muted/50 border-border "
                />
              </div>

              {/* Role */}
              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role
                </Label>
                <Select value={role} onValueChange={setRole} >
                  <SelectTrigger className="rounded-md w-full bg-muted/50 border-border">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Admin</SelectItem>
                    <SelectItem value="Manager">Approver</SelectItem>
                    <SelectItem value="Editor">Limited User</SelectItem>
                    <SelectItem value="Viewer">Custom User</SelectItem>
                    <SelectItem value="Viewer">Custom User</SelectItem>
                    <SelectItem value="Viewer">Client Role</SelectItem>
                    <SelectItem value="Viewer">Branch Head</SelectItem>
                    <SelectItem value="Viewer">Team Manager</SelectItem>
                    <SelectItem value="Viewer">Team Cap</SelectItem>
                    <SelectItem value="Viewer">New Sub</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Select Location Hub */}
              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label className="text-sm font-medium">Select Location Hub</Label>
                {locationHubs.length > 0 && (
                  <div className="space-y-2">
                    {locationHubs.map((hub) => (
                      <div
                        key={hub.id}
                        className="flex items-center gap-3 bg-muted/70 border border-border rounded-md px-4 py-3 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          👤
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{hub.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{hub.subtitle}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                          onClick={() => removeLocationHub(hub.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="transition-colors rounded-md border-primary/90 text-primary hover:text-primary-foreground hover:bg-primary mt-2"
                  onClick={() => setShowLocationDialog(true)}
                >
                  + Add / Change Location Hubs
                </Button>
              </div>

              {/* Select Social Media */}
              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label htmlFor="socialMedia" className="text-sm font-medium text-muted-foreground">
                  Select Social Media
                </Label>

                {/* Logic: Controlled Select for Multi-add behavior */}
                <Select value="" onValueChange={handleSocialSelect}>
                  <SelectTrigger className="rounded-md w-full bg-muted/50 border-border h-11">
                    <SelectValue placeholder="Select Social Media" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto rounded-xl shadow-2xl border-border/50">
                    {SOCIAL_ACCOUNTS.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id}
                        className="cursor-pointer focus:bg-primary/5 py-3 px-4 border-b border-border/40 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden border border-border">
                              <img
                                src={account.avatar}
                                alt={account.name}
                                className="w-full h-full object-cover"
                                onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${account.name}`)}
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-border flex items-center justify-center shadow-sm">
                              <span className="text-[10px] font-bold text-primary lowercase leading-none">
                                {account.platform === 'facebook' ? 'f' : 'i'}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold truncate text-foreground leading-tight">
                              {account.name}
                            </span>
                            <span className="text-[11px] text-muted-foreground truncate leading-tight">
                              {account.username}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Selected Social Media Display (Media Chips) as per image_9461dc.png */}
                {socialMedia.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4 px-1">
                    {socialMedia.map((id) => {
                      const account = SOCIAL_ACCOUNTS.find(a => a.id === id);
                      if (!account) return null;
                      return (
                        <div key={id} className="relative group animate-in fade-in zoom-in duration-200">
                          <div className="w-11 h-11 rounded-full border-2 border-background ring-1 ring-border/50 overflow-hidden bg-muted shadow-sm transition-transform group-hover:scale-105">
                            <img src={account.avatar} alt={account.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-border flex items-center justify-center shadow-sm">
                            <span className="text-[10px] font-extrabold text-blue-600 lowercase">
                              {account.platform.charAt(0)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSocial(id)}
                            className="absolute -top-1 -right-1 bg-white text-destructive border border-destructive/30 rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>


            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 px-6 py-5 border-t bg-muted/30">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-md px-8"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!email.trim()}
              className="hover:bg-primary bg-primary/90 hover:text-primary-foreground rounded-md px-8 "
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog >
      <SelectLocationHubsDialog
        open={showLocationDialog}
        onOpenChange={setShowLocationDialog}
        selectedHubs={locationHubs}
        onSelectionChange={setLocationHubs}
      />
    </>
  );
};
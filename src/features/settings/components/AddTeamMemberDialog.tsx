import React, { useState } from 'react';
import { X } from 'lucide-react';
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

interface AddTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMember: (email: string, role: string) => void;
}

export const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({
  open,
  onOpenChange,
  onAddMember,
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Administrator');

  const handleSubmit = () => {
    if (email.trim()) {
      onAddMember(email.trim(), role);
      setEmail('');
      setRole('Administrator');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-3xl p-0 gap-0 overflow-hidden">
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
          <div className="grid grid-cols-2 gap-6">
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
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="rounded-md bg-muted/50 border-border">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
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
    </Dialog>
  );
};
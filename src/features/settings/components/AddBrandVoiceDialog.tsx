import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { X, Globe, FileText, Upload } from 'lucide-react';

interface AddBrandVoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate?: () => void;
}

const AddBrandVoiceDialog: React.FC<AddBrandVoiceDialogProps> = ({
  open,
  onOpenChange,
  onGenerate
}) => {
  const [activeTab, setActiveTab] = useState<'website' | 'text' | 'files'>('website');
  const [url, setUrl] = useState('');

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate();           // This will close current dialog and open the form dialog
    } else {
      // Fallback if no callback provided
      console.log('Generating brand voice from:', { activeTab, url });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[60vw] rounded-3xl p-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">Add Brand Voice</DialogTitle>
            <DialogClose asChild>
              {/* <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
                <X className="h-4 w-4" />
              </Button> */}
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="px-8 pt-6 pb-8 space-y-8">
          {/* Tab Buttons */}
          <div className="flex bg-muted/50 rounded-3xl p-1 w-fit">
            <Button
              variant="ghost"
              onClick={() => setActiveTab('website')}
              className={cn(
                "rounded-3xl px-6 py-2 text-sm font-medium transition-all",
                activeTab === 'website' && "bg-white shadow-sm text-foreground"
              )}
            >
              <Globe className="w-4 h-4 mr-2" />
              Website
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab('text')}
              className={cn(
                "rounded-3xl px-6 py-2 text-sm font-medium transition-all",
                activeTab === 'text' && "bg-white shadow-sm text-foreground"
              )}
            >
              <FileText className="w-4 h-4 mr-2" />
              Text Description
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab('files')}
              className={cn(
                "rounded-3xl px-6 py-2 text-sm font-medium transition-all",
                activeTab === 'files' && "bg-white shadow-sm text-foreground"
              )}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>

          {/* Content Area */}
          {activeTab === 'website' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Website URL
                </label>
                <Input
                  type="url"
                  placeholder="e.g. www.brandname.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="rounded-2xl h-12 bg-card border-border focus-visible:ring-1"
                />
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Brand Voice Description
              </label>
              <textarea
                className="w-full h-40 rounded-3xl border border-border bg-card p-5 text-sm resize-y min-h-[140px] focus-visible:ring-1"
                placeholder="Describe your brand voice, tone, personality, target audience, etc..."
              />
            </div>
          )}

          {activeTab === 'files' && (
            <div className="border-2 border-dashed border-border rounded-3xl p-12 text-center hover:bg-muted/30 transition-colors">
              <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
              <p className="font-medium">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground mt-1">PDF, DOCX, TXT up to 10MB</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleGenerate}
              className="w-full md:w-1/6 flex-1 rounded-3xl h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              Generate Voice
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className=" w-full md:w-1/4 flex-1 rounded-3xl h-12">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBrandVoiceDialog;
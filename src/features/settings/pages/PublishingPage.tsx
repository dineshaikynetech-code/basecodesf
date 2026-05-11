import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { SettingsLayout } from '../components/SettingsLayout';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';

const Publishing: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<'storefries' | 'bitly'>('storefries');

  return (
    <SettingsLayout>
      <LocalBusinessPageWrapper>
        <Card className="border border-border shadow-none rounded-sm overflow-hidden bg-card py-0">
          {/* Header - Inside Card (Exact PersonalInformation pattern) */}
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
              <h2 className="text-base font-semibold text-foreground">Publishing</h2>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Storefries */}
              <Card
                onClick={() => setSelected('storefries')}
                className={`p-6 border-2 cursor-pointer transition-all rounded-sm ${
                  selected === 'storefries'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-border hover:border-border/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selected === 'storefries'
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-muted-foreground'
                  }`}>
                    {selected === 'storefries' && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div>
                    <p className="font-semibold">Storefries</p>
                    <p className="text-sm text-muted-foreground">Default link shortener</p>
                  </div>
                </div>
              </Card>

              {/* Bitly */}
              <Card
                onClick={() => setSelected('bitly')}
                className={`p-6 border-2 cursor-pointer transition-all rounded-sm ${
                  selected === 'bitly'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-border hover:border-border/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selected === 'bitly'
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-muted-foreground'
                  }`}>
                    {selected === 'bitly' && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div>
                    <p className="font-semibold">Bitly</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </LocalBusinessPageWrapper>
    </SettingsLayout>
  );
};

export default Publishing;
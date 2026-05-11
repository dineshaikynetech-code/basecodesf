import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SettingsLayout } from '../components/SettingsLayout';
import ThemeSettingsCard from '../theme/ThemeSettingsCard';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';

const ThemeSettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SettingsLayout>
      <LocalBusinessPageWrapper>
        <Card className="border border-border shadow-none rounded-sm overflow-hidden bg-card py-0">
          {/* Header - Exact same pattern as PersonalInformation.tsx */}
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
              <h2 className="text-base font-semibold text-foreground">Theme</h2>
            </div>
          </div>

          {/* Theme Content - Existing ThemeSettingsCard */}
          <div className="p-6">
            <ThemeSettingsCard />
          </div>
        </Card>
      </LocalBusinessPageWrapper>
    </SettingsLayout>
  );
};

export default ThemeSettingsPage;
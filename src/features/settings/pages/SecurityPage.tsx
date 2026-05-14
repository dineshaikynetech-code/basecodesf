import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { SettingsLayout } from '../components/SettingsLayout';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';

const Security: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    email: "ZTravels@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: Call API to change password
    setIsEditing(false);
  };

  return (
    <SettingsLayout>
      <LocalBusinessPageWrapper>
        <Card className="border border-border shadow-none rounded-sm overflow-hidden bg-card py-0">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-border">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/settings')}
                className="h-8 w-8 text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-base font-semibold text-foreground">Security</h2>
            </div>

            <Button
              variant="outline"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`px-8 py-1 h-9 font-medium transition-colors rounded-md border-primary/90 text-primary hover:text-primary-foreground hover:bg-primary`}
            >
              {isEditing ? "Save" : "Change"}
            </Button>
          </div>

          {/* Change Password Section */}
          <div className="p-8">
            <h3 className="text-base font-semibold mb-8">Change Password</h3>

            <div className="max-w-xl space-y-6">
              <div>
                <Label className="text-sm text-foreground/80">Email ID</Label>
                <Input
                  value={formData.email}
                  disabled
                  className="mt-1.5 h-10 bg-muted/10 border-border"
                />
              </div>

              <div>
                <Label className="text-sm text-foreground/80">Current Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    type={showCurrent ? "text" : "password"}
                    placeholder="current password"
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    disabled={!isEditing}
                    className="h-10 bg-muted/10 border-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-sm text-foreground/80">New Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    type={showNew ? "text" : "password"}
                    placeholder="new password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    disabled={!isEditing}
                    className="h-10 bg-muted/10 border-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-sm text-foreground/80">Confirm Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    disabled={!isEditing}
                    className="h-10 bg-muted/10 border-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </LocalBusinessPageWrapper>
    </SettingsLayout>
  );
};

export default Security;
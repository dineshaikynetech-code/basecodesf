import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { SettingsLayout } from '../components/SettingsLayout';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();

  const usageLimits = [
    { label: "Workspaces", current: 6, total: 10, color: "bg-emerald-500" },
    { label: "Location", current: 5, total: 10, color: "bg-emerald-500" },
    { label: "Social Channels", current: 29, total: "Unlimited", color: "bg-emerald-500" },
    { label: "Users", current: 21, total: 25, color: "bg-emerald-500" },
    { label: "AI Generated Content", current: 154, total: "Unlimited", color: "bg-emerald-500" },
    { label: "Media Storage", current: 1622.3, total: 20480, unit: "MB", color: "bg-emerald-500" },
  ];

  const workspaceLimits = [
    { label: "Posts", current: 1439, total: "Unlimited" },
    { label: "Scheduled Posts", current: 900, total: "Unlimited" },
    { label: "Draft Posts", current: 112, total: "Unlimited" },
    { label: "RSS Feeds", current: 33, total: "Unlimited" },
  ];

  return (
    <SettingsLayout>
      <LocalBusinessPageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/settings')}
                className="h-9 w-9"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold">Subscription</h1>
            </div>

          
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left - Current Plan */}
            <div className="lg:col-span-4">
              <Card className="rounded-sm border-border shadow-sm h-full">
                <CardHeader className="border-b pb-6">
                  <CardTitle className="text-base font-semibold">Current Plan</CardTitle>
                  <div className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mt-3">
                    Subscription Renews On : Jun 22, 2023, 6:22:48 PM
                  </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Subscription Add-ons</p>
                    <p className="text-sm">No add-ons available.</p>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Manage Plan</p>
                    <div className="border border-border rounded-sm p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Pro Plan</p>
                          <p className="text-sm text-muted-foreground">(1 Social Set, 1 User)</p>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" className="rounded-md px-6">
                            Cancel
                          </Button>
                          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-md px-6">
                            Change
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle - Usage and Limits */}
            <div className="lg:col-span-4">
              <Card className="rounded-sm border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Usage and Limits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-2">
                  {usageLimits.map((item, index) => (
  <div key={index} className="space-y-2.5">
    <div className="flex justify-between text-sm">
      <span className="text-foreground">{item.label}</span>
      <span className="text-muted-foreground font-medium">
        {item.current} of {item.total} {item.unit}
      </span>
    </div>
    <Progress 
      value={typeof item.total === 'number' ? (item.current / item.total) * 100 : 0} 
      className="h-2.5 bg-muted"
    />
  </div>
))}
                </CardContent>
              </Card>
            </div>

            {/* Right - Workspace Limit */}
            <div className="lg:col-span-4">
              <Card className="rounded-sm border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Workspace Limit</CardTitle>
                </CardHeader>
                <CardContent className="pt-2 space-y-6">
                 {workspaceLimits.map((item, index) => (
  <div key={index} className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>{item.label}</span>
      <span className="font-medium text-foreground">
        {item.current} of {item.total}
      </span>
    </div>
    <Progress 
      value={0}   // Always 0 for Unlimited
      className="h-2.5 bg-muted" 
    />
  </div>
))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </LocalBusinessPageWrapper>
    </SettingsLayout>
  );
};

export default SubscriptionPage;
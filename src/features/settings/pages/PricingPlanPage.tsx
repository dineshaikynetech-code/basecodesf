import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { SettingsLayout } from '../components/SettingsLayout';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';
import { PlanSummaryDrawer } from '../components/PlanSummaryDrawer';

interface PlanFeature {
    text: string;
}

interface Plan {
    id: string;
    name: string;
    priceMonthly: number;
    priceYearly: number;
    defaultWorkspaces: number;
    defaultLocations: number;
    defaultMembers: number;
    defaultChannels: number;
    features: PlanFeature[];
    isPopular?: boolean;
    isCurrent?: boolean;
}

const PricingPlansPage: React.FC = () => {
    const navigate = useNavigate();
    const [isYearly, setIsYearly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>('growth');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedPlanForDrawer, setSelectedPlanForDrawer] = useState<any>(null);


    // State for adjustable quantities (cannot go below defaults)
    type adjustmentProps = {
        workspaces: number;
        locations: number;
        members: number;
        channels: number;
    }

    type planProps = {
        basic: adjustmentProps,
        growth: adjustmentProps,
        agency: adjustmentProps
    }

    const monthlyAdjustments: planProps = {
        basic: { workspaces: 2, locations: 5, members: 3, channels: 10 },
        growth: { workspaces: 9, locations: 10, members: 5, channels: 25 },
        agency: { workspaces: 15, locations: 30, members: 10, channels: 50 },
    }
    const yearlyAdjustments: planProps = {
        basic: { workspaces: 2, locations: 5, members: 3, channels: 10 },
        growth: { workspaces: 9, locations: 10, members: 5, channels: 25 },
        agency: { workspaces: 15, locations: 30, members: 10, channels: 50 },
    }



    const [adjustments, setAdjustments] = useState<planProps>(monthlyAdjustments);

    const basePlans: Plan[] = [
        {
            id: 'basic',
            name: 'BASIC',
            priceMonthly: 2599,
            priceYearly: 2000,
            defaultWorkspaces: 2,
            defaultLocations: 5,
            defaultMembers: 3,
            defaultChannels: 10,
            features: [
                { text: 'Location Management' },
                { text: 'Review Management' },
                { text: 'Reputation Management' },
                { text: 'Local Keyword Tracking' },
                { text: 'Competitors Tracking' },
                { text: 'Team Management' },
                { text: 'Post Ideas' },
                { text: 'Social Media Management' },
                { text: 'Analytics & Reports' },
                { text: 'Limited Brand Asset' },
            ],
        },
        {
            id: 'growth',
            name: 'GROWTH',
            priceMonthly: 4499,
            priceYearly: 3699,
            defaultWorkspaces: 9,
            defaultLocations: 10,
            defaultMembers: 5,
            defaultChannels: 25,
            features: [
                { text: 'Includes Basic Plan' },
                { text: 'Keyword Ranking' },
                { text: 'Geo Grid Visibility' },
                { text: 'Calendar View' },
                { text: 'Discover Content' },
                { text: 'AI Brand Agent' },
                { text: 'AI Unified Inbox' },
                { text: 'Dedicated Support' },
                { text: 'Brand Asset' },
            ],
            isPopular: true,
            isCurrent: true,
        },
        {
            id: 'agency',
            name: 'AGENCY',
            priceMonthly: 9999,
            priceYearly: 8333,
            defaultWorkspaces: 15,
            defaultLocations: 30,
            defaultMembers: 10,
            defaultChannels: 50,
            features: [
                { text: 'Includes Growth Pro Plan' },
                { text: 'Keyword Ranking' },
                { text: 'Geo Grid Visibility' },
                { text: 'Calendar View' },
                { text: 'AI Brand Agent' },
                { text: 'AI Unified Inbox' },
                { text: 'Dedicated Support' },
                { text: 'Brand Asset' },
            ],
        },
    ];

    const getCurrentAdjustment = (planId: string) => adjustments[planId as keyof typeof adjustments];

    const calculatePrice = (plan: Plan) => {
        const adj = getCurrentAdjustment(plan.id);
        const basePrice = isYearly ? plan.priceYearly : plan.priceMonthly;

        const extraWorkspaces = Math.max(0, adj.workspaces - plan.defaultWorkspaces);
        const extraLocations = Math.max(0, adj.locations - plan.defaultLocations);
        const extraMembers = Math.max(0, adj.members - plan.defaultMembers);
        const extraChannels = Math.max(0, adj.channels - plan.defaultChannels);

        // Incremental pricing (example values - can be adjusted later)
        const extraCost =
            extraWorkspaces * 100 +
            extraLocations * 150 +
            extraMembers * 80 +
            extraChannels * 40;

        return basePrice + extraCost;
    };

    const updateAdjustment = (planId: string, field: 'workspaces' | 'locations' | 'members' | 'channels', delta: number) => {
        setAdjustments(prev => {
            const current = prev[planId as keyof typeof prev];
            const defaultVal = basePlans.find(p => p.id === planId)?.[`default${field.charAt(0).toUpperCase() + field.slice(1)}` as keyof Plan] as number;

            return {
                ...prev,
                [planId]: {
                    ...current,
                    [field]: Math.max(defaultVal, current[field] + delta)
                }
            };
        });
    };

    return (

        <div className="min-h-[calc(100vh-120px)] flex flex-col">
            <div className="space-y-6 pb-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/settings/subscription')}
                        className="h-9 w-9"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-base font-semibold">Plans</h1>
                    </div>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-3 bg-card rounded-3xl p-1 border border-border">
                        <button
                            onClick={() => {
                                setIsYearly(false);
                                setAdjustments(monthlyAdjustments);
                            }
                            }
                            className={cn(
                                "px-6 py-2 text-sm font-medium rounded-3xl transition-all",
                                !isYearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => {
                                setIsYearly(true);
                                setAdjustments(yearlyAdjustments);
                            }
                            }
                            className={cn(
                                "px-6 py-2 text-sm font-medium rounded-3xl transition-all flex items-center gap-2",
                                isYearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Yearly
                            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">25% OFF</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards - Compact Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {basePlans.map((plan, index) => {
                        const price = calculatePrice(plan);
                        const adj = getCurrentAdjustment(plan.id);
                        const isCurrent = plan.isCurrent;

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -6 }}
                                className="relative"
                            >
                                {plan.isPopular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                        <div className="inline-block bg-gradient-to-r from-[#39FF14] to-[#01a801] text-white text-xs font-bold px-6 py-1.5 rounded-full shadow-md border-b border-white/20">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <Card className={cn(
                                    "h-full flex flex-col rounded-sm border-2 transition-all duration-300 px-6 gap-4",
                                    isCurrent ? "border-primary bg-card/80" : "border-border"
                                )}>
                                    <CardHeader className="text-start pb-2 border-border border-b px-0">
                                        <CardTitle className="text-lg font-semibold text-muted-foreground tracking-tight">
                                            {plan.name}
                                        </CardTitle>
                                        <div className="mt-0">
                                            <span className="text-lg font-bold">₹{price}</span>
                                            <span className="text-muted-foreground text-caption">/month</span>
                                        </div>
                                        {isYearly && (
                                            <p className="text-sm text-emerald-600 font-medium">Billed yearly • Save 25%</p>
                                        )}
                                    </CardHeader>
                                    {/* <Seperator */}

                                    <CardContent className="flex-1 flex flex-col  pb-8 px-0 text-caption space-y-3">
                                        {/* Adjustable Limits */}
                                        <div className="space-y-2.5 border-border border-b pb-6 pt-2">
                                            {[
                                                { label: 'Workspace', value: adj.workspaces, field: 'workspaces' as const },
                                                { label: 'Store Location', value: adj.locations, field: 'locations' as const },
                                                { label: 'Team Members', value: adj.members, field: 'members' as const },
                                                { label: 'Social channels', value: adj.channels, field: 'channels' as const },
                                            ].map((item, i) => (
                                                <div key={i} className="flex flex-row-reverse items-center justify-end gap-8 text-caption">
                                                    <span className="text-muted-foreground">{item.label}</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-7 w-7 rounded-md"
                                                            onClick={() => updateAdjustment(plan.id, item.field, -1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-8 text-center font-medium tabular-nums">{item.value}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-7 w-7 rounded-md"
                                                            onClick={() => updateAdjustment(plan.id, item.field, 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2.5 flex-1 pt-2 pb-4">
                                            {plan.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3 text-caption">
                                                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-muted-foreground">{feature.text}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Action Button */}
                                        <Button
                                            variant={isCurrent ? "default" : "outline"}
                                            size="lg"
                                            className={cn(
                                                "w-full h-11 rounded-md text-base font-semibold mt-auto",
                                                isCurrent
                                                    ? "hover:bg-primary bg-primary/90 text-primary-foreground"
                                                    : "hover:bg-primary hover:text-primary-foreground text-primary border-primary hover:border-none"
                                            )}
                                            onClick={() => {
                                                if (isCurrent) {
                                                    setSelectedPlan(plan.id);
                                                } else {
                                                    setSelectedPlanForDrawer(plan);
                                                    setDrawerOpen(true);
                                                }
                                            }}
                                        >
                                            {isCurrent ? 'Current Plan' : 'Buy Now'}
                                        </Button>
                                    </CardContent>
                                </Card>

                            </motion.div>
                        );
                    })}
                </div>
            </div>
            <PlanSummaryDrawer
                isOpen={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    setSelectedPlanForDrawer(null);
                }}
                plan={selectedPlanForDrawer}
                isYearlyGlobal={isYearly}
                monthlyPrice={selectedPlanForDrawer ? calculatePrice(selectedPlanForDrawer) : undefined}
                yearlyPriceFromCalc={selectedPlanForDrawer && isYearly
                    ? calculatePrice(selectedPlanForDrawer)
                    : undefined
                }
            />
        </div>

    );
};

export default PricingPlansPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/shared/components/ui/card';
import ResponsiveGrid from '@/shared/layouts/ResponsiveGrid';
import {
    User, Shield, Users, Settings, CreditCard,
    Bot, Share2, Globe, Palette
} from 'lucide-react';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';
import { SettingsLayout } from '../components/SettingsLayout';

const settingsCards = [
    {
        icon: User,
        title: "Personal Information",
        description: "Manage and update your personal details securely and effortlessly.",
        path: "/settings/personal-information",
    },
    {
        icon: Globe,
        title: "Workspace Settings",
        description: "Manage and update your workspace settings securely and effortlessly.",
        path: "/settings/workspace",
    },
    {
        icon: CreditCard,
        title: "Subscription",
        description: "Manage and update your subscription plan securely and effortlessly.",
        path: "/settings/subscription",
    },
    {
        icon: Bot,
        title: "AI Brand Agent",
        description: "Manage and update your AI Agent securely and effortlessly.",
        path: "/settings/ai-brand-agent",
    },
    {
        icon: Shield,
        title: "Security",
        description: "Manage and update your password securely and effortlessly.",
        path: "/settings/security",
    },
    {
        icon: Users,
        title: "Team Members",
        description: "Manage and update your team members securely and effortlessly.",
        path: "/settings/team-members",
    },
    {
        icon: Settings,
        title: "Manage Roles",
        description: "Manage and update the employee roles securely and effortlessly.",
        path: "/settings/manage-roles",
    },
    {
        icon: Share2,
        title: "Social Accounts",
        description: "Manage and update your social accounts securely and effortlessly.",
        path: "/integration/connected-accounts",
    },
    {
        icon: Palette,
        title: "Theme",
        description: "Customize appearance, colors and theme preferences.",
        path: "/settings/theme",
    },
    {
        icon: Globe,
        title: "Publishing",
        description: "Manage and update your URL Shortener securely and effortlessly.",
        path: "/settings/publishing",
    },
];

const SettingsPage: React.FC = () => {
    const navigate = useNavigate();


    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <SettingsLayout>
            <LocalBusinessPageWrapper>
                <div className="space-y-6">
                  

                    {/* Settings Grid */}
                    <ResponsiveGrid
                        cols={{ sm: 2, md: 3, lg: 4 }}
                        gap={4}
                    >
                        {settingsCards.map((card, index) => (
                            <Card
                                key={index}
                                onClick={() => handleCardClick(card.path)}
                                className="group border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer rounded-sm h-full flex flex-col"
                            >
                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="mb-5">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <card.icon className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 flex-1">
                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </ResponsiveGrid>
                </div>
            </LocalBusinessPageWrapper>
        </SettingsLayout>
    );
};

export default SettingsPage;
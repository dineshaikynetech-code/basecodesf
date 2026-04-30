// features/onboarding/pages/OnBoarding.tsx

import { BUSINESS_TYPES } from "../constants";
import { BusinessCard } from "../components/BusinessCard";

import { useAuthStore } from "@/shared/store/authStore";
import { useOnboardingStore } from "@/shared/store/onboardingStore";
import { useEffect, useState } from "react";
import { PageWrapper } from "./PageWrapper";
import WorkspaceStep from "./WorkSpaceStep";
import EnterpriseStep from "./EnterpriseStep";
import { useNavigate } from "react-router-dom";
import EmptyPage from "@/shared/components/EmptyPage";

export default function OnBoarding() {
    const {
        step,
        nextStep,
        businessType, setBusinessType,
        updateStepData,
        reset
    } = useOnboardingStore();

    const { logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        reset();
    }, [reset]);

    const [selected, setSelected] = useState<string | null>(null);

    // Step 0 → Business Selection
    if (step === 0) {
        return (
            <PageWrapper>
                <div className="min-h-screen flex items-center justify-center px-6 relative">
                    <div className="w-full max-w-5xl">
                        <div className="text-center mb-12">
                            <h1 className="text-2xl font-semibold">
                                What best describes your Business?
                            </h1>
                            <p className="text-muted-foreground mt-2 text-sm">
                                This helps us customize your experience
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {BUSINESS_TYPES.map((item) => (
                                <BusinessCard
                                    key={item.id}
                                    item={item}
                                    selected={selected === item.id}
                                    onClick={() => {
                                        setSelected(item.id);
                                        setBusinessType(item.id as any);
                                        updateStepData("business", item);
                                        if (item.id === "enterprise") {
                                            nextStep(); // Go to Workspace step
                                        } else {
                                            // For Agency or Franchise → show EmptyState
                                            nextStep(); // We can handle in next step logic
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    // Step 1 → Workspace
    if (step === 1) {
        return (
            <PageWrapper>
                <WorkspaceStep />
            </PageWrapper>
        );
    }

    if (step === 2) {
        if (businessType === "enterprise") {
            return (
                <PageWrapper>
                    <EnterpriseStep />
                </PageWrapper>
            );
        } else {
            // Agency or Franchise → Empty State
            return (
                <PageWrapper>
                    <div className="min-h-[70vh] flex items-center justify-center">
                        <EmptyPage
                            title={`Coming Soon for ${businessType?.toUpperCase()}`}
                            description="This feature is under development. We'll notify you when it's ready."
                            animationData={null}
                            actionLabel="Go to Dashboard"
                            onAction={() => navigate("/location/listing-dashboard")}
                        />
                    </div>
                </PageWrapper>
            );
        }
    }

    return null;
}



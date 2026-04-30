import { create } from "zustand";
import { persist } from "zustand/middleware";


type BusinessType = "enterprise" | "agency" | "franchise";

type OnBoardingState = {
  step: number;
  businessType: BusinessType | null;
  isOnboarded: boolean;
  data: Record<string, any>;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setBusinessType: (type: BusinessType) => void;
  updateStepData: (key: string, values: any) => void;

  setOnboarded: (val: boolean) => void;
  completeOnboarding: () => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnBoardingState>()(
  persist(
    (set) => ({
      step: 0,
      isOnboarded: false,
      data: {},
      businessType: null,

      setStep: (step) => set({ step }),
      nextStep: () => set((s) => ({ step: s.step + 1 })),
      prevStep: () => set((s) => ({ step: s.step - 1 })),
      setBusinessType: (type) => set({ businessType: type }),

      updateStepData: (key, values) =>
        set((s) => ({
          data: { ...s.data, [key]: values },
        })),

      setOnboarded: (val) => set({ isOnboarded: val }),

      
      completeOnboarding: () => set({ isOnboarded: true, step: 0 }),

      reset: () =>
        set({
          step: 0,
          isOnboarded: false,
          data: {},
        }),
    }),
    { name: "onboarding-storage" }
  )
);
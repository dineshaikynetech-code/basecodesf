import React, { useEffect, useState, useMemo } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Separator } from '@/shared/components/ui/separator';
import { motion } from 'framer-motion';

interface PlanSummaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
  isYearlyGlobal: boolean;
  monthlyPrice?: number;
  yearlyPriceFromCalc?: number;
}

export const PlanSummaryDrawer: React.FC<PlanSummaryDrawerProps> = ({
  isOpen,
  onClose,
  plan,
  isYearlyGlobal,
  monthlyPrice,
  yearlyPriceFromCalc
}) => {
  
  if (!isOpen || !plan) {
    return null;
  }

 
  const [payYearly, setPayYearly] = useState(!isYearlyGlobal);

  useEffect(() => {
    setPayYearly(!isYearlyGlobal);
  }, [isYearlyGlobal]);

  
  const featuresList: string[] = useMemo(() => {
    if (!plan.features) return [];
    return plan.features
      .map((item: any) => (typeof item === 'string' ? item : item?.text || ''))
      .filter(Boolean);
  }, [plan.features]);

  const displayMonthlyPrice = monthlyPrice || plan.price;
  const displayYearlyPrice = yearlyPriceFromCalc || 
    (isYearlyGlobal ? plan.price : Math.round(displayMonthlyPrice * 12 * 0.75));

  const savings = isYearlyGlobal ? 0 : Math.round(displayMonthlyPrice * 12 - displayYearlyPrice);

  const isShowingYearlyOption = !isYearlyGlobal;
  const isYearlyBilling = payYearly || isYearlyGlobal;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-[60] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Plan Summary</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-8">
          {/* Yearly Option - Shown only when opened from Monthly */}
          {isShowingYearlyOption && (
            <div className="flex items-center justify-between bg-muted/50 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="yearly"
                  checked={payYearly}
                  onCheckedChange={(checked) => setPayYearly(!!checked)}
                />
                <label htmlFor="yearly" className="text-sm font-medium cursor-pointer">
                  Pay Yearly & Save
                </label>
              </div>
              <div className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Save 25%
              </div>
            </div>
          )}

          {/* Pricing Summary */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">
                  {(payYearly || isYearlyGlobal) ? 'Yearly' : 'Monthly'} Total
                </p>
                <p className="text-3xl font-bold">₹{isYearlyBilling ? displayYearlyPrice : displayMonthlyPrice}</p>
              </div>

              {isShowingYearlyOption && payYearly && savings > 0 && (
                <div className="text-right">
                  <p className="text-emerald-600 text-sm font-medium">You save ₹{savings}</p>
                  <p className="text-xs text-muted-foreground">vs monthly billing</p>
                </div>
              )}
            </div>
            <Separator />
          </div>

          {/* Features */}
          <div>
            <h3 className="font-medium mb-4 text-sm">What's included</h3>
            <div className="space-y-3">
              {featuresList.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t mt-auto">
          <Button
            size="lg"
            className="w-full h-12 rounded-2xl text-base font-semibold bg-emerald-600 hover:bg-emerald-700"
            onClick={() => {
              const billingType = (payYearly || isYearlyGlobal) ? 'Yearly' : 'Monthly';
              alert(`Proceeding to payment for ${plan.name} (${billingType})`);
              onClose();
            }}
          >
            Proceed to Payment
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Secure checkout • Cancel anytime
          </p>
        </div>
      </motion.div>
    </>
  );
};
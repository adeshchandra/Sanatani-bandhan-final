import { useState, useCallback } from 'react';
import { useAuthWorkspace } from '../context/AuthWorkspaceContext';
import { SUBSCRIPTION_PLANS, PlanLimits } from '../config/planPricing';

export const usePlanGate = () => {
  const { activeWorkspace } = useAuthWorkspace();
  const [showUpsell, setShowUpsell] = useState(false);
  const [upsellModule, setUpsellModule] = useState('');

  const isDemo = activeWorkspace?.id?.startsWith('DEMO_');

  const checkGate = useCallback((module: keyof PlanLimits, currentCount: number): boolean => {
    // In a real backend implementation, you would check `activeWorkspace.plan` limits.
    // For now, we enforce DEMO limits if in demo mode.
    if (!isDemo) return true; // Passed for real workspaces

    const limit = SUBSCRIPTION_PLANS.DEMO.limits[module];
    
    if (limit !== -1 && currentCount >= limit) {
      setUpsellModule(module);
      setShowUpsell(true);
      
      // Analytics
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'demo_limit_reached',
          module: module,
          limit: limit
        });
      }
      return false; // Blocked
    }
    
    return true; // Passed
  }, [isDemo]);

  const closeUpsell = useCallback(() => {
    setShowUpsell(false);
  }, []);

  return {
    isDemo,
    checkGate,
    showUpsell,
    upsellModule,
    closeUpsell,
    DEMO_LIMITS: SUBSCRIPTION_PLANS.DEMO.limits
  };
};

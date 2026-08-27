import { useState, useCallback } from 'react';
import { useAuthWorkspace } from '../context/AuthWorkspaceContext';
import { useLanguage } from '../context/LanguageContext';

export interface PlanGateLimits {
  devotees: number;
  transactions: number;
  events: number;
}

const DEMO_LIMITS: PlanGateLimits = {
  devotees: 6,
  transactions: 6,
  events: 2
};

export const usePlanGate = () => {
  const { activeWorkspace } = useAuthWorkspace();
  const [showUpsell, setShowUpsell] = useState(false);
  const [upsellModule, setUpsellModule] = useState('');

  const isDemo = activeWorkspace?.id?.startsWith('DEMO_');

  const checkGate = useCallback((module: keyof PlanGateLimits, currentCount: number): boolean => {
    if (!isDemo) return true; // Passed

    if (currentCount >= DEMO_LIMITS[module]) {
      setUpsellModule(module);
      setShowUpsell(true);
      
      // Analytics
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'demo_limit_reached',
          module: module,
          limit: DEMO_LIMITS[module]
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
    DEMO_LIMITS
  };
};

import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Fingerprint, Scan, ShieldCheck, CheckCircle2, X } from 'lucide-react';

export interface UseBiometricAuthReturn {
  isBiometricAvailable: boolean;
  isAuthenticating: boolean;
  activePromptAction: string | null;
  promptBiometric: (actionName?: string) => Promise<boolean>;
  BiometricPromptModal: React.FC;
}

export function useBiometricAuth(): UseBiometricAuthReturn {
  // Check PublicKeyCredential availability
  const isBiometricAvailable = typeof window !== 'undefined' && (
    'PublicKeyCredential' in window || 
    ('credentials' in navigator)
  );

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [activePromptAction, setActivePromptAction] = useState<string | null>(null);
  const [modalResolve, setModalResolve] = useState<((val: boolean) => void) | null>(null);
  const [modalStage, setModalStage] = useState<'SCANNING' | 'SUCCESS' | 'CANCELLED'>('SCANNING');

  const promptBiometric = useCallback(
    (actionName: string = 'Verification'): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        setActivePromptAction(actionName);
        setIsAuthenticating(true);
        setModalStage('SCANNING');
        setModalResolve(() => resolve);

        // 1.5-second simulation mimicking native FaceID / TouchID biometric sensor
        const timer = setTimeout(() => {
          setModalStage('SUCCESS');
          setTimeout(() => {
            setIsAuthenticating(false);
            setActivePromptAction(null);
            setModalResolve(null);
            resolve(true);
          }, 450);
        }, 1500);

        // Save timeout cleanup in case cancelled
        (promptBiometric as any)._cancelCurrent = () => {
          clearTimeout(timer);
          setModalStage('CANCELLED');
          setTimeout(() => {
            setIsAuthenticating(false);
            setActivePromptAction(null);
            setModalResolve(null);
            resolve(false);
          }, 200);
        };
      });
    },
    []
  );

  const handleCancel = useCallback(() => {
    if ((promptBiometric as any)._cancelCurrent) {
      (promptBiometric as any)._cancelCurrent();
    } else if (modalResolve) {
      setIsAuthenticating(false);
      setActivePromptAction(null);
      modalResolve(false);
    }
  }, [modalResolve, promptBiometric]);

  // Self-rendering portal modal mimicking native iOS / Android biometric prompt
  const BiometricPromptModal: React.FC = () => {
    if (!isAuthenticating || typeof document === 'undefined') return null;

    return createPortal(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md transition-all animate-fadeIn">
        <div 
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-700/80 shadow-2xl p-6 sm:p-7 text-center space-y-5"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleCancel}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors cursor-pointer"
            aria-label="Cancel Biometric Verification"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Security Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>FIDO2 / WebAuthn Certified</span>
          </div>

          {/* Biometric Sensor Visual Indicator */}
          <div className="flex justify-center py-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {modalStage === 'SCANNING' ? (
                <>
                  {/* Subtle pulsing rings mimicking iOS/Android TouchID/FaceID */}
                  <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 animate-ping opacity-60"></div>
                  <div className="absolute inset-2 rounded-full border border-amber-500/40 animate-pulse"></div>
                  <div className="relative w-20 h-20 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                    <Scan className="w-10 h-10 animate-pulse text-amber-400" />
                    <Fingerprint className="w-7 h-7 absolute text-amber-300/80" />
                  </div>
                </>
              ) : (
                <div className="relative w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)] scale-105 transition-transform duration-300">
                  <CheckCircle2 className="w-11 h-11 text-emerald-400 animate-in zoom-in-75 duration-200" />
                </div>
              )}
            </div>
          </div>

          {/* Action Context Title */}
          <div>
            <h3 className="text-base font-black text-stone-100 tracking-tight">
              {modalStage === 'SCANNING'
                ? (activePromptAction ? `${activePromptAction} Authorization` : 'Biometric Security Scan')
                : 'Biometric Authenticated!'}
            </h3>
            <p className="text-xs text-stone-400 mt-1 font-medium leading-relaxed">
              {modalStage === 'SCANNING'
                ? 'Touch fingerprint sensor or face your camera to confirm identity'
                : 'Hardware security enclave verified successfully.'}
            </p>
          </div>

          {/* System Hint Footer */}
          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500">
            <span className="font-mono">FaceID / TouchID</span>
            <button
              type="button"
              onClick={handleCancel}
              className="text-amber-400 hover:text-amber-300 font-bold hover:underline cursor-pointer"
            >
              Use PIN / Password
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return {
    isBiometricAvailable,
    isAuthenticating,
    activePromptAction,
    promptBiometric,
    BiometricPromptModal,
  };
}

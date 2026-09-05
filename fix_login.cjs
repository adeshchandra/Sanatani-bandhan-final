const fs = require('fs');
let fileContent = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

const targetStr = `  // ==========================================
  // 📸 QR SCANNER ENGINE`;

const insertStr = `  // ==========================================
  // 🖐 BIOMETRIC LOGIN (WebAuthn / Passkeys)
  // ==========================================
  const handleBiometricLogin = async () => {
    try {
      if (!window.PublicKeyCredential) {
        setError('Biometric authentication is not supported on this device.');
        return;
      }

      // Allow simulation in iframe for demo purposes
      if (window.self !== window.top) {
         showToast('Preview Mode: Simulating Biometric Auth. Open in new tab for real WebAuthn.', 'success');
         // Simulate successful login after a short delay
         setLoading(true);
         setTimeout(() => {
            handleSmartLogin(undefined, 'MANAGER', '000000', true);
         }, 1000);
         return;
      }

      const publicKey = {
        challenge: new Uint8Array(32),
        rpId: window.location.hostname,
        allowCredentials: [],
        userVerification: "preferred" as UserVerificationRequirement,
      };

      const assertion = await navigator.credentials.get({ publicKey });
      if (assertion) {
        // Authenticated! In a real app we'd send assertion to server to verify against DB.
        // For the demo we simulate superadmin entry on successful physical passkey verify.
        await handleSmartLogin(undefined, 'MANAGER', '000000', true);
      }
    } catch (err: any) {
      if (err?.name === 'NotAllowedError') {
        setError('Preview restricted: Please open the app in a new tab to use Biometrics.');
      } else {
        setError('Biometric login failed or was cancelled.');
      }
      console.error(err);
    }
  };

  // ==========================================
  // 📸 QR SCANNER ENGINE`;

fileContent = fileContent.replace(targetStr, insertStr);

const targetBtnStr = `{/* QR SCAN BUTTON */}
              <button type="button" onClick={startScanner} className="w-full bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-700 font-black py-4 rounded-2xl border border-amber-200 text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 shadow-sm mb-2">
                <QrCode size={20}/> {t('scan_auto_login')}
              </button>`;

const newBtnStr = `{/* PASSWORDLESS LOGIN OPTIONS */}
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                 <button type="button" onClick={startScanner} className="flex-1 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-700 font-black py-3 sm:py-4 rounded-2xl border border-amber-200 text-[10px] sm:text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 shadow-sm">
                   <QrCode size={18}/> Scan QR
                 </button>
                 <button type="button" onClick={handleBiometricLogin} className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-700 font-black py-3 sm:py-4 rounded-2xl border border-emerald-200 text-[10px] sm:text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 shadow-sm">
                   <Fingerprint size={18}/> Passkey
                 </button>
              </div>`;

fileContent = fileContent.replace(targetBtnStr, newBtnStr);
fs.writeFileSync('src/components/public/PortalLogin.tsx', fileContent);

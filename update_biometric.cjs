const fs = require('fs');
let fileContent = fs.readFileSync('src/components/public/PortalLogin.tsx', 'utf8');

// 1. Add state variable
fileContent = fileContent.replace(
  '  const [isScanning, setIsScanning] = useState(false);',
  '  const [isScanning, setIsScanning] = useState(false);\n  const [isBiometricPromptActive, setIsBiometricPromptActive] = useState(false);'
);

// 2. Replace handleBiometricLogin function
const oldBiometricFunction = `  const handleBiometricLogin = async () => {
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
  };`;

const newBiometricFunction = `  const handleBiometricLogin = async () => {
    setIsBiometricPromptActive(true);
    try {
      if (!window.PublicKeyCredential) {
        throw new Error('Biometric authentication is not supported on this device.');
      }

      // Allow simulation in iframe for demo purposes
      if (window.self !== window.top) {
         showToast('Preview Mode: Simulating Biometric Auth. Open in new tab for real WebAuthn.', 'success');
         // Simulate successful login after a short delay
         setTimeout(() => {
            handleSmartLogin(undefined, 'MANAGER', '000000', true);
            setIsBiometricPromptActive(false);
         }, 1500);
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
        setIsBiometricPromptActive(false);
        // Authenticated! In a real app we'd send assertion to server to verify against DB.
        // For the demo we simulate superadmin entry on successful physical passkey verify.
        await handleSmartLogin(undefined, 'MANAGER', '000000', true);
      }
    } catch (err: any) {
      setIsBiometricPromptActive(false);
      if (err?.name === 'NotAllowedError') {
        setError('Preview restricted: Please open the app in a new tab to use Biometrics.');
      } else {
        setError('Biometric login failed or was cancelled.');
      }
      console.error(err);
    }
  };`;

fileContent = fileContent.replace(oldBiometricFunction, newBiometricFunction);

// 3. Add biometric UI overlay
const qrOverlay = `          {/* FULLSCREEN QR SCANNER OVERLAY */}
          {isScanning && (
            <div className="absolute inset-0 bg-stone-950 z-50 flex flex-col items-center justify-center rounded-[2.5rem] p-4">`;

const biometricOverlay = `          {/* FULLSCREEN BIOMETRIC SCANNER OVERLAY */}
          {isBiometricPromptActive && (
            <div className="absolute inset-0 bg-stone-950 z-50 flex flex-col items-center justify-center rounded-[2.5rem] p-6 animate-in zoom-in-95 duration-300">
               <button onClick={() => setIsBiometricPromptActive(false)} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full hover:bg-red-500 transition-colors z-50">
                 <X size={24}/>
               </button>
               
               <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center relative mb-6">
                 <div className="absolute inset-0 border-[3px] border-emerald-500/30 rounded-full animate-ping"></div>
                 <div className="absolute inset-2 border-[2px] border-emerald-500/50 rounded-full animate-pulse"></div>
                 <Fingerprint size={48} className="text-emerald-400 relative z-10" />
               </div>
               
               <h3 className="text-white text-lg font-black uppercase tracking-widest mb-2 text-center">Touch Sensor</h3>
               <p className="text-stone-400 text-xs font-bold text-center leading-relaxed">
                 Waiting for device biometric verification.<br/>Use Touch ID, Face ID, or your device PIN.
               </p>

               <button onClick={() => setIsBiometricPromptActive(false)} className="mt-8 text-stone-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors border-b border-stone-700 pb-1">
                 Use Manual Password Instead
               </button>
            </div>
          )}

          {/* FULLSCREEN QR SCANNER OVERLAY */}
          {isScanning && (
            <div className="absolute inset-0 bg-stone-950 z-50 flex flex-col items-center justify-center rounded-[2.5rem] p-4">`;

fileContent = fileContent.replace(qrOverlay, biometricOverlay);

fs.writeFileSync('src/components/public/PortalLogin.tsx', fileContent);

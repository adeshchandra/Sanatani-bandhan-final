const fs = require('fs');
let fileContent = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');

// 1. Add Fingerprint to lucide-react imports
if (!fileContent.includes('Fingerprint')) {
  fileContent = fileContent.replace('} from \'lucide-react\';', ', Fingerprint } from \'lucide-react\';');
}

// 2. Add state and function
const stateStr = `const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);`;
const biometricStateStr = `const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  const handleBiometricToggle = async () => {
    try {
      if (!window.PublicKeyCredential) {
        showToast('Biometric authentication is not supported on this device.', 'error');
        return;
      }

      if (!isBiometricEnabled) {
        const publicKey = {
          challenge: new Uint8Array(32),
          rp: { name: "Sanatani Bandhan", id: window.location.hostname },
          user: {
            id: new Uint8Array(16),
            name: activeMember?.email || 'user@example.com',
            displayName: activeMember?.fullName || activeMember?.name || 'User'
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: { authenticatorAttachment: "platform" },
          timeout: 60000,
        };
        const cred = await navigator.credentials.create({ publicKey });
        if (cred) {
          setIsBiometricEnabled(true);
          showToast('Biometric authentication enabled successfully!', 'success');
        }
      } else {
         setIsBiometricEnabled(false);
         showToast('Biometric authentication disabled.', 'success');
      }
    } catch (err) {
      showToast('Biometric setup failed or was cancelled.', 'error');
      console.error(err);
    }
  };`;

fileContent = fileContent.replace(stateStr, biometricStateStr);

// 3. Add UI
const targetUiStr = `<div className="border border-rose-100 bg-rose-50/50 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden mt-6">`;
const biometricUiStr = `<div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden mt-6">
                   <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className={\`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border \${isBiometricEnabled ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-stone-50 border-stone-200 text-stone-400'}\`}>
                         <Fingerprint size={24} />
                      </div>
                      <div>
                         <h3 className="text-sm font-black text-stone-900 mb-1">Biometric Authentication</h3>
                         <p className="text-xs font-bold text-stone-500 leading-relaxed max-w-sm">Use Face ID or Touch ID to log in securely without entering your PIN.</p>
                      </div>
                   </div>
                   <button
                     onClick={handleBiometricToggle}
                     className={\`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 \${isBiometricEnabled ? 'bg-emerald-500' : 'bg-stone-300'}\`}
                   >
                     <div className={\`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 \${isBiometricEnabled ? 'translate-x-6' : 'translate-x-0'}\`}></div>
                   </button>
                </div>

                <div className="border border-rose-100 bg-rose-50/50 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden mt-6">`;

fileContent = fileContent.replace(targetUiStr, biometricUiStr);

fs.writeFileSync('src/components/common/MySpaceModal.tsx', fileContent);

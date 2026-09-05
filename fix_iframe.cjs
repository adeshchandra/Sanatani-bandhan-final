const fs = require('fs');
let fileContent = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');

fileContent = fileContent.replace(
  `      if (!isBiometricEnabled) {
        const publicKey: PublicKeyCredentialCreationOptions = {`,
  `      // Prevent console errors in AI Studio iframe preview by checking frame context
      if (window.self !== window.top) {
         if (!isBiometricEnabled) {
            setIsBiometricEnabled(true);
            showToast('Preview Mode: Biometric setup simulated. Open in a new tab for real WebAuthn.', 'success');
         } else {
            setIsBiometricEnabled(false);
            showToast('Biometric authentication disabled.', 'success');
         }
         return;
      }

      if (!isBiometricEnabled) {
        const publicKey: PublicKeyCredentialCreationOptions = {`
);

fs.writeFileSync('src/components/common/MySpaceModal.tsx', fileContent);

const fs = require('fs');
let fileContent = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');

fileContent = fileContent.replace(
  `} catch (err) {
      showToast('Biometric setup failed or was cancelled.', 'error');
      console.error(err);
    }`,
  `} catch (err: any) {
      if (err?.name === 'NotAllowedError') {
        showToast('Preview restricted: Please open the app in a new tab to use Biometrics.', 'error');
      } else {
        showToast('Biometric setup failed or was cancelled.', 'error');
      }
      console.error(err);
    }`
);

fs.writeFileSync('src/components/common/MySpaceModal.tsx', fileContent);

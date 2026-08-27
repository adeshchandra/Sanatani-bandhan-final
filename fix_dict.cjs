const fs = require('fs');

let code = fs.readFileSync('src/context/LanguageContext.tsx', 'utf8');

// en
code = code.replace(
  `dashboard: 'Command Center',`,
  `dashboard: 'Command Center',\n    live_scan: 'Live Scan',\n    upload_qr: 'Upload Image',\n    qr_instruction: 'Use your Smart Pass to auto-login',\n    qr_autologin_success: 'QR Auto-Login Successful!',\n    qr_generate_fail: 'Failed to generate recovery QR',\n    login_btn: 'Secure Authentication',\n    login_success: 'Login Successful',\n    invalid_pin: 'Invalid PIN or ID',\n    qr_not_found: 'No valid QR code found in image.',\n    registered_phone_id: 'Registered Phone / ID',\n    auth_pin: 'Authentication PIN',`
);

// bn
code = code.replace(
  `dashboard: 'কমান্ড সেন্টার',`,
  `dashboard: 'কমান্ড সেন্টার',\n    live_scan: 'লাইভ স্ক্যান',\n    upload_qr: 'ছবি আপলোড করুন',\n    qr_instruction: 'অটো-লগইনের জন্য আপনার স্মার্ট পাস ব্যবহার করুন',\n    qr_autologin_success: 'কিউআর অটো-লগইন সফল!',\n    qr_generate_fail: 'রিকভারি কিউআর তৈরি করতে ব্যর্থ হয়েছে',\n    login_btn: 'নিরাপদ লগইন',\n    login_success: 'লগইন সফল',\n    invalid_pin: 'ভুল পিন বা আইডি',\n    qr_not_found: 'ছবিতে বৈধ কিউআর পাওয়া যায়নি।',\n    registered_phone_id: 'নিবন্ধিত ফোন / আইডি',\n    auth_pin: 'অ প্রমাণীকরণ পিন',`
);

// hi
code = code.replace(
  `dashboard: 'कमांड सेंटर',`,
  `dashboard: 'कमांड सेंटर',\n    live_scan: 'लाइव स्कैन',\n    upload_qr: 'छवि अपलोड करें',\n    qr_instruction: 'ऑटो-लॉगिन के लिए अपने स्मार्ट पास का उपयोग करें',\n    qr_autologin_success: 'क्यूआर ऑटो-लॉगिन सफल!',\n    qr_generate_fail: 'रिकवरी क्यूआर जनरेट करने में विफल',\n    login_btn: 'सुरक्षित प्रमाणीकरण',\n    login_success: 'लॉगिन सफल',\n    invalid_pin: 'अमान्य पिन या आईडी',\n    qr_not_found: 'छवि में कोई मान्य क्यूआर नहीं मिला।',\n    registered_phone_id: 'पंजीकृत फोन / आईडी',\n    auth_pin: 'प्रमाणीकरण पिन',`
);

fs.writeFileSync('src/context/LanguageContext.tsx', code);

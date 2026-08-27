const fs = require('fs');
let code = fs.readFileSync('src/components/devotee/MemberAppShell.tsx', 'utf8');

code = code.replace(
  "Sanatani Social Feed",
  "{safeTranslate('social_feed', 'Sanatani Social Feed', 'সনাতনী সোশ্যাল ফিড', 'सनातनी सोशल फीड', 'सनातनी सामाजिक प्रवाह')}"
);

code = code.replace(
  "Connect with the {activeWorkspace?.name} community. View daily Darshan, updates, and interact with other devotees.",
  "{safeTranslate('feed_desc', `Connect with the ${activeWorkspace?.name} community. View daily Darshan, updates, and interact with other devotees.`, `${activeWorkspace?.name} সম্প্রদায়ের সাথে যুক্ত হন। প্রতিদিনের দর্শন, আপডেট দেখুন।`, `${activeWorkspace?.name} समुदाय से जुड़ें। दैनिक दर्शन, अपडेट देखें।`)}"
);

code = code.replace(
  "Feed coming soon in Phase 3...",
  "{safeTranslate('feed_coming_soon', 'Feed coming soon in Phase 3...', 'ফেজ ৩-এ ফিড আসছে...', 'चरण ३ में फीड आ रहा है...')}"
);

code = code.replace(
  "Sanatani ID",
  "{safeTranslate('sanatani_id', 'Sanatani ID', 'সনাতনী আইডি', 'सनातनी आईडी', 'सनातनी परिचय')}"
);

code = code.replace(
  "Switch to Admin Dashboard",
  "{safeTranslate('switch_admin', 'Switch to Admin Dashboard', 'অ্যাডমিন ড্যাশবোর্ডে যান', 'एडमिन डैशबोर्ड पर जाएं', 'प्रशासक दृश्ये गच्छन्तु')}"
);

code = code.replace(
  "Sign Out",
  "{safeTranslate('sign_out', 'Sign Out', 'সাইন আউট', 'साइन आउट', 'निर्गच्छन्तु')}"
);

code = code.replace(
  `>Feed</span>`,
  `>{safeTranslate('nav_feed', 'Feed', 'ফিড', 'फीड', 'प्रवाह')}</span>`
);

code = code.replace(
  `>Purohit</span>`,
  `>{safeTranslate('nav_purohit', 'Purohit', 'পুরোহিত', 'पुरोहित', 'पुरोहित')}</span>`
);

code = code.replace(
  `>Sadhana</span>`,
  `>{safeTranslate('nav_sadhana', 'Sadhana', 'সাধনা', 'साधना', 'साधना')}</span>`
);

code = code.replace(
  `>Vivah</span>`,
  `>{safeTranslate('nav_vivah', 'Vivah', 'বিবাহ', 'विवाह', 'विवाह')}</span>`
);

code = code.replace(
  `>Profile</span>`,
  `>{safeTranslate('nav_profile', 'Profile', 'প্রোফাইল', 'प्रोफ़ाइल', 'प्रोफाइल')}</span>`
);

fs.writeFileSync('src/components/devotee/MemberAppShell.tsx', code);

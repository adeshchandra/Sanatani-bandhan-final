const fs = require('fs');

let code = fs.readFileSync('src/components/public/LandingPage.tsx', 'utf8');

const regex = /\{\/\* Footer \*\/\}[\s\S]*?\{\/\* Modals \*\/\}/;

const replacement = `      {/* Supported Organizations */}
      <section className="py-24 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            {safeTranslate('orgsTitle', 'One Platform, All Dharmic Institutions', 'এক প্ল্যাটফর্ম, সকল ধার্মিক প্রতিষ্ঠান', 'एक मंच, सभी धार्मिक संस्थान', 'एकं मञ्चं, सर्वाणि धार्मिक संस्थानानि')}
          </h2>
          <p className="text-slate-500 text-lg mb-16 max-w-2xl mx-auto font-medium">
            {safeTranslate('orgsDesc', 'Whether you run a 500-year-old Mandir or a modern Yoga retreat, our architecture adapts to your specific needs.', 'আপনি একটি ৫০০ বছরের পুরানো মন্দির বা একটি আধুনিক যোগ রিট্রিট চালান না কেন, আমাদের আর্কিটেকচার আপনার নির্দিষ্ট প্রয়োজনের সাথে খাপ খাইয়ে নেয়।', 'चाहे आप 500 साल पुराना मंदिर चलाते हों या एक आधुनिक योग रिट्रीट, हमारी वास्तुकला आपकी विशिष्ट आवश्यकताओं के अनुकूल है।', 'भवान् ५०० वर्षपुरातनं मन्दिरं वा आधुनिकं योग-आश्रमं चालयति चेदपि, अस्माकं वास्तुकला भवतः विशिष्टावश्यकतानां अनुरूपं भवति।')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {WORKSPACES.map((org, idx) => (
               <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-[#FF9933]/30 hover:bg-orange-50 transition-all flex flex-col items-center justify-center text-center cursor-default group">
                  <Building2 className="w-8 h-8 text-slate-400 group-hover:text-[#FF9933] mb-4 transition-colors" />
                  <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{org}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-24 pb-12 px-4 sm:px-6 text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF9933] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20">ॐ</div>
              <span className="font-extrabold text-lg text-white">Sanatani<span className="text-[#FF9933]">Bandhan</span></span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              {safeTranslate('footerDesc', 'The definitive cloud ERP for Hindu institutions, protecting Dharmic heritage with modern cryptography.', 'হিন্দু প্রতিষ্ঠানগুলির জন্য সুনির্দিষ্ট ক্লাউড ইআরপি, আধুনিক ক্রিপ্টোগ্রাফি দিয়ে ধার্মিক ঐতিহ্য রক্ষা করে।', 'हिंदू संस्थानों के लिए निश्चित क्लाउड ईआरपी, आधुनिक क्रिप्टोग्राफी के साथ धार्मिक विरासत की रक्षा करता है।', 'हिन्दू संस्थानानां कृते निश्चितं मेघ ईआरपी, आधुनिक क्रिप्टोग्राफी इत्यनेन धार्मिक धरोहरस्य रक्षणं करोति।')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{safeTranslate('ftPlatform', 'Platform', 'প্ল্যাটফর্ম', 'प्लेटफ़ॉर्म', 'मञ्चः')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">{safeTranslate('navFeatures', 'Features', 'বৈশিষ্ট্য', 'सुविधाएँ', 'सुविधाः')}</button></li>
              <li><button onClick={() => scrollTo('why-us')} className="hover:text-white transition-colors">{safeTranslate('navWhyUs', 'Why Us', 'কেন আমরা', 'हम क्यों', 'वयम् किमर्थम्')}</button></li>
              <li><button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors">{safeTranslate('navPricing', 'Pricing', 'মূল্য', 'मूल्य निर्धारण', 'मूल्यनिर्धारणम्')}</button></li>
              <li><button onClick={() => setDemoModalOpen(true)} className="hover:text-white transition-colors">{safeTranslate('btnDemo', 'Explore Demo Sandbox', 'ডেমো স্যান্ডবক্স দেখুন', 'डेमो सैंडबॉक्स देखें', 'डेमो सैंडबॉक्स पश्यन्तु')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{safeTranslate('ftLegal', 'Legal & Security', 'আইনি ও নিরাপত্তা', 'कानूनी और सुरक्षा', 'कानूनी एवं सुरक्षा')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => setPrivacyOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setTosOpen(true)} className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button onClick={() => setSecurityOpen(true)} className="hover:text-white transition-colors">Security Architecture</button></li>
              <li><span className="text-emerald-500 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> ISO 27001 Ready</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{safeTranslate('ftSupport', 'Support', 'সাপোর্ট', 'समर्थन', 'समर्थनम्')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="mailto:support@sanatanibandhan.com" className="hover:text-white transition-colors">Contact Engineering</a></li>
              <li><span className="text-slate-500">24/7 Priority Support (Enterprise)</span></li>
              <li className="pt-4 mt-4 border-t border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-2">Build Status</div>
                <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  All Systems Operational
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Sanatani Bandhan. Universal Community Management.</p>
          <p>Made with ❤️ by TrackIQ Academy in Bharat.</p>
        </div>
      </footer>

      {/* Modals */}`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/public/LandingPage.tsx', code);

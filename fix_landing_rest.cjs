const fs = require('fs');

let code = fs.readFileSync('src/components/public/LandingPage.tsx', 'utf8');

const additionalSections = `
      {/* Why Us Section */}
      <section id="why-us" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {safeTranslate('whyTitle', 'Designed strictly for Dharmic Institutions.', 'শুধুমাত্র ধার্মিক প্রতিষ্ঠানের জন্য ডিজাইন করা হয়েছে।', 'धार्मिक संस्थानों के लिए विशेष रूप से डिज़ाइन किया गया।', 'धार्मिक संस्थानानां कृते विशेषरूपेण निर्मितम्।')}
            </h2>
            <p className="text-slate-500 text-lg mb-8 font-medium">
              {safeTranslate('whyDesc', 'Generic CRMs dont understand Gotra, Tithis, or offline rural donations. Sanatani Bandhan is architected from the ground up incorporating Shastric rules and rural Bharat realities.', 'সাধারণ সিআরএম গোত্র, তিথি বা অফলাইন অনুদান বোঝে না। সনাতনী বন্ধন শাস্ত্রীয় নিয়মগুলিকে অন্তর্ভুক্ত করে তৈরি।', 'सामान्य सीआरएम गोत्र, तिथि या ऑफलाइन दान को नहीं समझते हैं। सनातनी बंधन शास्त्रीय नियमों को शामिल करके बनाया गया है।', 'सामान्य सीआरएम गोत्र, तिथि वा ऑफलाइन दानं न अवगच्छति। सनातनी बन्धन शास्त्रीय नियमान् समावेश्य निर्मितम् अस्ति।')}
            </p>
            
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                     <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-slate-900 mb-1">{safeTranslate('why1Title', 'Multi-Lingual Core', 'বহুভাষিক কোর', 'बहुभाषी कोर', 'बहुभाषी कोर')}</h4>
                     <p className="text-slate-500 text-sm">{safeTranslate('why1Desc', 'Available in English, Hindi, Bengali, and Sanskrit.', 'ইংরেজি, হিন্দি, বাংলা এবং সংস্কৃতে উপলব্ধ।', 'अंग्रेजी, हिंदी, बंगाली और संस्कृत में उपलब्ध।', 'आङ्ग्ल, हिन्दी, बाङ्गला एवं संस्कृत भाषायां उपलब्धम्।')}</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                     <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-slate-900 mb-1">{safeTranslate('why2Title', 'Built by Sevadars', 'সেবাদারদের দ্বারা নির্মিত', 'सेवादारों द्वारा निर्मित', 'सेवादारैः निर्मितम्')}</h4>
                     <p className="text-slate-500 text-sm">{safeTranslate('why2Desc', 'We understand the unique pains of committee management.', 'আমরা কমিটি পরিচালনার অনন্য সমস্যাগুলি বুঝি।', 'हम समिति प्रबंधन के अनूठे दर्दों को समझते हैं।', 'वयं समिति प्रबन्धनस्य अद्वितीय समस्यां अवगच्छामः।')}</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="lg:w-1/2">
             <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/60 shadow-xl relative">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-[#FF9933]/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="space-y-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                           <div className="h-3 w-1/3 bg-slate-200 rounded animate-pulse"></div>
                           <div className="h-2 w-1/2 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA */}`;

code = code.replace(`      {/* CTA */}`, additionalSections);

fs.writeFileSync('src/components/public/LandingPage.tsx', code);

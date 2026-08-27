const fs = require('fs');

let code = fs.readFileSync('src/components/public/LandingPage.tsx', 'utf8');

const additionalSections = `      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
             {safeTranslate('priceTitle', 'Transparent & Dharmic Pricing', 'স্বচ্ছ এবং ধার্মিক মূল্য', 'पारदर्शी और धार्मिक मूल्य निर्धारण', 'पारदर्शी एवं धार्मिक मूल्यनिर्धारणम्')}
          </h2>
          <p className="text-slate-500 text-lg mb-16 max-w-2xl mx-auto font-medium">
             {safeTranslate('priceDesc', 'We do not charge per devotee. Pay a single flat platform fee and scale infinitely.', 'আমরা ভক্ত প্রতি চার্জ করি না। একটি একক ফ্ল্যাট ফি প্রদান করুন।', 'हम प्रति भक्त शुल्क नहीं लेते हैं। एक ही फ्लैट शुल्क का भुगतान करें।', 'वयं प्रति भक्तं शुल्कं न गृह्णामः। केवलं एकं फ्लॅट शुल्कं ददातु।')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
             {/* Free Tier */}
             <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{safeTranslate('price1', 'Seva Tier', 'সেবা স্তর', 'सेवा टियर', 'सेवा स्तरः')}</h3>
                <div className="text-4xl font-black text-[#FF9933] mb-6">₹0 <span className="text-sm font-medium text-slate-400">/ forever</span></div>
                <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 text-slate-600"><CheckCircle className="w-5 h-5 text-emerald-500" /> Up to 500 Devotees</li>
                   <li className="flex items-center gap-3 text-slate-600"><CheckCircle className="w-5 h-5 text-emerald-500" /> Basic Treasury & Receipts</li>
                   <li className="flex items-center gap-3 text-slate-600"><CheckCircle className="w-5 h-5 text-emerald-500" /> 1 Admin Account</li>
                </ul>
                <button onClick={onSignupClick} className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                   {safeTranslate('startFree', 'Start Free', 'বিনামূল্যে শুরু করুন', 'मुफ़्त शुरू करें', 'निःशुल्कं आरम्भं कुर्वन्तु')}
                </button>
             </div>

             {/* Enterprise Tier */}
             <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden transform md:-translate-y-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9933]/20 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute top-4 right-4 bg-[#FF9933] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                   Recommended
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{safeTranslate('price2', 'Enterprise Tier', 'এন্টারপ্রাইজ স্তর', 'एंटरप्राइज टियर', 'एंटरप्राइज स्तरः')}</h3>
                <div className="text-4xl font-black text-white mb-6">₹4,999 <span className="text-sm font-medium text-slate-400">/ month</span></div>
                <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-5 h-5 text-[#FF9933]" /> Unlimited Devotees</li>
                   <li className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-5 h-5 text-[#FF9933]" /> All 46 Shastric Modules</li>
                   <li className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-5 h-5 text-[#FF9933]" /> Custom Domain & Branding</li>
                   <li className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-5 h-5 text-[#FF9933]" /> Unlimited Admin Accounts</li>
                </ul>
                <button onClick={onSignupClick} className="w-full py-4 rounded-xl bg-[#FF9933] hover:bg-orange-600 text-white font-bold transition-colors shadow-lg">
                   {safeTranslate('upgrade', 'Upgrade to Enterprise', 'এন্টারপ্রাইজে আপগ্রেড করুন', 'एंटरप्राइज में अपग्रेड करें', 'एंटरप्राइज स्तरे उन्नयनं कुर्वन्तु')}
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
               {safeTranslate('faqTitle', 'Frequently Asked Questions', 'সাধারণ জিজ্ঞাসা', 'सामान्य प्रश्न', 'सामान्य प्रश्नाः')}
            </h2>
          </div>
          
          <div className="space-y-4">
             {[
               { q: safeTranslate('faq1q', 'Is my data secure?', 'আমার ডেটা কি সুরক্ষিত?', 'क्या मेरा डेटा सुरक्षित है?', 'किं मम दत्तांशः सुरक्षितः अस्ति?'), a: safeTranslate('faq1a', 'Yes, we use AES-256 encryption. Your data is never shared.', 'হ্যাঁ, আমরা AES-256 এনক্রিপশন ব্যবহার করি।', 'हां, हम AES-256 एन्क्रिप्शन का उपयोग करते हैं।', 'आम्, वयं AES-256 एन्क्रिप्शन उपयुञ्ज्महे।') },
               { q: safeTranslate('faq2q', 'Can I migrate from Excel?', 'আমি কি এক্সেল থেকে মাইগ্রেট করতে পারি?', 'क्या मैं एक्सेल से माइग्रेट कर सकता हूँ?', 'किं अहं एक्सेल् तः स्थलांतरितुं शक्नोमि?'), a: safeTranslate('faq2a', 'Absolutely. Our Bulk Import desk handles it in seconds.', 'হ্যাঁ, আমাদের বাল্ক ইমপোর্ট ডেস্ক এটি সেকেন্ডের মধ্যে পরিচালনা করে।', 'हाँ, हमारा बल्क इंपोर्ट डेस्क इसे सेकंडों में संभालता है।', 'आम्, अस्माकं बल्क इंपोर्ट डेस्क तत् क्षणात् सम्पादयति।') },
             ].map((faq, idx) => (
               <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                     <span className="font-bold text-slate-900">{faq.q}</span>
                     <ChevronDown className={\`w-5 h-5 text-slate-400 transition-transform \${openFaq === idx ? 'rotate-180' : ''}\`} />
                  </button>
                  {openFaq === idx && (
                     <div className="px-6 py-4 bg-white text-slate-600 font-medium">
                        {faq.a}
                     </div>
                  )}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}`;

code = code.replace(`      {/* CTA */}`, additionalSections);

fs.writeFileSync('src/components/public/LandingPage.tsx', code);

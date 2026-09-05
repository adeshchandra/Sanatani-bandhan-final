import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Building2, Globe2, HeartHandshake, Sparkles, 
  Menu, X, CheckCircle, Smartphone, Lock, BookOpen, Users, Receipt, Send, ChevronDown
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { SecurityWhitepaper } from './SecurityWhitepaper';
import { DemoSelectionModal } from './DemoSelectionModal';
import { HelpSupport } from './HelpSupport';
import { WorkspaceType } from '../../types';

export const LandingPage: React.FC<{ 
  onLoginClick: () => void; 
  onSignupClick: () => void;
  onDemoStart: (type: WorkspaceType) => void;
}> = ({
  onLoginClick, onSignupClick, onDemoStart
}) => {
  const { language, setLanguage, safeTranslate } = useLanguage();
  const { showToast } = useToast();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  // Modals
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [tosOpen, setTosOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const PAIN_SOLVER_MATRIX = [
    {
      pain: safeTranslate('p1', 'Tattered & Lost Physical Khatas', 'ছেঁড়া এবং হারিয়ে যাওয়া খাতা', 'फटे और खोए हुए भौतिक खाते'),
      painDesc: safeTranslate('pd1', 'Paper record books tear, get water-damaged, or take hours to search during festival crowds.'),
      solution: safeTranslate('s1', 'Encrypted Cloud Devotee CRM', 'এনক্রিপ্টেড ক্লাউড ডিভোটি সিআরএম', 'एन्क्रिप्टेड क्लाउड भक्त सीआरएम'),
      solutionDesc: safeTranslate('sd1', 'Search thousands of profiles by Name, Phone, Blood Group.', 'নাম, ফোন, রক্তের গ্রুপ দ্বারা হাজার হাজার প্রোফাইল খুঁজুন।', 'नाम, फोन, रक्त समूह द्वारा हजारों प्रोफाइल खोजें।')
    },
    {
      pain: safeTranslate('p2', 'Financial Suspicion & Cash Disputes', 'আর্থিক সন্দেহ ও বিবাদ', 'वित्तीय संदेह और नकद विवाद'),
      painDesc: safeTranslate('pd2', 'Missing cash receipts and calculation errors cause committee infighting.', 'হারানো রসিদ এবং হিসাবের ভুলের কারণে কমিটিতে বিবাদ দেখা দেয়।', 'गुम नकद रसीदें और गणना की त्रुटियों से समिति में कलह होती है।'),
      solution: safeTranslate('s2', 'Double-Entry Audited Treasury', 'দ্বৈত-ভুক্তি অডিটেড রাজকোষ', 'डबल-एंट्री ऑडिटेड ट्रेजरी'),
      solutionDesc: safeTranslate('sd2', 'Mandatory custodian tracking and instant branded PDF receipts.', 'বাধ্যতামূলক কাস্টোডিয়ান ট্র্যাকিং এবং তাৎক্ষণিক পিডিএফ রসিদ।', 'अनिवार्य कस्टोडियन ट्रैकिंग और तत्काल पीडीएफ रसीदें।')
    },
    {
      pain: safeTranslate('p3', 'Exhausting Event Invitation Calls', 'ক্লান্তিকর ইভেন্ট আমন্ত্রণের কল', 'थकाऊ इवेंट आमंत्रण कॉल'),
      painDesc: safeTranslate('pd3', 'Calling 500+ devotees individually before every Puja is exhausting.', 'প্রতিটি পূজার আগে ৫০০-এর বেশি ভক্তকে আলাদাভাবে কল করা খুব ক্লান্তিকর।', 'हर पूजा से पहले 500 से अधिक भक्तों को व्यक्तिगत रूप से बुलाना थका देने वाला है।'),
      solution: safeTranslate('s3', '1-Click Sandesh Broadcasts', '১-ক্লিক বার্তা সম্প্রচার', '1-क्लिक संदेश ब्रॉडकास्ट'),
      solutionDesc: safeTranslate('sd3', 'Dispatch automated WhatsApp and SMS alerts for festivals and Tithis.', 'উৎসব ও তিথির জন্য স্বয়ংক্রিয় হোয়াটসঅ্যাপ ও এসএমএস সতর্কতা পাঠান।', 'त्योहारों और तिथियों के लिए स्वचालित व्हाट्सएप और एसएमएस अलर्ट भेजें।')
    }
  ];

  const WORKSPACES = [
    'MANDIR', 'GOSHALA', 'SANGHA', 'ASHRAM', 'GURUKUL', 'SATSANG', 'YOGA_CENTER', 'TRUST', 'TIRTH', 'SAMAJ'
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-[#FF9933] selection:text-white">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "name": "Sanatani Bandhan",
                "operatingSystem": "Web browser",
                "applicationCategory": "BusinessApplication",
                "description": "Enterprise grade cloud-based temple management software (ERP) for Mandirs, Goshalas, and Ashrams.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                }
              },
              {
                "@type": "Organization",
                "name": "Sanatani Bandhan",
                "url": "https://sanatanibandhan.com",
                "logo": "https://sanatanibandhan.com/logo.png",
                "description": "Provider of modern Dharmic administration and temple management software."
              }
            ]
          })
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="Sanatani Bandhan" 
              className="w-10 h-10 rounded-xl object-contain shadow-md transition-transform hover:scale-105" 
              onError={(e) => { e.currentTarget.src = '/icon-192x192.png'; }}
            />
            <span className="font-extrabold text-xl tracking-tight text-slate-900 block">
              Sanatani<span className="text-[#FF9933]">Bandhan</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollTo('features')} className="text-sm font-bold text-slate-600 hover:text-[#FF9933] transition-colors">{safeTranslate('navFeatures', 'Features', 'বৈশিষ্ট্য', 'सुविधाएँ')}</button>
            <button onClick={() => scrollTo('why-us')} className="text-sm font-bold text-slate-600 hover:text-[#FF9933] transition-colors">{safeTranslate('navWhyUs', 'Why Us', 'কেন আমরা', 'हम क्यों')}</button>
            <button onClick={() => scrollTo('pricing')} className="text-sm font-bold text-slate-600 hover:text-[#FF9933] transition-colors">{safeTranslate('navPricing', 'Pricing', 'মূল্য', 'मूल्य निर्धारण')}</button>
            
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'bn' | 'sa')}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl focus:ring-2 focus:ring-[#FF9933]/50 focus:border-[#FF9933] block px-4 py-2.5 outline-none cursor-pointer hover:bg-slate-100 transition-all shadow-sm"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिंदी (HI)</option>
              <option value="bn">বাংলা (BN)</option>
              <option value="sa">संस्कृतम् (SA)</option>
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={onLoginClick} className="text-sm font-bold text-slate-700 hover:text-[#FF9933] transition-colors">
              {safeTranslate('navLogin', 'Login', 'লগ ইন', 'लॉग इन')}
            </button>
            <button onClick={onSignupClick} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              {safeTranslate('navCreate', 'Create Free Account', 'বিনামূল্যে অ্যাকাউন্ট', 'मुफ्त खाता बनाएं')}
            </button>
          </div>

          <button className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-2xl flex flex-col p-4 gap-2 animate-in slide-in-from-top-2 duration-200">
            <button onClick={() => scrollTo('features')} className="text-left font-bold text-slate-700 py-3 px-2 rounded-lg hover:bg-slate-50">{safeTranslate('navFeatures', 'Features', 'বৈশিষ্ট্য', 'सुविधाएँ')}</button>
            <button onClick={() => scrollTo('why-us')} className="text-left font-bold text-slate-700 py-3 px-2 rounded-lg hover:bg-slate-50">{safeTranslate('navWhyUs', 'Why Us', 'কেন আমরা', 'हम क्यों')}</button>
            <button onClick={() => scrollTo('pricing')} className="text-left font-bold text-slate-700 py-3 px-2 rounded-lg hover:bg-slate-50">{safeTranslate('navPricing', 'Pricing', 'মূল্য', 'मूल्य निर्धारण')}</button>
            
            <div className="px-2 py-3">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Language / भाषा</p>
               <select 
                 value={language}
                 onChange={(e) => { setLanguage(e.target.value as 'en' | 'hi' | 'bn' | 'sa'); setIsMobileMenuOpen(false); }}
                 className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl focus:ring-2 focus:ring-[#FF9933]/50 focus:border-[#FF9933] block px-4 py-3 outline-none cursor-pointer hover:bg-slate-100 transition-all shadow-sm"
               >
                 <option value="en">English (EN)</option>
                 <option value="hi">हिंदी (HI)</option>
                 <option value="bn">বাংলা (BN)</option>
                 <option value="sa">संस्कृतम् (SA)</option>
               </select>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <button onClick={onLoginClick} className="w-full py-3 text-center border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors">{safeTranslate('navLogin', 'Login', 'লগ ইন', 'लॉग इन')}</button>
              <button onClick={onSignupClick} className="w-full py-3 text-center bg-gradient-to-r from-[#FF9933] to-orange-500 rounded-xl font-bold text-white shadow-lg">{safeTranslate('navCreate', 'Create Free Account', 'বিনামূল্যে অ্যাকাউন্ট', 'मुफ्त खाता बनाएं')}</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-stone-50 to-white">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-[#FF9933]/10 to-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            {safeTranslate('heroBadge', 'Enterprise Grade ERP', 'এন্টারপ্রাইজ গ্রেড ইআরপি', 'एंटरप्राइज ग्रेड ईआरपी')}
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-8 max-w-5xl">
            {safeTranslate('heroTitle1', 'Modern Dharmic Administration,', 'আধুনিক ধার্মিক প্রশাসন,')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-orange-600">{safeTranslate('heroTitle2', 'Unified & Secured.', 'একত্রিত ও সুরক্ষিত।', 'एकीकृत और सुरक्षित।')}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
            {safeTranslate('heroDesc', 'Unify your Mandir, Goshala, or Ashram operations with military-grade security. Manage devotees, donations, and assets seamlessly in one cloud ERP.', 'আপনার মন্দির, গোশালা বা আশ্রম পরিচালনাকে সামরিক-স্তরের সুরক্ষার সাথে একীভূত করুন। একটি ক্লাউড ইআরপিতে ভক্ত, দান এবং সম্পদ পরিচালনা করুন।', 'सैन्य-श्रेणी की सुरक्षा के साथ अपने मंदिर, गौशाला या आश्रम संचालन को एकीकृत करें। एक क्लाउड ईआरपी में भक्तों, दान और संपत्तियों का निर्बाध रूप से प्रबंधन करें।')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full max-w-md mx-auto sm:max-w-none">
            <button onClick={onSignupClick} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#FF9933] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-bold text-lg transition-all shadow-[0_8px_20px_rgba(255,153,51,0.3)] hover:shadow-[0_12px_25px_rgba(255,153,51,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
              {safeTranslate('btnStart', 'Start Operating Now', 'এখনই শুরু করুন', 'अभी शुरू करें')} <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => setDemoModalOpen(true)} className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold text-lg transition-all hover:bg-slate-50 flex items-center justify-center gap-2 shadow-sm">
              <Building2 className="w-5 h-5 text-slate-400" /> {safeTranslate('btnDemo', 'Explore Demo Sandbox', 'ডেমো স্যান্ডবক্স দেখুন', 'डेमो सैंडबॉक्स देखें')}
            </button>
          </div>
          
          <div className="mt-16 pt-10 border-t border-slate-200/60 w-full max-w-4xl flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-bold text-slate-500">
             <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF9933]" /> {safeTranslate('trust1', 'ISO 27001 Ready', 'ISO 27001 প্রস্তুত', 'ISO 27001 तैयार')}</div>
             <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF9933]" /> {safeTranslate('trust2', 'AES-256 Encryption', 'AES-256 এনক্রিপশন', 'AES-256 एन्क्रिप्शन')}</div>
             <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF9933]" /> {safeTranslate('trust3', 'Offline-First Tech', 'অফলাইন-ফার্স্ট প্রযুক্তি', 'ऑफ़लाइन-फर्स्ट तकनीक')}</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {safeTranslate('featTitle', 'Solve Real Operational Pains', 'বাস্তব সমস্যা সমাধান করুন', 'वास्तविक परिचालन दर्द का समाधान करें')}
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
               {safeTranslate('featDesc', 'Built by administrators, for administrators. We replace chaotic WhatsApp groups and paper books with structured, audited software.')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PAIN_SOLVER_MATRIX.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full hover:border-[#FF9933]/30">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-md mb-4 border border-rose-100">
                    {safeTranslate('painLabel', 'The Problem', 'সমস্যা', 'समस्या')}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{item.pain}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.painDesc}</p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-md mb-4 border border-emerald-100">
                    {safeTranslate('solLabel', 'Sanatani Bandhan Solution', 'সনাতনী বন্ধন সমাধান', 'सनातनी बंधन समाधान')}
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                       <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.solution}</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.solutionDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Us Section */}
      <section id="why-us" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {safeTranslate('whyTitle', 'Designed strictly for Dharmic Institutions.', 'শুধুমাত্র ধার্মিক প্রতিষ্ঠানের জন্য ডিজাইন করা হয়েছে।', 'धार्मिक संस्थानों के लिए विशेष रूप से डिज़ाइन किया गया।')}
            </h2>
            <p className="text-slate-500 text-lg mb-8 font-medium">
              {safeTranslate('whyDesc', 'Generic CRMs dont understand Gotra, Tithis, or offline rural donations. Sanatani Bandhan is architected from the ground up incorporating Shastric rules and rural Bharat realities.')}
            </p>
            
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                     <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-slate-900 mb-1">{safeTranslate('why1Title', 'Multi-Lingual Core', 'বহুভাষিক কোর', 'बहुभाषी कोर')}</h4>
                     <p className="text-slate-500 text-sm">{safeTranslate('why1Desc', 'Available in English, Hindi, Bengali, and Sanskrit.')}</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                     <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-slate-900 mb-1">{safeTranslate('why2Title', 'Built by Sevadars', 'সেবাদারদের দ্বারা নির্মিত', 'सेवादारों द्वारा निर्मित')}</h4>
                     <p className="text-slate-500 text-sm">{safeTranslate('why2Desc', 'We understand the unique pains of committee management.', 'আমরা কমিটি পরিচালনার অনন্য সমস্যাগুলি বুঝি।', 'हम समिति प्रबंधन के अनूठे दर्दों को समझते हैं।')}</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="lg:w-1/2">
             <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/60 shadow-xl relative">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-[#FF9933]/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="space-y-4">
                   {[1,2,3].map((i, idx) => (
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

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
             {safeTranslate('priceTitle', 'Transparent & Dharmic Pricing', 'স্বচ্ছ এবং ধার্মিক মূল্য', 'पारदर्शी और धार्मिक मूल्य निर्धारण')}
          </h2>
          <p className="text-slate-500 text-lg mb-16 max-w-2xl mx-auto font-medium">
             {safeTranslate('priceDesc', 'We do not charge per devotee. Pay a single flat platform fee and scale infinitely.', 'আমরা ভক্ত প্রতি চার্জ করি না। একটি একক ফ্ল্যাট ফি প্রদান করুন।', 'हम प्रति भक्त शुल्क नहीं लेते हैं। एक ही फ्लैट शुल्क का भुगतान करें।')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
             {/* Free Tier */}
             <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{safeTranslate('price1', 'Seva Tier', 'সেবা স্তর', 'सेवा टियर')}</h3>
                <div className="text-4xl font-black text-[#FF9933] mb-6">₹0 <span className="text-sm font-medium text-slate-400">/ forever</span></div>
                <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 text-slate-600"><CheckCircle className="w-5 h-5 text-emerald-500" /> Up to 500 Devotees</li>
                   <li className="flex items-center gap-3 text-slate-600"><CheckCircle className="w-5 h-5 text-emerald-500" /> Basic Treasury & Receipts</li>
                   <li className="flex items-center gap-3 text-slate-600"><CheckCircle className="w-5 h-5 text-emerald-500" /> 1 Admin Account</li>
                </ul>
                <button onClick={onSignupClick} className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                   {safeTranslate('startFree', 'Start Free', 'বিনামূল্যে শুরু করুন', 'मुफ़्त शुरू करें')}
                </button>
             </div>

             {/* Enterprise Tier */}
             <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden transform md:-translate-y-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9933]/20 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute top-4 right-4 bg-[#FF9933] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                   Recommended
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{safeTranslate('price2', 'Enterprise Tier', 'এন্টারপ্রাইজ স্তর', 'एंटरप्राइज टियर')}</h3>
                <div className="text-4xl font-black text-white mb-6">₹4,999 <span className="text-sm font-medium text-slate-400">/ month</span></div>
                <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-5 h-5 text-[#FF9933]" /> Unlimited Devotees</li>
                   <li className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-5 h-5 text-[#FF9933]" /> All 46 Shastric Modules</li>
                   <li className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-5 h-5 text-[#FF9933]" /> Custom Domain & Branding</li>
                   <li className="flex items-center gap-3 text-slate-300"><CheckCircle className="w-5 h-5 text-[#FF9933]" /> Unlimited Admin Accounts</li>
                </ul>
                <button onClick={onSignupClick} className="w-full py-4 rounded-xl bg-[#FF9933] hover:bg-orange-600 text-white font-bold transition-colors shadow-lg">
                   {safeTranslate('upgrade', 'Upgrade to Enterprise', 'এন্টারপ্রাইজে আপগ্রেড করুন', 'एंटरप्राइज में अपग्रेड करें')}
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
               {safeTranslate('faqTitle', 'Frequently Asked Questions', 'সাধারণ জিজ্ঞাসা', 'सामान्य प्रश्न')}
            </h2>
          </div>
          
          <div className="space-y-4">
             {[
               { q: safeTranslate('faq1q', 'Is my data secure?', 'আমার ডেটা কি সুরক্ষিত?', 'क्या मेरा डेटा सुरक्षित है?'), a: safeTranslate('faq1a', 'Yes, we use AES-256 encryption. Your data is never shared.', 'হ্যাঁ, আমরা AES-256 এনক্রিপশন ব্যবহার করি। আপনার ডেটা কখনই শেয়ার করা হয় না।', 'हां, हम AES-256 एन्क्रिप्शन का उपयोग करते हैं। आपका डेटा कभी भी साझा नहीं किया जाता है।') },
               { q: safeTranslate('faq2q', 'Can I migrate from Excel?', 'আমি কি এক্সেল থেকে মাইগ্রেট করতে পারি?', 'क्या मैं एक्सेल से माइग्रेट कर सकता हूँ?'), a: safeTranslate('faq2a', 'Absolutely. Our Bulk Import desk handles it in seconds.', 'হ্যাঁ, আমাদের বাল্ক ইমপোর্ট ডেস্ক এটি সেকেন্ডের মধ্যে পরিচালনা করে।') },
             ].map((faq, idx) => (
               <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                     <span className="font-bold text-slate-900">{faq.q}</span>
                     <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
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

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-slate-950 text-white text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF9933] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight leading-tight">
            {safeTranslate('ctaTitle', 'Ready to modernize your Dharma?', 'আপনার ধর্মকে আধুনিক করতে প্রস্তুত?', 'अपने धर्म को आधुनिक बनाने के लिए तैयार हैं?')}
          </h2>
          <button onClick={onSignupClick} className="px-10 py-5 bg-[#FF9933] hover:bg-orange-600 rounded-2xl font-black text-xl transition-all shadow-[0_0_30px_rgba(255,153,51,0.3)] hover:shadow-[0_0_40px_rgba(255,153,51,0.5)] hover:-translate-y-1">
            {safeTranslate('ctaBtn', 'Create Your Workspace', 'আপনার ওয়ার্কস্পেস তৈরি করুন', 'अपना कार्यक्षेत्र बनाएं')}
          </button>
        </div>
      </section>

            {/* Supported Organizations */}
      <section className="py-24 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            {safeTranslate('orgsTitle', 'One Platform, All Dharmic Institutions', 'এক প্ল্যাটফর্ম, সকল ধার্মিক প্রতিষ্ঠান', 'एक मंच, सभी धार्मिक संस्थान')}
          </h2>
          <p className="text-slate-500 text-lg mb-16 max-w-2xl mx-auto font-medium">
            {safeTranslate('orgsDesc', 'Whether you run a 500-year-old Mandir or a modern Yoga retreat, our architecture adapts to your specific needs.', 'আপনি একটি ৫০০ বছরের পুরানো মন্দির বা একটি আধুনিক যোগ রিট্রিট চালান না কেন, আমাদের আর্কিটেকচার আপনার নির্দিষ্ট প্রয়োজনের সাথে খাপ খাইয়ে নেয়।', 'चाहे आप 500 साल पुराना मंदिर चलाते हों या एक आधुनिक योग रिट्रीट, हमारी वास्तुकला आपकी विशिष्ट आवश्यकताओं के अनुकूल है।')}
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img 
                src="/logo.svg" 
                alt="Sanatani Bandhan" 
                className="w-9 h-9 rounded-xl object-contain shadow-md" 
                onError={(e) => { e.currentTarget.src = '/icon-192x192.png'; }}
              />
              <span className="font-extrabold text-lg text-white">Sanatani<span className="text-[#FF9933]">Bandhan</span></span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs mx-auto md:mx-0">
              {safeTranslate('footerDesc', 'The definitive cloud ERP for Hindu institutions, protecting Dharmic heritage with modern cryptography.', 'হিন্দু প্রতিষ্ঠানগুলির জন্য সুনির্দিষ্ট ক্লাউড ইআরপি, আধুনিক ক্রিপ্টোগ্রাফি দিয়ে ধার্মিক ঐতিহ্য রক্ষা করে।', 'हिंदू संस्थानों के लिए निश्चित क्लाउड ईआरपी, आधुनिक क्रिप्टोग्राफी के साथ धार्मिक विरासत की रक्षा करता है।')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{safeTranslate('ftPlatform', 'Platform', 'প্ল্যাটফর্ম', 'प्लेटफ़ॉर्म')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">{safeTranslate('navFeatures', 'Features', 'বৈশিষ্ট্য', 'सुविधाएँ')}</button></li>
              <li><button onClick={() => scrollTo('why-us')} className="hover:text-white transition-colors">{safeTranslate('navWhyUs', 'Why Us', 'কেন আমরা', 'हम क्यों')}</button></li>
              <li><button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors">{safeTranslate('navPricing', 'Pricing', 'মূল্য', 'मूल्य निर्धारण')}</button></li>
              <li><button onClick={() => setDemoModalOpen(true)} className="hover:text-white transition-colors">{safeTranslate('btnDemo', 'Explore Demo Sandbox', 'ডেমো স্যান্ডবক্স দেখুন', 'डेमो सैंडबॉक्स देखें')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{safeTranslate('ftLegal', 'Legal & Security', 'আইনি ও নিরাপত্তা', 'कानूनी और सुरक्षा')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => setPrivacyOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setTosOpen(true)} className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button onClick={() => setSecurityOpen(true)} className="hover:text-white transition-colors">Security Architecture</button></li>
              <li><span className="text-emerald-500 flex items-center justify-center md:justify-start gap-2"><CheckCircle className="w-4 h-4"/> ISO 27001 Ready</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{safeTranslate('ftSupport', 'Support', 'সাপোর্ট', 'समर्थन')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => setHelpOpen(true)} className="hover:text-white transition-colors">Help & Support Center</button></li>
              <li><a href="mailto:support@sanatanibandhan.com" className="hover:text-white transition-colors">Contact Engineering</a></li>
              <li><span className="text-slate-500">24/7 Priority Support (Enterprise)</span></li>
              <li className="pt-4 mt-4 border-t border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-2">Build Status</div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-500 text-sm font-bold">
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

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Sanatani Bandhan. Universal Community Management.</p>
          <p>Made with ❤️ by TrackIQ Academy in Bharat.</p>
        </div>
      </footer>

      {/* Modals */}
      {privacyOpen && <PrivacyPolicy onClose={() => setPrivacyOpen(false)} />}
      {tosOpen && <TermsOfService onClose={() => setTosOpen(false)} />}
      {securityOpen && <SecurityWhitepaper onClose={() => setSecurityOpen(false)} />}
      {helpOpen && <HelpSupport onClose={() => setHelpOpen(false)} />}
      {demoModalOpen && (
        <DemoSelectionModal 
          isOpen={demoModalOpen}
          onClose={() => setDemoModalOpen(false)} 
          onSelect={onDemoStart}
        />
      )}
    </div>
  );
};

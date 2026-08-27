const fs = require('fs');

const code = `import React, { useState } from 'react';
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

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const PAIN_SOLVER_MATRIX = [
    {
      pain: safeTranslate('p1', 'Tattered & Lost Physical Khatas', 'ছেঁড়া এবং হারিয়ে যাওয়া খাতা', 'फटे और खोए हुए भौतिक खाते', 'जीर्ण नष्ट भौतिक पञ्जिका'),
      painDesc: safeTranslate('pd1', 'Paper record books tear, get water-damaged, or take hours to search during festival crowds.', 'কাগজের খাতা ছিঁড়ে যায় বা ভিড়ের সময় খুঁজতে অনেক সময় লাগে।', 'त्योहार की भीड़ में कागजी किताबों को खोजने में घंटों लगते हैं।', 'उत्सवेषु कागदपुस्तकानि अन्वेष्टुं बहु समयः लगति।'),
      solution: safeTranslate('s1', 'Encrypted Cloud Devotee CRM', 'এনক্রিপ্টেড ক্লাউড ডিভোটি সিআরএম', 'एन्क्रिप्टेड क्लाउड भक्त सीआरएम', 'गुप्ताक्षरीकृत मेघ भक्त सीआरएम'),
      solutionDesc: safeTranslate('sd1', 'Search thousands of profiles by Name, Phone, Blood Group, or Gotra in milliseconds.', 'নাম, ফোন, রক্তের গ্রুপ বা গোত্র দ্বারা মুহূর্তের মধ্যে হাজার হাজার প্রোফাইল খুঁজুন।', 'नाम, फोन, रक्त समूह या गोत्र द्वारा मिलीसेकंड में हजारों प्रोफाइल खोजें।', 'नाम, दूरभाष, रक्तसमूह, गोत्र द्वारा सहस्रशः भक्तान् अन्विष्यन्तु।')
    },
    {
      pain: safeTranslate('p2', 'Financial Suspicion & Cash Disputes', 'আর্থিক সন্দেহ ও বিবাদ', 'वित्तीय संदेह और नकद विवाद', 'वित्तीय सन्देह एवं धन विवाद'),
      painDesc: safeTranslate('pd2', 'Missing cash receipts and calculation errors cause committee infighting.', 'হারানো রসিদ এবং হিসাবের ভুলের কারণে কমিটিতে বিবাদ দেখা দেয়।', 'गुम नकद रसीदें और गणना की त्रुटियों से समिति में कलह होती है।', 'नष्ट धन रसीदाः एवं गणना दोषः समितौ कलहं जनयति।'),
      solution: safeTranslate('s2', 'Double-Entry Audited Treasury', 'দ্বৈত-ভুক্তি অডিটেড রাজকোষ', 'डबल-एंट्री ऑडिटेड ट्रेजरी', 'द्वि-प्रविष्टि परीक्षित राजकोष'),
      solutionDesc: safeTranslate('sd2', 'Mandatory custodian tracking and instant branded PDF receipts.', 'বাধ্যতামূলক কাস্টোডিয়ান ট্র্যাকিং এবং তাৎক্ষণিক পিডিএফ রসিদ।', 'अनिवार्य कस्टोडियन ट्रैकिंग और तत्काल पीडीएफ रसीदें।', 'अनिवार्य कस्टोडियन ट्रैकिंग एवं तत्कालं पीडीएफ रसीद।')
    },
    {
      pain: safeTranslate('p3', 'Exhausting Event Invitation Calls', 'ক্লান্তিকর ইভেন্ট আমন্ত্রণের কল', 'थकाऊ इवेंट आमंत्रण कॉल', 'श्रमिक उत्सव निमंत्रणम्'),
      painDesc: safeTranslate('pd3', 'Calling 500+ devotees individually before every Puja is exhausting.', 'প্রতিটি পূজার আগে ৫০০-এর বেশি ভক্তকে আলাদাভাবে কল করা খুব ক্লান্তিকর।', 'हर पूजा से पहले 500 से अधिक भक्तों को व्यक्तिगत रूप से बुलाना थका देने वाला है।', 'प्रत्येक पूजायाः पूर्वं ५००+ भक्तान् व्यक्तिगत रूपेण आह्वानं श्रमाय भवति।'),
      solution: safeTranslate('s3', '1-Click Sandesh Broadcasts', '১-ক্লিক বার্তা সম্প্রচার', '1-क्लिक संदेश ब्रॉडकास्ट', '१-क्लिक सन्देश प्रसारणम्'),
      solutionDesc: safeTranslate('sd3', 'Dispatch automated WhatsApp and SMS alerts for festivals and Tithis.', 'উৎসব ও তিথির জন্য স্বয়ংক্রিয় হোয়াটসঅ্যাপ ও এসএমএস সতর্কতা পাঠান।', 'त्योहारों और तिथियों के लिए स्वचालित व्हाट्सएप और एसएमएस अलर्ट भेजें।', 'उत्सवानां कृते स्वचालित व्हाट्सएप एवं एसएमएस प्रेषयन्तु।')
    }
  ];

  const WORKSPACES = [
    'Mandir', 'Goshala', 'Sangha', 'Ashram', 'Gurukul', 'Satsang', 'Yoga', 'Trust', 'Tirth', 'Samaj'
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-[#FF9933] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF9933] to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-500/20">
              ॐ
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 block">
              Sanatani<span className="text-[#FF9933]">Bandhan</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollTo('features')} className="text-sm font-bold text-slate-600 hover:text-[#FF9933] transition-colors">{safeTranslate('navFeatures', 'Features', 'বৈশিষ্ট্য', 'सुविधाएँ', 'सुविधाः')}</button>
            <button onClick={() => scrollTo('why-us')} className="text-sm font-bold text-slate-600 hover:text-[#FF9933] transition-colors">{safeTranslate('navWhyUs', 'Why Us', 'কেন আমরা', 'हम क्यों', 'वयम् किमर्थम्')}</button>
            <button onClick={() => scrollTo('pricing')} className="text-sm font-bold text-slate-600 hover:text-[#FF9933] transition-colors">{safeTranslate('navPricing', 'Pricing', 'মূল্য', 'मूल्य निर्धारण', 'मूल्यनिर्धारणम्')}</button>
            
            <div className="flex bg-slate-100 rounded-lg p-1 shadow-inner border border-slate-200/50">
              {(['en', 'hi', 'bn', 'sa'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={\`px-3 py-1 rounded-md text-xs font-bold uppercase transition-all \${language === lang ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}\`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={onLoginClick} className="text-sm font-bold text-slate-700 hover:text-[#FF9933] transition-colors">
              {safeTranslate('navLogin', 'Login', 'লগ ইন', 'लॉग इन', 'लॉग इन')}
            </button>
            <button onClick={onSignupClick} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              {safeTranslate('navCreate', 'Create Free Account', 'বিনামূল্যে অ্যাকাউন্ট', 'मुफ्त खाता बनाएं', 'निःशुल्कं खातं रचयन्तु')}
            </button>
          </div>

          <button className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-2xl flex flex-col p-4 gap-2 animate-in slide-in-from-top-2 duration-200">
            <button onClick={() => scrollTo('features')} className="text-left font-bold text-slate-700 py-3 px-2 rounded-lg hover:bg-slate-50">{safeTranslate('navFeatures', 'Features', 'বৈশিষ্ট্য', 'सुविधाएँ', 'सुविधाः')}</button>
            <button onClick={() => scrollTo('why-us')} className="text-left font-bold text-slate-700 py-3 px-2 rounded-lg hover:bg-slate-50">{safeTranslate('navWhyUs', 'Why Us', 'কেন আমরা', 'हम क्यों', 'वयम् किमर्थम्')}</button>
            <button onClick={() => scrollTo('pricing')} className="text-left font-bold text-slate-700 py-3 px-2 rounded-lg hover:bg-slate-50">{safeTranslate('navPricing', 'Pricing', 'মূল্য', 'मूल्य निर्धारण', 'मूल्यनिर्धारणम्')}</button>
            
            <div className="px-2 py-3">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Language / भाषा</p>
               <div className="flex bg-slate-100 rounded-lg p-1">
                 {(['en', 'hi', 'bn', 'sa'] as const).map(lang => (
                   <button
                     key={lang}
                     onClick={() => { setLanguage(lang); setIsMobileMenuOpen(false); }}
                     className={\`flex-1 py-2 rounded-md text-xs font-bold uppercase transition-all \${language === lang ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}\`}
                   >
                     {lang}
                   </button>
                 ))}
               </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <button onClick={onLoginClick} className="w-full py-3 text-center border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors">{safeTranslate('navLogin', 'Login', 'লগ ইন', 'लॉग इन', 'लॉग इन')}</button>
              <button onClick={onSignupClick} className="w-full py-3 text-center bg-gradient-to-r from-[#FF9933] to-orange-500 rounded-xl font-bold text-white shadow-lg">{safeTranslate('navCreate', 'Create Free Account', 'বিনামূল্যে অ্যাকাউন্ট', 'मुफ्त खाता बनाएं', 'निःशुल्कं खातं रचयन्तु')}</button>
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
            {safeTranslate('heroBadge', 'Enterprise Grade ERP', 'এন্টারপ্রাইজ গ্রেড ইআরপি', 'एंटरप्राइज ग्रेड ईआरपी', 'एंटरप्राइज ग्रेड ईआरपी')}
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-8 max-w-5xl">
            {safeTranslate('heroTitle1', 'Modern Dharmic Administration,', 'আধুনিক ধার্মিক প্রশাসন,', 'आधुनिक धार्मिक प्रशासन,', 'आधुनिक धार्मिक प्रशासन,')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-orange-600">{safeTranslate('heroTitle2', 'Unified & Secured.', 'একত্রিত ও সুরক্ষিত।', 'एकीकृत और सुरक्षित।', 'एकीकृत एवं सुरक्षित।')}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
            {safeTranslate('heroDesc', 'Unify your Mandir, Goshala, or Ashram operations with military-grade security. Manage devotees, treasuries, 80G receipts, and daily Seva through 46+ specialized Shastric modules.', 'আপনার মন্দির, গোশালা বা আশ্রমের কার্যক্রম একীভূত করুন। ৪৬+ বিশেষ মডিউলের মাধ্যমে ভক্ত, রাজকোষ এবং দৈনিক সেবা পরিচালনা করুন।', 'अपने मंदिर, गौशाला या आश्रम संचालन को एकीकृत करें। 46+ विशेष मॉड्यूल के माध्यम से भक्तों, खजाने और दैनिक सेवा का प्रबंधन करें।', 'स्व मन्दिर, गोशाला वा आश्रम सञ्चालनं एकीकृतं कुर्वन्तु। ४६+ विशेष मॉड्यूल् माध्यमेन भक्तान्, राजकोषं च प्रबन्धयन्तु।')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full max-w-md mx-auto sm:max-w-none">
            <button onClick={onSignupClick} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#FF9933] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-bold text-lg transition-all shadow-[0_8px_20px_rgba(255,153,51,0.3)] hover:shadow-[0_12px_25px_rgba(255,153,51,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
              {safeTranslate('btnStart', 'Start Operating Now', 'এখনই শুরু করুন', 'अभी शुरू करें', 'इदानीं आरम्भं कुर्वन्तु')} <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => setDemoModalOpen(true)} className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold text-lg transition-all hover:bg-slate-50 flex items-center justify-center gap-2 shadow-sm">
              <Building2 className="w-5 h-5 text-slate-400" /> {safeTranslate('btnDemo', 'Explore Demo Sandbox', 'ডেমো স্যান্ডবক্স দেখুন', 'डेमो सैंडबॉक्स देखें', 'डेमो सैंडबॉक्स पश्यन्तु')}
            </button>
          </div>
          
          <div className="mt-16 pt-10 border-t border-slate-200/60 w-full max-w-4xl flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-bold text-slate-500">
             <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF9933]" /> {safeTranslate('trust1', 'ISO 27001 Ready', 'ISO 27001 প্রস্তুত', 'ISO 27001 तैयार', 'ISO 27001 सिद्धम्')}</div>
             <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF9933]" /> {safeTranslate('trust2', 'AES-256 Encryption', 'AES-256 এনক্রিপশন', 'AES-256 एन्क्रिप्शन', 'AES-256 एन्क्रिप्शन')}</div>
             <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#FF9933]" /> {safeTranslate('trust3', 'Offline-First Tech', 'অফলাইন-ফার্স্ট প্রযুক্তি', 'ऑफ़लाइन-फर्स्ट तकनीक', 'ऑफ़लाइन-फर्स्ट तकनीक')}</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {safeTranslate('featTitle', 'Solve Real Operational Pains', 'বাস্তব সমস্যা সমাধান করুন', 'वास्तविक परिचालन दर्द का समाधान करें', 'वास्तविक परिचालन समस्याः समाधानं कुर्वन्तु')}
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
               {safeTranslate('featDesc', 'Built by administrators, for administrators. We replace chaotic WhatsApp groups and paper books with structured, audited software.', 'অ্যাডমিনিস্ট্রেটরদের দ্বারা তৈরি। আমরা হোয়াটসঅ্যাপ গ্রুপ এবং কাগজের বইকে কাঠামোগত সফ্টওয়্যার দিয়ে প্রতিস্থাপন করি।', 'प्रशासकों द्वारा निर्मित। हम व्हाट्सएप समूहों और कागजी किताबों को संरचित सॉफ्टवेयर से बदलते हैं।', 'प्रशासकैः निर्मितम्। वयं व्हाट्सएप समूहान् कागदपुस्तकानि च संरचित सॉफ्टवेयर द्वारा प्रतिस्थापयामः।')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PAIN_SOLVER_MATRIX.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full hover:border-[#FF9933]/30">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-md mb-4 border border-rose-100">
                    {safeTranslate('painLabel', 'The Problem', 'সমস্যা', 'समस्या', 'समस्या')}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{item.pain}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.painDesc}</p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-md mb-4 border border-emerald-100">
                    {safeTranslate('solLabel', 'Sanatani Bandhan Solution', 'সনাতনী বন্ধন সমাধান', 'सनातनी बंधन समाधान', 'सनातनी बन्धन समाधानम्')}
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

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-slate-950 text-white text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF9933] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight leading-tight">
            {safeTranslate('ctaTitle', 'Ready to modernize your Dharma?', 'আপনার ধর্মকে আধুনিক করতে প্রস্তুত?', 'अपने धर्म को आधुनिक बनाने के लिए तैयार हैं?', 'स्व धर्मं आधुनिकं कर्तुं सज्जाः?')}
          </h2>
          <button onClick={onSignupClick} className="px-10 py-5 bg-[#FF9933] hover:bg-orange-600 rounded-2xl font-black text-xl transition-all shadow-[0_0_30px_rgba(255,153,51,0.3)] hover:shadow-[0_0_40px_rgba(255,153,51,0.5)] hover:-translate-y-1">
            {safeTranslate('ctaBtn', 'Create Your Workspace', 'আপনার ওয়ার্কস্পেস তৈরি করুন', 'अपना कार्यक्षेत्र बनाएं', 'स्व कार्यक्षेत्रं रचयन्तु')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">ॐ</div>
            <span className="font-extrabold text-lg text-slate-900">Sanatani<span className="text-[#FF9933]">Bandhan</span></span>
          </div>
          <div className="flex gap-6 text-sm font-bold text-slate-500">
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-slate-900 transition-colors">Privacy</button>
            <button onClick={() => setTosOpen(true)} className="hover:text-slate-900 transition-colors">Terms</button>
            <button onClick={() => setSecurityOpen(true)} className="hover:text-slate-900 transition-colors">Security</button>
          </div>
          <p className="text-sm font-medium text-slate-400">© 2026 Sanatani Bandhan. Built with devotion.</p>
        </div>
      </footer>

      {/* Modals */}
      {privacyOpen && <PrivacyPolicy onClose={() => setPrivacyOpen(false)} />}
      {tosOpen && <TermsOfService onClose={() => setTosOpen(false)} />}
      {securityOpen && <SecurityWhitepaper onClose={() => setSecurityOpen(false)} />}
      {demoModalOpen && (
        <DemoSelectionModal 
          onClose={() => setDemoModalOpen(false)} 
          onSelect={onDemoStart}
        />
      )}
    </div>
  );
};
`;

fs.writeFileSync('src/components/public/LandingPage.tsx', code);

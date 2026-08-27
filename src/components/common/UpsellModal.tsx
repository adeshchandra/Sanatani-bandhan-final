import React from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, ShieldCheck, Star, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  module: string;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({ isOpen, onClose, onUpgrade, module }) => {
  const { safeTranslate } = useLanguage();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-stone-900 to-stone-800 p-8 text-center border-b border-stone-700">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20 border border-white/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {safeTranslate('upsell_title', 'Namaskar! 🙏 You\'ve Discovered the Power of Sanatani Bandhan', 'নমস্কার! 🙏 আপনি সনাতনী বন্ধনের শক্তি আবিষ্কার করেছেন', 'नमस्कार! 🙏 आपने सनातनी बंधन की शक्ति की खोज की है')}
          </h2>
          <p className="text-stone-300 mt-3 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {safeTranslate(
              'upsell_desc', 
              'You are currently exploring a public demo workspace. To add unlimited records, generate official cryptographic PDFs, and secure your community\'s data, please establish your own private workspace.',
              'আপনি বর্তমানে একটি ডেমো ওয়ার্কস্পেস দেখছেন। আপনার নিজস্ব প্রাইভেট ওয়ার্কস্পেস তৈরি করুন।',
              'आप वर्तमान में एक सार्वजनिक डेमो कार्यक्षेत्र की खोज कर रहे हैं। अपना खुद का निजी कार्यक्षेत्र स्थापित करें।'
            )}
          </p>
        </div>

        {/* Body Matrix */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar bg-slate-50">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-bl-lg">CORE</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                {safeTranslate('plan_free_title', 'SEVA PLAN (FREE)', 'সেবা প্ল্যান (ফ্রি)', 'सेवा योजना (मुफ़्त)')}
              </h3>
              <ul className="space-y-3 mt-6">
                {[
                  'Up to 50 Devotees',
                  'Double-Entry Ledger',
                  '3 Master PDF Audit Reports/mo',
                  'Community Panjika Access'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-stone-900 rounded-2xl p-6 border border-stone-700 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm">RECOMMENDED</div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                {safeTranslate('plan_pro_title', 'SMART PRO PLAN', 'স্মার্ট প্রো প্ল্যান', 'स्मार्ट प्रो योजना')}
              </h3>
              <ul className="space-y-3 mt-6">
                {[
                  'Infinite Devotee Profiles',
                  'Infinite Cryptographic PDFs',
                  'Verified Scholar Badges',
                  'Global Purohit Hiring & Booking'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-stone-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 font-bold text-sm px-4 py-2 transition-colors w-full sm:w-auto text-center"
          >
            {safeTranslate('continue_demo', 'Continue Exploring Demo', 'ডেমো দেখা চালিয়ে যান', 'डेमो एक्सप्लोर करना जारी रखें')}
          </button>
          
          <button
            onClick={onUpgrade}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {safeTranslate('establish_secure_btn', 'Establish My Secure Workspace', 'আমার সুরক্ষিত ওয়ার্কস্পেস তৈরি করুন', 'अपना सुरक्षित कार्यक्षेत्र स्थापित करें')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

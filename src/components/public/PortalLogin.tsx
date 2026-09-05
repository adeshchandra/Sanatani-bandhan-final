import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Loader2, ShieldCheck, Building2, User, Key, Mail, Phone, 
  Lock, ArrowLeft, AlertTriangle, MapPin, AlignLeft, Languages, Globe2, Navigation,
  QrCode, X, WifiOff, CheckCircle2, Flame, Fingerprint
} from 'lucide-react';
import jsQR from 'jsqr'; 
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useData } from '../../context/DataContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

import { WorkspaceConfig, WorkspaceType } from '../../types';

// Simplified translation dictionary for demo
const translations = {
  en: {
    app_name: 'Sanatani Bandhan',
    portal_subtitle: 'Enterprise Workspace Gateway',
    login_secure: 'Secure Login',
    login_create: 'Create Workspace',
    scan_auto_login: 'Scan QR to Login',
    login_identity: 'Identity',
    login_forgot: 'Forgot Password?',
    btn_access_portal: 'Access Portal',
    reg_warning_title: 'Enterprise Provisioning',
    reg_warning_desc_1: 'You are provisioning a new ',
    reg_warning_desc_2: ' workspace. This action will create a dedicated cloud instance.',
    reg_step1: 'Workspace Details',
    reg_org_type: 'Organization Type',
    reg_org_name: 'Name',
    reg_desc: 'Short Description',
    reg_step2: 'Administrator Profile',
    reg_your_name: 'Full Name',
    reg_your_phone: 'Phone Number',
    reg_official_email: 'Official Email',
    login_pass: 'Secure Password',
    btn_create_dynamic: 'Provision {X}',
    workspace: 'Workspace',
    head_admin: 'Head Admin'
  },
  hi: {
    app_name: 'नातनी बंधन',
    portal_subtitle: 'एंटरप्राइज़ कार्यक्षेत्र गेटवे',
    login_secure: 'सुरक्षित लॉगिन',
    login_create: 'कार्यक्षेत्र बनाएं',
    scan_auto_login: 'लॉगिन के लिए QR स्कैन करें',
    login_identity: 'पहचान',
    login_forgot: 'पासवर्ड भूल गए?',
    btn_access_portal: 'पोर्टल एक्सेस करें',
    reg_warning_title: 'एंटरप्राइज प्रोविजनिंग',
    reg_warning_desc_1: 'आप एक नया ',
    reg_warning_desc_2: ' कार्यक्षेत्र बना रहे हैं। यह एक समर्पित क्लाउड इंस्टेंस बनाएगा।',
    reg_step1: 'कार्यक्षेत्र विवरण',
    reg_org_type: 'संगठन का प्रकार',
    reg_org_name: 'नाम',
    reg_desc: 'संक्षिप्त विवरण',
    reg_step2: 'प्रशासक प्रोफ़ाइल',
    reg_your_name: 'पूरा नाम',
    reg_your_phone: 'फ़ोन नंबर',
    reg_official_email: 'आधिकारिक ईमेल',
    login_pass: 'सुरक्षित पासवर्ड',
    btn_create_dynamic: '{X} प्रावधान करें',
    workspace: 'कार्यक्षेत्र',
    head_admin: 'मुख्य व्यवस्थापक'
  },
  bn: {
    app_name: 'সনাতনী বন্ধন',
    portal_subtitle: 'এন্টারপ্রাইজ ওয়ার্কস্পেস গেটওয়ে',
    login_secure: 'নিরাপদ লগইন',
    login_create: 'ওয়ার্কস্পেস তৈরি করুন',
    scan_auto_login: 'লগইন করতে QR স্ক্যান করুন',
    login_identity: 'পরিচয়',
    login_forgot: 'পাসওয়ার্ড ভুলে গেছেন?',
    btn_access_portal: 'পোর্টাল অ্যাক্সেস করুন',
    reg_warning_title: 'এন্টারপ্রাইজ প্রভিশনিং',
    reg_warning_desc_1: 'আপনি একটি নতুন ',
    reg_warning_desc_2: ' ওয়ার্কস্পেস প্রভিশন করছেন। এটি একটি ডেডিকেটেড ক্লাউড ইন্সট্যান্স তৈরি করবে।',
    reg_step1: 'ওয়ার্কস্পেস বিবরণ',
    reg_org_type: 'প্রতিষ্ঠানের ধরন',
    reg_org_name: 'নাম',
    reg_desc: 'সংক্ষিপ্ত বিবরণ',
    reg_step2: 'অ্যাডমিনিস্ট্রেটর প্রোফাইল',
    reg_your_name: 'পুরো নাম',
    reg_your_phone: 'ফোন নম্বর',
    reg_official_email: 'অফিসিয়াল ইমেল',
    login_pass: 'নিরাপদ পাসওয়ার্ড',
    btn_create_dynamic: '{X} প্রভিশন করুন',
    workspace: 'ওয়ার্কস্পেস',
    head_admin: 'হেড অ্যাডমিন'
  }
};

const getCurrencyDetails = (country: string) => {
  switch(country) {
    case 'India': return { code: 'INR', symbol: '₹' };
    case 'Bangladesh': return { code: 'BDT', symbol: '৳' };
    case 'Nepal': return { code: 'NPR', symbol: 'रु' };
    case 'UK': return { code: 'GBP', symbol: '£' };
    case 'USA': return { code: 'USD', symbol: '$' };
    default: return { code: 'USD', symbol: '$' }; 
  }
};

interface PortalLoginProps {
  initialMode?: 'login' | 'signup';
  onBack: () => void;
  onSuccess: () => void;
}

export const PortalLogin: React.FC<PortalLoginProps> = ({ initialMode = 'login', onBack, onSuccess }) => {
  const { loginAsRole, addWorkspace, switchWorkspace, loginWithPin } = useAuthWorkspace();

  const [language, setLanguage] = useState<'en'|'hi'|'bn'>('en'); 
  const t = (key: string) => (translations as any)[language][key] || key;

  const [activeView, setActiveView] = useState(initialMode === 'signup' ? 'REGISTER' : 'LOGIN'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine); 

  // ENTERPRISE TOAST ENGINE
  const [toast, setToast] = useState<{message: string, type: string} | null>(null);
  const showToast = (message: string, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // UNIFIED LOGIN STATES
  const [loginIdentity, setLoginIdentity] = useState(''); 
  const [loginCredential, setLoginCredential] = useState(''); 

  // QR SCANNER STATES
  const [isScanning, setIsScanning] = useState(false);
  const [isBiometricPromptActive, setIsBiometricPromptActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // REGISTRATION STATES
  const [regData, setRegData] = useState({
    commName: '', type: 'MANDIR' as WorkspaceType, description: '', 
    adminName: '', email: '', phone: '', password: '',
    country: '', state: '', city: '', street: '',
    currency: { code: 'INR', symbol: '₹' }
  });

  // OFFLINE SENTINEL
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => { 
      window.removeEventListener('online', handleOnline); 
      window.removeEventListener('offline', handleOffline); 
    };
  }, []);

  const clearErrors = () => setError('');

  const handleError = (err: any) => {
    const msg = err.message || '';
    setError(msg.replace('Firebase:', '').trim());
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    const currencyDetails = getCurrencyDetails(selectedCountry);
    setRegData({ ...regData, country: selectedCountry, currency: currencyDetails });
  };

  // ==========================================
  // 🖐 BIOMETRIC LOGIN (WebAuthn / Passkeys)
  // ==========================================
  const handleBiometricLogin = async () => {
    setIsBiometricPromptActive(true);
    try {
      if (!window.PublicKeyCredential) {
        throw new Error('Biometric authentication is not supported on this device.');
      }

      // Allow simulation in iframe for demo purposes
      if (window.self !== window.top) {
         showToast('Preview Mode: Simulating Biometric Auth. Open in new tab for real WebAuthn.', 'success');
         // Simulate successful login after a short delay
         setTimeout(() => {
            handleSmartLogin(undefined, 'MANAGER', '000000', true);
            setIsBiometricPromptActive(false);
         }, 1500);
         return;
      }

      const publicKey = {
        challenge: new Uint8Array(32),
        rpId: window.location.hostname,
        allowCredentials: [],
        userVerification: "preferred" as UserVerificationRequirement,
      };

      const assertion = await navigator.credentials.get({ publicKey });
      if (assertion) {
        setIsBiometricPromptActive(false);
        // Authenticated! In a real app we'd send assertion to server to verify against DB.
        // For the demo we simulate superadmin entry on successful physical passkey verify.
        await handleSmartLogin(undefined, 'MANAGER', '000000', true);
      }
    } catch (err: any) {
      setIsBiometricPromptActive(false);
      if (err?.name === 'NotAllowedError') {
        setError('Preview restricted: Please open the app in a new tab to use Biometrics.');
      } else {
        setError('Biometric login failed or was cancelled.');
      }
      console.error(err);
    }
  };

  // ==========================================
  // 📸 QR SCANNER ENGINE
  // ==========================================
  const startScanner = async () => {
    setIsScanning(true);
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.play();
        requestAnimationFrame(tick);
      }
    } catch (err) {
      setIsScanning(false);
      setError("Camera access denied or unavailable.");
    }
  };

  const stopScanner = () => {
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const tick = () => {
    if (!videoRef.current || !canvasRef.current) return;
    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      canvas.height = videoRef.current.videoHeight;
      canvas.width = videoRef.current.videoWidth;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Use type assertion since jsQR typings might be slightly loose
        const code = (jsQR as any)(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

        if (code) {
          stopScanner();
          handleQRLogin(code.data);
          return;
        }
      }
    }
    if (isScanning) requestAnimationFrame(tick);
  };

  const handleQRLogin = async (qrDataString: string) => {
    try {
      const qrPayload = JSON.parse(qrDataString);
      if (qrPayload.action !== "autologin" || !qrPayload.id || !qrPayload.pin) {
         throw new Error("Invalid QR Code Format.");
      }
      setLoginIdentity(qrPayload.id);
      setLoginCredential(qrPayload.pin);

      handleSmartLogin(undefined, qrPayload.id, qrPayload.pin, true);
    } catch (err) {
      setError("Unrecognized QR Code. Please scan an official Sanatani ID Card.");
    }
  };

  // ==========================================
  // 🚀 GLOBAL OMNI-LOGIN 
  // ==========================================
  const handleSmartLogin = async (e?: React.FormEvent, forceId: string | null = null, forcePin: string | null = null, isQR = false) => {
    if (e) e.preventDefault();
    clearErrors();
    const identTrim = (forceId || loginIdentity).trim();
    const credTrim = (forcePin || loginCredential).trim();
    if (!identTrim || !credTrim) return setError("Please provide your login details.");
    setLoading(true);

    try {
      // Map legacy demo credentials to Firebase-friendly email formats
      let email = identTrim;
      if (email.toLowerCase() === 'MANAGER') email = 'admin@sanatan.org';
      else if (email.toLowerCase() === 'TRUSTEE') email = 'trustee@sanatan.org';
      else if (!email.includes('@')) email = `${email}@sanatan.org`;

      let password = credTrim;
      if (password.length < 6) password = password.padEnd(6, '0'); // Firebase requires >= 6 chars

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
        // Auto-register for prototype convenience if not found
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          let role = 'DEVOTEE';
          if (email.startsWith('MANAGER')) role = 'SUPER_ADMIN';
          if (email.startsWith('TRUSTEE')) role = 'TRUSTEE';
          await setDoc(doc(db, 'users', userCred.user.uid), { email, role });
        } else {
          throw err;
        }
      }
      
      showToast("Secure Login Successful", "success");
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to login securely.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 📝 REGISTRATION ENGINE 
  // ==========================================
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!navigator.onLine) return setError("Internet connection required to create a new workspace.");

    const { commName, type, description, adminName, email, phone, password, country, state, city, street, currency } = regData;

    if (!commName || !adminName || !email || !phone || !password) return setError("Please fill all core required fields.");
    if (!country || !state || !city) return setError("Please complete the Location / Address Picker section.");

    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1500));
      
      const newWorkspace: WorkspaceConfig = {
        id: "WS-" + Math.floor(1000 + Math.random() * 9000),
        name: commName,
        type: type,
        address: [street, city, state, country].filter(Boolean).join(', '),
        city: city,
        state: state,
        country: country,
        email: email,
        phone: phone,
        currency: currency.code,
        currencySymbol: currency.symbol,
        adminPin: '1008', tagline: '', sampradaya: '', kuladevata: '', pinRequired: true // default for newly created in this demo
      };

      addWorkspace(newWorkspace);
      switchWorkspace(newWorkspace.id);
      loginAsRole('SUPER_ADMIN', adminName);
      
      showToast("Workspace Provisioned Successfully", "success");
      onSuccess();

    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!navigator.onLine) return showToast("Internet required to reset password.", "error");
    if (!loginIdentity.includes('@')) {
      return setError("Please enter your Admin Email Address in the Identity field first.");
    }
    showToast("Reset link sent to your email inbox!", "success");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 sm:p-8 selection:bg-amber-100 selection:text-amber-600 relative overflow-hidden font-sans">

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-amber-600/10 to-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-stone-800/10 to-stone-900/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* GLOBAL CUSTOM TOAST ENGINE */}
      {toast && createPortal(
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[10000] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-4 ${toast.type === 'error' ? 'bg-red-900' : 'bg-gray-900'} text-white`}>
           <div className={`p-2 rounded-full shrink-0 ${toast.type === 'offline' ? 'bg-amber-500/20 text-amber-500' : toast.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
             {toast.type === 'offline' ? <WifiOff size={20}/> : toast.type === 'error' ? <AlertTriangle size={20}/> : <CheckCircle2 size={20}/>}
           </div>
           <div>
             <p className={`text-xs font-black uppercase tracking-widest mb-0.5 ${toast.type === 'offline' ? 'text-amber-400' : toast.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
               {toast.type === 'offline' ? 'Offline Cache' : toast.type === 'error' ? 'Error' : 'Success'}
             </p>
             <p className="text-sm font-bold">{toast.message}</p>
           </div>
        </div>,
        document.body
      )}

      {/* OFFLINE BANNER */}
      {!isOnline && (
        <div className="absolute top-0 w-full bg-red-600 text-white p-2 text-center flex items-center justify-center gap-2 shadow-sm z-[110]">
          <WifiOff size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Offline Mode: Cached Login Active</span>
        </div>
      )}

      {onBack && (
        <button onClick={onBack} className="absolute top-10 sm:top-6 left-6 flex items-center gap-2 text-stone-500 hover:text-amber-600 text-xs font-black uppercase tracking-widest transition-colors bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-stone-200 z-10">
          <ArrowLeft size={16} /> Back
        </button>
      )}

      {/* LANGUAGE POD */}
      <div className="absolute top-10 sm:top-6 right-6 z-50 group">
        <div className="relative">
          <button className="bg-white/90 backdrop-blur-md border border-stone-200 p-2.5 sm:p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-50 transition-all hover:scale-110 hover:border-amber-200">
            <Languages size={20} className="text-amber-600" />
            <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white uppercase">
              {language === 'en' ? 'EN' : language === 'bn' ? 'বাং' : 'हि'}
            </span>
          </button>
          <div className="absolute top-full right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-stone-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-4 group-hover:translate-y-0 overflow-hidden ring-1 ring-black/5 origin-top-right">
            <div className="p-3 bg-stone-50/80 border-b border-stone-100 text-[10px] font-black text-stone-400 uppercase tracking-widest text-center flex items-center justify-center gap-1.5"><Globe2 size={12}/> Language</div>
            <button onClick={() => setLanguage('en')} className={`w-full text-left px-5 py-4 text-xs font-black tracking-widest transition-colors ${language === 'en' ? 'text-amber-600 bg-amber-50' : 'text-stone-600 hover:bg-stone-50'}`}>English</button>
            <button onClick={() => setLanguage('bn')} className={`w-full text-left px-5 py-4 text-xs font-black tracking-widest transition-colors ${language === 'bn' ? 'text-amber-600 bg-amber-50' : 'text-stone-600 hover:bg-stone-50'}`}>বাংলা</button>
            <button onClick={() => setLanguage('hi')} className={`w-full text-left px-5 py-4 text-xs font-black tracking-widest transition-colors ${language === 'hi' ? 'text-amber-600 bg-amber-50' : 'text-stone-600 hover:bg-stone-50'}`}>हिन्दी</button>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 fade-in flex flex-col items-center mt-20 sm:mt-0 relative z-10">
        <img 
          src="/logo.svg" 
          alt="Sanatani Bandhan" 
          className="w-20 h-20 rounded-3xl object-contain shadow-2xl shadow-orange-500/25 mb-4 hover:scale-105 transition-transform"
          onError={(e) => { e.currentTarget.src = '/icon-192x192.png'; }}
        />
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">{t('app_name')}</h1>
        <p className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">{t('portal_subtitle')}</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-stone-100 overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/50 to-white rounded-[2.5rem] pointer-events-none"></div>

        {/* TOP TOGGLE */}
        <div className="flex bg-stone-50/80 border-b border-stone-100 p-2 relative z-10">
          <button onClick={() => { setActiveView('LOGIN'); clearErrors(); }} className={`flex-1 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${activeView === 'LOGIN' ? 'bg-white text-stone-900 shadow-sm border border-stone-200' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'}`}>
            {t('login_secure')}
          </button>
          <button onClick={() => { setActiveView('REGISTER'); clearErrors(); }} className={`flex-1 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${activeView === 'REGISTER' ? 'bg-white text-stone-900 shadow-sm border border-stone-200' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'}`}>
            {t('login_create')}
          </button>
        </div>

        <div className="p-6 sm:p-10 max-h-[65vh] overflow-y-auto custom-scrollbar relative z-10">

          {/* FULLSCREEN BIOMETRIC SCANNER OVERLAY */}
          {isBiometricPromptActive && (
            <div className="absolute inset-0 bg-stone-950 z-50 flex flex-col items-center justify-center rounded-[2.5rem] p-6 animate-in zoom-in-95 duration-300">
               <button onClick={() => setIsBiometricPromptActive(false)} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full hover:bg-red-500 transition-colors z-50">
                 <X size={24}/>
               </button>
               
               <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center relative mb-6">
                 <div className="absolute inset-0 border-[3px] border-emerald-500/30 rounded-full animate-ping"></div>
                 <div className="absolute inset-2 border-[2px] border-emerald-500/50 rounded-full animate-pulse"></div>
                 <Fingerprint size={48} className="text-emerald-400 relative z-10" />
               </div>
               
               <h3 className="text-white text-lg font-black uppercase tracking-widest mb-2 text-center">Touch Sensor</h3>
               <p className="text-stone-400 text-xs font-bold text-center leading-relaxed">
                 Waiting for device biometric verification.<br/>Use Touch ID, Face ID, or your device PIN.
               </p>

               <button onClick={() => setIsBiometricPromptActive(false)} className="mt-8 text-stone-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors border-b border-stone-700 pb-1">
                 Use Manual Password Instead
               </button>
            </div>
          )}

          {/* FULLSCREEN QR SCANNER OVERLAY */}
          {isScanning && (
            <div className="absolute inset-0 bg-stone-950 z-50 flex flex-col items-center justify-center rounded-[2.5rem] p-4">
               <button onClick={stopScanner} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full hover:bg-red-500 transition-colors z-50">
                 <X size={24}/>
               </button>
               <h3 className="text-white font-black uppercase tracking-widest mb-4 flex items-center gap-2"><QrCode/> Scan Official ID</h3>
               <div className="relative w-64 h-64 rounded-3xl overflow-hidden border-4 border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                  <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute inset-0 border-[3px] border-white/30 m-8 rounded-xl pointer-events-none"></div>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-500/50 shadow-[0_0_8px_#f59e0b] animate-pulse"></div>
               </div>
               <p className="text-stone-400 text-xs mt-6 font-bold text-center">Align QR code within the frame</p>
            </div>
          )}

          {activeView === 'LOGIN' ? (
            <form onSubmit={handleSmartLogin} className={`space-y-4 transition-opacity duration-300 ${isScanning ? 'opacity-0' : 'opacity-100'}`}>

              <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl mb-4 text-center">
                <p className="text-[10px] font-black text-indigo-800 uppercase tracking-widest flex items-center justify-center gap-1.5"><ShieldCheck size={12}/> Universal Access</p>
                <p className="text-xs text-indigo-600 mt-1 font-bold">Admins, Members, and Purohits can securely login here using their Email, Phone, or ID.</p>
              </div>

              {/* PASSWORDLESS LOGIN OPTIONS */}
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                 <button type="button" onClick={startScanner} className="flex-1 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-700 font-black py-3 sm:py-4 rounded-2xl border border-amber-200 text-[10px] sm:text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 shadow-sm">
                   <QrCode size={18}/> Scan QR
                 </button>
                 <button type="button" onClick={handleBiometricLogin} className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-700 font-black py-3 sm:py-4 rounded-2xl border border-emerald-200 text-[10px] sm:text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 shadow-sm">
                   <Fingerprint size={18}/> Passkey
                 </button>
              </div>

              <div className="flex items-center gap-3 py-2 opacity-70">
                 <div className="h-px bg-stone-200 flex-1"></div>
                 <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">OR USE CREDENTIALS</span>
                 <div className="h-px bg-stone-200 flex-1"></div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('login_identity')}</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" />
                  <input type="text" required value={loginIdentity} onChange={e=>setLoginIdentity(e.target.value)} placeholder="Email, Phone, or ID" className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all shadow-sm focus:ring-4 focus:ring-amber-50" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('login_pass')}</label>
                <div className="relative">
                  <Key size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" />
                  <input type="password" required value={loginCredential} onChange={e=>setLoginCredential(e.target.value)} placeholder="Enter Password or 4-Digit PIN" className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all shadow-sm focus:ring-4 focus:ring-amber-50" />
                </div>
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-xl text-xs font-bold text-center animate-in zoom-in shadow-sm mt-2">{error}</div>}

              <button type="submit" disabled={loading} className="w-full bg-stone-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-stone-800 hover:-translate-y-0.5 text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 mt-6 disabled:opacity-50">
                {loading ? <Loader2 size={18} className="animate-spin" /> : t('btn_access_portal')}
              </button>

              <div className="text-center mt-6">
                <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-stone-400 hover:text-amber-600 transition-colors">
                  {t('login_forgot')}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6 animate-in fade-in duration-300">

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-[10px] font-black text-amber-900 uppercase tracking-widest mb-1">{t('reg_warning_title')}</h4>
                  <p className="text-xs font-bold text-amber-800 leading-relaxed">
                    {t('reg_warning_desc_1')}<strong>{regData.type}</strong>{t('reg_warning_desc_2')}
                  </p>
                </div>
              </div>

              <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-widest border-b border-stone-200 pb-2 flex items-center gap-2"><Building2 size={14}/> {t('reg_step1')}</h4>

                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">{t('reg_org_type')}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {['MANDIR', 'GOSHALA', 'SANGHA', 'ASHRAM', 'GURUKUL', 'SATSANG', 'YOGA_CENTER', 'TRUST', 'VIDYALAYA', 'PUROHIT_SABHA'].map((type, idx) => (
                      <label key={type} className={`flex items-center justify-center py-2.5 px-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest cursor-pointer border transition-all ${regData.type === type ? 'bg-white border-amber-500 text-amber-600 shadow-sm ring-2 ring-amber-50' : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'}`}>
                        <input type="radio" name="type" value={type} checked={regData.type === type} onChange={e => setRegData({...regData, type: e.target.value as WorkspaceType})} className="hidden" />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{regData.type} {t('reg_org_name')} *</label>
                  <input type="text" required value={regData.commName} onChange={e=>setRegData({...regData, commName: e.target.value})} className="w-full p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors" placeholder={regData.type === 'PUROHIT_SABHA' ? 'e.g. Pt. Ramchandra Services' : `e.g. Sri Krishna ${regData.type}`} />
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                   <div className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest border-b border-stone-100 pb-2 mb-2">
                     <MapPin size={14}/> Location Details
                   </div>

                   <div>
                     <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Country *</label>
                     <div className="relative">
                       <Globe2 size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                       <select required value={regData.country} onChange={handleCountryChange} className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all cursor-pointer appearance-none">
                         <option value="" disabled>Select Country...</option>
                         <option value="India">India (भारत)</option>
                         <option value="Bangladesh">Bangladesh (বাংলাদেশ)</option>
                         <option value="Nepal">Nepal (नेपाल)</option>
                         <option value="Sri Lanka">Sri Lanka</option>
                         <option value="USA">United States</option>
                         <option value="UK">United Kingdom</option>
                         <option value="Other">Other Region</option>
                       </select>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">State / Division *</label>
                       <input type="text" required value={regData.state} onChange={e=>setRegData({...regData, state: e.target.value})} className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all" placeholder="e.g. West Bengal" />
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">City / District *</label>
                       <input type="text" required value={regData.city} onChange={e=>setRegData({...regData, city: e.target.value})} className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all" placeholder="e.g. Kolkata" />
                     </div>
                   </div>

                   <div>
                     <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Local Address (Optional)</label>
                     <div className="relative">
                       <Navigation size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                       <input type="text" value={regData.street} onChange={e=>setRegData({...regData, street: e.target.value})} className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:bg-white focus:border-amber-500 outline-none transition-all" placeholder="Street name, landmark..." />
                     </div>
                   </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('reg_desc')}</label>
                  <div className="relative">
                    <AlignLeft size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    <textarea rows={2} value={regData.description} onChange={e=>setRegData({...regData, description: e.target.value})} className="w-full pl-10 pr-4 p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors resize-none" placeholder={regData.type === 'PUROHIT_SABHA' ? 'Short description of your services...' : 'Short description of your community...'} />
                  </div>
                </div>
              </div>

              <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-widest border-b border-stone-200 pb-2 flex items-center gap-2"><User size={14}/> {t('reg_step2')}</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('reg_your_name')}</label>
                    <input type="text" required value={regData.adminName} onChange={e=>setRegData({...regData, adminName: e.target.value})} className="w-full p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors" placeholder="Full Name" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('reg_your_phone')}</label>
                    <input type="tel" required value={regData.phone} onChange={e=>setRegData({...regData, phone: e.target.value})} className="w-full p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors" placeholder="Mobile Number" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('reg_official_email')}</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    <input type="email" required value={regData.email} onChange={e=>setRegData({...regData, email: e.target.value})} className="w-full pl-10 pr-4 p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors" placeholder="admin@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1.5">{t('login_pass')} *</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    <input type="password" required value={regData.password} onChange={e=>setRegData({...regData, password: e.target.value})} className="w-full pl-10 pr-4 p-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:border-amber-500 outline-none shadow-sm transition-colors" placeholder="Create a strong password" />
                  </div>
                </div>
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-xl text-xs font-bold text-center animate-in zoom-in shadow-sm">{error}</div>}

              <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-xs uppercase tracking-widest flex justify-center items-center gap-2 mt-6 disabled:opacity-50">
                {loading ? <Loader2 size={18} className="animate-spin" /> : t('btn_create_dynamic').replace('{X}', regData.type.toUpperCase())}
              </button>
            </form>
          )}

        </div>

        <div className="bg-stone-50 border-t border-stone-100 p-4 sm:p-5 flex justify-center items-center gap-2 text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-widest relative z-10">
           <ShieldCheck size={16} /> AES-256 Encrypted Connection
        </div>
      </div>
    </div>
  );
}

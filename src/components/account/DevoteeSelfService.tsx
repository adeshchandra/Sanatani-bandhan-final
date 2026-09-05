import React, { useState, useRef, useEffect } from 'react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { db, auth } from '../../lib/firebase';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { RecaptchaVerifier, signInWithPhoneNumber, verifyBeforeUpdateEmail, signInAnonymously } from 'firebase/auth';
import { Camera, Check, Shield, AlertCircle, Phone, Mail, User, Info, Save, X, Loader2 } from 'lucide-react';
import { compressDevoteeAvatar } from '../../utils/imageCompression';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export const DevoteeSelfService: React.FC = () => {
  const { currentDevotee, setCurrentDevotee } = useAuthWorkspace();
  const { updateDevotee } = useData();
  const { showToast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    phone: currentDevotee?.phone || '',
    email: currentDevotee?.email || '',
    address: currentDevotee?.address || '',
    emergencyContact: currentDevotee?.emergencyContact || '',
    emergencyPhone: currentDevotee?.emergencyPhone || '',
    bloodGroup: currentDevotee?.bloodGroup || '',
    medicalNotes: currentDevotee?.medicalNotes || '',
    avatarUrl: currentDevotee?.avatarUrl || '',
  });

  const [phoneVerified, setPhoneVerified] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  
  const [emailVerified, setEmailVerified] = useState(true);
  const [verificationLinkSent, setVerificationLinkSent] = useState(false);
  
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingPhotoFile, setPendingPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEditing) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isEditing]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: e.target.value });
    setPhoneVerified(e.target.value === currentDevotee?.phone);
    setOtpSent(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
    setEmailVerified(e.target.value === currentDevotee?.email);
    setVerificationLinkSent(false);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
    }
  };

  const sendOtp = async () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      showToast('Please enter a valid 10-digit phone number', 'error');
      return;
    }
    try {
      setupRecaptcha();
      const formattedPhone = formData.phone.startsWith('+91') ? formData.phone : `+91${formData.phone}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      showToast('OTP sent successfully', 'success');
    } catch (error: any) {
      showToast('Failed to send OTP: ' + error.message, 'error');
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otpCode);
      setPhoneVerified(true);
      setOtpSent(false);
      showToast('Phone verified successfully', 'success');
    } catch (error: any) {
      showToast('Invalid OTP', 'error');
    }
  };

  const sendEmailLink = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Invalid email format', 'error');
      return;
    }
    try {
      let user = auth.currentUser;
      if (!user) {
        const cred = await signInAnonymously(auth);
        user = cred.user;
      }
      await verifyBeforeUpdateEmail(user, formData.email);
      setVerificationLinkSent(true);
      showToast('Verification link sent. Please check your email.', 'success');
      
      const poll = setInterval(async () => {
        await user?.reload();
        if (user?.email === formData.email && user?.emailVerified) {
          setEmailVerified(true);
          clearInterval(poll);
          showToast('Email verified successfully!', 'success');
        }
      }, 3000);
    } catch (error: any) {
      showToast('Failed to send verification link: ' + error.message, 'error');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be less than 5MB', 'error');
      return;
    }
    
    setPendingPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!phoneVerified) {
      showToast('Please verify your new phone number', 'error');
      return;
    }
    if (!emailVerified) {
      showToast('Please verify your new email address', 'error');
      return;
    }
    if (formData.phone.length < 10) {
      showToast('Invalid phone number format', 'error');
      return;
    }
    if (!formData.address) {
      showToast('Address is required', 'error');
      return;
    }
    
    try {
      setIsUploading(true);
      let finalAvatarUrl = formData.avatarUrl;
      
      if (pendingPhotoFile) {
        showToast('Optimizing and saving photo...', 'info');
        finalAvatarUrl = await compressDevoteeAvatar(pendingPhotoFile);
      }
      
      const updatePayload = {
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        bloodGroup: formData.bloodGroup,
        medicalNotes: formData.medicalNotes,
        avatarUrl: finalAvatarUrl,
        updatedAt: new Date().toISOString()
      };
      
      const devoteeRef = doc(db, 'devotees', currentDevotee!.id);
      await updateDoc(devoteeRef, updatePayload);
      
      await addDoc(collection(db, 'audit_logs'), {
        action: 'PROFILE_UPDATED',
        devoteeId: currentDevotee!.id,
        devoteeName: currentDevotee!.fullName || currentDevotee!.name || 'Unknown',
        timestamp: new Date().toISOString(),
        changes: updatePayload
      });
      
      showToast('Profile updated successfully', 'success');
      setIsEditing(false);
      setPendingPhotoFile(null);
      setPreviewUrl(null);
      setIsUploading(false);
      
      if (setCurrentDevotee) {
         setCurrentDevotee({ ...currentDevotee!, ...updatePayload });
      }
      if (updateDevotee) {
         updateDevotee(currentDevotee!.id, updatePayload);
      }
    } catch (error: any) {
      showToast('Failed to update profile: ' + error.message, 'error');
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      phone: currentDevotee?.phone || '',
      email: currentDevotee?.email || '',
      address: currentDevotee?.address || '',
      emergencyContact: currentDevotee?.emergencyContact || '',
      emergencyPhone: currentDevotee?.emergencyPhone || '',
      bloodGroup: currentDevotee?.bloodGroup || '',
      medicalNotes: currentDevotee?.medicalNotes || '',
      avatarUrl: currentDevotee?.avatarUrl || '',
    });
    setPhoneVerified(true);
    setEmailVerified(true);
    setPendingPhotoFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
      <div id="recaptcha-container"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-stone-900">My Profile</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 px-4 py-2 rounded-xl text-sm font-bold text-stone-700 transition-colors">
            <User className="w-4 h-4" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel} className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 px-4 py-2 rounded-xl text-sm font-bold text-stone-700 transition-colors">
              <X className="w-4 h-4" /> Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl text-sm font-bold text-white transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Read Only */}
        <div className="col-span-1 space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-stone-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                {previewUrl || formData.avatarUrl ? (
                  <img src={previewUrl || formData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-stone-300" />
                )}
              </div>
              {isEditing && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg transition-transform hover:scale-105 disabled:opacity-50"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                </button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 space-y-3">
            <div className="flex items-center gap-2 text-stone-500 mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Verified Identity</span>
            </div>
            
            <div>
              <p className="text-xs text-stone-500 font-medium">Full Name</p>
              <p className="text-sm font-bold text-stone-900">{currentDevotee?.fullName || currentDevotee?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Gotra & Pravara</p>
              <p className="text-sm font-bold text-stone-900">{currentDevotee?.gotra || 'N/A'} • {currentDevotee?.pravara || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Kuladevata</p>
              <p className="text-sm font-bold text-stone-900">{currentDevotee?.kuladevata || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Seva Tier & Role</p>
              <p className="text-sm font-bold text-amber-600">{currentDevotee?.sevaTier || 'Sadharan'} • {currentDevotee?.role}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Joined Date</p>
              <p className="text-sm font-bold text-stone-900">{currentDevotee?.joinedDate || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Fields */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Phone Number *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 bg-stone-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${!phoneVerified && isEditing ? 'border-rose-300' : 'border-stone-200'}`}
                  placeholder="10 digit mobile"
                />
                {isEditing && !phoneVerified && !otpSent && (
                  <button onClick={sendOtp} className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shrink-0">
                    Verify
                  </button>
                )}
                {isEditing && phoneVerified && formData.phone && (
                  <div className="px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
              {otpSent && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm"
                    placeholder="Enter OTP"
                  />
                  <button onClick={verifyOtp} className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shrink-0">
                    Confirm
                  </button>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Email Address</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 bg-stone-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${!emailVerified && isEditing ? 'border-amber-300' : 'border-stone-200'}`}
                  placeholder="email@example.com"
                />
                {isEditing && !emailVerified && !verificationLinkSent && formData.email && (
                  <button onClick={sendEmailLink} className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shrink-0">
                    Verify
                  </button>
                )}
                {isEditing && emailVerified && formData.email && (
                  <div className="px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
              {verificationLinkSent && !emailVerified && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Waiting for email confirmation...
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Full Address *</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="City, State, Pincode"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Emergency Contact</label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Emergency Phone</label>
              <input
                type="text"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="10 digit mobile"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-70"
              >
                <option value="">Select...</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Medical Notes</label>
              <textarea
                value={formData.medicalNotes}
                onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                disabled={!isEditing}
                rows={2}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Any allergies or medical conditions"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import CryptoJS from 'crypto-js';
import { db } from '../../lib/firebase';
import { doc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useToast } from '../../context/ToastContext';
import { CheckCircle, XCircle, ShieldAlert, User, ShieldCheck } from 'lucide-react';

export const QRScanner: React.FC = () => {
  const { activeWorkspace } = useAuthWorkspace();
  const { showToast } = useToast();
  
  const [scanResult, setScanResult] = useState<{
    status: 'success' | 'error' | 'pending';
    message: string;
    devotee?: any;
  } | null>(null);
  
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const isScanning = useRef(false);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
        false
      );

      scannerRef.current.render(
        (decodedText) => handleScan(decodedText),
        (error) => { /* ignore */ }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, []);

  const handleScan = async (decodedText: string) => {
    if (isScanning.current) return;
    isScanning.current = true;
    
    try {
      const data = JSON.parse(decodedText);
      if (!data.payload || !data.signature) {
        throw new Error('Invalid QR Format');
      }

      const { payload, signature } = data;
      
      // Check Expiry
      if (Date.now() > payload.expiry) {
        throw new Error('QR Pass has expired');
      }

      // Check Workspace scope
      if (!payload.isPublic && payload.workspaceId !== activeWorkspace?.id) {
        throw new Error('QR Pass is not valid for this Temple/Workspace');
      }

      // Fetch User
      const userRef = doc(db, 'devotees', payload.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        throw new Error('Devotee not found');
      }
      
      const devoteeData = userSnap.data();
      const secret = devoteeData.qrSecretVaultToken;
      
      if (!secret) {
        throw new Error('Devotee has not configured secure QR');
      }

      // Validate Signature
      const payloadString = JSON.stringify(payload);
      const expectedSignature = CryptoJS.HmacSHA256(payloadString, secret).toString(CryptoJS.enc.Hex);
      
      if (signature !== expectedSignature) {
        throw new Error('Invalid Digital Signature. Possible tampering.');
      }

      // Check for Replay (Optional - in this scenario, if it's an event, we could log the checkin)
      // Let's log it in check_ins collection
      const checkInRef = collection(db, 'check_ins');
      
      // Let's ensure no double scan in the last 5 minutes for the same UID to prevent accidental multiple scans
      const fiveMinsAgo = Date.now() - 5 * 60 * 1000;
      const recentQuery = query(checkInRef, 
        where('devoteeId', '==', payload.uid), 
        where('workspaceId', '==', activeWorkspace?.id),
        where('timestamp', '>', fiveMinsAgo)
      );
      
      const recentDocs = await getDocs(recentQuery);
      if (!recentDocs.empty) {
        // Just show success but don't double log
        setScanResult({
          status: 'success',
          message: 'Already checked in recently.',
          devotee: devoteeData
        });
      } else {
        await addDoc(checkInRef, {
          devoteeId: payload.uid,
          workspaceId: activeWorkspace?.id,
          timestamp: Date.now(),
          type: 'QR_PASS',
          status: 'VERIFIED'
        });
        
        setScanResult({
          status: 'success',
          message: 'Secure Check-in Successful!',
          devotee: devoteeData
        });
        showToast('Devotee Checked In', 'success');
      }
      
    } catch (err: any) {
      console.error(err);
      setScanResult({
        status: 'error',
        message: err.message || 'Verification Failed'
      });
      showToast(err.message, 'error');
    } finally {
      // Resume scanning after 3 seconds
      setTimeout(() => {
        setScanResult(null);
        isScanning.current = false;
      }, 4000);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-xl border border-stone-100 max-w-lg mx-auto w-full">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-black text-stone-900">Secure Entry Scanner</h2>
      </div>

      <div className="w-full relative overflow-hidden rounded-2xl border-4 border-stone-100 mb-6 bg-stone-50">
        <div id="qr-reader" className="w-full" />
        
        {/* Overlay Result */}
        {scanResult && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 animate-in fade-in duration-200" 
               style={{ backgroundColor: scanResult.status === 'success' ? 'rgba(236,253,245,0.95)' : 'rgba(254,242,242,0.95)' }}>
            
            {scanResult.status === 'success' ? (
              <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
            )}
            
            <h3 className={`text-xl font-black mb-2 text-center ${scanResult.status === 'success' ? 'text-emerald-900' : 'text-red-900'}`}>
              {scanResult.message}
            </h3>
            
            {scanResult.status === 'success' && scanResult.devotee && (
              <div className="bg-white p-3 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-3 w-full">
                {scanResult.devotee.avatarUrl || scanResult.devotee.photoUrl ? (
                  <img src={scanResult.devotee.avatarUrl || scanResult.devotee.photoUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-stone-400" />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-bold text-stone-900">{scanResult.devotee.fullName || scanResult.devotee.name}</p>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">{scanResult.devotee.sevaTier || 'Member'}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-stone-500 font-medium text-center">
        Position the devotee's QR Pass within the frame. It will scan and verify automatically.
      </p>
    </div>
  );
};

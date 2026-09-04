import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Radio, Send, AlertTriangle, MapPin, Clock, Activity, Radar, Users, CheckCircle2, X, Battery, Phone, Droplet, UserSquare2, ArrowLeft, MessageSquare, Globe, Navigation } from 'lucide-react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { OfflineSyncManager, QueuedAction } from '../../services/OfflineSyncManager';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom pulsing red dot icon for victims
const emergencyIcon = L.divIcon({
  className: 'custom-emergency-icon',
  html: '<div class="animate-pulse" style="width: 20px; height: 20px; background-color: #dc2626; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(220,38,38,0.8);"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});


export default function YatraNetDesk() {
  const { currentUser, activeWorkspace } = useAuthWorkspace();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queue, setQueue] = useState<QueuedAction[]>([]);
  const [message, setMessage] = useState('');
  
  // Real-time mesh data
  const [broadcasts, setBroadcasts] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [activeChatNode, setActiveChatNode] = useState<string | null>(null);
  const [directMessage, setDirectMessage] = useState('');

  // SOS Modal State
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [sosSituation, setSosSituation] = useState('LOST_PERSON'); // LOST_PERSON, MEDICAL, SEPARATED, OTHER
  const [sosDetails, setSosDetails] = useState('');
  const [activeTab, setActiveTab] = useState<'SOCIAL' | 'MESH'>('SOCIAL');
  const [socialFeed, setSocialFeed] = useState<any[]>([]);
  const [newPostText, setNewPostText] = useState('');
  
  useEffect(() => {
    // Social Feed Listener
    if (!activeWorkspace?.id) return;
    const feedRef = collection(db, `communities/${activeWorkspace.id}/yatra_social_feed`);
    const q = query(feedRef, orderBy('timestamp', 'desc'), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      const posts: any[] = [];
      snap.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
      setSocialFeed(posts);
    });
    return () => unsub();
  }, [activeWorkspace?.id]);

  const handlePostSocial = () => {
    if (!newPostText.trim()) return;
    if ((currentUser as any)?.kycStatus !== 'VERIFIED') {
      return showToast('Only Verified Devotees can post to prevent spam.', 'error');
    }
    
    OfflineSyncManager.addToQueue('POST_SOCIAL', {
      communityId: activeWorkspace?.id,
      senderId: currentUser?.id,
      senderName: currentUser?.name || 'Devotee',
      text: newPostText,
      pranams: 0,
      timestamp: Date.now(),
      isHidden: false
    });
    setNewPostText('');
    showToast('Post shared to the community!', 'success');
  };

  const handlePranam = (postId: string, currentPranams: number) => {
    OfflineSyncManager.addToQueue('PRANAM_POST', {
      communityId: activeWorkspace?.id,
      postId,
      pranams: (currentPranams || 0) + 1
    });
  };

  const handleHidePost = (postId: string) => {
    OfflineSyncManager.addToQueue('HIDE_SOCIAL_POST', {
      communityId: activeWorkspace?.id,
      postId
    });
    showToast('Post hidden by admin.', 'success');
  };


  useEffect(() => {
    setQueue(OfflineSyncManager.getQueue());

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleQueueUpdate = () => setQueue(OfflineSyncManager.getQueue());

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('offline_queue_updated', handleQueueUpdate);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('offline_queue_updated', handleQueueUpdate);
    };
  }, []);

  // Listen to live broadcasts (Mesh Feed)
  useEffect(() => {
    if (!activeWorkspace?.id) return;

    const q = query(
      collection(db, 'yatra_broadcasts'),
      where('communityId', '==', activeWorkspace.id),
      orderBy('originalTimestamp', 'desc'),
      limit(20)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((d, idx) => ({ id: d.id, ...d.data() }));
      setBroadcasts(docs);
      
      // Trigger alerts for new SOS messages (if they were created recently and not by current user)
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          // Check if it's an SOS, not from us, and happened in the last 2 minutes
          if (
            (data.type === 'SOS' || data.type === 'RICH_SOS') && 
            data.senderId !== currentUser?.id &&
            Date.now() - data.originalTimestamp < 120000
          ) {
            showToast(`EMERGENCY: ${data.senderName} triggered an SOS!`, 'error');
            if (navigator.vibrate) {
              navigator.vibrate([500, 200, 500, 200, 1000]); // SOS vibration pattern
            }
          }
        }
      });
    });

    return () => unsub();
  }, [activeWorkspace?.id, currentUser?.id]);

  const handleBroadcast = (type: 'MESSAGE' | 'SOS' | 'LOCATION') => {
    if (type === 'MESSAGE' && !message.trim()) return;

    const payload = {
      senderId: currentUser?.id,
      senderName: currentUser?.name || 'Devotee',
      communityId: activeWorkspace?.id,
      text: type === 'MESSAGE' ? message : type === 'SOS' ? '🚨 SOS EMERGENCY: I need immediate assistance!' : '📍 LOCATION SHARING: Live GPS coordinates dropped.',
    };

    OfflineSyncManager.addToQueue(type, payload);
    
    if (type === 'MESSAGE') setMessage('');
    
    if (!navigator.onLine) {
      showToast('Offline: Message queued for auto-sync', 'warning');
    } else {
      showToast('Message broadcasted successfully!', 'success');
    }
  };

  const handleRichSOS = async () => {
    // Attempt to get battery level
    let batteryLevel = null;
    try {
      if ('getBattery' in navigator) {
        const battery: any = await (navigator as any).getBattery();
        batteryLevel = Math.round(battery.level * 100);
      }
    } catch (e) {}

    // Attempt to get location
    let location = null;
    try {
      if (navigator.geolocation) {
        location = await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: Math.round(pos.coords.accuracy) }),
            () => resolve(null),
            { timeout: 5000, maximumAge: 10000 }
          );
        });
      }
    } catch (e) {}

    const payload = {
      senderId: currentUser?.id,
      senderName: currentUser?.name || 'Devotee',
      senderPhoto: (currentUser as any)?.photoUrl || null,
      communityId: activeWorkspace?.id,
      situation: sosSituation,
      details: sosDetails,
      location,
      batteryLevel,
      text: `🚨 EMERGENCY [${sosSituation.replace('_', ' ')}]: ${sosDetails}`,
    };

    OfflineSyncManager.addToQueue('RICH_SOS', payload);
    setShowSOSModal(false);
    setSosDetails('');
    
    if (!navigator.onLine) {
      showToast('Offline: Emergency SOS queued for local mesh transmission', 'warning');
    } else {
      showToast('EMERGENCY SOS BROADCASTED TO ALL NODES!', 'success');
    }
  };

  const handleDirectMessage = () => {
    if (!directMessage.trim() || !activeChatNode) return;

    const payload = {
      senderId: currentUser?.id,
      senderName: currentUser?.name || 'Devotee',
      recipientName: activeChatNode,
      communityId: activeWorkspace?.id,
      text: directMessage,
    };

    OfflineSyncManager.addToQueue('DIRECT_MESSAGE', payload);
    setDirectMessage('');
  };

  const handleRespondSOS = (sosId: string) => {
    OfflineSyncManager.addToQueue('RESPOND_SOS', {
      sosId,
      responderId: currentUser?.id,
      responderName: currentUser?.name || 'Devotee',
    });
    showToast('You are marked as responding!', 'success');
  };

  const handleResolveSOS = (sosId: string) => {
    OfflineSyncManager.addToQueue('RESOLVE_SOS', {
      sosId,
      resolverId: currentUser?.id,
      resolverName: currentUser?.name || 'Devotee',
    });
    showToast('Emergency marked as resolved!', 'success');
  };

  const handleExternalShare = async (b: any) => {
    const shareData = {
      title: 'YatraNet Emergency SOS',
      text: `🚨 URGENT: ${b.text}\nLocation: ${b.location ? `${b.location.lat}, ${b.location.lng}` : 'Unknown'}\nPlease help or share!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop/unsupported browsers
        const waLink = `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
        window.open(waLink, '_blank');
      }
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  const handleForwardSOS = (sosId: string) => {
    OfflineSyncManager.addToQueue('FORWARD_SOS', {
      sosId,
      forwarderId: currentUser?.id,
      forwarderName: currentUser?.name || 'Devotee',
    });
    showToast('Alert boosted to nearby network nodes!', 'success');
  };

  // Simulate radar scanning for nearby mesh nodes
  const handleScanArea = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  // Extract unique active users from recent broadcasts (simulated mesh nodes)
  const nearbyNodes = Array.from(new Set(
    broadcasts
      .filter(b => b.senderName && b.senderId !== currentUser?.id)
      .map((b, idx) => b.senderName)
  ));

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-24">
      {/* Tabs */}
      <div className="flex bg-stone-200/50 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto shadow-inner">
        <button 
          onClick={() => setActiveTab('SOCIAL')}
          className={`flex-1 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'SOCIAL' ? 'bg-white text-stone-900 shadow-md scale-100' : 'text-stone-500 scale-95 hover:text-stone-700'}`}
        >
          Community Feed
        </button>
        <button 
          onClick={() => setActiveTab('MESH')}
          className={`flex-1 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'MESH' ? 'bg-white text-rose-600 shadow-md scale-100' : 'text-stone-500 scale-95 hover:text-stone-700'}`}
        >
          Mesh Network & SOS
        </button>
      </div>

      {activeTab === 'SOCIAL' ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          {/* Create Post */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-black">
                {currentUser?.name?.charAt(0) || 'ॐ'}
              </div>
              <textarea 
                value={newPostText}
                onChange={e => setNewPostText(e.target.value)}
                placeholder="Share a Kirtan update, Seva milestone, or Dharmic thought..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-sm font-bold text-stone-800 outline-none focus:border-amber-400 focus:bg-white resize-none"
                rows={2}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 size={12} className="text-green-500"/> Verified accounts only
              </span>
              <button 
                onClick={handlePostSocial}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-md transition-all"
              >
                Post Update
              </button>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-4">
            {socialFeed.filter(p => !p.isHidden).map(post => (
              <div key={post.id} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col gap-3 group">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center font-black">
                      {post.senderName?.charAt(0) || 'ॐ'}
                    </div>
                    <div>
                      <h4 className="font-black text-stone-800 text-sm">{post.senderName}</h4>
                      <p className="text-[10px] font-bold text-stone-400">{new Date(post.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  {/* Admin Moderation */}
                  {(currentUser as any)?.role === 'admin' && (
                    <button 
                      onClick={() => handleHidePost(post.id)}
                      className="text-stone-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Hide Post (Admin)"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                <p className="text-sm font-medium text-stone-700 ml-12 whitespace-pre-wrap leading-relaxed">
                  {post.text}
                </p>

                <div className="ml-12 mt-2 pt-3 border-t border-stone-100 flex items-center gap-6">
                  <button 
                    onClick={() => handlePranam(post.id, post.pranams)}
                    className="flex items-center gap-1.5 text-stone-500 hover:text-amber-600 transition-colors"
                  >
                    <span className="text-lg">🙏</span>
                    <span className="text-xs font-black">{post.pranams || 0} Pranams</span>
                  </button>
                </div>
              </div>
            ))}
            {socialFeed.length === 0 && (
              <div className="text-center py-20 text-stone-400">
                <div className="text-4xl mb-4 opacity-50">📿</div>
                <p className="text-lg font-bold">No posts yet.</p>
                <p className="text-xs uppercase tracking-widest">Be the first to share an update.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
      <div className="space-y-6 animate-in slide-in-from-bottom-4">
      {/* Hardware Requirement Banner */}
      {!isOnline && (
        <div className="bg-amber-100 text-amber-900 px-4 py-3 rounded-2xl text-xs font-bold flex items-start gap-3 shadow-sm border border-amber-200">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
          <p>
            <strong>Hardware Required:</strong> Please ensure your phone's <strong>Bluetooth</strong> and <strong>Wi-Fi</strong> are turned ON for local mesh networking. 
            You do NOT need to manually pair with anyone or select a network.
          </p>
        </div>
      )}

      {/* Cloud Gateway Indicator */}
      {isOnline && (
        <div className="bg-emerald-50 text-emerald-900 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between shadow-sm border border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Globe className="w-5 h-5 shrink-0 text-emerald-600" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <p>
              <strong>Cloud Gateway Active:</strong> Your device has internet and is automatically routing local alerts to the global organization network.
            </p>
          </div>
          <span className="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-lg whitespace-nowrap">
            {nearbyNodes.length} offline nodes linked
          </span>
        </div>
      )}

      {activeChatNode ? (
        // Direct P2P Chat View
        <div className="space-y-4 animate-in slide-in-from-right-4">
          <button 
            onClick={() => setActiveChatNode(null)}
            className="flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Radar
          </button>
          
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
            {/* Header */}
            <div className="bg-stone-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shrink-0">
                  <UserSquare2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">{activeChatNode}</h3>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> P2P MESH CONNECTED</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50 custom-scrollbar">
              {broadcasts
                .filter(b => b.type === 'DIRECT_MESSAGE' && (
                  (b.senderName === currentUser?.name && b.recipientName === activeChatNode) ||
                  (b.senderName === activeChatNode && b.recipientName === currentUser?.name)
                ))
                .reverse()
                .map((msg, idx) => {
                  const isMe = msg.senderName === currentUser?.name;
                  return (
                    <div key={`${msg.id}-${idx}`} className={`flex flex-col max-w-[80%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                      <div className={`p-3 rounded-2xl text-sm font-bold shadow-sm ${
                        isMe ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-white border border-stone-200 text-stone-700 rounded-bl-sm'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] font-bold text-stone-400 mt-1 px-1">
                        {new Date(msg.originalTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {isMe && <CheckCircle2 className="w-3 h-3 inline ml-1 opacity-70" />}
                      </span>
                    </div>
                  );
              })}
            </div>

            {/* Input Box */}
            <div className="p-4 bg-white border-t border-stone-200 flex gap-2">
              <input 
                type="text" 
                placeholder="Direct P2P Message..."
                value={directMessage}
                onChange={(e) => setDirectMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDirectMessage()}
                className="flex-1 p-3 rounded-xl bg-stone-100 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
              />
              <button 
                onClick={handleDirectMessage}
                disabled={!directMessage.trim()}
                className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Network Status Header */}
          <div className={`p-6 rounded-3xl border shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
            isOnline 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-stone-900 border-stone-800 text-white'
          }`}>
        <div>
          <h2 className="text-xl font-black flex items-center gap-3">
            {isOnline ? <Wifi className="w-6 h-6 text-emerald-600" /> : <WifiOff className="w-6 h-6 text-amber-500" />}
            YatraNet Mesh Status
          </h2>
          <p className={`text-sm font-medium mt-1 ${isOnline ? 'text-emerald-700' : 'text-stone-400'}`}>
            {isOnline 
              ? 'Connected to Cloud. Broadcasting live.'
              : 'OFFLINE MODE ACTIVE. All actions are queued locally.'}
          </p>
        </div>
        
        {/* Capacitor Plugin Readiness */}
        <div className={`flex flex-col items-start sm:items-end text-xs font-bold ${isOnline ? 'text-emerald-600' : 'text-stone-400'}`}>
          <span className="flex items-center gap-1 bg-black/5 px-3 py-1.5 rounded-full"><Radio className="w-4 h-4"/> BLE Mesh Active</span>
          <span className="opacity-70 mt-1 pl-1">Capacitor Native Ready</span>
        </div>
      </div>

      {/* Radar Scanner Section */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-stone-900 text-white flex flex-col items-center justify-center relative overflow-hidden min-h-[160px]">
          {/* Radar Background Animation */}
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border border-emerald-500/30 rounded-full animate-ping absolute" />
              <div className="w-48 h-48 border border-emerald-500/50 rounded-full animate-ping absolute" style={{ animationDelay: '0.2s' }} />
              <div className="w-32 h-32 border border-emerald-500/80 rounded-full animate-ping absolute" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <button 
              onClick={handleScanArea}
              disabled={isScanning}
              className={`p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all ${isScanning ? 'animate-pulse text-emerald-400' : 'text-white'}`}
            >
              <Radar className="w-8 h-8" />
            </button>
            <div>
              <h3 className="font-black tracking-widest uppercase text-sm">
                {isScanning ? 'Scanning Area...' : 'Scan Nearby Devotees'}
              </h3>
              <p className="text-xs text-stone-400 mt-1">Discover users within Bluetooth/Wi-Fi range</p>
            </div>
          </div>
        </div>

        {/* Scan Results */}
        {scanComplete && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-xs font-black text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" /> Detected Nodes ({nearbyNodes.length})
            </h4>
            {nearbyNodes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {nearbyNodes.map((nodeName, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveChatNode(nodeName as string)}
                    className="bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-200 text-stone-700 hover:text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {nodeName}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm font-medium text-stone-600">No active devices found in immediate range.</p>
            )}
          </div>
        )}
      </div>

      {/* Action Pad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* SOS Button */}
        <button 
          onClick={() => setShowSOSModal(true)}
          className="p-6 bg-red-600 hover:bg-red-700 text-white rounded-3xl shadow-xl shadow-red-600/20 flex flex-col items-center justify-center gap-3 transition-transform active:scale-95 border-2 border-red-500/50"
        >
          <AlertTriangle className="w-10 h-10 animate-pulse" />
          <div className="text-center">
            <span className="block font-black text-xl uppercase tracking-widest">Send SOS</span>
            <span className="block text-xs font-bold text-red-200 mt-1">Broadcast Emergency to Yatra Group</span>
          </div>
        </button>

        {/* Location Drop Button */}
        <button 
          onClick={() => handleBroadcast('LOCATION')}
          className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl shadow-xl shadow-blue-600/20 flex flex-col items-center justify-center gap-3 transition-transform active:scale-95"
        >
          <MapPin className="w-10 h-10" />
          <div className="text-center">
            <span className="block font-black text-xl uppercase tracking-widest">Drop Location</span>
            <span className="block text-xs font-bold text-blue-200 mt-1">Pin current GPS for Family</span>
          </div>
        </button>
      </div>

      {/* Chat / Broadcast Box */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest border-b border-stone-100 pb-2">Group Broadcast Message</h3>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder={isOnline ? "Type message to nearby group..." : "Type message (will send when online)..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleBroadcast('MESSAGE')}
            className={`flex-1 p-4 rounded-xl text-sm font-bold outline-none transition-all ${
              isOnline ? 'bg-stone-50 border border-stone-200 focus:bg-white focus:border-emerald-500' : 'bg-stone-100 placeholder:text-stone-500 border border-transparent'
            }`}
          />
          <button 
            onClick={() => handleBroadcast('MESSAGE')}
            disabled={!message.trim()}
            className={`px-6 rounded-xl flex items-center justify-center shadow-lg transition-colors disabled:opacity-50 ${
              isOnline ? 'bg-stone-900 hover:bg-stone-800 text-white' : 'bg-amber-500 hover:bg-amber-600 text-stone-900'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Live Broadcast Feed */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-stone-500 uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-4 h-4" /> Live Mesh Feed
        </h3>
        
        {broadcasts.length === 0 ? (
          <div className="p-8 bg-white border border-stone-200 rounded-3xl text-center text-stone-500 text-sm font-bold shadow-sm">
            No recent broadcasts in this area.
          </div>
        ) : (
          <div className="space-y-3">
            {broadcasts.map((b, idx) => {
              const isSOS = b.type === 'SOS' || b.type === 'RICH_SOS';
              const isLocation = b.type === 'LOCATION';
              const isMe = b.senderId === currentUser?.id;
              
              return (
                <div 
                  key={`${b.id}-${idx}`} 
                  className={`p-4 rounded-2xl border shadow-sm flex flex-col gap-3 transition-all ${
                    isSOS 
                      ? 'bg-red-50 border-red-200 animate-in fade-in zoom-in' 
                      : isMe 
                        ? 'bg-emerald-50/50 border-emerald-100' 
                        : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {b.type === 'RICH_SOS' && b.senderPhoto ? (
                      <img src={b.senderPhoto} alt="User" className={`w-10 h-10 rounded-xl object-cover shrink-0 ${isSOS ? 'ring-2 ring-red-500 animate-pulse' : ''}`} />
                    ) : (
                      <div className={`p-2 rounded-xl shrink-0 ${isSOS ? 'bg-red-100 text-red-600 animate-pulse' : isLocation ? 'bg-blue-100 text-blue-600' : 'bg-stone-100 text-stone-600'}`}>
                        {isSOS ? <AlertTriangle className="w-5 h-5" /> : isLocation ? <MapPin className="w-5 h-5" /> : <Radio className="w-5 h-5" />}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-xs font-black uppercase tracking-widest ${isSOS ? 'text-red-700' : 'text-stone-900'}`}>
                          {b.senderName} {isMe && '(You)'}
                        </span>
                        <span className="text-[10px] font-bold text-stone-400">
                          {new Date(b.originalTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className={`text-sm font-bold ${isSOS ? 'text-red-600' : 'text-stone-600'}`}>
                        {b.text}
                      </p>
                    </div>
                  </div>
                  
                  {/* Rich SOS Payload Visuals */}
                  {b.type === 'RICH_SOS' && (
                    <div className="mt-2 space-y-2">
                      <div className="p-3 bg-red-100/50 rounded-xl border border-red-200 grid grid-cols-2 gap-2 text-xs">
                        {b.location && (
                          <div className="flex items-center gap-1.5 text-red-700 font-bold">
                            <MapPin className="w-3.5 h-3.5" />
                            {b.location.lat.toFixed(4)}, {b.location.lng.toFixed(4)} ({b.location.accuracy}m)
                          </div>
                        )}
                        {b.batteryLevel !== null && (
                          <div className="flex items-center gap-1.5 text-red-700 font-bold">
                            <Battery className="w-3.5 h-3.5" />
                            Battery {b.batteryLevel}%
                          </div>
                        )}
                        <div className="col-span-2 flex items-center gap-1.5 text-red-700 font-bold mt-1 pt-1 border-t border-red-200/50">
                          <UserSquare2 className="w-3.5 h-3.5" /> Identity & Metadata cached for offline authorities
                        </div>
                      </div>

                      {b.location && (
                        <div className="h-48 w-full rounded-xl overflow-hidden border-2 border-red-200 z-0 relative isolate">
                          <MapContainer 
                            center={[b.location.lat, b.location.lng]} 
                            zoom={16} 
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={false}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Circle center={[b.location.lat, b.location.lng]} radius={b.location.accuracy} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2, weight: 1 }} />
                            <Marker position={[b.location.lat, b.location.lng]} icon={emergencyIcon} />
                          </MapContainer>
                          <div className="absolute bottom-2 right-2 z-[1000]">
                             <a href={`https://www.google.com/maps/dir/?api=1&destination=${b.location.lat},${b.location.lng}`} target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                               <Navigation className="w-3 h-3" /> Navigate
                             </a>
                          </div>
                        </div>
                      )}

                      {/* Triage & Forwarding Actions */}
                      {b.sosStatus === 'RESOLVED' ? (
                        <div className="bg-stone-100 text-stone-600 text-xs font-bold p-2.5 rounded-xl border border-stone-200 flex items-center justify-between">
                          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Emergency Resolved</span>
                          <span>by {b.resolverName}</span>
                        </div>
                      ) : b.sosStatus === 'RESPONDED' ? (
                        <div className="space-y-2">
                          <div className="bg-emerald-100 text-emerald-800 text-xs font-bold p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Help is on the way</span>
                            <span>Responded by {b.responderName}</span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleExternalShare(b)}
                              className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-colors flex items-center justify-center gap-2"
                            >
                              <Phone className="w-4 h-4" /> Share Externally
                            </button>
                            {(isMe || b.responderId === currentUser?.id) && (
                              <button 
                                onClick={() => handleResolveSOS(b.id)}
                                className="flex-1 py-2 bg-stone-200 hover:bg-stone-300 text-stone-900 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-colors flex items-center justify-center gap-2"
                              >
                                Mark Resolved
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleRespondSOS(b.id)}
                              disabled={isMe}
                              className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-colors flex items-center justify-center gap-2"
                            >
                              <UserSquare2 className="w-4 h-4" /> I am Responding
                            </button>
                            <button 
                              onClick={() => handleForwardSOS(b.id)}
                              className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-colors flex items-center justify-center gap-2"
                            >
                              <Radio className="w-4 h-4" /> Boost / Relay {b.forwardCount > 0 && `(${b.forwardCount})`}
                            </button>
                          </div>
                          <button 
                            onClick={() => handleExternalShare(b)}
                            className="w-full py-2 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-colors flex items-center justify-center gap-2"
                          >
                            <Phone className="w-4 h-4" /> Share to WhatsApp / SMS
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Local Queue Viewer */}
      {queue.length > 0 && (
        <div className="bg-amber-50 rounded-3xl border border-amber-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-4 bg-amber-100/50 border-b border-amber-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-amber-900 flex items-center gap-2">
              <Clock className="w-4 h-4"/> Offline Queue ({queue.length})
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Auto-syncs on connection</span>
          </div>
          <div className="p-2 space-y-2">
            {queue.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="p-3 bg-white/60 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-stone-900">{item.type}</span>
                  <p className="text-[10px] font-bold text-stone-500 line-clamp-1">{item.payload.text}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
                  <WifiOff className="w-3 h-3" /> PENDING
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rich SOS Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-red-600 p-4 text-white flex items-center justify-between">
              <h3 className="font-black text-lg flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
                INITIATE EMERGENCY SOS
              </h3>
              <button onClick={() => setShowSOSModal(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 flex-1 overflow-y-auto">
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-500 uppercase tracking-widest">Type of Emergency</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSosSituation('LOST_PERSON')}
                    className={`p-3 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition-colors ${sosSituation === 'LOST_PERSON' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-stone-200 text-stone-600'}`}
                  >
                    <Users className="w-5 h-5" /> Lost Family
                  </button>
                  <button 
                    onClick={() => setSosSituation('MEDICAL')}
                    className={`p-3 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition-colors ${sosSituation === 'MEDICAL' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-stone-200 text-stone-600'}`}
                  >
                    <Activity className="w-5 h-5" /> Medical
                  </button>
                  <button 
                    onClick={() => setSosSituation('SEPARATED')}
                    className={`p-3 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition-colors ${sosSituation === 'SEPARATED' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-stone-200 text-stone-600'}`}
                  >
                    <MapPin className="w-5 h-5" /> Separated
                  </button>
                  <button 
                    onClick={() => setSosSituation('OTHER')}
                    className={`p-3 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition-colors ${sosSituation === 'OTHER' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-stone-200 text-stone-600'}`}
                  >
                    <AlertTriangle className="w-5 h-5" /> Other Danger
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-stone-500 uppercase tracking-widest">Additional Details</label>
                <textarea 
                  value={sosDetails}
                  onChange={e => setSosDetails(e.target.value)}
                  placeholder="e.g. 5 year old boy wearing blue shirt, near Gate 4..."
                  className="w-full p-4 rounded-xl border border-stone-200 bg-stone-50 text-sm font-medium min-h-[100px] focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                />
              </div>

              <div className="bg-stone-100 p-4 rounded-xl text-xs font-bold text-stone-600 flex flex-col gap-2">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" /> Auto-attaching Live GPS Location</span>
                <span className="flex items-center gap-2"><Battery className="w-4 h-4 text-emerald-600" /> Auto-attaching Device Battery %</span>
                <span className="flex items-center gap-2"><UserSquare2 className="w-4 h-4 text-emerald-600" /> Auto-attaching Profile Identity & Photo</span>
              </div>
            </div>

            <div className="p-4 border-t border-stone-200 bg-stone-50">
              <button 
                onClick={handleRichSOS}
                disabled={!sosDetails.trim()}
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest shadow-xl shadow-red-600/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
              >
                <Radio className="w-5 h-5 animate-pulse" /> BROADCAST TO MESH NETWORK
              </button>
            </div>
          </div>
        </div>
      )}

      </>
      )}
      </div>
      )}
    </div>
  );
}

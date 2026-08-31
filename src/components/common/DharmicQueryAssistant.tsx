import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  Building2,
  Flame,
  Globe2,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowRight,
  Bookmark,
  ChevronDown,
  ChevronUp,
  X,
  Bot,
  HelpCircle,
  ShieldCheck,
  Compass,
  MessageSquareQuote,
  Sparkle,
  Zap,
  Key,
  ExternalLink,
  Search,
  CheckCircle2,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';
import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useWorkspaceTaxonomy } from '../../hooks/useWorkspaceTaxonomy';
import { useToast } from '../../context/ToastContext';

export type AssistantMode = 'auto' | 'scriptural' | 'administrative' | 'rituals';
export type AssistantLang = 'en' | 'hi' | 'bn' | 'sa';

export interface DharmicAssistantResult {
  title: string;
  summary: string;
  shloka?: string;
  shlokaTransliteration?: string;
  shlokaMeaning?: string;
  scriptureSource?: string;
  guidancePoints: string[];
  moduleActions?: Array<{
    label: string;
    targetModule?: string;
    tip: string;
  }>;
  suggestedQueries: string[];
  isMock?: boolean;
  error?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  query?: string;
  result?: DharmicAssistantResult;
  moduleContext: string;
}

export interface DharmicQueryAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeModule?: string;
  onNavigate?: (module: string) => void;
  isDrawer?: boolean;
}

export const DharmicQueryAssistant: React.FC<DharmicQueryAssistantProps> = ({
  isOpen = true,
  onClose,
  activeModule = 'dashboard',
  onNavigate,
  isDrawer = false,
}) => {
  const { activeWorkspace, currentRole } = useAuthWorkspace();
  const { language } = useLanguage();
  const taxonomy = useWorkspaceTaxonomy();
  const { showToast } = useToast();

  // Assistant Mode: AI vs Non-AI
  const [mainTab, setMainTab] = useState<'ai' | 'non_ai'>('ai');

  // AI Assistant States
  const [promptInput, setPromptInput] = useState('');
  const [assistantMode, setAssistantMode] = useState<AssistantMode>('auto');
  const [selectedLang, setSelectedLang] = useState<AssistantLang>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [showPresets, setShowPresets] = useState(true);

  // Custom API Key Management
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKeyInput, setCustomKeyInput] = useState(() => {
    return localStorage.getItem('user_gemini_api_key') || '';
  });
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isValidatingKey, setIsValidatingKey] = useState(false);
  const [hasValidKey, setHasValidKey] = useState(() => {
    return Boolean(localStorage.getItem('user_gemini_api_key'));
  });

  // Non-AI Knowledge Base States
  const [nonAiSearch, setNonAiSearch] = useState('');
  const [nonAiCategory, setNonAiCategory] = useState<'all' | 'devotee' | 'manager' | 'admin'>('all');
  const [expandedSopId, setExpandedSopId] = useState<string | null>('sop-1');

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const handleSaveKey = async () => {
    if (!customKeyInput.trim()) {
      localStorage.removeItem('user_gemini_api_key');
      setHasValidKey(false);
      showToast('Removed custom API key', 'info');
      setShowKeyModal(false);
      return;
    }

    setIsValidatingKey(true);
    try {
      const res = await fetch('/api/gemini/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: customKeyInput.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('user_gemini_api_key', customKeyInput.trim());
        setHasValidKey(true);
        showToast('Gemini API Key verified and saved successfully! 🙏', 'success');
        setShowKeyModal(false);
      } else {
        showToast(`Verification failed: ${data.error || 'Invalid key'}`, 'error');
      }
    } catch (e: any) {
      localStorage.setItem('user_gemini_api_key', customKeyInput.trim());
      setHasValidKey(true);
      showToast('API key saved locally', 'info');
      setShowKeyModal(false);
    } finally {
      setIsValidatingKey(false);
    }
  };

  // Non-AI Offline Knowledge Base Data
  const offlineSopList = [
    {
      id: 'sop-1',
      category: 'devotee',
      role: 'Devotee / Member',
      title: 'How to Book a Sacred Puja, Havan, or Darshan Sankalp',
      steps: [
        'Open the Puja Booking / Purohit Desk from the navigation menu.',
        'Select your Vedic ceremony (e.g. Rudrabhishek, Chandi Path, Satyanarayan Puja).',
        'Enter Yajamana Gotra, Nakshatra, and the specific Sankalpa intention.',
        'Choose your date and time slot; select from verified Purohit scholars.',
        'Receive an instant digital Sankalp receipt with Puja Prasadam dispatch tracking.'
      ],
      targetModule: 'pooja-booking',
      targetLabel: 'Open Puja Booking Desk'
    },
    {
      id: 'sop-2',
      category: 'devotee',
      role: 'Devotee / Member',
      title: 'How to Download 80G Tax Exemption Donation Certificates',
      steps: [
        'Visit your Personal Account -> Bookings & 80G tab or Treasury Ledger.',
        'Locate your donation transaction record.',
        'Click "Download 80G PDF" for instant certificate generation.',
        'The certificate features official Income Tax Registration codes and QR verification.'
      ],
      targetModule: 'tax-receipt-80g',
      targetLabel: 'Open 80G Tax Desk'
    },
    {
      id: 'sop-3',
      category: 'devotee',
      role: 'Devotee / Member',
      title: 'How to use the Japa Mala Counter & Daily Sadhana Tracker',
      steps: [
        'Navigate to the "Sadhana" tab in the bottom bar.',
        'Select your sacred mantra (e.g. Gayatri, Maha Mrityunjaya, Om Namah Shivaya).',
        'Tap the bead counter on each repetition; it tallies 108 counts automatically per Mala.',
        'Enable audio sound and haptic vibration feedback for immersive meditation.',
        'Track your weekly Sadhana streak and earn Dharmic badges.'
      ],
      targetModule: 'personal-sadhana',
      targetLabel: 'Open Sadhana Desk'
    },
    {
      id: 'sop-4',
      category: 'manager',
      role: 'Staff Manager',
      title: 'How to Count, Reconcile, and Seal Hundi Cash Collections',
      steps: [
        'Open Treasury Ledger -> New Transaction -> Hundi Cash Collection.',
        'Enter full currency denomination breakdown (500s, 200s, 100s, 50s, coins).',
        'Assign at least two witnessing Sevaks or Trustees to sign the audit entry.',
        'Generate tamper-proof Hundi Seal Receipt with serial numbers and time stamps.'
      ],
      targetModule: 'treasury-ledger',
      targetLabel: 'Open Treasury Ledger'
    },
    {
      id: 'sop-5',
      category: 'manager',
      role: 'Staff Manager',
      title: 'How to Manage Daily Aarti Rotations & Sevadar Shifts',
      steps: [
        'Access Mandir Operations -> Aarti & Duty Roster.',
        'Select Morning Mangala, Bhog Aarti, Sandhya Aarti, or Shayan Aarti shifts.',
        'Assign certified Pujaris, Dhak/Mridangam players, and Prasadam distribution volunteers.',
        'Send automatic shift reminders via WhatsApp broadcast.'
      ],
      targetModule: 'aarti-roster',
      targetLabel: 'View Aarti Roster'
    },
    {
      id: 'sop-6',
      category: 'manager',
      role: 'Staff Manager',
      title: 'How to Calculate Kitchen Raw Materials for 1,000+ Devotees',
      steps: [
        'Open Annadanam Kitchen Desk under Seva Operations.',
        'Enter target devotee footfall (e.g. 500, 1,000, 5,000).',
        'The engine auto-calculates required Rice, Dal, Desi Ghee, Jaggery, and Spices.',
        'Check inventory stock in real-time to trigger procurement alerts.'
      ],
      targetModule: 'annadanam-kitchen',
      targetLabel: 'Open Kitchen Desk'
    },
    {
      id: 'sop-7',
      category: 'admin',
      role: 'Trustee / Admin',
      title: 'How to Manage User Roles & Role-Based Permissions (RBAC)',
      steps: [
        'Navigate to System Settings -> User Roles & Access Control.',
        'Add new staff profile or edit existing credentials.',
        'Assign role permissions: Trustee (Full Access), Manager (Operations & Treasury), Purohit (Rituals), or Volunteer.',
        'Set high-security two-trustee approvals for payments exceeding ₹50,000.'
      ],
      targetModule: 'user-roles',
      targetLabel: 'Open User Roles Desk'
    },
    {
      id: 'sop-8',
      category: 'admin',
      role: 'Trustee / Admin',
      title: 'How to Audit Fiduciary Records & Export CA Pack',
      steps: [
        'Open Audit Log Desk under Enterprise Compliance.',
        'Filter by date range and payment instrument (Cash, UPI, Bank Transfer).',
        'Review cryptographic hash signatures for every ledger entry.',
        'Click "Export CA Audit Pack (Excel/PDF)" to generate audited balance sheets.'
      ],
      targetModule: 'security-audit-log',
      targetLabel: 'Open Audit Log Desk'
    }
  ];

  const filteredOfflineSops = offlineSopList.filter(item => {
    const matchesCat = nonAiCategory === 'all' || item.category === nonAiCategory;
    const matchesSearch = !nonAiSearch.trim() ||
      item.title.toLowerCase().includes(nonAiSearch.toLowerCase()) ||
      item.steps.some(s => s.toLowerCase().includes(nonAiSearch.toLowerCase())) ||
      item.role.toLowerCase().includes(nonAiSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Initialize with contextual greeting on first mount
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'initial-greeting',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        moduleContext: activeModule,
        result: {
          title: `Namaste! Sri ${activeWorkspace.name} AI Assistant`,
          summary: `Welcome to the Dharmic Intelligence Desk. I provide authentic Shastric citations, scriptural wisdom, and institutional administration workflows tailored to ${activeWorkspace.type} operations in ${taxonomy.directoryName || 'Devotee'} management, Vedic Rituals, Double-Entry Treasury, and Seva.`,
          shloka: `धर्मो रक्षति रक्षितः।\nयतो धर्मस्ततो जयः॥`,
          shlokaTransliteration: `dharmo rakṣati rakṣitaḥ, yato dharmastato jayaḥ`,
          shlokaMeaning: `Dharma protects those who uphold Dharma. Where there is righteousness, victory is assured.`,
          scriptureSource: `Mahabharata & Manusmriti 8.15`,
          guidancePoints: [
            `Current active desk is [${activeModule}]. Ask any scriptural, procedural, or Vedic astrological query.`,
            `Get real-time Sanskrit Shlokas with Devanagari script, Roman transliteration, and tri-lingual exposition.`,
            `Receive institutional SOP checklists for temple rituals, 80G receipts, Annadanam recipes, and Goshala care.`
          ],
          moduleActions: [
            { label: `Explore ${taxonomy.directoryName}`, targetModule: 'devotee-grid', tip: `View ${taxonomy.memberNoun} profiles` },
            { label: 'Check Live Panjika', targetModule: 'panchang-muhurat', tip: 'View Tithi & Muhurat calculations' }
          ],
          suggestedQueries: getContextualPrompts(activeModule, activeWorkspace.type),
          isMock: false,
        },
      };
      setMessages([initialGreeting]);
    }
  }, [activeWorkspace, activeModule, taxonomy]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Contextual Presets based on active module
  function getContextualPrompts(moduleKey: string, wsType: string): string[] {
    const mod = (moduleKey || '').toLowerCase();
    if (mod.includes('pooja') || mod.includes('aarti') || mod.includes('purohit') || mod.includes('pitru') || mod.includes('panchang')) {
      return [
        'What are the essential Samagri and Sankalp rules for Rudrabhishek?',
        'How to resolve Gotra Pravara conflict for rituals?',
        'What are the rules for Shradh Tithi when overlapping solar noon?',
        'Which Nakshatra and Hora are best for Griha Pravesh?'
      ];
    }
    if (mod.includes('treasury') || mod.includes('tax') || mod.includes('karma') || mod.includes('campaign')) {
      return [
        'Dharmic principles of temple fund management in Arthashastra',
        'How to classify Hundi cash vs Corpus Chanda for 80G exemption?',
        'Chanakya Niti on temple audit and financial transparency',
        'How to assign Karma Merit points to voluntary sevadars?'
      ];
    }
    if (mod.includes('gau') || mod.includes('goshala')) {
      return [
        'Pancha-Gavya preparation ratios and Ayurvedic applications',
        'Spiritual merit of Go-Daan in Padma Purana & Mahabharata',
        'Daily diet and seasonal fodder schedule for Desi Gir cows',
        'How to set up a monthly recurring Go-Seva adoption drive?'
      ];
    }
    if (mod.includes('annadanam') || mod.includes('kitchen')) {
      return [
        'Classical Shaucha (purity) rules for temple kitchen sevadars',
        'Taittiriya Upanishad verses on the sanctity of Anna-Daan',
        'Quantity estimation formula for 1,000 devotees Maha-Prasadam',
        'How to link devotee birthday Sankalps with Annadanam meals?'
      ];
    }
    if (mod.includes('devotee') || mod.includes('family') || mod.includes('vanshavali') || mod.includes('census')) {
      return [
        'How to record Sapinda lineage up to 7 generations in Vanshavali?',
        'Significance of Rishi Gotras and Pravaras in Sanatan Dharma',
        'Devotee engagement and Seva Tier classification matrix',
        'Vedic blessing for family prosperity (Kula Vriddhi)'
      ];
    }
    if (mod.includes('whatsapp') || mod.includes('events') || mod.includes('sanskrit')) {
      return [
        'Draft an inspiring WhatsApp Sandesh for upcoming Ekadashi Vrata',
        'Key shlokas on Seva from Bhagavad Gita with translation',
        'How to plan festival crowd management during Janmashtami / Shivratri',
        'Sacred prayer for institutional peace and harmony'
      ];
    }

    return [
      `Dharmic duties of trustees and sevadars in a ${wsType}`,
      'How to uphold transparency while managing devotee contributions?',
      'Sacred Shloka for overcoming institutional challenges',
      'Daily morning prayer for temple sevaks (Kalyana Mantra)'
    ];
  }

  // Handle Query Submission
  const handleSendQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      query: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      moduleContext: activeModule,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPromptInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages
        .filter((m) => m.query || m.result?.summary)
        .slice(-4)
        .map((m, idx) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          text: m.query || m.result?.summary || '',
        }));

      const customKey = localStorage.getItem('user_gemini_api_key') || undefined;

      const res = await fetch('/api/gemini/dharmic-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: trimmed,
          customApiKey: customKey,
          activeModule,
          workspaceType: activeWorkspace.type,
          workspaceName: activeWorkspace.name,
          sampradaya: activeWorkspace.sampradaya,
          language: selectedLang,
          contextMode: assistantMode,
          conversationHistory: history,
        }),
      });

      const data = await res.json();

      if (data.success && data.result) {
        const assistantMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          result: data.result,
          moduleContext: activeModule,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to retrieve response');
      }
    } catch (err: any) {
      console.error('Dharmic assistant fetch error:', err);
      const fallbackMessage: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        moduleContext: activeModule,
        result: {
          title: 'Dharmic Guidance Note',
          summary: `Your inquiry regarding "${trimmed}" has been recorded. Sanatan wisdom emphasizes righteous conduct and dedicated seva in all organizational endeavors.`,
          shloka: `कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥`,
          shlokaTransliteration: `karmaṇy-evādhikāras te mā phaleṣu kadācana`,
          shlokaMeaning: `You have a right to perform your prescribed duty, but never to the fruits of action.`,
          scriptureSource: `Bhagavad Gita 2.47`,
          guidancePoints: [
            `Maintain righteous intent (Sankalpa Shuddhi) in executing duties within [${activeModule}].`,
            `Ensure all records and transactions reflect complete institutional transparency.`,
            `Consult senior scholars or trustees for complex Shastric interpretations.`
          ],
          moduleActions: [
            { label: 'Back to Dashboard', targetModule: 'dashboard', tip: 'Return to home' }
          ],
          suggestedQueries: getContextualPrompts(activeModule, activeWorkspace.type),
          isMock: true,
        },
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy Shloka or result
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Speech Synthesis
  const handleSpeak = (text: string) => {
    if (!synthRef.current) {
      showToast('Speech synthesis not supported in this browser.', 'info');
      return;
    }
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      const cleanText = text.replace(/[॥।]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = selectedLang === 'hi' || selectedLang === 'sa' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      synthRef.current.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  const handleBookmark = (title: string, shloka?: string) => {
    const item = shloka ? `${title}: ${shloka}` : title;
    if (!savedNotes.includes(item)) {
      setSavedNotes((prev) => [...prev, item]);
      showToast('Saved to your Dharmic Study Notes', 'success');
    } else {
      setSavedNotes((prev) => prev.filter((n) => n !== item));
      showToast('Removed from saved notes', 'info');
    }
  };

  const clearChat = () => {
    setMessages([]);
    showToast('Chat history cleared', 'info');
  };

  if (!isOpen && isDrawer) return null;

  return (
    <div
      id="dharmic-query-assistant-container"
      className={`flex flex-col bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden font-sans text-slate-100 ${
        isDrawer
          ? 'fixed top-16 right-4 bottom-4 w-full sm:w-[500px] z-50 transition-all duration-300'
          : 'w-full h-full min-h-[600px]'
      }`}
    >
      {/* Auspicious Top Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 px-4 sm:px-5 py-3.5 border-b border-amber-500/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 font-serif font-bold text-lg select-none">
            ॐ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-amber-100 tracking-wide flex items-center gap-1.5">
                Universal Dharmic Assistant
              </h3>
              {hasValidKey ? (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  Custom Key
                </span>
              ) : (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  Gemini Flash
                </span>
              )}
            </div>
            <p className="text-[11px] text-amber-200/70 truncate max-w-[260px]">
              Vedic Scriptures, Rituals, & Mandir ERP Support
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Key Settings Button */}
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            title="Configure Custom Gemini API Key & Guide"
            className="p-1.5 rounded-lg text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors cursor-pointer"
          >
            <Key className="w-4 h-4" />
          </button>

          {mainTab === 'ai' && (
            <button
              type="button"
              onClick={clearChat}
              title="Reset Conversation"
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {isDrawer && onClose && (
            <button
              type="button"
              id="close-assistant-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Mode Switcher: AI Assistant vs Non-AI SOPs */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-2 text-xs shrink-0">
        <div className="flex items-center bg-slate-900 border border-slate-700/60 rounded-xl p-0.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setMainTab('ai')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mainTab === 'ai'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Vedic Assistant</span>
          </button>
          <button
            type="button"
            onClick={() => setMainTab('non_ai')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mainTab === 'non_ai'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Non-AI Offline SOPs</span>
          </button>
        </div>

        {mainTab === 'ai' && (
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
            <span>Context:</span>
            <span className="font-mono text-amber-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
              {activeModule}
            </span>
          </div>
        )}
      </div>

      {/* VIEW 1: AI ASSISTANT */}
      {mainTab === 'ai' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub-mode filter tabs */}
          <div className="bg-slate-950/60 px-3 py-1.5 border-b border-slate-800/80 flex items-center gap-1 overflow-x-auto no-scrollbar text-[11px]">
            <button
              onClick={() => setAssistantMode('auto')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                assistantMode === 'auto'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Universal
            </button>
            <button
              onClick={() => setAssistantMode('scriptural')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                assistantMode === 'scriptural'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              Shastras
            </button>
            <button
              onClick={() => setAssistantMode('administrative')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                assistantMode === 'administrative'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3 h-3" />
              Admin ERP
            </button>
            <button
              onClick={() => setAssistantMode('rituals')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                assistantMode === 'rituals'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3 h-3" />
              Puja Vidhi
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900/60">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.id}-${idx}`}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'user' ? (
                  <div className="max-w-[85%] bg-amber-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-md">
                    <p className="text-xs sm:text-sm leading-relaxed">{msg.query}</p>
                    <span className="text-[10px] text-amber-200/80 block text-right mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ) : (
                  <div className="w-full max-w-full bg-slate-950 border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-3">
                    {/* Header of Assistant Card */}
                    <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif text-sm">
                          ॐ
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-amber-200 leading-tight">
                            {msg.result?.title || 'Dharmic Guidance'}
                          </h4>
                          {msg.result?.scriptureSource && (
                            <p className="text-[10px] text-amber-400/80 font-medium">
                              Pramana: {msg.result.scriptureSource}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        {msg.result?.shloka && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSpeak(
                                `${msg.result?.shloka}. Meaning: ${msg.result?.shlokaMeaning}`
                              )
                            }
                            title={isSpeaking ? 'Stop Audio' : 'Listen to Pronunciation'}
                            className={`p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer ${
                              isSpeaking ? 'text-amber-400 bg-amber-500/10 animate-pulse' : ''
                            }`}
                          >
                            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              `${msg.result?.title}\n\n${msg.result?.shloka ? `॥ ${msg.result.shloka} ॥\n\nMeaning: ${msg.result.shlokaMeaning}\nSource: ${msg.result.scriptureSource}\n\n` : ''}${msg.result?.summary}\n\nRecommendations:\n${(msg.result?.guidancePoints || []).map((p, idx) => `• ${p}`).join('\n')}`,
                              msg.id
                            )
                          }
                          title="Copy Guidance"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleBookmark(msg.result?.title || 'Note', msg.result?.shloka)
                          }
                          title="Save to Notes"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sanskrit Shloka Box (if present) */}
                    {msg.result?.shloka && (
                      <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-orange-950/30 border border-amber-500/30 rounded-xl p-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-amber-400 uppercase tracking-widest font-bold">
                          <span className="flex items-center gap-1">
                            <Sparkle className="w-3 h-3 text-amber-400" />
                            Sacred Shastra Pramana
                          </span>
                          <span>{msg.result.scriptureSource}</span>
                        </div>

                        <div className="font-serif text-sm sm:text-base text-amber-100 leading-relaxed font-semibold text-center py-1 tracking-wide">
                          ॥ {msg.result.shloka} ॥
                        </div>

                        {msg.result.shlokaTransliteration && (
                          <div className="text-[11px] text-amber-200/80 italic text-center font-mono">
                            "{msg.result.shlokaTransliteration}"
                          </div>
                        )}

                        {msg.result.shlokaMeaning && (
                          <div className="text-xs text-slate-300 border-t border-amber-500/20 pt-1.5 leading-relaxed">
                            <strong className="text-amber-300 font-semibold">Meaning: </strong>
                            {msg.result.shlokaMeaning}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Summary */}
                    <div className="text-xs text-slate-200 leading-relaxed">
                      <p>{msg.result?.summary}</p>
                    </div>

                    {/* Guidance Bullet Points */}
                    {msg.result?.guidancePoints && msg.result.guidancePoints.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                          Key Recommendations:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {msg.result.guidancePoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-amber-500 font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Direct Action Buttons */}
                    {msg.result?.moduleActions && msg.result.moduleActions.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80">
                        <div className="flex flex-wrap gap-1.5">
                          {msg.result.moduleActions.map((action, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                if (action.targetModule && onNavigate) {
                                  onNavigate(action.targetModule);
                                  showToast(`Switched to ${action.label}`, 'info');
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>{action.label}</span>
                              <ArrowRight className="w-3 h-3 text-amber-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 bg-slate-950 border border-amber-500/20 rounded-2xl p-4 animate-pulse">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-serif">
                  ॐ
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 bg-amber-500/20 rounded w-1/3"></div>
                  <div className="h-2 bg-slate-800 rounded w-3/4"></div>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Presets Bar */}
          <div className="bg-slate-950 border-t border-slate-800 px-3 py-2 shrink-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                Quick Inquiries:
              </span>
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="text-[10px] text-slate-400 hover:text-amber-300 cursor-pointer"
              >
                {showPresets ? 'Hide' : 'Show'}
              </button>
            </div>

            {showPresets && (
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {getContextualPrompts(activeModule, activeWorkspace.type).map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendQuery(prompt)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-amber-950/40 border border-slate-700/60 hover:border-amber-500/40 text-[11px] text-slate-300 hover:text-amber-200 whitespace-nowrap transition-colors shrink-0 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-slate-950 p-3 border-t border-slate-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery(promptInput);
              }}
              className="flex items-center gap-2"
            >
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value as AssistantLang)}
                className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-xl px-2 py-2.5 focus:outline-none focus:border-amber-500"
              >
                <option value="en">EN</option>
                <option value="hi">हिन्दी</option>
                <option value="bn">বাংলা</option>
                <option value="sa">संस्कृत</option>
              </select>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder={`Ask scriptural guidance or SOPs...`}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={!promptInput.trim() || isLoading}
                className={`p-2.5 rounded-xl font-semibold flex items-center justify-center transition-all ${
                  promptInput.trim() && !isLoading
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 2: NON-AI OFFLINE SOP KNOWLEDGE BASE */}
      {mainTab === 'non_ai' && (
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 p-4 space-y-3">
          {/* Category Filter */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl text-xs font-bold">
              {[
                { key: 'all', label: 'All SOPs' },
                { key: 'devotee', label: 'Devotee' },
                { key: 'manager', label: 'Manager' },
                { key: 'admin', label: 'Trustee' },
              ].map((f, idx) => (
                <button
                  key={`${f.key}-${idx}`}
                  onClick={() => setNonAiCategory(f.key as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${
                    nonAiCategory === f.key
                      ? 'bg-indigo-600 text-white font-black shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              100% Offline
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={nonAiSearch}
              onChange={(e) => setNonAiSearch(e.target.value)}
              placeholder="Search procedural checklists, 80G, Hundi..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Scrollable SOPs */}
          <div className="flex-1 overflow-y-auto space-y-2.5 custom-scrollbar pr-1">
            {filteredOfflineSops.map((sop, idx) => {
              const isExpanded = expandedSopId === sop.id;
              return (
                <div
                  key={`${sop.id}-${idx}`}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isExpanded
                      ? 'bg-slate-900 border-indigo-500/40 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setExpandedSopId(isExpanded ? null : sop.id)}
                    className="w-full p-3 text-left flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                        sop.category === 'admin'
                          ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                          : sop.category === 'manager'
                          ? 'bg-blue-900/40 text-blue-300 border border-blue-500/30'
                          : 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {sop.role}
                      </span>
                      <h5 className="text-xs font-bold text-slate-200">{sop.title}</h5>
                    </div>
                    <span className="text-slate-400 font-bold text-sm">{isExpanded ? '−' : '+'}</span>
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-slate-800 text-xs text-slate-300 space-y-2.5">
                      <ol className="space-y-1.5 list-decimal list-inside text-[11px] text-slate-300 leading-relaxed">
                        {sop.steps.map((step, idx) => (
                          <li key={idx} className="pl-1 font-medium">{step}</li>
                        ))}
                      </ol>

                      {sop.targetModule && onNavigate && (
                        <div className="pt-1">
                          <button
                            onClick={() => {
                              onNavigate(sop.targetModule);
                              showToast(`Navigated to ${sop.targetLabel}`, 'info');
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-[11px] shadow-xs transition-colors cursor-pointer"
                          >
                            <span>{sop.targetLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* API KEY CONFIGURATION MODAL & 3-STEP QUICK GUIDE */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl w-full max-w-lg border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col text-slate-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-amber-950 to-slate-900 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-100">Personal Gemini API Key</h4>
                  <p className="text-[10px] text-amber-300/70">Connect your Google Gemini key for unrestricted AI calls</p>
                </div>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 overflow-y-auto text-xs">
              {/* 3-Step Free Key Guide */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    How to get your free Gemini Key in 3 Steps
                  </h5>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    100% Free
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] inline-flex items-center justify-center mb-1">1</span>
                    <p className="font-bold text-white mb-0.5">Visit AI Studio</p>
                    <p className="text-slate-400 text-[10px]">
                      Open <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold inline-flex items-center gap-0.5">aistudio.google.com <ExternalLink className="w-2 h-2" /></a>
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] inline-flex items-center justify-center mb-1">2</span>
                    <p className="font-bold text-white mb-0.5">Create Key</p>
                    <p className="text-slate-400 text-[10px]">Click "Create API key in new project" (takes 2 seconds).</p>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] inline-flex items-center justify-center mb-1">3</span>
                    <p className="font-bold text-white mb-0.5">Paste Below</p>
                    <p className="text-slate-400 text-[10px]">Paste the copied string below and click Save & Test.</p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Gemini API Key
                </label>
                <div className="relative">
                  <input
                    type={isKeyVisible ? 'text' : 'password'}
                    value={customKeyInput}
                    onChange={(e) => setCustomKeyInput(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsKeyVisible(!isKeyVisible)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {isKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-white font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveKey}
                disabled={isValidatingKey}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isValidatingKey ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Validating...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Save & Test Key</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

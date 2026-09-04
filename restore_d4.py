import re

filepath = 'src/components/domain4/SanataniVivahDesk.tsx'
with open(filepath, 'r') as f:
    text = f.read()

# Add usePlanGate import
if "import { usePlanGate }" not in text:
    text = text.replace("import { useNotifications }", "import { useNotifications } from '../../context/NotificationContext';\nimport { usePlanGate } from '../../hooks/usePlanGate';")

# Add checkGate hook
if "const { checkGate } = usePlanGate();" not in text:
    text = text.replace("const { t, language } = useLanguage();", "const { t, language } = useLanguage();\n  const { checkGate } = usePlanGate();")

# Replace setProfiles for offline caching
cache_logic = """const [profiles, setProfiles] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem(`sb_vivah_profiles_${workspaceId}`);
      return cached ? JSON.parse(cached) : [];
    } catch { return []; }
  });"""
text = text.replace("const [profiles, setProfiles] = useState<any[]>([]);", cache_logic)

# Replace the profiles onSnapshot to write to cache
snap_logic = """const unsubProf = onSnapshot(profRef, snap => {
      if (!snap.empty) {
        const p = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
        setProfiles(p);
        localStorage.setItem(`sb_vivah_profiles_${workspaceId}`, JSON.stringify(p));"""
text = text.replace("""const unsubProf = onSnapshot(profRef, snap => {
      if (!snap.empty) {
        setProfiles(snap.docs.map(d => ({ uid: d.id, ...d.data() })));""", snap_logic)

# Gate the connect function
gate_logic = """const handleConnect = async (targetUid: string) => {
    if (!checkGate('messages', 10)) return; // Requires standard plan to connect
    if (!myProfile) return showToast('Please create your profile first.', 'error');"""
text = text.replace("""const handleConnect = async (targetUid: string) => {
    if (!myProfile) return showToast('Please create your profile first.', 'error');""", gate_logic)

with open(filepath, 'w') as f:
    f.write(text)

import re

# --- 1. PATCH AuthWorkspaceContext.tsx ---
filepath_ctx = 'src/context/AuthWorkspaceContext.tsx'
with open(filepath_ctx, 'r') as f:
    content_ctx = f.read()

# Add imports
imports = """import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
"""
content_ctx = content_ctx.replace("import { useToast } from './ToastContext';", "import { useToast } from './ToastContext';\n" + imports)

# We need to inject the onAuthStateChanged effect.
# Let's find a good place inside AuthWorkspaceProvider.
effect = """
  // FIREBASE AUTH SYNC
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setCurrentRole(data.role || 'devotee');
            setIsAuthenticated(true);
            setViewMode(data.role === 'devotee' ? 'MEMBER' : 'ADMIN');
          } else {
            setIsAuthenticated(true);
          }
        } catch(e) {
          console.error("Error fetching user role", e);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentRole('devotee');
        setCurrentDevotee(null);
      }
    });
    return () => unsubscribe();
  }, []);
"""
content_ctx = content_ctx.replace("const [isAuthenticated, setIsAuthenticated] = useState<boolean>", effect + "\n  const [isAuthenticated, setIsAuthenticated] = useState<boolean>")

# Patch logout
content_ctx = re.sub(r"const logout = \(\) => \{.*?\};", """const logout = async () => {
    try { await signOut(auth); } catch(e) {}
    setCurrentRole('devotee');
    setCurrentDevotee(null);
    setIsAuthenticated(false);
    set('sanatani_current_devotee', null);
    localStorage.removeItem('sanatani_web_session');
  };""", content_ctx, flags=re.DOTALL)


with open(filepath_ctx, 'w') as f:
    f.write(content_ctx)


# --- 2. PATCH PortalLogin.tsx ---
filepath_login = 'src/components/public/PortalLogin.tsx'
with open(filepath_login, 'r') as f:
    content_login = f.read()

login_imports = """import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
"""
content_login = content_login.replace("import { useData } from '../../context/DataContext';", "import { useData } from '../../context/DataContext';\n" + login_imports)

old_login_func_pattern = r"const handleSmartLogin = async .*?finally \{\n\s*setLoading\(false\);\n\s*\}\n\s*\};"

new_login_func = """const handleSmartLogin = async (e?: React.FormEvent, forceId: string | null = null, forcePin: string | null = null, isQR = false) => {
    if (e) e.preventDefault();
    clearErrors();
    const identTrim = (forceId || loginIdentity).trim();
    const credTrim = (forcePin || loginCredential).trim();
    if (!identTrim || !credTrim) return setError("Please provide your login details.");
    setLoading(true);

    try {
      // Map legacy demo credentials to Firebase-friendly email formats
      let email = identTrim;
      if (email.toLowerCase() === 'admin') email = 'admin@sanatan.org';
      else if (email.toLowerCase() === 'trustee') email = 'trustee@sanatan.org';
      else if (!email.includes('@')) email = `${email}@sanatan.org`;

      let password = credTrim;
      if (password.length < 6) password = password.padEnd(6, '0'); // Firebase requires >= 6 chars

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
        // Auto-register for prototype convenience if not found
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          let role = 'devotee';
          if (email.startsWith('admin')) role = 'head_admin';
          if (email.startsWith('trustee')) role = 'trustee';
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
  };"""

content_login = re.sub(old_login_func_pattern, new_login_func, content_login, flags=re.DOTALL)

with open(filepath_login, 'w') as f:
    f.write(content_login)


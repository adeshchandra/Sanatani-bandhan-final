const fs = require('fs');
let content = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');

// replace the entire IDENTITY tab with DevoteeSelfService
content = content.replace(
  "import { \n  QrCode, X, Download, Award, ShieldCheck, Sparkles, Heart, Clock, \n  Phone, MapPin, User, Mail, CreditCard, Droplet, Globe2, FileText, \n  Edit, Lock, Banknote, Filter, History, FileDigit, HeartHandshake, Plus, Flame, Send, ShieldAlert, LogOut, Camera, CheckCircle2, AlertTriangle, Ticket\n} from 'lucide-react';",
  "import { \n  QrCode, X, Download, Award, ShieldCheck, Sparkles, Heart, Clock, \n  Phone, MapPin, User, Mail, CreditCard, Droplet, Globe2, FileText, \n  Edit, Lock, Banknote, Filter, History, FileDigit, HeartHandshake, Plus, Flame, Send, ShieldAlert, LogOut, Camera, CheckCircle2, AlertTriangle, Ticket\n} from 'lucide-react';\nimport { DevoteeSelfService } from '../account/DevoteeSelfService';"
);

// We need to replace the entire <div className="space-y-6 animate-in fade-in"> inside {profileTab === 'IDENTITY' && ( ... )}
// Let's use a regex or string replacement.
const identityTabStart = "{profileTab === 'IDENTITY' && (";
const nextTabStart = "{profileTab === 'ACTIVITY' && (";

if (content.includes(identityTabStart) && content.includes(nextTabStart)) {
  const startIndex = content.indexOf(identityTabStart);
  const endIndex = content.indexOf(nextTabStart);
  
  const original = content.substring(startIndex, endIndex);
  content = content.replace(original, "{profileTab === 'IDENTITY' && (\n              <div className=\"animate-in fade-in\">\n                <DevoteeSelfService />\n              </div>\n            )}\n\n            ");
}

fs.writeFileSync('src/components/common/MySpaceModal.tsx', content);

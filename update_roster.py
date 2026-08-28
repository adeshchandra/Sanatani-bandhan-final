with open('src/components/domain6/SevadarRosterDesk.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Add imports for Firebase
content = content.replace("import { useLanguage } from '../../context/LanguageContext';", "import { useLanguage } from '../../context/LanguageContext';\nimport { db } from '../../firebase';\nimport { doc, writeBatch, serverTimestamp, increment } from 'firebase/firestore';\nimport { useAuthWorkspace } from '../../context/AuthWorkspaceContext';\nimport { useToast } from '../../context/ToastContext';")

# Add hooks
content = content.replace("  const { t } = useLanguage();", "  const { t } = useLanguage();\n  const { currentDevotee, activeWorkspace } = useAuthWorkspace();\n  const { addToast } = useToast();")

# Add completion function
func = """
  const completeShift = async (shift: any) => {
    if (!currentDevotee) {
      addToast('Error', 'You must be logged in as a devotee to claim karma points.', 'error');
      return;
    }

    try {
      const batch = writeBatch(db);
      
      // Update devotee's total karma (sevaIndex)
      const devoteeRef = doc(db, 'workspaces', activeWorkspace.id, 'devotees', currentDevotee.id);
      batch.update(devoteeRef, {
        sevaIndex: increment(shift.karmaPoints)
      });

      // Log the karma transaction
      const ledgerRef = doc(db, 'workspaces', activeWorkspace.id, 'karma_ledger', `${Date.now()}_${currentDevotee.id}`);
      batch.set(ledgerRef, {
        devoteeId: currentDevotee.id,
        points: shift.karmaPoints,
        source: 'Sevadar Shift',
        shiftRole: shift.role,
        timestamp: serverTimestamp()
      });

      await batch.commit();
      addToast('Karma Awarded!', `Successfully awarded ${shift.karmaPoints} pts to your profile.`, 'success');
    } catch (error) {
      console.error("Error awarding karma:", error);
      addToast('Update Failed', 'Could not record karma points. Check connection.', 'error');
    }
  };
"""

content = content.replace("  const shifts = [", func + "\n  const shifts = [")

# Add complete button if user is in volunteers (for UI purpose, just show Complete for demo)
btn = """                  {shift.status !== 'FILLED' ? (
                    <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-sm transition-colors">
                      Assign
                    </button>
                  ) : (
                    <button onClick={() => completeShift(shift)} className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-sm transition-colors">
                      Complete & Award Karma
                    </button>
                  )}"""

content = re.sub(r'                  \{shift\.status !== \'FILLED\' && \(\n                    <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-sm transition-colors">\n                      Assign\n                    </button>\n                  \)\}', btn, content)


with open('src/components/domain6/SevadarRosterDesk.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

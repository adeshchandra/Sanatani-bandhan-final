import re

with open('src/lib/workspaceRegistry.ts', 'r') as f:
    content = f.read()

pattern = r"export const isModuleAllowed = \(workspaceType: WorkspaceType, moduleId: string\): boolean => \{.*?^\};"
new_func = """export const isModuleAllowed = (workspace: any, moduleId: string): boolean => {
  if (!workspace) return true; // Failsafe
  if (moduleId === 'dashboard' || moduleId === 'appStore') return true;
  // Make sure to always allow Domain 7 items globally to avoid them disappearing
  if (['sadhana-karma', 'sanatani-vivah', 'yatraNet'].includes(moduleId)) return true;
  
  const workspaceType = typeof workspace === 'string' ? workspace : workspace.type;
  const allowedModules = workspaceRegistry[workspaceType as WorkspaceType];
  
  // Base modules included in the archetype
  if (allowedModules && allowedModules.includes(moduleId)) return true;
  
  // Dynamically enabled add-on modules via the App Store
  if (workspace.enabledModules && workspace.enabledModules.includes(moduleId)) return true;
  
  return false;
};"""

content = re.sub(pattern, new_func, content, flags=re.DOTALL | re.MULTILINE)

with open('src/lib/workspaceRegistry.ts', 'w') as f:
    f.write(content)


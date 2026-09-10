const fs = require('fs');

let content = fs.readFileSync('src/types.ts', 'utf8');

// Replace WorkspaceType
const workspaceTypeRegex = /export type WorkspaceType =[^;]+;/;
const newWorkspaceType = `export type WorkspaceType =
  | 'Mandir' | 'Goshala' | 'Sangha' | 'Ashram' | 'Gurukul'
  | 'Satsang' | 'Yoga' | 'Trust' | 'Vidyalaya' | 'Purohit'
  | 'Tirth' | 'Samaj' | 'AkshayaPatra' | 'KashiKshetra'
  | 'DharmadaTrust' | 'MahotsavSamiti' | 'PurohitSabha';`;

content = content.replace(workspaceTypeRegex, newWorkspaceType);

// Replace UserRole
const userRoleRegex = /export type UserRole =[^;]+;/;
const newUserRole = `export type UserRole = 
  | 'SUPER_ADMIN' | 'TRUSTEE' | 'ACCOUNTANT' | 'PUROHIT' 
  | 'VOLUNTEER' | 'DEVOTEE' | 'MANAGER' | 'ANONYMOUS';`;

content = content.replace(userRoleRegex, newUserRole);

// Add ROLE_MIGRATION_MAP after UserRole
if (!content.includes('ROLE_MIGRATION_MAP')) {
  content = content.replace(newUserRole, newUserRole + `\n\nexport const ROLE_MIGRATION_MAP: Record<string, UserRole> = {
  'admin': 'SUPER_ADMIN', 'ADMIN': 'SUPER_ADMIN', 'superadmin': 'SUPER_ADMIN',
  'SUPER_ADMIN': 'SUPER_ADMIN', 'head_admin': 'SUPER_ADMIN', 'master_admin': 'SUPER_ADMIN',
  'trustee': 'TRUSTEE', 'TRUSTEE': 'TRUSTEE',
  'accountant': 'ACCOUNTANT', 'ACCOUNTANT': 'ACCOUNTANT',
  'purohit': 'PUROHIT', 'PUROHIT': 'PUROHIT',
  'volunteer': 'VOLUNTEER', 'VOLUNTEER': 'VOLUNTEER',
  'devotee': 'DEVOTEE', 'DEVOTEE': 'DEVOTEE',
  'manager': 'MANAGER', 'MANAGER': 'MANAGER',
  'anonymous': 'ANONYMOUS', 'ANONYMOUS': 'ANONYMOUS',
};`);
}

// Add ConsentRecord to the end
if (!content.includes('export interface ConsentRecord')) {
  content += `\n\nexport interface ConsentRecord {
  id: string;
  devoteeId: string;
  workspaceId: string;
  purpose: string[];
  grantedAt: string;
  expiresAt?: string;
  withdrawnAt?: string;
  version: string;
}
`;
}

fs.writeFileSync('src/types.ts', content);

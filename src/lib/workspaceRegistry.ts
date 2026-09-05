import { WorkspaceType } from '../types';

export const workspaceRegistry: Record<WorkspaceType, string[]> = {
  // 🕉️ Mandir (Temple) - Strictly Rituals & Congregation
  'MANDIR': [
    'dashboard', 'devotees', 'family', 'treasury', 'taxReceipts',
    'poojaBooking', 'mandirPuja', 'panchang', 'utsavPanjika',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant',
    'masterSettings', 'spiritualSettings'
  ],

  // 🐄 Goshala (Cow Shelter) - Focus on Livestock & Inventory
  'GOSHALA': [
    'dashboard', 'devotees', 'guests', 'bulkImport', 'treasury', 'taxReceipts',
    'campaigns', 'assets', 'inventory', 'goshala',
    'sandeshBroadcast', 'dharmicAssistant', 'masterSettings'
  ],

  // 🚩 Sangha & Samaj (Community) - Focus on Mobilization & Voting
  'SANGHA': [
    'dashboard', 'devotees', 'family', 'treasury', 'campaigns',
    'sanghaDrills', 'panchayatPolls', 'matrimony',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'masterSettings'
  ],
  'SAMAJ': [
    'dashboard', 'devotees', 'family', 'treasury', 'campaigns',
    'sanghaDrills', 'panchayatPolls', 'matrimony',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'masterSettings'
  ],

  // 🧘 Ashram & Yoga (Spiritual Retreats) - Focus on Accommodation & Discourse
  'ASHRAM': [
    'dashboard', 'devotees', 'guests', 'treasury',
    'ashramKutir', 'satsang', 'granthLibrary', 'shlokaFeed',
    'sandeshBroadcast', 'dharmicAssistant', 'masterSettings', 'spiritualSettings'
  ],
  'YOGA_CENTER': [
    'dashboard', 'devotees', 'guests', 'treasury',
    'ashramKutir', 'satsang',
    'sandeshBroadcast', 'dharmicAssistant', 'masterSettings'
  ],
  'SATSANG': [
    'dashboard', 'devotees', 'family', 'treasury',
    'satsang', 'granthLibrary', 'shlokaFeed',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'masterSettings'
  ],

  // 📚 Gurukul & Vidyalaya (Education) - Focus on Students & Library
  'GURUKUL': [
    'dashboard', 'devotees', 'family', 'treasury', 'inventory',
    'gurukul', 'gurukulAcademy', 'vidyalaya', 'granthLibrary', 'goshala',
    'sandeshBroadcast', 'dharmicAssistant', 'masterSettings'
  ],
  'VIDYALAYA': [
    'dashboard', 'devotees', 'treasury', 'inventory',
    'vidyalaya', 'sandeshBroadcast', 'dharmicAssistant', 'masterSettings'
  ],

  // 📿 Purohit (Priests) - Strictly Ritual Execution
  'PUROHIT_SABHA': [
    'dashboard', 'devotees', 'family', 'treasury',
    'poojaBooking', 'purohitDesk', 'purohitMarket', 'pitruShradh', 'panchang',
    'panchayatPolls', 'sandeshBroadcast', 'masterSettings', 'trusteeGovernance'
  ],

  // 🤝 Trusts & Charities (Philanthropy) - Focus on Campaigns & Seva
  'TRUST': [
    'dashboard', 'devotees', 'guests', 'bulkImport', 'treasury', 'taxReceipts',
    'campaigns', 'karmaLedger', 'assets', 'sevaTrust', 'rakthaSeva', 'annadanam',
    'sandeshBroadcast', 'dharmaMarketing', 'trusteeGovernance', 'legalVault', 'masterSettings'
  ],
  'ANNADAN_TRUST': [
    'dashboard', 'devotees', 'guests', 'bulkImport', 'treasury', 'taxReceipts',
    'campaigns', 'assets', 'sevaTrust', 'annadanam', 'rakthaSeva', 'inventory',
    'sandeshBroadcast', 'trusteeGovernance', 'legalVault', 'masterSettings', 'crisis-command'
  ],

  // 🏛️ Large Pilgrimage & Mahotsav (Massive Scale)
  'KASHI_KSHETRA': [
    'dashboard', 'devotees', 'guests', 'treasury', 'taxReceipts', 'campaigns',
    'poojaBooking', 'mandirPuja', 'purohitDesk', 'panchang',
    'dharamshala', 'annadanam', 'satsang', 'utsavPanjika',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant',
    'trusteeGovernance', 'sevadarRoster', 'crisis-command', 'masterSettings'
  ],
  'TIRTH': [
    'dashboard', 'devotees', 'guests', 'treasury', 'taxReceipts', 'campaigns',
    'poojaBooking', 'mandirPuja', 'purohitDesk', 'panchang',
    'dharamshala', 'annadanam', 'utsavPanjika',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant',
    'trusteeGovernance', 'sevadarRoster', 'crisis-command', 'masterSettings'
  ],
  'MAHOTSAV_SAMITI': [
    'dashboard', 'devotees', 'family', 'treasury', 'campaigns',
    'sanghaDrills', 'panchayatPolls', 'utsavPanjika',
    'sandeshBroadcast', 'socialWall', 'trusteeGovernance', 'crisis-command', 'masterSettings'
  ]
};

export const isModuleAllowed = (workspace: any, moduleId: string): boolean => {
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
};

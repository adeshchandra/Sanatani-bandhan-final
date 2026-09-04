import { WorkspaceType } from '../types';

export const workspaceRegistry: Record<WorkspaceType, string[]> = {
  // 🕉️ Mandir (Temple) - Strictly Rituals & Congregation
  'Mandir': [
    'dashboard', 'devotees', 'family', 'treasury', 'taxReceipts',
    'poojaBooking', 'mandirPuja', 'panchang', 'utsavPanjika',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant',
    'masterSettings', 'spiritualSettings'
  ],

  // 🐄 Goshala (Cow Shelter) - Focus on Livestock & Inventory
  'Goshala': [
    'dashboard', 'devotees', 'guests', 'bulkImport', 'treasury', 'taxReceipts',
    'campaigns', 'assets', 'inventory', 'goshala',
    'sandeshBroadcast', 'dharmicAssistant', 'masterSettings'
  ],

  // 🚩 Sangha & Samaj (Community) - Focus on Mobilization & Voting
  'Sangha': [
    'dashboard', 'devotees', 'family', 'treasury', 'campaigns',
    'sanghaDrills', 'panchayatPolls', 'matrimony',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'masterSettings'
  ],
  'Samaj': [
    'dashboard', 'devotees', 'family', 'treasury', 'campaigns',
    'sanghaDrills', 'panchayatPolls', 'matrimony',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'masterSettings'
  ],

  // 🧘 Ashram & Yoga (Spiritual Retreats) - Focus on Accommodation & Discourse
  'Ashram': [
    'dashboard', 'devotees', 'guests', 'treasury',
    'ashramKutir', 'satsang', 'granthLibrary', 'shlokaFeed',
    'sandeshBroadcast', 'dharmicAssistant', 'masterSettings', 'spiritualSettings'
  ],
  'Yoga': [
    'dashboard', 'devotees', 'guests', 'treasury',
    'ashramKutir', 'satsang',
    'sandeshBroadcast', 'dharmicAssistant', 'masterSettings'
  ],
  'Satsang': [
    'dashboard', 'devotees', 'family', 'treasury',
    'satsang', 'granthLibrary', 'shlokaFeed',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'masterSettings'
  ],

  // 📚 Gurukul & Vidyalaya (Education) - Focus on Students & Library
  'Gurukul': [
    'dashboard', 'devotees', 'family', 'treasury', 'inventory',
    'gurukul', 'gurukulAcademy', 'vidyalaya', 'granthLibrary', 'goshala',
    'sandeshBroadcast', 'dharmicAssistant', 'masterSettings'
  ],
  'Vidyalaya': [
    'dashboard', 'devotees', 'treasury', 'inventory',
    'vidyalaya', 'sandeshBroadcast', 'dharmicAssistant', 'masterSettings'
  ],

  // 📿 Purohit (Priests) - Strictly Ritual Execution
  'Purohit': [
    'dashboard', 'devotees', 'family', 'treasury',
    'poojaBooking', 'purohitDesk', 'purohitMarket', 'pitruShradh', 'panchang',
    'sandeshBroadcast', 'masterSettings'
  ],
  'PurohitSabha': [
    'dashboard', 'devotees', 'family', 'treasury',
    'poojaBooking', 'purohitDesk', 'purohitMarket', 'pitruShradh', 'panchang',
    'panchayatPolls', 'sandeshBroadcast', 'masterSettings', 'trusteeGovernance'
  ],

  // 🤝 Trusts & Charities (Philanthropy) - Focus on Campaigns & Seva
  'Trust': [
    'dashboard', 'devotees', 'guests', 'bulkImport', 'treasury', 'taxReceipts',
    'campaigns', 'karmaLedger', 'assets', 'sevaTrust', 'rakthaSeva', 'annadanam',
    'sandeshBroadcast', 'dharmaMarketing', 'trusteeGovernance', 'legalVault', 'masterSettings'
  ],
  'DharmadaTrust': [
    'dashboard', 'devotees', 'guests', 'bulkImport', 'treasury', 'taxReceipts',
    'campaigns', 'assets', 'sevaTrust', 'annadanam',
    'sandeshBroadcast', 'trusteeGovernance', 'legalVault', 'masterSettings'
  ],
  'AkshayaPatra': [
    'dashboard', 'devotees', 'treasury', 'campaigns', 'inventory',
    'sevaTrust', 'annadanam', 'rakthaSeva',
    'sandeshBroadcast', 'trusteeGovernance', 'masterSettings', 'crisis-command'
  ],

  // 🏛️ Large Pilgrimage & Mahotsav (Massive Scale)
  'KashiKshetra': [
    'dashboard', 'devotees', 'guests', 'treasury', 'taxReceipts', 'campaigns',
    'poojaBooking', 'mandirPuja', 'purohitDesk', 'panchang',
    'dharamshala', 'annadanam', 'satsang', 'utsavPanjika',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant',
    'trusteeGovernance', 'sevadarRoster', 'crisis-command', 'masterSettings'
  ],
  'Tirth': [
    'dashboard', 'devotees', 'guests', 'treasury', 'taxReceipts', 'campaigns',
    'poojaBooking', 'mandirPuja', 'purohitDesk', 'panchang',
    'dharamshala', 'annadanam', 'utsavPanjika',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant',
    'trusteeGovernance', 'sevadarRoster', 'crisis-command', 'masterSettings'
  ],
  'MahotsavSamiti': [
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

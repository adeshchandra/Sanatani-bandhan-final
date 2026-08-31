import { WorkspaceType } from '../types';

export const workspaceRegistry: Record<WorkspaceType, string[]> = {
  'Mandir': [
    'dashboard', 'devotees', 'family', 'vanshavali', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'poojaBooking', 'mandirPuja', 'purohitDesk', 'purohitMarket', 'pitruShradh', 'panchang',
    'rakthaSeva', 'annadanam', 'ashramKutir', 'dharamshala', 'satsang', 'sanghaDrills', 'sevaTrust', 'granthLibrary',
    'matrimony', 'utsavPanjika', 'panchayatPolls', 'sandeshBroadcast', 'socialWall', 'shlokaFeed', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings', 'spiritualSettings'
  ],
  'Goshala': [
    'dashboard', 'devotees', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'goshala', 'rakthaSeva', 'sevaTrust', 'annadanam',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings'
  ],
  'Sangha': [
    'dashboard', 'devotees', 'family', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'rakthaSeva', 'sanghaDrills', 'sevaTrust', 'annadanam', 'vidyalaya', 'satsang',
    'matrimony', 'panchayatPolls', 'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings'
  ],
  'Ashram': [
    'dashboard', 'devotees', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'ashramKutir', 'dharamshala', 'annadanam', 'satsang', 'granthLibrary', 'rakthaSeva',
    'sandeshBroadcast', 'socialWall', 'shlokaFeed', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings', 'spiritualSettings'
  ],
  'Gurukul': [
    'dashboard', 'devotees', 'family', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'gurukul', 'gurukulAcademy', 'vidyalaya', 'annadanam', 'goshala', 'granthLibrary',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings'
  ],
  'Satsang': [
    'dashboard', 'devotees', 'family', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'satsang', 'annadanam', 'granthLibrary', 'ashramKutir',
    'sandeshBroadcast', 'socialWall', 'shlokaFeed', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings'
  ],
  'Yoga': [
    'dashboard', 'devotees', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'satsang', 'ashramKutir', 'annadanam',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings'
  ],
  'Trust': [
    'dashboard', 'devotees', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'sevaTrust', 'rakthaSeva', 'annadanam', 'dharamshala', 'goshala',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings'
  ],
  'Vidyalaya': [
    'dashboard', 'devotees', 'guests', 'bulkImport', 'treasury', 'taxReceipts', 
    'campaigns', 'karmaLedger', 'assets', 'inventory', 'vidyalaya', 'sandeshBroadcast', 
    'socialWall', 'dharmicAssistant', 'dharmaMarketing', 'trusteeGovernance', 
    'legalVault', 'sevadarRoster', 'masterSettings'
  ],
  'Purohit': [
    'dashboard', 'devotees', 'family', 'guests', 'bulkImport', 'treasury', 'taxReceipts', 
    'poojaBooking', 'mandirPuja', 'purohitDesk', 'purohitMarket', 'pitruShradh', 'panchang', 
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'trusteeGovernance', 'masterSettings'
  ],
  'AkshayaPatra': [
    'dashboard', 'devotees', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'sevaTrust', 'rakthaSeva', 'annadanam', 'dharamshala', 'goshala',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings', 'crisis-command'
  ],
  'KashiKshetra': [
    'dashboard', 'devotees', 'family', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'poojaBooking', 'mandirPuja', 'purohitDesk', 'purohitMarket', 'pitruShradh', 'panchang',
    'rakthaSeva', 'annadanam', 'ashramKutir', 'dharamshala', 'satsang', 'sevaTrust', 'granthLibrary',
    'matrimony', 'utsavPanjika', 'panchayatPolls', 'sandeshBroadcast', 'socialWall', 'shlokaFeed', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings', 'spiritualSettings', 'crisis-command'
  ],
  'DharmadaTrust': [
    'dashboard', 'devotees', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'sevaTrust', 'rakthaSeva', 'annadanam', 'dharamshala', 'goshala',
    'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings', 'crisis-command'
  ],
  'MahotsavSamiti': [
    'dashboard', 'devotees', 'family', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'rakthaSeva', 'sanghaDrills', 'sevaTrust', 'annadanam', 'vidyalaya', 'satsang',
    'matrimony', 'panchayatPolls', 'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings', 'crisis-command'
  ],
  'PurohitSabha': [
    'dashboard', 'devotees', 'family', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'poojaBooking', 'mandirPuja', 'purohitDesk', 'purohitMarket', 'pitruShradh', 'panchang',
    'rakthaSeva', 'annadanam', 'ashramKutir', 'dharamshala', 'satsang', 'sanghaDrills', 'sevaTrust', 'granthLibrary',
    'matrimony', 'utsavPanjika', 'panchayatPolls', 'sandeshBroadcast', 'socialWall', 'shlokaFeed', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings', 'spiritualSettings', 'crisis-command'
  ],
  'Tirth': [
    'dashboard', 'devotees', 'family', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'poojaBooking', 'mandirPuja', 'purohitDesk', 'purohitMarket', 'pitruShradh', 'panchang',
    'rakthaSeva', 'annadanam', 'ashramKutir', 'dharamshala', 'satsang', 'sevaTrust', 'granthLibrary',
    'matrimony', 'utsavPanjika', 'panchayatPolls', 'sandeshBroadcast', 'socialWall', 'shlokaFeed', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings', 'spiritualSettings', 'crisis-command'
  ],
  'Samaj': [
    'dashboard', 'devotees', 'family', 'guests', 'bulkImport',
    'treasury', 'taxReceipts', 'campaigns', 'karmaLedger', 'assets', 'inventory',
    'rakthaSeva', 'sanghaDrills', 'sevaTrust', 'annadanam', 'vidyalaya', 'satsang',
    'matrimony', 'panchayatPolls', 'sandeshBroadcast', 'socialWall', 'dharmicAssistant', 'dharmaMarketing',
    'trusteeGovernance', 'legalVault', 'sevadarRoster', 'masterSettings', 'crisis-command'
  ]
};

export const isModuleAllowed = (workspaceType: WorkspaceType, moduleId: string): boolean => {
  if (moduleId === 'dashboard') return true;
  // Make sure to always allow Domain 7 items globally to avoid them disappearing
  if (['sadhana-karma', 'sanatani-vivah', 'yatraNet'].includes(moduleId)) return true;
  
  const allowedModules = workspaceRegistry[workspaceType];
  return allowedModules ? allowedModules.includes(moduleId) : true;
};

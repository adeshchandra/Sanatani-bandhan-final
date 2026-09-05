const fs = require('fs');

// --- Fix MySpaceModal.tsx ---
let myspace = fs.readFileSync('src/components/common/MySpaceModal.tsx', 'utf8');

// Modal Wrapper Mobile Fix (Make it truly full screen on mobile, 95% on SM)
myspace = myspace.replace(
  'className="bg-white w-[95%] sm:w-full max-w-4xl h-full sm:h-auto max-h-[95dvh] mx-auto rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/20"',
  'className="bg-white w-full sm:w-[95%] max-w-4xl h-full sm:h-auto max-h-[100dvh] sm:max-h-[95dvh] mx-auto sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/20"'
);

// Header Banner Fix (Add safe top padding for notches)
myspace = myspace.replace(
  'className="h-32 sm:h-40 bg-gradient-to-r from-stone-900 to-black relative shrink-0"',
  'className="h-32 sm:h-40 bg-gradient-to-r from-stone-900 to-black relative shrink-0 pt-safe"'
);

// Tabs scrollbar hide and sizing
myspace = myspace.replace(
  'className="flex items-center justify-start gap-4 sm:gap-6 border-b border-stone-200 overflow-x-auto scrollbar-hide w-full px-2 sm:px-0"',
  'className="flex items-center justify-start gap-5 sm:gap-6 border-b border-stone-200 overflow-x-auto scrollbar-hide w-full px-4 sm:px-0"'
);

fs.writeFileSync('src/components/common/MySpaceModal.tsx', myspace);

// --- Fix DevoteeSelfService.tsx ---
let selfservice = fs.readFileSync('src/components/account/DevoteeSelfService.tsx', 'utf8');

// Fix Header layout to stack on mobile
selfservice = selfservice.replace(
  'p-6 sm:p-8 flex justify-between items-start text-white relative overflow-hidden"',
  'p-6 sm:p-8 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center text-white relative overflow-hidden"'
);

// Fix Tabs scrolling and text visibility
selfservice = selfservice.replace(
  '<div className="flex border-b border-stone-100 px-4 pt-2 bg-stone-50/50">',
  '<div className="flex border-b border-stone-100 px-2 sm:px-4 pt-2 bg-stone-50/50 overflow-x-auto scrollbar-hide">'
);

selfservice = selfservice.replace(
  'className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all',
  'className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap'
);

// Show text always instead of hiding on mobile
selfservice = selfservice.replace(
  '<span className="hidden sm:inline">{tab.label}</span>',
  '<span>{tab.label}</span>'
);

// Fix Profile pic margin on small screens
selfservice = selfservice.replace(
  'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-stone-100 border-4 border-stone-700',
  'w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-stone-100 border-4 border-stone-700'
);

selfservice = selfservice.replace(
  '<User className="w-10 h-10 text-stone-400" />',
  '<User className="w-8 h-8 sm:w-10 sm:h-10 text-stone-400" />'
);

fs.writeFileSync('src/components/account/DevoteeSelfService.tsx', selfservice);

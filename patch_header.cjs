const fs = require('fs');
let code = fs.readFileSync('src/components/common/Header.tsx', 'utf8');

if (!code.includes("setViewMode('MEMBER')")) {
  code = code.replace(
    "const {\n    activeWorkspace,\n    currentRole,\n    switchRole,",
    "const {\n    activeWorkspace,\n    currentRole,\n    switchRole,\n    setViewMode,"
  );

  code = code.replace(
    "{/* Telemetry */}",
    `{/* Switch View Toggle */}
        <button
          onClick={() => setViewMode('MEMBER')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg transition-colors border border-stone-700"
          title="Switch to Personal/Member View"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-xs font-semibold">Personal View</span>
        </button>

        {/* Telemetry */}`
  );

  fs.writeFileSync('src/components/common/Header.tsx', code);
}

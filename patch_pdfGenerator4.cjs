const fs = require('fs');
let code = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

// Update function signature
const sigRegex = /export const generateDevoteeCardPDF = async \([\s\S]*?workspace: WorkspaceConfig\n\): Promise<void> => \{/g;
code = code.replace(sigRegex, `export const generateDevoteeCardPDF = async (
  member: DevoteeMember,
  workspace: WorkspaceConfig,
  mode: 'save' | 'bloburl' = 'save'
): Promise<string | void> => {`);

// Update return statement
const endRegex = /doc\.save\(\`\$\\\{member\.fullName\.replace\(\/\\\\s\+\/g, '_'\\\)\\\}_ID_Card\.pdf\`\);\n\};/g;

// Fallback search since it might be tricky to match the template string correctly
let target = "doc.save(`${member.fullName.replace(/\\s+/g, '_')}_ID_Card.pdf`);";
let replacement = `if (mode === 'bloburl') {
    return doc.output('bloburl');
  } else {
    doc.save(\`\${member.fullName.replace(/\\s+/g, '_')}_ID_Card.pdf\`);
  }`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/utils/pdfGenerator.ts', code);
  console.log("Patched successfully!");
} else {
  console.log("Could not find the target line to replace.");
}

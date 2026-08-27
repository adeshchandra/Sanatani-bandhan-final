const fs = require('fs');
let code = fs.readFileSync('src/components/domain3/PurohitDesk.tsx', 'utf8');

// Display verified badge in Mandali tab
code = code.replace(
  '<h3 className="text-xl font-black text-gray-900 group-hover:text-orange-500 transition-colors">{purohit.name}</h3>',
  '<h3 className="text-xl font-black text-gray-900 group-hover:text-orange-500 transition-colors flex items-center gap-2">{purohit.name} {purohit.verifiedBadge && <ShieldCheck size={20} className="text-blue-500" title="Verified Purohit" />}</h3>'
);

// Display certificates in Applications tab
const applicationDetailsOld = `<p><strong className="text-gray-900">Experience:</strong> {app.experienceYears} Years</p>
                        <p><strong className="text-gray-900">Address:</strong> {app.address}</p>`;
const applicationDetailsNew = `<p><strong className="text-gray-900">Experience:</strong> {app.experienceYears} Years</p>
                        <p><strong className="text-gray-900">Address:</strong> {app.address}</p>
                        {app.certificates && <p><strong className="text-gray-900">Certificates:</strong> <a href={app.certificates} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">{app.certificates}</a></p>}`;

code = code.replace(applicationDetailsOld, applicationDetailsNew);

fs.writeFileSync('src/components/domain3/PurohitDesk.tsx', code);

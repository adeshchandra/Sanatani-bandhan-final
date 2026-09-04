import re

filepath = 'src/App.tsx'
with open(filepath, 'r') as f:
    content = f.read()

lazy_import = "const PanchayatPollingDesk = lazy(() => import('./components/domain6/PanchayatPollingDesk').then(m => ({ default: m.PanchayatPollingDesk })));\n"

if "const PanchayatPollingDesk =" not in content:
    content = content.replace("const SevadarRosterDesk = lazy(() => import('./components/domain6/SevadarRosterDesk').then(m => ({ default: m.SevadarRosterDesk })));",
                              "const SevadarRosterDesk = lazy(() => import('./components/domain6/SevadarRosterDesk').then(m => ({ default: m.SevadarRosterDesk })));\n" + lazy_import)

with open(filepath, 'w') as f:
    f.write(content)

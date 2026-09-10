const fs = require('fs');
const file = 'src/hooks/useScopedData.ts';
let code = fs.readFileSync(file, 'utf8');

// We want to remove fsOrderBy from the constraints and sort in the snapshot callback instead.
code = code.replace(
  "if (options.orderBy) {\n      constraints.push(fsOrderBy(options.orderBy.field, options.orderBy.direction));\n    }",
  "// In-memory sort will be applied after fetching to avoid requiring composite indexes\n    // (No fsOrderBy added to constraints)"
);

code = code.replace(
  "const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as unknown as T);",
  `let items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as unknown as T);
      if (options.orderBy) {
        const { field, direction } = options.orderBy;
        items.sort((a: any, b: any) => {
          if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
          if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
          return 0;
        });
      }`
);

fs.writeFileSync(file, code);

const fs = require('fs');

let code = fs.readFileSync('src/hooks/usePlanGate.ts', 'utf8');

code = code.replace(
    `const DEMO_LIMITS: PlanGateLimits = {
  devotees: 5,
  transactions: 5,
  events: 1
};`,
    `const DEMO_LIMITS: PlanGateLimits = {
  devotees: 6,
  transactions: 6,
  events: 2
};`
);

fs.writeFileSync('src/hooks/usePlanGate.ts', code);

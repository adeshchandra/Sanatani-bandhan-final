const fs = require('fs');
let content = fs.readFileSync('src/components/domain3/PurohitMarketDesk.tsx', 'utf8');

// Add import
content = content.replace(
  "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';",
  "import { useAuthWorkspace } from '../../context/AuthWorkspaceContext';\nimport { DirectMessageChat } from '../common/DirectMessageChat';"
);

// Add CHAT to Checkout steps type (actually it's a string union or string literal in the file)
// Let's find: `const [checkoutStep, setCheckoutStep] = useState<'VIEW' | 'FORM' | 'PAYMENT' | 'SUCCESS'>('VIEW');`
content = content.replace(
  "const [checkoutStep, setCheckoutStep] = useState<'VIEW' | 'FORM' | 'PAYMENT' | 'SUCCESS'>('VIEW');",
  "const [checkoutStep, setCheckoutStep] = useState<'VIEW' | 'FORM' | 'PAYMENT' | 'SUCCESS' | 'CHAT'>('VIEW');"
);

// Replace the In-App Chat button
const oldChatButton = `                      <button 
                        onClick={() => {
                          showToast(\`Opening secure chat with \${selectedGig.purohitName}...\`, 'success');
                          // In a real app, this would route to the in-app chat module
                        }}
                        className="flex-1 py-4 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex justify-center items-center gap-2"
                      >
                        <MessageSquare size={16}/> In-App Chat
                      </button>`;

const newChatButton = `                      <button 
                        onClick={() => {
                          setCheckoutStep('CHAT');
                        }}
                        className="flex-1 py-4 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex justify-center items-center gap-2"
                      >
                        <MessageSquare size={16}/> In-App Chat
                      </button>`;
                      
content = content.replace(oldChatButton, newChatButton);

// Add CHAT view logic
const checkoutStepForm = `            {checkoutStep === 'FORM' && (`;
const checkoutStepChat = `            {checkoutStep === 'CHAT' && (
              <div className="flex-1 h-full max-h-[80vh]">
                <DirectMessageChat 
                  recipientId={selectedGig.purohitId} 
                  recipientName={selectedGig.purohitName}
                  recipientPhone={selectedGig.phone || '919876543210'}
                  contextType="PUROHIT"
                  onClose={() => setCheckoutStep('VIEW')}
                />
              </div>
            )}
            
            {checkoutStep === 'FORM' && (`;

content = content.replace(checkoutStepForm, checkoutStepChat);

fs.writeFileSync('src/components/domain3/PurohitMarketDesk.tsx', content);

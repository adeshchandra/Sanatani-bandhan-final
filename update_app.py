with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
content = content.replace("import { MySpaceModal } from './components/common/MySpaceModal';", "import { MySpaceModal } from './components/common/MySpaceModal';\nimport { QuickGuideModal } from './components/common/QuickGuideModal';")

# Add state
import re
content = re.sub(r'  const \[isSahayataOpen, setIsSahayataOpen\] = useState\(false\);', r'  const [isSahayataOpen, setIsSahayataOpen] = useState(false);\n  const [isGuideOpen, setIsGuideOpen] = useState(false);', content)

# Add onOpenGuide
content = content.replace("onOpenSahayata={() => setIsSahayataOpen(true)}", "onOpenSahayata={() => setIsSahayataOpen(true)}\n        onOpenGuide={() => setIsGuideOpen(true)}")

# Add component
content = content.replace("<DharmicQueryAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />", "<DharmicQueryAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />\n      <QuickGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} activeModule={activeModule} />")

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

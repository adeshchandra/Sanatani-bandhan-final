with open('src/components/common/Header.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Add onOpenGuide to HeaderProps
content = re.sub(r'  onOpenGodMode\?: \(\) => void;', '  onOpenGodMode?: () => void;\n  onOpenGuide?: () => void;', content)

# Add onOpenGuide to destruction
content = re.sub(r'  onOpenGodMode,\n  activeModule,', '  onOpenGodMode,\n  onOpenGuide,\n  activeModule,', content)

# Also import HelpCircle
content = content.replace("  Shield", "  Shield,\n  HelpCircle")

# Add the Help button near Dharmic AI
btn_html = """          {onOpenGuide && (
            <button
              type="button"
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Guide</span>
            </button>
          )}
"""
content = content.replace("          {onOpenAssistant && (", btn_html + "          {onOpenAssistant && (")

with open('src/components/common/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

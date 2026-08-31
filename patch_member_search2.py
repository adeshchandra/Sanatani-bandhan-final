import re

filepath = 'src/components/common/MemberSearchSelect.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Fix the interface and props issue
fixed_interface = """interface MemberSearchSelectProps {
  value: string; // the name
  onChange: (name: string, id: string) => void;
  placeholder?: string;
  className?: string;
  allowFreeText?: boolean;
  name?: string;
}

export const MemberSearchSelect: React.FC<MemberSearchSelectProps> = ({
  name,
  value,
  onChange,
  placeholder = "Search member...",
  className = "",
  allowFreeText = true
}) => {"""

# Replace the broken part
broken_part = """interface MemberSearchSelectProps {
  value: string; // the name
  onChange: (name: string, id: string) => void;
  placeholder?: string;
  className?: string;
  allowFreeText?: boolean;
}
  name?: string;
}

export const MemberSearchSelect: React.FC<MemberSearchSelectProps> = ({
  name,
  value,
  onChange,
  placeholder = "Search member...",
  className = "",
  allowFreeText = true,
  name
}) => {"""

content = content.replace(broken_part, fixed_interface)

with open(filepath, 'w') as f:
    f.write(content)

import re

filepath = 'src/components/dashboard/DashboardHome.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace currentShlokaIndex logic
shloka_logic = """  const [currentShlokaIndex, setCurrentShlokaIndex] = useState(() => {
    // Mathematically seed using the day of the year so all users see the same daily shloka
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % Math.max(shlokas.length, 1);
  });"""

content = content.replace("  const [currentShlokaIndex, setCurrentShlokaIndex] = useState(0);", shloka_logic)

with open(filepath, 'w') as f:
    f.write(content)

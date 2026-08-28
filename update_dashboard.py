with open('src/components/dashboard/DashboardHome.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("1,245 <span", "{currentUser?.sevaIndex?.toLocaleString() || 1245} <span")

with open('src/components/dashboard/DashboardHome.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

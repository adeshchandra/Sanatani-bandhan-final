import re

filepath = 'src/components/domain3/PurohitMarketDesk.tsx'
with open(filepath, 'r') as f:
    text = f.read()

# 1. Update forms
gigFormRegex = r"const \[gigForm, setGigForm\] = useState\(\{ title: '', description: '', category: 'Mandir & Home Rituals', durationHours: 2, dakshinaFee: 1500 \}\);"
gigFormNew = "const [gigForm, setGigForm] = useState({ title: '', description: '', category: 'Mandir & Home Rituals', sampradaya: 'Smarta', language: 'Sanskrit', specialties: 'Vedic Rituals', durationHours: 2, dakshinaFee: 1500 });"
text = re.sub(gigFormRegex, gigFormNew, text)

# 2. Update filtering
filterRegex = r"const filteredGigs = useMemo\(\(\) => \{.*?\}, \[gigs, searchTerm, selectedCategory, selectedSampradaya, selectedLanguage\]\);"

filterNew = """const filteredGigs = useMemo(() => {
    return gigs.filter(g => {
      const matchSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          g.purohitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'ALL' || g.category === selectedCategory;
      const matchSampradaya = selectedSampradaya === 'ALL' || (g.sampradaya && g.sampradaya === selectedSampradaya);
      const matchLang = selectedLanguage === 'ALL' || (g.language && g.language === selectedLanguage);
      return matchSearch && matchCat && matchSampradaya && matchLang;
    });
  }, [gigs, searchTerm, selectedCategory, selectedSampradaya, selectedLanguage]);"""

text = re.sub(filterRegex, filterNew, text, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(text)

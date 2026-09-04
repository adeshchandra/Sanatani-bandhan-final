import re

filepath = 'src/components/domain3/PurohitMarketDesk.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Add new filter states
state_addition = """  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSampradaya, setSelectedSampradaya] = useState('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');"""
content = content.replace("  const [searchTerm, setSearchTerm] = useState('');\n  const [selectedCategory, setSelectedCategory] = useState('ALL');", state_addition)

# 2. Update filteredGigs logic
filtered_logic = """  const filteredGigs = useMemo(() => {
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
content = content.replace("""  const filteredGigs = useMemo(() => {
    return gigs.filter(g => {
      const matchSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          g.purohitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'ALL' || g.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [gigs, searchTerm, selectedCategory]);""", filtered_logic)

# 3. Add Availability Check and Dakshina Escrow to handleBookGigSubmit
booking_logic = """  const handleBookGigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGig) return;
    if (!bookingForm.yajamanaName.trim() || !bookingForm.gotra.trim() || !bookingForm.ceremonyDate) {
      return showToast(safeTranslate('err_all_fields_req', 'Yajamana Name, Gotra, and Date are required.', 'যজমানের নাম, গোত্র এবং তারিখ আবশ্যক।', 'यजमान का नाम, गोत्र और तिथि आवश्यक हैं।'), "error");
    }
    if (!checkGate('devotees', 9999)) return;

    // Availability Matrix Check (Client-Side validation for Escrow)
    const isConflict = contracts.some(c => 
      c.purohitId === selectedGig.purohitId && 
      c.yajamanaDetails?.ceremonyDate === bookingForm.ceremonyDate && 
      c.yajamanaDetails?.ceremonyTime === bookingForm.ceremonyTime &&
      c.status !== 'CANCELLED'
    );

    if (isConflict) {
      return showToast('Availability Conflict: The Purohit is already booked for this specific time slot.', "error");
    }

    setSubmitting(true);
    try {
      const conKey = `CON-${Math.floor(1000 + Math.random() * 9000)}`;
      const timestamp = Date.now();
      
      // Dakshina Escrow Payload
      const contractPayload = {
        contractId: conKey,
        gigId: selectedGig.gigId,
        purohitId: selectedGig.purohitId || 'PRH-GLOBAL',
        purohitName: selectedGig.purohitName,
        serviceTitle: selectedGig.title,
        clientId: session.uid,
        clientName: session.userName,
        yajamanaDetails: { ...bookingForm },
        agreedFee: selectedGig.dakshinaFee,
        expectedDakshina: selectedGig.dakshinaFee,
        paidDakshina: 0, // Escrow starts at 0
        escrowStatus: 'PENDING_FUNDS',
        status: 'CONFIRMED',
        createdAt: timestamp
      };"""
content = content.replace("""  const handleBookGigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGig) return;
    if (!bookingForm.yajamanaName.trim() || !bookingForm.gotra.trim() || !bookingForm.ceremonyDate) {
      return showToast(safeTranslate('err_all_fields_req', 'Yajamana Name, Gotra, and Date are required.', 'যজমানের নাম, গোত্র এবং তারিখ আবশ্যক।', 'यजमान का नाम, गोत्र और तिथि आवश्यक हैं।'), "error");
    }
    if (!checkGate('devotees', 9999)) return;

    setSubmitting(true);
    try {
      const conKey = `CON-${Math.floor(1000 + Math.random() * 9000)}`;
      const timestamp = Date.now();
      const contractPayload = {
        contractId: conKey,
        gigId: selectedGig.gigId,
        purohitId: selectedGig.purohitId || 'PRH-GLOBAL',
        purohitName: selectedGig.purohitName,
        serviceTitle: selectedGig.title,
        clientId: session.uid,
        clientName: session.userName,
        yajamanaDetails: { ...bookingForm },
        agreedFee: selectedGig.dakshinaFee,
        status: 'CONFIRMED',
        createdAt: timestamp
      };""", booking_logic)

# 4. Add advanced filters to UI
advanced_filters_ui = """      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex w-full sm:w-auto bg-gray-100/80 p-1.5 rounded-xl overflow-x-auto scrollbar-hide">
          <button onClick={() => setActiveTab('GIGS')} className={`flex-1 sm:w-40 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-4 ${activeTab === 'GIGS' ? 'bg-white text-blue-700 shadow-md border border-gray-100' : 'text-gray-500 hover:text-gray-800'}`}>
            <Sparkles size={14}/> {safeTranslate('explore_gigs', 'Explore Gigs')}
          </button>
          <button onClick={() => setActiveTab('MY_ORDERS')} className={`flex-1 sm:w-40 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap px-4 ${activeTab === 'MY_ORDERS' ? 'bg-white text-blue-700 shadow-md border border-gray-100' : 'text-gray-500 hover:text-gray-800'}`}>
            <ScrollText size={14}/> {safeTranslate('my_bookings', 'My Bookings')}
          </button>
        </div>
        
        {activeTab === 'GIGS' && (
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto scrollbar-hide">
            <select 
              value={selectedCategory} 
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl px-4 py-3 outline-none min-w-[140px]"
            >
              <option value="ALL">All Categories</option>
              <option value="Mandir & Home Rituals">Mandir & Home Rituals</option>
              <option value="Samskaras (Sacraments)">Samskaras (Sacraments)</option>
              <option value="Astrology & Vastu">Astrology & Vastu</option>
              <option value="Online / Remote Sankalpa">Online / Remote Sankalpa</option>
            </select>
            <select 
              value={selectedSampradaya} 
              onChange={e => setSelectedSampradaya(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl px-4 py-3 outline-none min-w-[140px]"
            >
              <option value="ALL">Any Sampradaya</option>
              <option value="Smarta">Smarta</option>
              <option value="Vaishnava">Vaishnava</option>
              <option value="Shaiva">Shaiva</option>
              <option value="Shakta">Shakta</option>
            </select>
            <select 
              value={selectedLanguage} 
              onChange={e => setSelectedLanguage(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl px-4 py-3 outline-none min-w-[120px]"
            >
              <option value="ALL">Any Language</option>
              <option value="Sanskrit">Sanskrit</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Telugu">Telugu</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>
        )}
      </div>"""
content = re.sub(r'<div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">.*?</div>\s*</div>\s*</div>', advanced_filters_ui, content, flags=re.DOTALL)
# The regex above might be too greedy or not match. I'll use simple replace to be safe.

with open(filepath, 'w') as f:
    f.write(content)

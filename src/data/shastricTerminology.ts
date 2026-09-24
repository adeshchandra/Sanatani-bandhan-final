// ============================================================================
// Shastric & Statutory Terminology Lexicon & Role-Based SOP Knowledge Base
// Languages Supported: English ('en'), Hindi ('hi'), Bengali ('bn'), Sanskrit ('sa')
// ============================================================================

export type TermCategory = 'SHASTRIC' | 'FINANCE' | 'OPERATIONS';

export interface LocalizedString {
  en: string;
  hi: string;
  bn: string;
  sa: string;
}

export interface ShastricTerm {
  termKey: string;
  category: TermCategory;
  label: LocalizedString;
  definition: LocalizedString;
  synonyms?: string[];
  canonicalReference?: string; // e.g. "Manusmriti 3.5", "Income Tax Act Sec 80G(5)(d)"
}

export interface RoleSOPStep {
  stepNumber: number;
  title: LocalizedString;
  description: LocalizedString;
  actionRequired?: LocalizedString;
  highlightedTerms?: string[]; // Keys of ShastricTerm for automatic inline popover
  complianceTag?: string; // e.g. "CBDT Rule 18AB", "Dharmashastra Vivah Niyama"
}

export interface ModuleRoleSOP {
  moduleId: string; // e.g., 'SMART_BHANDAR', 'FORM_10BD', etc.
  moduleName: LocalizedString;
  role: string; // 'TRUSTEE' | 'ACCOUNTANT' | 'SEVADAR' | 'PUROHIT' | 'DEVOTEE' | 'MANAGER'
  roleLabel: LocalizedString;
  roleSummary: LocalizedString;
  steps: RoleSOPStep[];
  checklistItems: LocalizedString[];
}

// ============================================================================
// CORE TERMINOLOGY LEXICON (Quadrilingual: EN, HI, BN, SA)
// ============================================================================

export const SHASTRIC_TERMINOLOGY: ShastricTerm[] = [
  {
    termKey: 'SAGOTRA',
    category: 'SHASTRIC',
    label: {
      en: 'Sagotra (Same Rishi Gotra)',
      hi: 'सगोत्र (समान गोत्र)',
      bn: 'সগোত্র (একই ঋষি গোত্র)',
      sa: 'सगोत्रम् (समानऋषिगोत्रम्)',
    },
    definition: {
      en: 'Descendants of the same patriarchal Rishi lineage; strictly prohibited in Vivah.',
      hi: 'एक ही ऋषि गोत्र के वंशज; विवाह शास्त्रों में पूर्णतः वर्जित।',
      bn: 'একই ঋষি গোত্রের বংশধর; সনাতন শাস্ত্রমতে বিবাহে সম্পূর্ণ নিষিদ্ধ।',
      sa: 'समानऋषिगोत्रोत्पन्नाः; विवाहशास्त्रेषु सर्वथा वर्जिताः।',
    },
    synonyms: ['Ek-Gotra', 'Gotra Exogamy Rule', 'समानगोत्र'],
    canonicalReference: 'Manusmriti 3.5 & Yajnavalkya Smriti 1.52',
  },
  {
    termKey: 'BHANDAR',
    category: 'OPERATIONS',
    label: {
      en: 'Bhandar (Temple Repository)',
      hi: 'भंडार (मंदिर अन्न एवं सामग्री कक्ष)',
      bn: 'ভাণ্ডার (মন্দিরের অন্ন ও উপাচার ভাণ্ডার)',
      sa: 'भाण्डागारम् (देवस्थानद्रव्यकोशः)',
    },
    definition: {
      en: 'Sacred storehouse and inventory repository of raw ritual rations.',
      hi: 'मंदिर का अन्न, घी एवं पूजा सामग्री भंडार कक्ष।',
      bn: 'মন্দিরের অন্ন, ঘৃত এবং পূজার সামগ্রী সংরক্ষণের পবিত্র ভাণ্ডার।',
      sa: 'देवस्थानस्य अन्न-घृत-पूजोपकरणानां पवित्रं भाण्डागारम्।',
    },
    synonyms: ['Granary', 'Ration Store', 'अन्नभण्डार'],
    canonicalReference: 'Kautilya Arthashastra (Koshadhyaksha)',
  },
  {
    termKey: 'RECIPE_BOM',
    category: 'OPERATIONS',
    label: {
      en: 'Recipe BOM (Bill of Materials)',
      hi: 'रेसिपी बी.ओ.एम. (शास्त्रसम्मत सामग्री अनुपात)',
      bn: 'রেসিপি বি.ও.এম. (শাস্ত্রমতে নিরূপিত উপকরণ অনুপাত)',
      sa: 'सामग्री-प्रमाणकम् (शास्त्रसम्मत-द्रव्यमानम्)',
    },
    definition: {
      en: 'Shastric Bill of Materials specifying exact ingredient ratios per ritual/feast.',
      hi: 'प्रत्येक पूजा या अन्नदान हेतु शास्त्रों में निर्धारित सामग्री अनुपात।',
      bn: 'প্রতিটি পূজা বা অন্নদানের জন্য শাস্ত্রে নির্ধারিত উপকরণের অনুপাত।',
      sa: 'प्रत्येकपूजा-अन्नदाननिमित्तं शास्त्रसम्मत-सामग्री-परिमाणम्।',
    },
    synonyms: ['Puja Dravya Ratio', 'Mahaprasad BOM', 'हविर्द्रव्यमान'],
    canonicalReference: 'Grihya Sutras & Agamic Annadana Vidhi',
  },
  {
    termKey: 'GRN',
    category: 'FINANCE',
    label: {
      en: 'GRN (Goods Receipt Note)',
      hi: 'जी.आर.एन. (सामग्री प्राप्ति पत्र)',
      bn: 'জি.আর.এন. (সামগ্রী প্রাপ্তি ও যাচাই নথি)',
      sa: 'स्वीकार-पत्रम् (आगतद्रव्यपरीक्षणपत्रम्)',
    },
    definition: {
      en: 'Goods Receipt Note confirming physical weighing and inspection of inward stock.',
      hi: 'विक्रेता द्वारा प्राप्त सामग्री का भौतिक सत्यापन एवं स्टॉक प्रविष्टि।',
      bn: 'সরবরাহকৃত সামগ্রীর ওজন ও মান যাচাইয়ের পর ভাণ্ডারে গ্রহণের নথি।',
      sa: 'विक्रेतृभ्यः समागतानां द्रव्याणां भौतिक-परीक्षणपूर्वकं स्वीकार-पत्रम्।',
    },
    synonyms: ['Goods Inward Slip', 'Inward Voucher', 'द्रव्यप्राप्तिपत्र'],
    canonicalReference: 'Statutory GST & Trust Internal Audit Compliance',
  },
  {
    termKey: 'FORM_10BD',
    category: 'FINANCE',
    label: {
      en: 'Form 10BD (CBDT E-Filing)',
      hi: 'फॉर्म १०-बी.डी. (८०-जी आयकर विवरणी)',
      bn: 'ফর্ম ১০বিডি (৮০জি আয়কর বিবরণী)',
      sa: 'दशम-प्रपत्रम् (आयकर-८०जी-समर्पणम्)',
    },
    definition: {
      en: 'Mandatory annual CBDT return filing of all 80G tax-exempt donations.',
      hi: 'आयकर विभाग को दानदाताओं की वार्षिक विवरणी ई-फाइलिंग।',
      bn: 'আয়কর বিভাগের জন্য ৮০জি করমুক্ত দানের বার্ষিক বিবরণী দাখিল।',
      sa: 'आयकर-विभागाय ८०-जी करमुक्त-दानानां वार्षिक-विवरण-समर्पणम्।',
    },
    synonyms: ['Statement of Donations', 'Certificate of Donation 10BE', '८०जी विवरणी'],
    canonicalReference: 'Income Tax Rules, 1962 (Rule 18AB) Sec 80G(5)(viii)',
  },
  {
    termKey: 'DAKSHINA_ESCROW',
    category: 'FINANCE',
    label: {
      en: 'Dakshina Escrow',
      hi: 'दक्षिणा एस्क्रो (सुरक्षित पुरोहित मानदेय कोष)',
      bn: 'দক্ষিণা এসক্রো (সুরক্ষিত পুরোহিত সাম্মানিক তহবিল)',
      sa: 'दक्षिणा-न्यासः (सुरक्षिताचार्यवेतनम्)',
    },
    definition: {
      en: 'Platform-guaranteed safe-custody of ritual honorarium until seva completion.',
      hi: 'अनुष्ठान पूर्ण होने तक सुरक्षित रखी गई पुरोहित मानदेय राशि।',
      bn: 'পূজা সম্পন্ন না হওয়া পর্যন্ত প্ল্যাটফর্মে সুরক্ষিত পুরোহিত দক্ষিণা।',
      sa: 'अनुष्ठान-समाप्तिपर्यन्तं सुरक्षिता आचार्य-दक्षिणा-राशिः।',
    },
    synonyms: ['Priest Honorarium Vault', 'Pooja Escrow', 'दक्षिणाधनम्'],
    canonicalReference: 'Dharmic Fair-Wage & Trust Treasury Guarantee',
  },
  {
    termKey: 'KUTIR',
    category: 'OPERATIONS',
    label: {
      en: 'Kutir (Sacred Guest Hermitage)',
      hi: 'कुटीर (तपोस्थली एवं साधना आवास)',
      bn: 'কুটির (সাধনা কক্ষ ও যাত্ৰী নিবাস)',
      sa: 'कुटीरम् (तपोनिवासः)',
    },
    definition: {
      en: 'Spiritual hermitage or guest cottage reserved for visiting sadhus, acharyas, and yatris.',
      hi: 'साधकों, आचार्यों एवं तीर्थयात्रियों हेतु निर्धारित शांत तपोस्थली व आवास।',
      bn: 'সাধক, আচার্য এবং তীর্থযাত্রীদের জন্য নির্ধারিত নিভৃত সাধনা কুটির বা আশ্রম আবাস।',
      sa: 'साधकानां यतीनां च साधनानिमित्तं प्रशान्तं निवासस्थानम्।',
    },
    synonyms: ['Ashram Kutir', 'Sadhana Cell', 'तपोकुटीर'],
    canonicalReference: 'Ashrama Dharma (Vanaprastha & Sannyasa Code)',
  },
  {
    termKey: 'PITRU_TARPANA',
    category: 'SHASTRIC',
    label: {
      en: 'Pitru Tarpana (Ancestral Oblation)',
      hi: 'पितृ तर्पण (वैदिक पितृ जलांजलि)',
      bn: 'পিতৃতর্পণ (তিল-কুশ সহযোগে বৈদিক পূর্বপুরুষ অঞ্জলি)',
      sa: 'पितृतर्पणम् (पितृयज्ञः)',
    },
    definition: {
      en: 'Sacred oblations of water, sesame seeds, and kusha grass offered to departed ancestors.',
      hi: 'पितरों की तृप्ति हेतु तिल, जल एवं कुशा से किया जाने वाला वैदिक जलांजलि अनुष्ठान।',
      bn: 'পূর্বপুরুষদের আত্মাতৃপ্তির উদ্দেশ্যে তিল, কুশ ও জল সহযোগে অনুষ্ঠিত বৈদিক তর্পণ।',
      sa: 'पितॄणां तृप्त्यर्थं तिला-कुश-जलाञ्जलिभिः क्रियमाणः वैदिक-विधिः।',
    },
    synonyms: ['Tila Tarpana', 'Pitru Shraddha', 'तिलाञ्जलि'],
    canonicalReference: 'Ashvalayana Grihya Sutra & Garuda Purana',
  },
  {
    termKey: 'GUNA_MILAN',
    category: 'SHASTRIC',
    label: {
      en: 'Guna Milan (Ashtakoot Compatibility)',
      hi: 'गुण मिलान (अष्टकूट ज्योतिषीय परीक्षण)',
      bn: 'গুণ মিলন (৩৬ গুণের অষ্টকূট বৈদিক কোষ্ঠী বিচার)',
      sa: 'गुणमेलनम् (अष्टकूटविचारः)',
    },
    definition: {
      en: 'Ashtakoot 36-point astrological compatibility assessment for dharmic vivah matching.',
      hi: 'वर-वधू के ३६ गुणों का अष्टकूट ज्योतिषीय मिलान।',
      bn: 'বর-কনের ৩৬ গুণের অষ্টকূট বৈদিক জ্যোতিষীয় কোষ্ঠী বিচার ও সামঞ্জস্য।',
      sa: 'वर-वध्वोः षट्त्रिंशद्गुणानाम् अष्टकूटपद्धत्या क्रियमाणः ज्योतिषीय-मेलापकः।',
    },
    synonyms: ['Ashtakoot Milan', 'Kundali Match', 'मेलापक'],
    canonicalReference: 'Brihat Parashara Hora Shastra & Muhurta Chintamani',
  },
  {
    termKey: 'CASH_SWEEP',
    category: 'FINANCE',
    label: {
      en: 'Cash Sweep (Inter-Branch Liquidity Consolidation)',
      hi: 'कैश स्वीप (शाखा रोकड़ समाहरण एवं केंद्रीय अंतरण)',
      bn: 'ক্যাশ সুইপ (শাখা তহবিলের উদ্বৃত্ত কেন্দ্রীয় প্রধান অ্যাকাউন্টে স্থানান্তর)',
      sa: 'कोष-समाहरणम् (शाखाकोषकेन्द्रीकरणम्)',
    },
    definition: {
      en: 'Automated inter-branch physical or electronic treasury cash transfer consolidating branch balances into the central master account.',
      hi: 'शाखाओं के अतिरिक्त रोकड़ को केंद्रीय मुख्य कोष में अंतरित करने की वित्तीय प्रक्रिया।',
      bn: 'শাখা কেন্দ্রের উদ্বৃত্ত নগদ অর্থ কেন্দ্রীয় প্রধান তহবিলে স্থানান্তরের স্বয়ংক্রিয় পদ্ধতি।',
      sa: 'शाखाकोषेभ्यः अतिरिक्तायाः धनराशेः मुख्यकोषे समाहरणप्रक्रिया।',
    },
    synonyms: ['Treasury Pooling', 'Branch Remittance', 'कोषस्वीप'],
    canonicalReference: 'FCRA & Public Charitable Trust Statutory Treasury Norms',
  },
  {
    termKey: 'SANKALP',
    category: 'SHASTRIC',
    label: {
      en: 'Sacred vow or solemn intent before a ritual',
      hi: 'अनुष्ठान से पूर्व लिया गया पवित्र संकल्प',
      bn: 'পূজার পূর্বে গৃহীত পবিত্র সংকল্প',
      sa: 'कर्मपूर्वाङ्गभूतः शुभसंकल्पः',
    },
    definition: {
      en: 'Sacred vow or solemn intent before a ritual - formal verbal declaration specifying devotee gotra, nakshatra, and spiritual purpose for deity propitiation.',
      hi: 'अनुष्ठान से पूर्व लिया गया पवित्र संकल्प - स्थान, समय, गोत्र और अभीष्ट मनोरथ का स्मरण करते हुए देव-अर्चना की प्रतिज्ञा।',
      bn: 'পূজার পূর্বে গৃহীত পবিত্র সংকল্প - গোত্র ও সংকল্পকর্তার নামোচ্চারণপূর্বক দেবতাদের সন্তুষ্টি ও পূজার ফলপ্রার্থনার ঐকান্তিক শপথ।',
      sa: 'कर्मपूर्वाङ्गभूतः शुभसंकल्पः - देशकालनामगोत्रोच्चारणपूर्वकं भगवत्प्रीत्यर्थं क्रियमाणा विध्यनुष्ठान-प्रतिज्ञा।',
    },
    synonyms: ['Vow', 'Sankalpana', 'प्रतिज्ञा', 'संकल्प'],
    canonicalReference: 'Taittiriya Brahmana & Shastric Puja Vidhana',
  },
  {
    termKey: 'CORPUS_FUND',
    category: 'FINANCE',
    label: {
      en: 'Corpus Donation (Sec 11(1)(d))',
      hi: 'मूल पूँजी दान (कॉर्पस फंड / मूल निधि)',
      bn: 'মূল অনুদান (স্থায়ী মূলধন তহবিল)',
      sa: 'मूलकोषदानम् (अक्षय-निधिः)',
    },
    definition: {
      en: 'Endowment donations with specific written donor direction to be maintained in perpetuity without spending capital.',
      hi: 'दानदाता के विशिष्ट लिखित निर्देश सहित प्राप्त स्थायी दान, जिसके केवल ब्याज का उपयोग हो सकता है।',
      bn: 'স্থায়ী মূলধন হিসাবে প্রাপ্ত অনুদান, যার মূল অর্থ অক্ষুণ্ণ রেখে কেবল আয় সেবা কাজে ব্যয় হয়।',
      sa: 'अक्षयनिधिरूपेण प्रदत्तं दानम्, यस्य मूलधनं न व्ययीक्रियते।',
    },
    synonyms: ['Capital Endowment', 'Permanent Trust Fund', 'मूलनिधि'],
    canonicalReference: 'Income Tax Act 1961 Sec 11(1)(d)',
  },
  {
    termKey: 'ANNADANAM',
    category: 'OPERATIONS',
    label: {
      en: 'Annadanam (Maha Prasadam Seva)',
      hi: 'अन्नदानम् (महाप्रसाद वितरण सेवा)',
      bn: 'অন্নদানম (মহাপ্রসাদ বিতরণ সেবা)',
      sa: 'अन्नदानम् (महाप्रसादवितरणम्)',
    },
    definition: {
      en: 'Sacred act of feeding consecrated sattvic meals to pilgrims, devotees, and sadhus.',
      hi: 'तीर्थयात्रियों, भक्तों एवं संतों को सात्विक महाप्रसाद का निःशुल्क वितरण।',
      bn: 'ভক্ত, তীর্থযাত্রী ও সাধু-সন্ন্যাসীদের পবিত্র ও সাত্ত্বিক মহাপ্রসাদ ভোজন সেবা।',
      sa: 'भक्तेभ्यः साधुभ्यश्च पवित्रातिपवित्रस्य महाप्रसादस्य सादरं वितरणम्।',
    },
    synonyms: ['Bhandara', 'Langarseva', 'महाप्रसाद'],
    canonicalReference: 'Chandogya Upanishad & Bhavishya Purana',
  },
  {
    termKey: 'HUNDI',
    category: 'FINANCE',
    label: {
      en: 'Sacred donation box',
      hi: 'दान पेटी / गोलक',
      bn: 'দান বাক্স / গোলক',
      sa: 'दानपेटिका',
    },
    definition: {
      en: 'Sacred donation box or sealed drop-vault placed in sanctum or circumambulation path for devotees to anonymously offer cash, coins, and precious bullion.',
      hi: 'दान पेटी / गोलक - मंदिर गर्भगृह अथवा परिक्रमा पथ में स्थापित पवित्र सीलबंद दानपात्र, जिसमें श्रद्धालु नकद, मुद्रा एवं स्वर्ण-रजत गुप्त रूप से अर्पित करते हैं।',
      bn: 'দান বাক্স / গোলক - মন্দির প্রাঙ্গণ বা গর্ভগৃহে স্থাপিত সিলবদ্ধ পবিত্র দানপাত্র, যাতে ভক্তবৃন্দ স্বেচ্ছায় ও গোপনে অর্থ ও অলঙ্কার নিবেদন করেন।',
      sa: 'दानपेटिका - मन्दिरे गर्भगृहे वा परिक्रमा-मार्गे संस्थापिता मुद्रिता पवित्रा दानपेटिका, यस्यां भक्ताः गुप्तदानं समर्पयन्ति।',
    },
    synonyms: ['GOLAK', 'Golaka', 'Hundi Box', 'Danpatra', 'दानपेटी', 'गोलक'],
    canonicalReference: 'Temple Endowments Code & Income Tax Act Sec 115BBC',
  },
  {
    termKey: 'GOLAK',
    category: 'FINANCE',
    label: {
      en: 'Sacred donation box',
      hi: 'दान पेटी / गोलक',
      bn: 'দান বাক্স / গোলক',
      sa: 'दानपेटिका',
    },
    definition: {
      en: 'Sacred donation box for devotee offerings in temples.',
      hi: 'दान पेटी / गोलक - मंदिर में स्थापित पवित्र दान पेटी / गोलक जिसमें भक्त गुप्त दान अर्पित करते हैं।',
      bn: 'দান বাক্স / গোলক - মন্দিরে ভক্তদের দানের জন্য সংরক্ষিত পবিত্র দান বাক্স বা গোলক।',
      sa: 'दानपेटिका - मन्दिरे भक्तानां समर्पणार्यं सुरक्षिता दानपेटिका।',
    },
    synonyms: ['HUNDI', 'Danpatra', 'दानपेटी'],
    canonicalReference: 'Devasthanam Traditional Customs',
  },
  {
    termKey: 'RATNA_BHANDAR',
    category: 'OPERATIONS',
    label: {
      en: 'Sacred treasury of deity ornaments and precious idols',
      hi: 'भगवान के आभूषणों और बहुमूल्य रत्नों का खजाना',
      bn: 'দেবতার অলঙ্কার ও মূল্যবান রত্নের ভাণ্ডার',
      sa: 'रत्नभाण्डागारम्',
    },
    definition: {
      en: 'Sacred treasury of deity ornaments and precious idols - fortified high-security treasury holding consecrated gold crowns, antique jewellery, precious gemstones, and sacred metal vigrahas under dual-trustee custody.',
      hi: 'भगवान के आभूषणों और बहुमूल्य रत्नों का खजाना - देवताओं के दिव्य स्वर्ण मुकुट, बहुमूल्य आभूषण, रत्न एवं प्राचीन विग्रहों को सुरक्षित रखने हेतु दोहरी अभिरक्षा युक्त पवित्र खजाना।',
      bn: 'দেবতার অলঙ্কার ও মূল্যবান রত্নের ভাণ্ডার - শ্রীবিগ্রহের স্বর্ণমুকুট, মণিমুক্তা খচিত অলঙ্কার এবং অমূল্য রত্নসম্ভারের পরম সুরক্ষিত দেবকোষাগার।',
      sa: 'रत्नभाण्डागारम् - भगवतः अलौकिक-सुवर्णमुकुट-रत्नजटिताभरणानां तथा अष्टधातुविग्रहाणां रक्षणाय निर्मितं परमपवित्रं रत्नभाण्डागारम्।',
    },
    synonyms: ['Toshakhana', 'Deity Jewel Treasury', 'रत्नभंडार', 'तोषाखाना'],
    canonicalReference: 'Pancharatra Agama, Shilpa Shastra & Indian Trusts Act Sec 36',
  },
  {
    termKey: 'CHANDA',
    category: 'FINANCE',
    label: {
      en: 'Voluntary donation or offering',
      hi: 'स्वेच्छा से दिया गया दान या चंदा',
      bn: 'স্বেচ্ছায় প্রদত্ত দান বা চাঁদা',
      sa: 'स्वेच्छा-दानम् / चन्दा',
    },
    definition: {
      en: 'Voluntary donation or offering - devotional financial or in-kind contribution made freely by devotees to support temple operations, seva rituals, utsav celebrations, or general Mandir development.',
      hi: 'स्वेच्छा से दिया गया दान या चंदा - मंदिर संचालन, उत्सव आयोजन, नियमित सेवा व विकास कार्यों हेतु श्रद्धालुओं द्वारा स्वेच्छापूर्वक समर्पित सहयोग राशि।',
      bn: 'স্বেচ্ছায় প্রদত্ত দান বা চাঁদা - মন্দির পরিচালনা, দেবসেবা ও ধর্মীয় উৎসবের জন্য ভক্তবৃন্দ কর্তৃক স্বতঃস্ফূর্তভাবে নিবেদিত শ্রদ্ধার্ঘ্য।',
      sa: 'स्वेच्छा-दानम् / चन्दा - मन्दिरसञ्चालनाय उत्सवोत्सवाय च भक्तैः स्वेच्छया समर्पितं श्रद्धाधनम्।',
    },
    synonyms: ['Donation', 'Voluntary Offering', 'Chanda', 'दान', 'चंदा', 'চাঁদা'],
    canonicalReference: 'Sanatana Dana Dharma & Income Tax Act Sec 12A/80G',
  },
  {
    termKey: 'PRASADAM',
    category: 'SHASTRIC',
    label: {
      en: 'Consecrated food offered to the deity',
      hi: 'भगवान को अर्पित पवित्र नैवेद्य/प्रसाद',
      bn: 'দেবতাকে নিবেদিত পবিত্র নৈবেদ্য বা প্রসাদ',
      sa: 'भगवन्निवेदितं पवित्रं नैवेद्यम्',
    },
    definition: {
      en: 'Consecrated food offered to the deity - sanctified culinary offering prepared in a pure, sattvic Madi kitchen, ritually consecrated during bhoga arati, and distributed to devotees as divine grace.',
      hi: 'भगवान को अर्पित पवित्र नैवेद्य/प्रसाद - पूर्ण शुचिता व मड़ी रसोई में तैयार भोग, जो विग्रहों को अर्पित करने के पश्चात् भक्तों में मंगलमय कृपा के रूप में वितरित होता है।',
      bn: 'দেবতাকে নিবেদিত পবিত্র নৈবেদ্য বা প্রসাদ - শুচি ও সাত্ত্বিক পাকশালায় প্রস্তুতকৃত ভোগ, যা ভগবানকে নিবেদনের পর ভক্তবৃন্দের মাঝে অনুগ্রহস্বরূপ বিতরণ করা হয়।',
      sa: 'भगवन्निवेदितं पवित्रं नैवेद्यम् - शुद्धपाकशालायां प्रस्तुतं देवाय समर्पितं तदनन्तरं भक्तेभ्यः वितीर्यमाणं मङ्गलकरं महाप्रसादम्।',
    },
    synonyms: ['Mahaprasad', 'Naivedyam', 'Bhoga Prasada', 'प्रसाद', 'महाप्रसाद'],
    canonicalReference: 'Bhagavad Gita 9.26 & Agamic Naivedya Vidhi',
  },
  {
    termKey: 'PANCHANG',
    category: 'SHASTRIC',
    label: {
      en: 'Vedic almanac based on 5 planetary elements',
      hi: '५ अंगों पर आधारित वैदिक पंचांग',
      bn: '৫টি অঙ্গের উপর ভিত্তি করে বৈদিক পঞ্জিকা',
      sa: 'पञ्चाङ्गम् (तिथि-वार-नक्षत्र-योग-करणानि)',
    },
    definition: {
      en: 'Vedic almanac based on 5 planetary elements - Tithi (lunar day), Vaara (solar weekday), Nakshatra (asterism), Yoga (luni-solar angle), and Karana (half-tithi) calculated relative to local sunrise.',
      hi: '५ अंगों पर आधारित वैदिक पंचांग - स्थानीय सूर्योदय के अनुसार निर्धारित तिथि, वार, नक्षत्र, योग और करण का शास्त्रीय पत्रक।',
      bn: '৫টি অঙ্গের উপর ভিত্তি করে বৈদিক পঞ্জিকা - স্থানীয় সূর্যোদয়ের উপর ভিত্তি করে নির্ধারিত তিথি, বার, নক্ষত্র, যোগ ও করণের সমন্বিত কালগণনা।',
      sa: 'पञ्चाङ्गम् - तिथि-वार-नक्षत्र-योग-करणाख्यानां पञ्चाङ्गानां सूर्योदयकालानुसारि गणितम्।',
    },
    synonyms: ['Panjika', 'Almanac', 'पंचांग', 'पञ्जिका'],
    canonicalReference: 'Surya Siddhanta & Muhurta Chintamani',
  },
  {
    termKey: 'RAHU_KAAL',
    category: 'SHASTRIC',
    label: {
      en: 'Daily inauspicious planetary window',
      hi: 'प्रतिदिन का अशुभ राहु काल',
      bn: 'প্রতিদিনের অশুভ রাহু কাল',
      sa: 'राहुकालः (अशुभसमयः)',
    },
    definition: {
      en: 'Daily inauspicious planetary window - an eighth portion of the daytime governed by the shadowy planet Rahu, during which initiating auspicious ceremonies, vivah, or travel is prohibited.',
      hi: 'प्रतिदिन का अशुभ राहु काल - दिनमान का आठवाँ भाग जिस पर छाया ग्रह राहु का प्रभाव रहता है; इस काल में शुभ कार्य व नवीन अनुष्ठान वर्जित हैं।',
      bn: 'প্রতিদিনের অশুভ রাহু কাল - দিবাভাগের অষ্টমাংশ যা রাহু দ্বারা প্রভাবিত; এই সময়কালে শুভ সংস্কার বা যাত্রা আরম্ভ নিষিদ্ধ।',
      sa: 'राहुकालः - दिनमानस्य अष्टमांशः यत्र राहोः आधिपत्यं वर्तते; अस्मिन् समये शुभकार्यारम्भः वर्जितः।',
    },
    synonyms: ['Rahu Kalam', 'राहुकाल', 'রাহুকাল'],
    canonicalReference: 'Jyotirvidabharana & Kalavidhana',
  },
  {
    termKey: 'MUHURAT',
    category: 'SHASTRIC',
    label: {
      en: 'Auspicious time window for sacred acts',
      hi: 'शुभ कार्य हेतु पवित्र समय',
      bn: 'শুভ কাজের জন্য পবিত্র সময়',
      sa: 'शुभमुहूर्तः',
    },
    definition: {
      en: 'Auspicious time window for sacred acts - a 48-minute period calculated free from malefic doshas for undertaking vivah, pujas, sankalpas, and consecrations.',
      hi: 'शुभ कार्य हेतु पवित्र समय - ४८ मिनट का शुभ काल जो ग्रहदोषों से मुक्त होकर मांगलिक अनुष्ठान व देव-अर्चना के लिए उत्तम होता है।',
      bn: 'শুভ কাজের জন্য পবিত্র সময় - ৪৮ মিনিটের প্রশস্ত কাল যা মাঙ্গলিক অনুষ্ঠান ও পূজার জন্য পরম কল্যাণকর।',
      sa: 'शुभमुहूर्तः - अष्टचत्वारिंशन्निमेषात्मकः दोषरहितः प्रशस्तः कालः यत्र अनुष्ठानं सिद्धिकारकं भवति।',
    },
    synonyms: ['Shubh Muhurta', 'मुहूर्त', 'শুভ মুহূর্ত'],
    canonicalReference: 'Muhurta Chintamani & Brihat Samhita',
  },
  {
    termKey: 'YATRA',
    category: 'SHASTRIC',
    label: {
      en: 'Sacred pilgrimage or journey',
      hi: 'पवित्र तीर्थ यात्रा',
      bn: 'পবিত্র তীর্থ যাত্রা',
      sa: 'पवित्र-तीर्थयात्रा',
    },
    definition: {
      en: 'Sacred pilgrimage or journey undertaken by devotees toward sanctified kshetras, temples, or river confluences for spiritual merit, darshan, and vow fulfillment.',
      hi: 'पवित्र तीर्थ यात्रा - आत्म-शुद्धि, देव-दर्शन एवं संकल्प पूर्ति हेतु पवित्र धामों व मंदिरों की आध्यात्मिक पदयात्रा।',
      bn: 'পবিত্র তীর্থ যাত্রা - আত্মশুদ্ধি ও দেবদর্শনের উদ্দেশ্যে পুণ্যক্ষেত্রে ভক্তদের সমবেত পরম পবিত্র আধ্যাত্মিক পরিক্রমা।',
      sa: 'पवित्र-तीर्थयात्रा - पुण्यक्षेत्रेषु देवदर्शनार्थम् आत्मशुद्ध्यर्थं च क्रियमाणा मङ्गलमयी यात्रा।',
    },
    synonyms: ['Pilgrimage', 'Teerth Yatra', 'तीर्थयात्रा', 'তীর্থযাত্রা'],
    canonicalReference: 'Padma Purana (Teertha-Khanda) & Mahabharata Vana Parva',
  },
  {
    termKey: 'GARBHAGRIHA',
    category: 'SHASTRIC',
    label: {
      en: 'Inner sanctum or holy of holies',
      hi: 'मंदिर का मुख्य गर्भगृह',
      bn: 'মন্দিরের প্রধান গর্ভগৃহ',
      sa: 'मन्दिरस्य गर्भगृहम् / मूलस्थानम्',
    },
    definition: {
      en: 'Inner sanctum or holy of holies - the innermost cubical chamber of an Agamic Hindu temple where the presiding consecrated deity is enthroned and divine cosmic energy converges.',
      hi: 'मंदिर का मुख्य गर्भगृह - मंदिर का सर्वाधिक पावन अंतरंग कक्ष जहाँ मूल विग्रह प्रतिष्ठापित होते हैं और ब्रह्मांडीय ऊर्जा का केंद्र विद्यमान रहता है।',
      bn: 'মন্দিরের প্রধান গর্ভগৃহ - আগমোক্ত মন্দিরের সর্বাধিক পবিত্র কেন্দ্রস্থল যেখানে মূল বিগ্রহ অধিষ্ঠিত এবং অপার্থিব ঐশ্বরিক শক্তির প্রকাশ ঘটে।',
      sa: 'गर्भगृहम् - मन्दिरस्य परमपवित्रम् आभ्यन्तरं स्थानं यत्र मूलविग्रहः प्रतिष्ठितो भवति।',
    },
    synonyms: ['Sanctum Sanctorum', 'Mulastanam', 'गर्भगृह', 'গর্ভগৃহ'],
    canonicalReference: 'Kamika Agama & Mayamata Vastu Shastra',
  },
  {
    termKey: 'SEVADAR',
    category: 'SHASTRIC',
    label: {
      en: 'Selfless volunteer dedicated to temple service',
      hi: 'निष्काम सेवा करने वाला स्वयंसेवक',
      bn: 'নিষ্কাম সেবায় নিয়োজিত স্বেচ্ছাসেবক',
      sa: 'निष्काम-सेवाव्रती / सेवकः',
    },
    definition: {
      en: 'Selfless volunteer dedicated to temple service - offering bodily and spiritual karma-yoga for crowd management, pilgrim welfare, prasadam distribution, and temple protection.',
      hi: 'निष्काम सेवा करने वाला स्वयंसेवक - तीर्थयात्रियों की सुविधा, सुरक्षा, कतार प्रबंधन व प्रसाद सेवा में समर्पित कर्मयोगी।',
      bn: 'নিষ্কাম সেবায় নিয়োজিত স্বেচ্ছাসেবক - ভক্তদের কল্যাণ, ভিড় নিয়ন্ত্রণ, প্রসাদ বিতরণ ও মন্দির সেবায় নিবেদিতপ্রাণ কর্মী।',
      sa: 'निष्काम-सेवाव्रती - तीर्थयात्रिकाणां रक्षणे मन्दिरकार्ये च समर्पितः निस्वार्थः कर्मयोगी।',
    },
    synonyms: ['Volunteer', 'Karmayogi', 'स्वयंसेवक', 'সেবাদার'],
    canonicalReference: 'Bhagavad Gita 3.19 & Narada Bhakti Sutra',
  },
];

// ============================================================================
// ROLE-BASED OPERATING PROCEDURES (SOP) BY MODULE & ROLE
// ============================================================================

export const MODULE_ROLE_SOPS: Record<string, Record<string, ModuleRoleSOP>> = {
  // --------------------------------------------------------------------------
  // MODULE: SMART_BHANDAR
  // --------------------------------------------------------------------------
  SMART_BHANDAR: {
    SEVADAR: {
      moduleId: 'SMART_BHANDAR',
      moduleName: {
        en: 'Smart Bhandar, Recipe BOM & Auto-Procurement',
        hi: 'स्मार्ट भंडार, रेसिपी बी.ओ.एम. एवं खरीद डेस्क',
        bn: 'স্মার্ট ভাণ্ডার, রেসিপি বি.ও.এম. এবং সংগ্রহ ডেস্ক',
        sa: 'स्मार्ट-भाण्डागारम्, सामग्रीप्रमाणं तथा क्रयविभागः',
      },
      role: 'SEVADAR',
      roleLabel: {
        en: 'Bhandar Sevadar / Storekeeper',
        hi: 'भंडार सेवादार / भंडार रक्षक',
        bn: 'ভাণ্ডার সেবাদার / পরিদর্শক',
        sa: 'भाण्डागार-सेवाव्रती',
      },
      roleSummary: {
        en: 'Responsible for physical stock verification, weighing raw grains and dairy, logging inward deliveries via GRN, and reporting low stock.',
        hi: 'सामग्री के भौतिक वजन, शुद्धता निरीक्षण, जी.आर.एन. प्रविष्टि एवं कम स्टॉक की तत्काल सूचना हेतु उत्तरदायी।',
        bn: 'পণ্যের ওজন ও শুদ্ধতা যাচাই, জি.আর.এন.-এর মাধ্যমে ভাণ্ডারে গ্রহণ এবং ঘাটতি সম্পর্কে রিপোর্ট করার দায়িত্ব।',
        sa: 'द्रव्याणां तोलनं, शुद्धता-परीक्षणं, स्वीकार-पत्र-लेखनं च भाण्डागार-रक्षकस्य मुख्यं दायित्वम्।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Inward Stock Weighing & Quality Check',
            hi: '१. आगमन सामग्री का भौतिक तोलन एवं शुद्धता परीक्षण',
            bn: '১. পণ্য আগমনের পর ওজন স্কেলে সঠিক পরিমাপ নিশ্চিতকরণ',
            sa: '१. आगतद्रव्याणां तोलनं शुद्धता-परीक्षणं च',
          },
          description: {
            en: 'When vendor delivers goods to BHANDAR, weigh on calibrated scale and inspect moisture, aroma, and seal.',
            hi: 'जब विक्रेता BHANDAR में सामान पहुँचाए, तो धर्मकांटे पर वजन करें और नमी, सुगंध व सील की जाँच करें।',
            bn: 'পণ্য আগমনের পর ওজন স্কেলে সঠিক পরিমাপ নিশ্চিত করুন ও BHANDAR প্রকোষ্ঠে ভেজালমুক্ত খাঁটি উপাদান যাচাই করুন।',
            sa: 'यदा विक्रेता BHANDAR स्थाने द्रव्याणि समर्पयेत्, तदा मानदण्डेन तोलनं कुर्वन्तु।',
          },
          actionRequired: {
            en: 'Check vendor challan against physical quantity.',
            hi: 'चालान से वास्तविक वजन का मिलान करें।',
            bn: 'চালানের সাথে প্রকৃত প্রাপ্ত পরিমাণ মিলিয়ে দেখুন।',
            sa: 'चालान-पत्रेण सह वास्तविक-परिमाणस्य संमिलनम्।',
          },
          highlightedTerms: ['BHANDAR'],
          complianceTag: 'Internal Quality Protocol',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Accept GRN & Double-Entry Treasury Sync',
            hi: '२. जी.आर.एन. (GRN) स्वीकारें एवं स्वतः ट्रेजरी प्रविष्टि',
            bn: '২. চালানের সাথে আইটেম মিলিয়ে "Accept GRN" সম্পন্নকরণ',
            sa: '२. स्वीकार-पत्रम् (GRN) अङ्गीकरणं च',
          },
          description: {
            en: 'Click "Accept GRN" with valid vendor challan number. This increases physical stock and posts an expense to Treasury.',
            hi: 'चालान संख्या दर्ज कर "Accept GRN" बटन दबाएँ। इससे भौतिक स्टॉक बढ़ेगा और ट्रेजरी में खर्च दर्ज होगा।',
            bn: 'সামগ্রী গ্রহণের পর চালানের নম্বর দিয়ে "Accept GRN" বাটনে চাপ দিন, যা সরাসরি ট্রেজারি লেজারে খরচ হিসাবে যুক্ত হবে।',
            sa: '"Accept GRN" इति प्रपत्रं स्वीकृत्य भाण्डागारे संख्यावर्धनेन सह कोषव्ययं लिखन्तु।',
          },
          actionRequired: {
            en: 'Trigger 1-click GRN reconciliation in Tab 4.',
            hi: 'टैब ४ में १-क्लिक जी.आर.एन. समाधान पूरा करें।',
            bn: 'ট্যাব ৪-এ গিয়ে ১-ক্লিকে জি.আর.এন. সম্পন্ন করুন।',
            sa: 'चतुर्थ-भागे स्वीकार-पत्र-समाधानं कुर्वन्तु।',
          },
          highlightedTerms: ['GRN'],
          complianceTag: 'Mandir Ledger Protocol',
        },
        {
          stepNumber: 3,
          title: {
            en: '3. Recipe BOM Stock Reservation for Pujas',
            hi: '३. पूजा एवं अन्नदान हेतु रेसिपी बी.ओ.एम. (RECIPE_BOM) स्टॉक आरक्षण',
            bn: '৩. পূজা ও অন্নদানের জন্য রেসিপি বি.ও.এম. (RECIPE_BOM) স্টক বরাদ্দ',
            sa: '३. पूजानिमित्तं सामग्री-प्रमाणकम् (RECIPE_BOM) आरक्षणम्',
          },
          description: {
            en: 'Verify required ingredients for upcoming Sankalps using RECIPE_BOM and reserve stock so it is not consumed elsewhere.',
            hi: 'आगामी संकल्पों के लिए RECIPE_BOM के माध्यम से सामग्री जाँचें और स्टॉक आरक्षित करें।',
            bn: 'আসন্ন পূজার জন্য RECIPE_BOM ব্যবহার করে প্রয়োজনীয় উপাদান পরীক্ষা করুন এবং স্টক লক করে রাখুন।',
            sa: 'आगामि-पूजानां कृते RECIPE_BOM अनुसृत्य द्रव्याणि आरक्षितानि कुर्वन्तु।',
          },
          actionRequired: {
            en: 'Reserve batch in Recipe Engine tab.',
            hi: 'रेसिपी इंजन टैब में बैच आरक्षित करें।',
            bn: 'রেসিপি ইঞ্জিন ট্যাবে গিয়ে ব্যাচ রিজার্ভ করুন।',
            sa: 'सामग्री-इञ्जन-भागे आरक्षणं कुर्वन्तु।',
          },
          highlightedTerms: ['RECIPE_BOM', 'SANKALP'],
          complianceTag: 'Shastric Proportion Rule',
        },
      ],
      checklistItems: [
        {
          en: 'Physical weight verified against vendor challan slip',
          hi: 'विक्रेता चालान से वास्तविक वजन का सत्यापन पूर्ण',
          bn: 'সরবরাহকারী চালানের সাথে প্রকৃত ওজন যাচাই সম্পন্ন',
          sa: 'विक्रेतृ-पत्रेण सह वास्तविक-तोलन-सत्यापनं सम्पन्नम्',
        },
        {
          en: 'GRN accepted and auto-synced to Treasury',
          hi: 'जी.आर.एन. स्वीकार कर ट्रेजरी में स्वतः प्रविष्टि दर्ज',
          bn: 'জি.আর.এন. অনুমোদিত ও ট্রেজারিতে সমন্বিত',
          sa: 'स्वीकार-पत्रम् अङ्गीकृत्य कोषविभागे संयोजितम्',
        },
        {
          en: 'Storage in labeled airtight bins in Bhandar Room',
          hi: 'भंडार कक्ष में सुरक्षित एवं नामांकित पेटियों में भंडारण',
          bn: 'ভাণ্ডার কক্ষে লেবেলযুক্ত বায়ুরোধী পাত্রে সংরক্ষণ',
          sa: 'भाण्डागारे नामचिह्नितेषु पात्रेषु संरक्षणम्',
        },
      ],
    },
    TRUSTEE: {
      moduleId: 'SMART_BHANDAR',
      moduleName: {
        en: 'Smart Bhandar, Recipe BOM & Auto-Procurement',
        hi: 'स्मार्ट भंडार, रेसिपी बी.ओ.एम. एवं खरीद डेस्क',
        bn: 'স্মার্ট ভাণ্ডার, রেসিপি বি.ও.এম. এবং সংগ্রহ ডেস্ক',
        sa: 'स्मार्ट-भाण्डागारम्, सामग्रीप्रमाणं तथा क्रयविभागः',
      },
      role: 'TRUSTEE',
      roleLabel: {
        en: 'Master Trustee / Board Member',
        hi: 'प्रधान न्यासी / बोर्ड सदस्य',
        bn: 'প্রধান ট্রাস্টি / বোর্ড সদস্য',
        sa: 'प्रधान-न्यासी / पञ्चप्रमुखः',
      },
      roleSummary: {
        en: 'Authorizes high-value procurement orders, audits inventory consumption variances, and ensures sattvic supply chain transparency.',
        hi: 'उच्च-मूल्य खरीद आदेशों की स्वीकृति, सामग्री खपत का त्रैमासिक ऑडिट एवं आपूर्ति श्रृंखला की पवित्रता सुनिश्चित करना।',
        bn: 'উচ্চমূল্যের ক্রয়াদেশ অনুমোদন, সামগ্রী খরচের তদারকি এবং ভাণ্ডারের সততা ও স্বচ্ছতা নিশ্চিতকরণ।',
        sa: 'उच्चमूल्य-क्रयाणां स्वीकरणं, व्यय-निरीक्षणं, सात्त्विक-परंपरायाः रक्षणं च न्यासिनां कार्यम्।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Vendor Rate Contract & Credit Term Approval',
            hi: '१. विक्रेता दर अनुबंध एवं भुगतान शर्तों का अनुमोदन',
            bn: '১. সরবরাহকারীর দরপত্র ও বাকির মেয়াদ অনুমোদন',
            sa: '१. विक्रेतृ-दर-स्वीकरणं तथा ऋणकाल-निर्धारणम्',
          },
          description: {
            en: 'Review vendor pricing for Gir Cow Ghee, Govindobhog rice, and herbs. Ensure payment terms comply with Trust policy.',
            hi: 'देशी गाय के घी, चावल एवं हवन द्रव्यों के दरों की समीक्षा करें तथा ट्रस्ट नीति अनुसार भुगतान शर्तें तय करें।',
            bn: 'খাঁটি ঘৃত ও সুগন্ধি চালের বাজারদর যাচাই করে ট্রাস্টের নিয়ম অনুযায়ী পরিশোধের শর্ত অনুমোদন করুন।',
            sa: 'गोघृतस्य तण्डुलानां च मूल्यानि समीक्ष्य ट्रस्ट-नियमानुसारेण धनप्रदानव्यवस्थां कुर्वन्तु।',
          },
          actionRequired: {
            en: 'Approve vendor contracts in Tab 3.',
            hi: 'टैब ३ में विक्रेता अनुबंध अनुमोदित करें।',
            bn: 'ট্যাব ৩-এ সরবরাহকারীর চুক্তি অনুমোদন করুন।',
            sa: 'तृतीयभागे विक्रेतृस्वीकृतिं कुर्वन्तु।',
          },
          highlightedTerms: ['BHANDAR'],
          complianceTag: 'Trust Governance Code',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Audit Inventory Variance & Treasury Deductions',
            hi: '२. भंडार स्टॉक अंतर एवं ट्रेजरी खर्च का मासिक ऑडिट',
            bn: '২. ভাণ্ডারের সামগ্রীর হিসাব ও ট্রেজারি ব্যয়ের অডিট',
            sa: '२. भाण्डागार-व्ययस्य तथा कोषनिर्गमस्य मासिक-परीक्षणम्',
          },
          description: {
            en: 'Match physical stock in BHANDAR against GRN postings to detect any unauthorized wastage or theft.',
            hi: 'BHANDAR के भौतिक स्टॉक का GRN प्रविष्टियों से मिलान करें ताकि किसी रिसाव या बर्बादी को रोका जा सके।',
            bn: 'BHANDAR-এর প্রকৃত স্টক এবং GRN নথির সাথে ব্যয় মিলিয়ে কোনো অপচয় হচ্ছে কিনা তা অডিট করুন।',
            sa: 'BHANDAR स्थितेन द्रव्येण सह GRN प्रपत्रं संवीक्ष्य अव्ययं निवारयन्तु।',
          },
          actionRequired: {
            en: 'Review monthly GRN reports in Tab 4.',
            hi: 'टैब ४ में मासिक जी.आर.एन. रिपोर्ट देखें।',
            bn: 'ট্যাব ৪-এ মাসিক জি.আর.এন. রিপোর্ট পর্যবেক্ষণ করুন।',
            sa: 'चतुर्थभागे प्रतिवेदनं पश्यन्तु।',
          },
          highlightedTerms: ['BHANDAR', 'GRN'],
          complianceTag: 'Statutory Trust Audit',
        },
      ],
      checklistItems: [
        {
          en: 'BHANDAR inventory insurance active and updated',
          hi: 'भंडार सामग्री का सक्रिय बीमा अद्यतन',
          bn: 'ভাণ্ডারের সামগ্রীর সুরক্ষা ও বীমা হালনাগাদ',
          sa: 'भाण्डागारद्रव्याणां सुरक्षा-व्यवस्था सम्यक् वर्तते',
        },
        {
          en: 'Quarterly physical stock-taking matches ledger balances',
          hi: 'त्रैमासिक भौतिक गणना बहीखाता से पूर्णतः मेल खाती है',
          bn: 'ত্রৈমাসিক সরাসরি গণনা খাতার হিসাবের সাথে নিখুঁতভাবে মেলে',
          sa: 'त्रैमासिक-गणनायाः कोषपत्रैः सह पूर्ण-साम्यम्',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // MODULE: FORM_10BD
  // --------------------------------------------------------------------------
  FORM_10BD: {
    ACCOUNTANT: {
      moduleId: 'FORM_10BD',
      moduleName: {
        en: 'Form 10BD & 80G Statutory Compliance Desk',
        hi: 'फॉर्म १०-बी.डी. एवं ८०-जी वैधानिक अनुपालन डेस्क',
        bn: 'ফর্ম ১০বিডি এবং ৮০জি কর সমন্বয় ডেস্ক',
        sa: 'दशम-प्रपत्रम् (१०-बी.डी.) आयकर-अनुपालनविभागः',
      },
      role: 'ACCOUNTANT',
      roleLabel: {
        en: 'Chartered Accountant / Head of Finance',
        hi: 'चार्टर्ड एकाउंटेंट / मुख्य लेखाकार',
        bn: 'সনদপ্রাপ্ত হিসাবরক্ষক / অর্থ নিয়ন্ত্রক',
        sa: 'मुख्य-लेखाकारः / कोषनिरीक्षकः',
      },
      roleSummary: {
        en: 'Audits Sec 80G donations, enforces CBDT cash guardrails, verifies donor Tax IDs, and exports error-free Form 10BD CSV returns.',
        hi: '८०-जी दानों का ऑडिट, २००० रु. से अधिक नकद प्रतिबंध का अनुपालन, पैन सत्यापन एवं त्रुटिरहित १०-बी.डी. सीएसवी का निर्यात।',
        bn: '৮০জি অনুদানের হিসাব নিরীক্ষা, নগদ টাকার নিয়ম লঙ্ঘন রোধ, প্যান/আধার যাচাই এবং সিবিডিটি মানসম্মত সিএসভি তৈরি।',
        sa: '८०-जी दानानां परीक्षणं, रोख-प्रतिबन्धस्य पालनं, त्रुटिरहित-दशमप्रपत्र-निर्यातनं च।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Enforce Cash Donation Limit Guardrail (₹2,000 Sec 80G(5)(d))',
            hi: '१. नकद दान सीमा नियम का अनुपालन (अधिकतम २००० रु. धारा ८०-जी)',
            bn: '১. নগদ দানের আইনগত সীমা যাচাই (সর্বোচ্চ ₹২,০০০ ধারা ৮০জি(৫)(ডি))',
            sa: '१. रोखदान-मर्यादा-पालनम् (द्विसहस्रं रूप्यकाणि)',
          },
          description: {
            en: 'Under CBDT law, no cash donation exceeding ₹2,000 qualifies for 80G benefit. The desk flags any violation in bright red.',
            hi: 'आयकर नियमानुसार २००० रु. से अधिक का नकद दान ८०-जी में अमान्य है। डेस्क ऐसे दानों को लाल रंग में चिह्नित करती है।',
            bn: 'আয়কর বিধিমালা অনুযায়ী ₹২,০০০-এর বেশি নগদ অনুদানে ৮০জি ছাড় পাওয়া যায় না। সিস্টেমে এটি লাল সতর্কবার্তায় দেখায়।',
            sa: 'आयकरनियमानुसारेण द्विसहस्रादधिकं रोखदानं करमुक्तं न भवति।',
          },
          actionRequired: {
            en: 'Isolate or reclassify ineligible cash donations.',
            hi: 'अमान्य नकद दानों को अलग करें या सामान्य दान में बदलें।',
            bn: 'অযোগ্য নগদ অনুদানগুলো আলাদা করুন বা সাধারণ খাতে স্থানান্তর করুন।',
            sa: 'अयोग्यदानानां पृथक्करणं कुर्वन्तु।',
          },
          highlightedTerms: ['FORM_10BD'],
          complianceTag: 'Income Tax Sec 80G(5)(d)',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Donor Tax ID Verification (PAN / Aadhaar / Passport)',
            hi: '२. दानदाता कर पहचान पत्र सत्यापन (पैन / आधार / पासपोर्ट)',
            bn: '২. দানকারীর কর সনাক্তকরণ নম্বর যাচাই (প্যান / আধার / পাসপোর্ট)',
            sa: '२. दातृ-कर-अभिज्ञानपत्र-सत्यापनम्',
          },
          description: {
            en: 'Every donor record in FORM_10BD must have a verified Tax ID with correct CBDT code mapping (PAN=1, Aadhaar=2).',
            hi: 'FORM_10BD की प्रत्येक प्रविष्टि में मान्य कर पहचान संख्या एवं निर्धारित कोड (पैन=१, आधार=२) होना अनिवार्य है।',
            bn: 'FORM_10BD-এর প্রতিটি রেকর্ডে নির্ধারিত কোডসহ বৈধ ট্যাক্স আইডি (প্যান=১, আধার=২) থাকা আবশ্যক।',
            sa: 'प्रत्येकस्मिन लेखे पञ्जीकृत-कर-सङ्ख्या अनिवार्या भवति।',
          },
          actionRequired: {
            en: 'Fill missing PANs before generating the export.',
            hi: 'निर्यात से पूर्व रिक्त पैन नंबर प्रविष्ट करें।',
            bn: 'এক্সপোর্ট করার পূর্বে নিখোঁজ প্যান/আধার নম্বর পূরণ করুন।',
            sa: 'रिक्तानां पञ्जीकरण-पत्राणां पूरणं कुर्वन्तु।',
          },
          highlightedTerms: ['FORM_10BD'],
          complianceTag: 'CBDT Notification 19/2021',
        },
        {
          stepNumber: 3,
          title: {
            en: '3. 1-Click CBDT Compliant CSV Exporter',
            hi: '३. १-क्लिक सीबीडीटी सम्मत सीएसवी (CSV) ई-फाइलिंग निर्यात',
            bn: '৩. ১-ক্লিকে সিবিডিটি অনুমোদিত সিএসভি ফাইল ডাউনলোড ও দাখিল',
            sa: '३. आयकरविभाग-सम्मत-दशमप्रपत्र-निर्यातनम्',
          },
          description: {
            en: 'Export the audited file named "Form_10BD_FY_XXXX_XXXX.csv" and upload directly to the Indian Income Tax Portal.',
            hi: '"Form_10BD_FY_XXXX_XXXX.csv" फाइल डाउनलोड करें और सीधे आयकर ई-फाइलिंग पोर्टल पर अपलोड करें।',
            bn: '"Form_10BD_FY_XXXX_XXXX.csv" ফাইলটি ডাউনলোড করে ভারতের আয়কর পোর্টালে সরাসরি আপলোড করুন।',
            sa: 'प्रपत्रं निष्कास्य साक्षात् आयकर-पटले स्थापयन्तु।',
          },
          actionRequired: {
            en: 'Click "Export CBDT Form 10BD CSV".',
            hi: '"Export CBDT Form 10BD CSV" पर क्लिक करें।',
            bn: '"Export CBDT Form 10BD CSV" বাটনে ক্লিক করুন।',
            sa: 'दशमप्रपत्रं निर्गमयन्तु।',
          },
          highlightedTerms: ['FORM_10BD', 'CORPUS_FUND'],
          complianceTag: 'Income Tax Filing Due: May 31',
        },
      ],
      checklistItems: [
        {
          en: 'Zero cash transactions above ₹2,000 in 80G bracket',
          hi: '८०-जी में २००० रु. से अधिक की कोई नकद प्रविष्टि नहीं',
          bn: '৮০জি তালিকায় ₹২,০০০-এর অধিক কোনো নগদ অনুদান নেই',
          sa: '८०-जी भागे द्विसहस्रादधिकं रोखदानं नास्ति',
        },
        {
          en: 'All donor IDs mapped to CBDT numeric codes (1-5)',
          hi: 'सभी पहचान पत्र सीबीडीटी संख्यात्मक कोड (१-५) से सुसज्जित',
          bn: 'সকল দানকারীর পরিচয়পত্র সিবিডিটি নিউমেরিক কোডে (১-৫) রূপান্তর সম্পন্ন',
          sa: 'सर्वे दातारः आयकर-संकेताङ्कैः युक्ताः सन्ति',
        },
        {
          en: 'Form 10BE certificates ready for auto-generation for donors',
          hi: 'दानदाताओं हेतु फॉर्म १०-बी.ई. प्रमाणपत्र स्वतः जारी करने के लिए तैयार',
          bn: 'দানকারীদের জন্য ১০বিই সার্টিফিকেট প্রস্তুত',
          sa: 'दानदातृभ्यः १०-बी.ई. प्रमाणपत्रं सज्जम्',
        },
      ],
    },
    TRUSTEE: {
      moduleId: 'FORM_10BD',
      moduleName: {
        en: 'Form 10BD & 80G Statutory Compliance Desk',
        hi: 'फॉर्म १०-बी.डी. एवं ८०-जी वैधानिक अनुपालन डेस्क',
        bn: 'ফর্ম ১০বিডি এবং ৮০জি কর সমন্বয় ডেস্ক',
        sa: 'दशम-प्रपत्रम् (१०-बी.डी.) आयकर-अनुपालनविभागः',
      },
      role: 'TRUSTEE',
      roleLabel: {
        en: 'Managing Trustee / Signatory',
        hi: 'प्रबंध न्यासी / अधिकृत हस्ताक्षरकर्ता',
        bn: 'ব্যবস্থাপনা ট্রাস্টি / অনুমোদিত স্বাক্ষরকারী',
        sa: 'प्रबन्ध-न्यासी / अधिकृतहस्ताक्षरकर्ता',
      },
      roleSummary: {
        en: 'Final sign-off on Form 10BD filing with Digital Signature Certificate (DSC) on the Income Tax Portal, protecting the trust 80G tax exemption status.',
        hi: 'डिजिटल हस्ताक्षर (DSC) द्वारा आयकर पोर्टल पर फॉर्म १०-बी.डी. का अंतिम सत्यापन एवं ट्रस्ट की ८०-जी मान्यता का संरक्षण।',
        bn: 'ডিজিটাল স্বাক্ষর (ডিএসসি) দিয়ে আয়কর পোর্টালে ফর্ম ১০বিডি অনুমোদন ও ট্রাস্টের ৮০জি করছাড় বৈধ রাখা।',
        sa: 'अङ्कीय-हस्ताक्षरेण आयकर-पटले प्रपत्रस्य अन्तिम-स्वीकारः।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Review Pre-Filing Audit Report & Donation Totals',
            hi: '१. पूर्व-फाइलिंग ऑडिट रिपोर्ट एवं कुल दान राशि की समीक्षा',
            bn: '১. দাখিলের পূর্বে নিরীক্ষা রিপোর্ট ও মোট অনুদান খতিয়ে দেখা',
            sa: '१. समर्पणपूर्व-परीक्षणस्य दानराशेः च समीक्षा',
          },
          description: {
            en: 'Cross-verify total eligible donations against audited bank statements and tally ledger.',
            hi: 'बैंक खाते के विवरण एवं मुख्य बहीखाता से कुल पात्र दान राशि का मिलान करें।',
            bn: 'ব্যাংক হিসাব এবং মূল লেজারের সাথে মোট করছাড়যোগ্য অনুদানের পরিমাণ মিলিয়ে নিন।',
            sa: 'कोषपत्रेण सह सर्वस्य दानस्य साम्यं परीक्षध्वम्।',
          },
          actionRequired: {
            en: 'Approve audit summary on dashboard.',
            hi: 'डैशबोर्ड पर ऑडिट सारांश स्वीकृत करें।',
            bn: 'ড্যাশবোর্ডে নিরীক্ষা সংক্ষেপ অনুমোদন করুন।',
            sa: 'विवरणं परीक्ष्य स्वीकुर्वन्तु।',
          },
          highlightedTerms: ['FORM_10BD', 'CORPUS_FUND'],
          complianceTag: 'Trustee Fiduciary Duty',
        },
      ],
      checklistItems: [
        {
          en: 'DSC token plugged in and registered on Incometax.gov.in',
          hi: 'डीएससी टोकन सक्रिय एवं आयकर पोर्टल पर पंजीकृत',
          bn: 'ডিএসসি টোকেন আয়কর পোর্টালে নিবন্ধিত ও সক্রিয়',
          sa: 'अङ्कीय-हस्ताक्षरं आयकर-पटले पञ्जीकृतम्',
        },
        {
          en: 'Filing completed prior to May 31 to avoid ₹200/day Sec 234G penalties',
          hi: '३१ मई से पूर्व फाइलिंग पूर्ण ताकि प्रतिदिन २०० रु. अर्थदंड से बचा जा सके',
          bn: '৩১ মে-এর মধ্যে দাখিল সম্পন্ন করে প্রতিদিনের ₹২০০ জরিমানা পরিহার নিশ্চিত',
          sa: 'एकत्रिंशत्-मे-मासात् पूर्वं सर्वं सम्पन्नम्',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // MODULE: FEDERATION_SWEEP
  // --------------------------------------------------------------------------
  FEDERATION_SWEEP: {
    TRUSTEE: {
      moduleId: 'FEDERATION_SWEEP',
      moduleName: {
        en: 'Federation Multi-Branch & Inter-Branch Sweeps',
        hi: 'महासंघ बहु-शाखा एवं अंतर-शाखा कोष समाहरण',
        bn: 'ফেডারেশন বহু-শাখা এবং আন্তঃশাখা তহবিল স্থানান্তর',
        sa: 'महासंघ-बहुशाखा-तथा-कोषसमाहरण-विभागः',
      },
      role: 'TRUSTEE',
      roleLabel: {
        en: 'Master Trustee / Central Command',
        hi: 'प्रधान न्यासी / केंद्रीय कमान',
        bn: 'প্রধান ট্রাস্টি / কেন্দ্রীয় পরিষদ',
        sa: 'महासंघ-प्रमुखः',
      },
      roleSummary: {
        en: 'Sole authority to execute inter-branch CASH_SWEEP operations, sweep branch surpluses into the HQ master account, and provision new branches.',
        hi: 'शाखाओं से केंद्रीय कोष में CASH_SWEEP संचालित करने, नई शाखाओं को मान्यता देने एवं केंद्रीय तरलता बनाए रखने का एकमात्र अधिकार।',
        bn: 'আন্তঃশাখা CASH_SWEEP পরিচালনা করে শাখা কেন্দ্রের উদ্বৃত্ত প্রধান তহবিলে জমা করার এবং নতুন শাখা যুক্ত করার সর্বময় ক্ষমতা।',
        sa: 'शाखाकोषेभ्यः मुख्यकोषे CASH_SWEEP करणस्य एकमात्रम् अधिकारपदम्।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Monitor Multi-Branch Live Treasury Balances',
            hi: '१. सभी शाखाओं की वास्तविक रोकड़ व बैंक शेष पर दृष्टि',
            bn: '১. সমস্ত শাখা কেন্দ্রের লাইভ নগদ ও ব্যাংক ব্যালেন্স পর্যবেক্ষণ',
            sa: '१. सर्वासां शाखानां कोषशेषनिरीक्षणम्',
          },
          description: {
            en: 'Examine live revenue, expense, and net surplus across the parent HQ and all affiliate branches side-by-side.',
            hi: 'केंद्रीय मुख्यालय एवं सभी संबद्ध शाखाओं के राजस्व, व्यय और शुद्ध अधिशेष की तुलनात्मक समीक्षा करें।',
            bn: 'প্রধান কেন্দ্র এবং সমস্ত অনুমোদিত শাখাগুলোর আয়, ব্যয় ও উদ্বৃত্ত অর্থ পাশাপাশি তুলনা করে দেখুন।',
            sa: 'सर्वासां शाखानाम् आय-व्यय-अधिशेषाणां तुलनात्मक-परीक्षणम्।',
          },
          actionRequired: {
            en: 'Inspect Tab 1: Global Treasury Roll-Up.',
            hi: 'टैब १: ग्लोबल ट्रेजरी रोल-अप की जाँच करें।',
            bn: 'ট্যাব ১: গ্লোবাল ট্রেজারি রোল-আপ পর্যবেক্ষণ করুন।',
            sa: 'प्रथमभागे समग्र-कोष-विवरणं पश्यन्तु।',
          },
          highlightedTerms: ['CASH_SWEEP'],
          complianceTag: 'Consolidated Trust Ledger',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Execute Dual-Sign-Off Inter-Branch Cash Sweep',
            hi: '२. द्वैध-स्वीकृति अंतर-शाखा कोष समाहरण (CASH_SWEEP) निष्पादन',
            bn: '২. দ্বৈত অনুমোদন সাপেক্ষে আন্তঃশাখা ক্যাশ সুইপ (CASH_SWEEP) সম্পাদন',
            sa: '२. कोष-समाहरणस्य (CASH_SWEEP) प्रामाणिक-निष्पादनम्',
          },
          description: {
            en: 'When a child branch accumulates surplus cash exceeding operational limits, execute a CASH_SWEEP to the HQ Master Account via NEFT/RTGS.',
            hi: 'जब किसी शाखा में निर्धारित सीमा से अधिक रोकड़ एकत्र हो, तो NEFT/RTGS द्वारा केंद्रीय खाते में CASH_SWEEP करें।',
            bn: 'শাখা কেন্দ্রে অতিরিক্ত নগদ অর্থ জমলে NEFT/RTGS-এর মাধ্যমে কেন্দ্রীয় অ্যাকাউন্টে CASH_SWEEP সম্পন্ন করুন।',
            sa: 'अतिरिक्तं धनं मुख्यखाते समाहरन्तु।',
          },
          actionRequired: {
            en: 'Execute sweep in Tab 3 with transfer notes.',
            hi: 'टैब ३ में अंतरण विवरण के साथ स्वीप निष्पादित करें।',
            bn: 'ট্যাব ৩-এ গিয়ে প্রয়োজনীয় নোটসহ সুইপ সম্পন্ন করুন।',
            sa: 'तृतीयभागे स्वीप-कार्यं कुर्वन्तु।',
          },
          highlightedTerms: ['CASH_SWEEP'],
          complianceTag: 'Inter-Branch Transfer Authorization',
        },
      ],
      checklistItems: [
        {
          en: 'Branch cash-in-hand audited below insurance limit (₹5,00,000)',
          hi: 'शाखा में भौतिक रोकड़ ५ लाख रु. बीमा सीमा के भीतर सीमित',
          bn: 'শাখা কেন্দ্রের নগদ স্থিতি বীমা সীমার (₹৫,০০,০০০) নিচে রাখা নিশ্চিত',
          sa: 'शाखाकोषे रोखराशिः पञ्चलक्षमिता मर्यादिता',
        },
        {
          en: 'All sweeps authorized with Board Resolution reference numbers',
          hi: 'सभी कोष अंतरण बोर्ड संकल्प संदर्भ संख्या सहित पंजीकृत',
          bn: 'প্রতিটি সুইপ ট্রাস্ট বোর্ডের রেজোলিউশন নম্বরসহ লিপিবদ্ধ',
          sa: 'सर्वं समाहरणं मण्डल-स्वीकृति-सङ्ख्यया युक्तम्',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // MODULE: FAMILY_MATRIMONY
  // --------------------------------------------------------------------------
  FAMILY_MATRIMONY: {
    PUROHIT: {
      moduleId: 'FAMILY_MATRIMONY',
      moduleName: {
        en: 'Vanshavali, Matrimony & Pitru Roots',
        hi: 'वंशावली, सनातन विवाह एवं पितृ मूल',
        bn: 'বংশাবলী, সনাতনী বিবাহ ও পিতৃমূল',
        sa: 'वंशावली, विवाह-मेलापकः तथा पितृमूलम्',
      },
      role: 'PUROHIT',
      roleLabel: {
        en: 'Kul-Purohit / Shastric Scholar',
        hi: 'कुल-पुरोहित / शास्त्रीय विद्वान',
        bn: 'কুল-পুরোহিত / শাস্ত্রীয় পণ্ডিত',
        sa: 'कुलपुरोहितः / वेदज्ञः',
      },
      roleSummary: {
        en: 'Verifies lineage pedigree, enforces Gotra and Pravara exogamy rules to avoid SAGOTRA alliances, computes GUNA_MILAN, and presides over PITRU_TARPANA.',
        hi: 'वंशावली सत्यापन, सगोत्र (SAGOTRA) विवाह निषेध की शास्त्रीय जाँच, ३६ गुणों का GUNA_MILAN एवं पितृ तर्पण (PITRU_TARPANA) का संचालन।',
        bn: 'বংশলতিকা যাচাই, সগোত্র (SAGOTRA) বিবাহ সম্পূর্ণ নিষিদ্ধ রাখা, ৩৬ গুণের GUNA_MILAN এবং বৈদিক পিতৃ তর্পণ (PITRU_TARPANA) পরিচালনা।',
        sa: 'गोत्र-प्रवर-परीक्षणम्, SAGOTRA-वर्जनम्, GUNA_MILAN तथा PITRU_TARPANA विधि-परिचालनम्।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Strict SAGOTRA & Pravara Exogamy Enforcement',
            hi: '१. सगोत्र (SAGOTRA) एवं प्रवर वर्जना की कठोर शास्त्रीय जाँच',
            bn: '১. সগোত্র (SAGOTRA) ও প্রবর এক হলে বিবাহে কঠোর নিষেধাজ্ঞা নিশ্চিতকরণ',
            sa: '१. सगोत्र-विवाह-वर्जन-परीक्षणम् (SAGOTRA)',
          },
          description: {
            en: 'Under Dharma Shastras, bride and groom belonging to the same Rishi Gotra (SAGOTRA) or sharing common Pravaras cannot marry.',
            hi: 'धर्मशास्त्रों के अनुसार समान ऋषि गोत्र (SAGOTRA) अथवा समान प्रवर वाले वर-वधू का विवाह पूर्णतः वर्जित है।',
            bn: 'সনাতন শাস্ত্রানুসারে বর ও কনে একই ঋষি গোত্রের (SAGOTRA) হলে বা অভিন্ন প্রবর থাকলে বিবাহ শাস্ত্রবিরুদ্ধ।',
            sa: 'धर्मशास्त्रेषु समानगोत्रोत्पन्नयोः (SAGOTRA) विवाहः सर्वथा निषिद्धः।',
          },
          actionRequired: {
            en: 'Verify Gotra exogamy alert on profile preview.',
            hi: 'प्रोफाइल में सगोत्र निषेध चेतावनी अवश्य जाँचें।',
            bn: 'প্রোফাইল দেখার সময় সগোত্র সতর্কতা সতর্কতার সাথে যাচাই করুন।',
            sa: 'गोत्रनिषेध-चेतावनीं अवश्यं परीक्षध्वम्।',
          },
          highlightedTerms: ['SAGOTRA', 'GUNA_MILAN'],
          complianceTag: 'Manusmriti 3.5 & Dharmashastra',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Ashtakoot 36-Point GUNA_MILAN Computation',
            hi: '२. अष्टकूट ३६-गुण मिलान (GUNA_MILAN) गणना',
            bn: '২. অষ্টকূট ৩৬ গুণের কোষ্ঠী বিচার (GUNA_MILAN) ও সমাধান',
            sa: '२. अष्टकूट-षट्त्रिंशद्गुण-मेलनम् (GUNA_MILAN)',
          },
          description: {
            en: 'Evaluate Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi. A score above 18 points is eligible.',
            hi: 'वर्ण, वश्य, तारा, योनि, ग्रहमैत्री, गण, भकूट और नाड़ी का मिलान करें। १८ से अधिक गुण प्राप्त होने पर ही संबंध प्रशस्त है।',
            bn: 'বর্ণ, বশ্য, তারা, যোনি, গ্রহমৈত্রী, গণ, ভকূট এবং নাড়ী বিচার করুন। ১৮-এর বেশি গুণ মিললে তবেই সম্বন্ধ উত্তম।',
            sa: 'नाडी-भकूट-गणादीनां सम्यक् विचारं कृत्वा १८ परिमिताधिकगुणान् प्राप्नुवन्तु।',
          },
          actionRequired: {
            en: 'Compute Ashtakoot score in Vivah Desk.',
            hi: 'विवाह डेस्क में अष्टकूट गुण स्कोर देखें।',
            bn: 'বিবাহ ডেস্কে গিয়ে অষ্টকূট গুণ স্কোর বিচার করুন।',
            sa: 'गुणमेलन-फलकं पश्यन्तु।',
          },
          highlightedTerms: ['GUNA_MILAN'],
          complianceTag: 'Jyotisha Shastra Rule',
        },
        {
          stepNumber: 3,
          title: {
            en: '3. Pitru Tarpana Calendar & Ancestor Oblations',
            hi: '३. पितृ तर्पण (PITRU_TARPANA) एवं श्राद्ध स्मृति कैलेंडर',
            bn: '৩. পিতৃ তর্পণ (PITRU_TARPANA) ও পূর্বপুরুষের বাৎসরিক তিথি রক্ষা',
            sa: '३. पितृ-तर्पणम् (PITRU_TARPANA) श्राद्ध-तिथिनिर्णयश्च',
          },
          description: {
            en: 'Coordinate Mahalaya and Pitru Paksha dates, providing devotees with personalized Tarpana sankalpas based on their vanshavali.',
            hi: 'पितृपक्ष एवं महालय तिथियों पर भक्तों को उनकी वंशावली अनुसार व्यक्तिगत तर्पण संकल्प कराएँ।',
            bn: 'মহালয়া ও পিতৃপক্ষে ভক্তদের বংশলতিকা অনুযায়ী কুশ-তিলাঞ্জলি সহযোগে ব্যক্তিগত তর্পণ সম্পাদন করান।',
            sa: 'पितृपक्षे महालयायां च भक्तेभ्यः वंशावल्यनुसारेण सङ्कल्पं कारयन्तु।',
          },
          actionRequired: {
            en: 'Generate Tarpana sankalpa text in Tab 3.',
            hi: 'टैब ३ में तर्पण संकल्प पाठ तैयार करें।',
            bn: 'ট্যাব ৩-এ তর্পণ সংকল্প পাঠ তৈরি করুন।',
            sa: 'तर्पण-सङ्कल्पं सज्जीकुर्वन्तु।',
          },
          highlightedTerms: ['PITRU_TARPANA', 'SANKALP'],
          complianceTag: 'Garuda Purana Shradh Vidhi',
        },
      ],
      checklistItems: [
        {
          en: 'Seven generations of paternal & five of maternal lineage verified clear of Sagotra',
          hi: 'पितृपक्ष की सात एवं मातृपक्ष की पाँच पीढ़ियों का सगोत्र दोष से मुक्त होना प्रमाणित',
          bn: 'পিতৃকুলের ৭ ও মাতৃকুলের ৫ পুরুষ সগোত্র মুক্ত বলে নিশ্চিত',
          sa: 'पितृपक्षस्य सप्त मातृपक्षस्य च पञ्च कुलेषु गोत्रदोषराहित्यम्',
        },
        {
          en: 'Nadi dosha mitigated via Mahamrityunjaya or Suvarna Daana if present',
          hi: 'नाड़ी दोष होने की स्थिति में महामृत्युंजय जप या सुवर्ण दान उपाय निर्धारित',
          bn: 'নাড়ী দোষ থাকলে শাস্ত্রমতে মহামৃত্যুঞ্জয় জপ বা দান বিধান নিশ্চিত',
          sa: 'नाडीदोषनिवारणाय महामृत्युञ्जयजप-विधानम्',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // MODULE: PUROHIT_PORTAL
  // --------------------------------------------------------------------------
  PUROHIT_PORTAL: {
    PUROHIT: {
      moduleId: 'PUROHIT_PORTAL',
      moduleName: {
        en: 'Vedic Purohit Diary & Dakshina Portal',
        hi: 'वैदिक पुरोहित दैनिकी एवं दक्षिणा पोर्टल',
        bn: 'বৈদিক পুরোহিত ডায়েরি এবং দক্ষিণা পোর্টাল',
        sa: 'वैदिक-पुरोहित-दिनचर्या तथा दक्षिणा-विभागः',
      },
      role: 'PUROHIT',
      roleLabel: {
        en: 'Acharya / Purohit Sevadar',
        hi: 'आचार्य / पुरोहित सेवादार',
        bn: 'আচার্য / পুরোহিত সেবাদার',
        sa: 'आचार्यः / वेदविद्',
      },
      roleSummary: {
        en: 'Manages ritual assignments, performs Vedic sankalpas, and withdraws secured honorarium via DAKSHINA_ESCROW upon completing devotee pujas.',
        hi: 'पूजा अनुष्ठानों का प्रबंधन, वैदिक संकल्प उच्चारण एवं अनुष्ठान समाप्ति पर DAKSHINA_ESCROW से दक्षिणा प्राप्ति।',
        bn: 'পূজা ও যজ্ঞের শিডিউল পরিচালনা, বৈদিক সংকল্প পাঠ এবং পূজা সম্পন্ন হলে DAKSHINA_ESCROW থেকে সাম্মানিক গ্রহণ।',
        sa: 'पूजा-अनुष्ठानानां संचालनं, सङ्कल्पपाठः तथा DAKSHINA_ESCROW द्वारा दक्षिणा-स्वीकारः।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Review Scheduled Vedic Rituals & Devotee Gotras',
            hi: '१. आगामी पूजा अनुष्ठान एवं यजमान गोत्र विवरण की समीक्षा',
            bn: '১. নির্ধারিত পূজা ও যজমানের গোত্র-নক্ষত্র বিবরণ খতিয়ে দেখা',
            sa: '१. आगामि-पूजानां यजमान-गोत्रस्य च समीक्षणम्',
          },
          description: {
            en: 'Before each ritual, review devotee names, birth nakshatras, and specific sankalpa intentions logged in the portal.',
            hi: 'प्रत्येक अनुष्ठान से पूर्व यजमान के नाम, जन्म नक्षत्र एवं विशिष्ट संकल्प हेतु दर्ज विवरण का अध्ययन करें।',
            bn: 'প্রতিটি পূজার পূর্বে যজমানের নাম, জন্ম নক্ষত্র এবং বিশেষ সংকল্পের উদ্দেশ্য পোর্টাল থেকে দেখে নিন।',
            sa: 'अनुष्ठानात् पूर्वं यजमानस्य नाम, जन्म-नक्षत्रं, सङ्कल्पं च परिशीलयन्तु।',
          },
          actionRequired: {
            en: 'Check today’s calendar in Purohit Desk.',
            hi: 'पुरोहित डेस्क में आज की कार्यसूची देखें।',
            bn: 'পুরোহিত ডেস্কে আজকের সময়সূচি পরীক্ষা করুন।',
            sa: 'अद्यतन-दिनचर्यां पश्यन्तु।',
          },
          highlightedTerms: ['SANKALP'],
          complianceTag: 'Shastric Puja Sankalpa Vidhana',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Perform Seva & Complete Dakshina Escrow Payout',
            hi: '२. अनुष्ठान पूर्णता एवं दक्षिणा एस्क्रो (DAKSHINA_ESCROW) विमुक्ति',
            bn: '২. পূজা সমাপ্তি ও দক্ষিণা এসক্রো (DAKSHINA_ESCROW) থেকে অর্থ উত্তোলন',
            sa: '२. पूजा-समापनं दक्षिणा-न्यासस्य (DAKSHINA_ESCROW) विमुक्तिश्च',
          },
          description: {
            en: 'Once the pooja is solemnized and holy prasad is dispatched, mark the seva "Completed" to release guaranteed dakshina from escrow into your bank account.',
            hi: 'पूजा संपन्न होने एवं प्रसाद प्रेषण के उपरांत "Completed" चिह्नित करें, जिससे एस्क्रो से दक्षिणा सीधे आपके बैंक खाते में अंतरित हो जाए।',
            bn: 'পূজা সম্পন্ন ও প্রসাদ প্রেরণের পর "Completed" নির্বাচন করুন, যার ফলে এসক্রো তহবিল থেকে দক্ষিণা সরাসরি ব্যাংক অ্যাকাউন্টে জমা হবে।',
            sa: 'पूजा-समाप्तौ "Completed" इति कृत्वा दक्षिणां प्राप्नुवन्तु।',
          },
          actionRequired: {
            en: 'Mark booking completed to release funds.',
            hi: 'राशि विमुक्ति हेतु बुकिंग पूर्ण चिह्नित करें।',
            bn: 'টাকা প্রাপ্তির জন্য বুকিং সমাপ্ত হিসেবে মার্ক করুন।',
            sa: 'धनप्राप्तये पूर्तिं दर्शयन्तु।',
          },
          highlightedTerms: ['DAKSHINA_ESCROW'],
          complianceTag: 'Platform Fair Honorarium Guarantee',
        },
      ],
      checklistItems: [
        {
          en: 'Pure Shastric samagri checked with Bhandar storekeeper',
          hi: 'भंडार सेवादार से शुद्ध शास्त्रीय सामग्री का मिलान पूर्ण',
          bn: 'ভাণ্ডার সেবাদারের কাছ থেকে খাঁটি সামগ্রী সংগ্রহ সম্পন্ন',
          sa: 'भाण्डागारात् शुद्धानां पूजोपकरणानां प्राप्तिः',
        },
        {
          en: 'Direct electronic dakshina payout received without middleman deduction',
          hi: 'बिना किसी बिचौलिये के सीधे बैंक खाते में शत-प्रतिशत दक्षिणा प्राप्ति',
          bn: 'কোনো মধ্যস্বত্বভোগী ছাড়াই ১০০% দক্ষিণা ব্যাংক অ্যাকাউন্টে প্রাপ্তি',
          sa: 'सम्पूर्णा दक्षिणा साक्षात् बैंक-खाते प्राप्ता',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // MODULE: GOSHALA_DESK
  // --------------------------------------------------------------------------
  GOSHALA_DESK: {
    SEVADAR: {
      moduleId: 'GOSHALA_DESK',
      moduleName: {
        en: 'Goshala Sanctuary & Gomata Health Records',
        hi: 'गौशाला अभयारण्य एवं गोमाता स्वास्थ्य अभिलेख',
        bn: 'গোশালা অভয়ারণ্য এবং গোমাতা স্বাস্থ্য বিবরণী',
        sa: 'गौशाला-अभयारण्यं गोमाता-स्वास्थ्य-विभागश्च',
      },
      role: 'SEVADAR',
      roleLabel: {
        en: 'Gau Sevadar / Veterinary Caretaker',
        hi: 'गौ सेवादार / पशु चिकित्सा सहायक',
        bn: 'গো সেবাদার / পশু পরিচর্যাকারী',
        sa: 'गोसेवकः / पशुरक्षकः',
      },
      roleSummary: {
        en: 'Monitors cattle diet, milk yields, herbal medicinal feedings, and logs daily health records for indigenous desi breeds (Gir, Sahiwal, Tharparkar).',
        hi: 'देशी गोवंश (गीर, साहीवाल, थारपारकर) के आहार, दुग्ध उत्पादन, पंचगव्य एवं स्वास्थ्य की दैनिक प्रविष्टि।',
        bn: 'দেশি গরুর (গির, সাহিওয়াল, থারপারকার) সুষম খাদ্য, দুধের পরিমাণ এবং দৈনিক স্বাস্থ্য পরীক্ষা তদারকি।',
        sa: 'गवां चारा-दुग्ध-स्वास्थ्य-सम्बन्धिनां दैनन्दिनानां विषयाणां लेखनम्।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Daily Sattvic Fodder & Panchagavya Monitoring',
            hi: '१. दैनिक सात्विक चारा एवं पंचगव्य निर्माण निगरानी',
            bn: '১. দৈনিক পুষ্টিকর ঘাস ও পঞ্চগব্য উৎপাদনের হিসাব রাখা',
            sa: '१. प्रतिदिनं सात्त्विक-घासस्य पञ्चगव्यस्य च निरीक्षणम्',
          },
          description: {
            en: 'Ensure every cow receives green fodder, jaggery, and mineral mixture, reserving pure A2 Gir ghee for Garbhagriha aartis and BHANDAR stock.',
            hi: 'सुनिश्चित करें कि प्रत्येक गाय को हरा चारा, गुड़ और खनिज मिले तथा गर्भगृह आरती व BHANDAR हेतु शुद्ध ए२ घी सुरक्षित रहे।',
            bn: 'প্রতিটি গরুর জন্য সবুজ ঘাস ও গুড় নিশ্চিত করুন এবং গর্ভগৃহের আরতি ও BHANDAR-এর জন্য খাঁটি এ২ ঘি সংরক্ষণ করুন।',
            sa: 'सर्वासु गोषु तृण-गुड़-प्रदानं तथा मन्दिर-आरती-निमित्तं गोघृत-संरक्षणम्।',
          },
          actionRequired: {
            en: 'Log feeding entries in Gau Seva Desk.',
            hi: 'गौ सेवा डेस्क में चारा वितरण दर्ज करें।',
            bn: 'গো সেবা ডেস্কে খাদ্যের হিসাব লিপিবদ্ধ করুন।',
            sa: 'गोसेवा-विभागे चारा-वितरणं लिखन्तु।',
          },
          highlightedTerms: ['BHANDAR'],
          complianceTag: 'Indigenous Breed Welfare',
        },
      ],
      checklistItems: [
        {
          en: 'RFID ear tags scanned and updated in live cattle register',
          hi: 'आर.एफ.आई.डी. टैग स्कैन कर गोमाता रजिस्टर अद्यतन',
          bn: 'আরএফআইডি ট্যাগ স্ক্যান করে গরুর রেজিস্ট্রি হালনাগাদ',
          sa: 'गो-सङ्केत-संख्यायाः अद्यतनीकरणं कृतम्',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // MODULE: HUNDI_VAULT
  // --------------------------------------------------------------------------
  HUNDI_VAULT: {
    ACCOUNTANT: {
      moduleId: 'HUNDI_VAULT',
      moduleName: {
        en: 'Hundi & Golak Dual Custody Counting & Audit Vault',
        hi: 'हुंडी एवं गोलक दोहरी अभिरक्षा गणना व ऑडिट डेस्क',
        bn: 'হুন্ডি ও গোলক দ্বৈত-তত্ত্বাবধান গণনা ও অডিট ডেস্ক',
        sa: 'दानपेटिका-द्विकुञ्चिका-गणना-परीक्षण-विभागः',
      },
      role: 'ACCOUNTANT',
      roleLabel: {
        en: 'Primary Custodian / Chief Temple Accountant',
        hi: 'मुख्य अभिरक्षक / मुख्य मंदिर लेखाकार',
        bn: 'প্রধান রক্ষক / প্রধান মন্দির হিসাবরক্ষক',
        sa: 'मुख्य-कोषाधिकारी / मन्दिर-लेखाकारः',
      },
      roleSummary: {
        en: 'Responsible for breaking lead seals in witness presence, dual-key authentication, conducting denomination-wise currency counting, and auto-posting hundi cash into Treasury.',
        hi: 'साक्षी की उपस्थिति में सील तोड़ना, दोहरी कुंजी सत्यापन, मूल्यवर्ग अनुसार नोट-सिक्का गणना एवं ट्रेजरी लेजर में स्वतः प्रविष्टि दर्ज करना।',
        bn: 'সাক্ষীর উপস্থিতিতে সিল খোলা, ২-কী দ্বৈত পিন প্রমাণীকরণ, খুচরা নোট ও মুদ্রার সঠিক গণনা এবং ট্রেজারিতে সমন্বয়।',
        sa: 'साक्षिसमक्षं मुद्रोद्घाटनं, द्विकुञ्चिका-प्रमाणीकरणं, मुद्रा-गणना तथा कोष-पुस्तके समर्पणम्।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Lead Seal Verification & Vault Camera Check',
            hi: '१. लेड सील की प्रामाणिकता एवं सी.सी.टी.वी. रिकॉर्डिंग पुष्टि',
            bn: '১. লেড সিল নম্বর যাচাই ও সিসিটিভি সক্রিয়তা নিশ্চিতকরণ',
            sa: '१. मुद्रा-परीक्षणं तथा दूरचित्रवाहिनी-सक्रियता-जांचः',
          },
          description: {
            en: 'Inspect the physical lead seal of the Hundi box. Verify that the seal number matches the dispatch register and CCTV is recording.',
            hi: 'HUNDI दानपात्र की लेड सील का निरीक्षण करें। सुनिश्चित करें कि सील नंबर रजिस्टर से मेल खाता है और सीसीटीवी चालू है।',
            bn: 'HUNDI বক্সের সীলের নম্বর রেজিস্টারের সাথে মিলিয়ে দেখুন এবং অডিট সিসিটিভিতে রেকর্ড হচ্ছে কিনা নিশ্চিত করুন।',
            sa: 'दानपेटिकायाः मुद्रा-संख्यां पञ्जिकायां परीक्ष्य कार्यं प्रारभध्वम्।',
          },
          actionRequired: {
            en: 'Check tamper-evident seal and confirm Keyholder 1 PIN.',
            hi: 'सील अखंडता जाँचें और कीहोल्डर १ का पिन दर्ज करें।',
            bn: 'সিল অক্ষত আছে কিনা দেখে ১ম পিন দিন।',
            sa: 'प्रथम-कुञ्चिकायाः गुह्यसङ्केतं लिखन्तु।',
          },
          highlightedTerms: ['HUNDI', 'GOLAK'],
          complianceTag: 'Devaswom Dual Custody Protocol',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Denomination-Wise Currency & Bullion Tally',
            hi: '२. नोट-सिक्का एवं स्वर्ण-रजत मूल्यवर्ग वार गणना',
            bn: '২. নোট, কয়েন ও সোনা-রুপার সুনির্দিষ্ট তালিকাভুক্তিকরণ',
            sa: '२. रूप्यक-स्वर्ण-रजत-गणना-क्रमः',
          },
          description: {
            en: 'Tally ₹500, ₹200, ₹100, ₹50, ₹20, ₹10 notes, all RBI coins, foreign notes, and gold/silver offerings with touch-optimized bundles.',
            hi: 'सभी भारतीय नोट, सिक्के, विदेशी मुद्रा एवं सोने-चांदी के आभूषणों की सटीक गणना करें।',
            bn: 'প্রতিটি মানের নোট ও কয়েন গণনা করে ডিজিটাল কাউন্টারে এন্ট্রি করুন।',
            sa: 'सर्वासां मुद्राणां तोलनं गणनां च संपादयन्तु।',
          },
          actionRequired: {
            en: 'Enter bundles in denomination matrix.',
            hi: 'मूल्यवर्ग सारणी में बंडल संख्या दर्ज करें।',
            bn: 'গণনা ম্যাট্রিক্সে সংখ্যা লিখুন।',
            sa: 'पत्रमुद्राणां संख्यां लिखन्तु।',
          },
          highlightedTerms: ['HUNDI'],
          complianceTag: 'RBI Currency Sorting Standard',
        },
        {
          stepNumber: 3,
          title: {
            en: '3. Dual Co-Signing & Auto-Treasury Posting',
            hi: '३. सह-हस्ताक्षर एवं केंद्रीय ट्रेजरी में प्रविष्टि',
            bn: '৩. দ্বৈত স্বাক্ষর ও মূল কোষাগারে অটো-পোস্টিং',
            sa: '३. सह-हस्ताक्षरम् तथा कोष-संयोजनम्',
          },
          description: {
            en: 'Both custodians co-sign the attestation voucher. Click "Co-Sign & Post to Treasury" to sync income under Section 115BBC audit.',
            hi: 'दोनों अभिरक्षक प्रमाणपत्र पर सह-हस्ताक्षर करें। "Post to Treasury" दबाकर राशि मुख्य लेजर में जोड़ें।',
            bn: 'উভয় রক্ষক সত্যায়নে স্বাক্ষর করে ট্রেজারিতে জমা নিশ্চিত করুন।',
            sa: 'उभौ कुञ्चिकाधारकौ हस्ताक्षरेण प्रमाणीकृत्य कोषपुस्तके योजयेताम्।',
          },
          actionRequired: {
            en: 'Generate and print the bilingual audit voucher.',
            hi: 'ऑडिट प्रमाणक मुद्रित करें।',
            bn: 'অডিট ভাউচার প্রিন্ট করুন।',
            sa: 'परीक्षणपत्रं मुद्रयन्तु।',
          },
          highlightedTerms: ['CORPUS_FUND', 'HUNDI'],
          complianceTag: 'Income Tax Sec 115BBC Compliance',
        },
      ],
      checklistItems: [
        {
          en: 'Lead seal serial number matched with Register before unlocking',
          hi: 'खोलने से पूर्व लेड सील सीरियल नंबर का रजिस्टर से मिलान पूर्ण',
          bn: 'খোলার আগে সিলের নম্বর রেজিস্টারের সাথে মিলিয়ে নেওয়া হয়েছে',
          sa: 'मुद्रायाः क्रमसंख्या पञ्जिकायां संसत्यापिता',
        },
        {
          en: 'Dual Custodian PINs entered independently without sharing credentials',
          hi: 'दोनों अभिरक्षकों ने स्वतंत्र रूप से गोपनीय पिन दर्ज किया',
          bn: 'উভয় অভিভাবক আলাদাভাবে নিজ নিজ পিন প্রদান করেছেন',
          sa: 'उभाभ्यां विश्वस्ताभ्यां पृथक्-पृथक् गुह्यसङ्केतः प्रविष्टः',
        },
        {
          en: 'Physical currency sorted, counted, and bundled under CCTV',
          hi: 'नगदी की छँटाई एवं बंडलिंग पूरी तरह सीसीटीवी की निगरानी में संपन्न',
          bn: 'সিসিটিভি ক্যামেরার অধীনে নগদ টাকা গণনা ও বান্ডিল করা হয়েছে',
          sa: 'सर्वं धनं दूरचित्रवाहिनी-दृष्टौ एव गणनम् सम्पन्नम्',
        },
        {
          en: 'Printable audit voucher signed by both keyholders and filed',
          hi: 'मुद्रित ऑडिट प्रमाणक पर दोनों कीहोल्डर्स के हस्ताक्षर सुरक्षित',
          bn: 'মুদ্রিত অডিট ভাউচারে দুই রক্ষকের স্বাক্ষর সম্পন্ন',
          sa: 'मुद्रित-प्रमाणपत्रे उभयोः हस्ताक्षरम् सुरक्षितम्',
        },
      ],
    },
    TRUSTEE: {
      moduleId: 'HUNDI_VAULT',
      moduleName: {
        en: 'Hundi & Golak Dual Custody Counting & Audit Vault',
        hi: 'हुंडी एवं गोलक दोहरी अभिरक्षा गणना व ऑडिट डेस्क',
        bn: 'হুন্ডি ও গোলক দ্বৈত-তত্ত্বাবধান গণনা ও অডিট ডেস্ক',
        sa: 'दानपेटिका-द्विकुञ्चिका-गणना-परीक्षण-विभागः',
      },
      role: 'TRUSTEE',
      roleLabel: {
        en: 'Trustee Witness / Managing Custodian',
        hi: 'न्यासी साक्षी / प्रबंधकीय अभिरक्षक',
        bn: 'ট্রাস্টি সাক্ষী / পরিচালন রক্ষক',
        sa: 'न्यासी-साक्षी / प्रबन्धक-संरक्षकः',
      },
      roleSummary: {
        en: 'Serves as secondary custodial witness with Key 2. Exercises fiduciary oversight to prevent diversion of devotee offerings and authorizes bullion pouch seals.',
        hi: 'कुंजी २ के साथ द्वितीय साक्षी के रूप में सेवा। भक्तों के गुप्त दान की शुचिता एवं स्वर्ण-रजत आभूषणों की सुरक्षा सुनिश्चित करना।',
        bn: 'দ্বিতীয় অভিভাবক হিসাবে তদারকি, দানকৃত অলঙ্কারাদির সুরক্ষা এবং সীলমোহরের বৈধতা নিশ্চিতকরণ।',
        sa: 'द्वितीयकुञ्चिका-धारकरूपेण सर्वकार्याणां प्रत्यक्षदर्शनं संरक्षणं च न्यासिनां धर्मः।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Vault Witness Authorization (Key 2 PIN)',
            hi: '१. वॉल्ट साक्षी प्रमाणीकरण (कुंजी २ पिन)',
            bn: '১. ভল্ট সাক্ষী অনুমোদন (২য় কী পিন)',
            sa: '१. द्वितीयकुञ्चिकायाः साक्ष्याङ्कनम्',
          },
          description: {
            en: 'Verify that the Hundi box was transported intact. Input Trustee Key 2 PIN to unlock the counting table in the secure CCTV room.',
            hi: 'पुष्टि करें कि HUNDI पात्र अखंड आया है। सुरक्षित कक्ष में टेबल खोलने के लिए कुंजी २ पिन दर्ज करें।',
            bn: 'HUNDI অক্ষত অবস্থায় আনা হয়েছে দেখে ২য় পিন প্রদান করুন।',
            sa: 'दानपेटिका सुरक्षिता अस्ति इति ज्ञात्वा द्वितीय-पिन-सङ्ख्यां योजयन्तु।',
          },
          actionRequired: {
            en: 'Authorize Keyholder 2 credentials.',
            hi: 'कुंजी २ का अधिकार सत्यापित करें।',
            bn: '২য় চাবির অনুমোদন দিন।',
            sa: 'द्वितीय-अधिकारं प्रमाणीकुर्वन्तु।',
          },
          highlightedTerms: ['HUNDI'],
          complianceTag: 'Trust Deed Fiduciary Clause',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Bullion & Precious Items Inspection',
            hi: '२. स्वर्ण-रजत एवं कीमती आभूषणों का भौतिक निरीक्षण',
            bn: '২. স্বর্ণ ও রৌপ্য অলঙ্কারের প্রত্যক্ষ ওজন ও যাচাই',
            sa: '२. सुवर्ण-रौप्य-आभरणानां प्रत्यक्ष-परीक्षणम्',
          },
          description: {
            en: 'Witness digital weighing of gold chains, silver coins, and loose gemstones. Ensure precious items are packed in tamper-evident sealed pouches for RATNA_BHANDAR transfer.',
            hi: 'सोने की चेन, चांदी के छत्र व सिक्कों का वजन अपनी उपस्थिति में करवाएं और सील बंद थैली में RATNA_BHANDAR हेतु रखें।',
            bn: 'সোনার হার ও রুপার সামগ্রী নিজের সামনে মেপে RATNA_BHANDAR ভাণ্ডারে স্থানান্তরের জন্য সীল করুন।',
            sa: 'सुवर्णाभरणानां तोलनं प्रत्यक्षं दृष्ट्वा RATNA_BHANDAR विभागार्थं मुद्रां कुर्वन्तु।',
          },
          actionRequired: {
            en: 'Review bullion weight in Tab 2.',
            hi: 'स्वर्ण-रजत वजन की पुष्टि करें।',
            bn: 'অলঙ্কারের ওজন নিশ্চিত করুন।',
            sa: 'स्वर्णभारं पश्यन्तु।',
          },
          highlightedTerms: ['RATNA_BHANDAR', 'HUNDI'],
          complianceTag: 'Sacred Bullion Custody Code',
        },
      ],
      checklistItems: [
        {
          en: 'Personal physical presence maintained throughout the entire counting session',
          hi: 'पूरी गणना प्रक्रिया के दौरान व्यक्तिगत भौतिक उपस्थिति सुनिश्चित',
          bn: 'পুরো গণনা প্রক্রিয়া চলাকালীন ব্যক্তিগত শারীরিক উপস্থিতি নিশ্চিত',
          sa: 'सम्पूर्ण-गणना-काले प्रत्यक्ष-उपस्थितिः कृता',
        },
        {
          en: 'Bullion items sealed in tamper-proof bags for transfer to Ratna Bhandar',
          hi: 'रत्न भंडार स्थानांतरण हेतु आभूषण छेड़छाड़-रोधी बैग में सीलबंद',
          bn: 'রত্ন ভাণ্ডারে স্থানান্তরের জন্য মূল্যবান দ্রব্য সীল করা হয়েছে',
          sa: 'रत्नभाण्डागारे प्रेषणाय आभरणानि मुद्रित-स्यूते सुरक्षितानि',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // MODULE: RATNA_BHANDAR
  // --------------------------------------------------------------------------
  RATNA_BHANDAR: {
    TRUSTEE: {
      moduleId: 'RATNA_BHANDAR',
      moduleName: {
        en: 'Ratna Bhandar (Sacred Assets, Deity Ornaments & Bullion Vault)',
        hi: 'रत्न भंडार (भगवान के आभूषण, विग्रह एवं बहुमूल्य संपत्ति डेस्क)',
        bn: 'রত্ন ভাণ্ডার (দেববিগ্রহের অলঙ্কার, অষ্টধাতু ও অমূল্য সম্পদ ডেস্ক)',
        sa: 'रत्नभाण्डागारम् (दिव्याभरणाष्टधातुविग्रहकोषः)',
      },
      role: 'TRUSTEE',
      roleLabel: {
        en: 'Custodian Trustee / Board Custody Lead',
        hi: 'संरक्षक न्यासी / बोर्ड अभिरक्षा प्रमुख',
        bn: 'সংরক্ষক ট্রাস্টি / বোর্ড অভিভাবক প্রধান',
        sa: 'संरक्षक-न्यासी / पञ्चप्रमुखः',
      },
      roleSummary: {
        en: 'Has primary custody of sanctum jewels, crowns, and antique vigrahas. Conducts mandatory periodic physical audits, weight verifications, and authorizes movements between Garbhagriha, Strong Room, and Bank Locker.',
        hi: 'देवताओं के मुकुट, स्वर्ण हार व विग्रहों की सर्वोच्च अभिरक्षा। अनिवार्य भौतिक ऑडिट, वजन सत्यापन तथा गर्भगृह-स्ट्रॉन्ग रूम-बैंक लॉकर स्थानांतरण का अनुमोदन।',
        bn: 'শ্রীবিগ্রহের স্বর্ণমুকুট, অলঙ্কার ও অষ্টধাতু মূর্তির সর্বোচ্চ তত্ত্বাবধান। নিয়মিত শারীরিক অডিট, ওজন পরিমাপ এবং স্থান পরিবর্তনের অনুমোদনকারী।',
        sa: 'भगवतः सुवर्णमुकुट-दिव्याभरणानां विग्रहाणां च प्रधान-संरक्षणम्। नियतकालिक-भौतिक-तोलनं तथा स्थानपरिवर्तन-स्वीकारः।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Calibrated Physical Weighing & Gross vs Net Metal Verification',
            hi: '१. कैलिब्रेटेड डिजिटल तराजू पर वास्तविक तोलन एवं सकल-शुद्ध धातु मिलान',
            bn: '১. ডিজিটাল স্কেলে বাস্তব ওজন ও খাঁটি ধাতুর অনুপাত যাচাই',
            sa: '१. सूक्ष्म-मानदण्डेन वास्तविक-तोलनं धातु-शुद्धता-परीक्षणं च',
          },
          description: {
            en: 'Weigh each sacred asset on a certified dual-range digital scale. Compare Gross Weight and Net Precious Metal Weight against the master RATNA_BHANDAR register.',
            hi: 'प्रत्येक आभूषण व विग्रह को प्रमाणित डिजिटल तराजू पर तौलें। सकल वजन और शुद्ध धातु वजन की तुलना RATNA_BHANDAR रजिस्टर से करें।',
            bn: 'প্রতিটি অলঙ্কার ও বিগ্রহ নিখুঁত ওজন মাপনীতে মেপে RATNA_BHANDAR রেজিস্টারের সাথে মিলিয়ে দেখুন।',
            sa: 'प्रतिवस्तु सूक्ष्म-मानदण्डेन तोलयित्वा RATNA_BHANDAR पञ्जिकया सह मिलयन्तु।',
          },
          actionRequired: {
            en: 'Record verified gross and net weights in grams.',
            hi: 'सत्यापित वजन ग्राम में दर्ज करें।',
            bn: 'যাচাইকৃত ওজন গ্রামে লিখুন।',
            sa: 'सत्यापित-भारं लिखन्तु।',
          },
          highlightedTerms: ['RATNA_BHANDAR'],
          complianceTag: 'Trust Act Sec 36 Asset Safety',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Trustee PIN Authentication for Audit Sign-Off',
            hi: '२. ऑडिट समापन हेतु न्यासी गोपनीय पिन प्रमाणीकरण',
            bn: '২. অডিট চূড়ান্তকরণে ট্রাস্টি গোপন পিন যাচাই',
            sa: '२. परीक्षण-समाप्तये न्यासी-गुह्यसङ्केत-प्रवेशः',
          },
          description: {
            en: 'Click "Perform Physical Audit" on the asset card. Enter your 4-digit Trustee PIN to digitally sign the affidavit confirming you inspected and weighed the item today.',
            hi: 'एसेट कार्ड पर "Perform Physical Audit" दबाएँ। आज आपने इसे स्वयं देखा व तौला है, इस आशय का शपथ पत्र पिन द्वारा प्रमाणित करें।',
            bn: '"Perform Physical Audit" এ ক্লিক করে ৪-সংখ্যার পিন দিয়ে প্রত্যয়ন করুন যে আপনি আজ এটি সচক্ষে দেখেছেন ও মেপেছেন।',
            sa: '"Perform Physical Audit" क्लिक् कृत्वा चतुर्अङ्कीयं पिन-सङ्ख्यां योजयित्वा शपथपत्रं प्रमाणीकुर्वन्तु।',
          },
          actionRequired: {
            en: 'Enter Trustee PIN and accept sworn declaration.',
            hi: 'पिन दर्ज कर घोषणा स्वीकार करें।',
            bn: 'পিন দিয়ে ঘোষণা গ্রহণ করুন।',
            sa: 'सङ्केतं दत्त्वा प्रतिज्ञां स्वीकुर्वन्तु।',
          },
          highlightedTerms: ['RATNA_BHANDAR'],
          complianceTag: 'Digital Trust Evidence Code',
        },
        {
          stepNumber: 3,
          title: {
            en: '3. Alankara Movement Protocol (Sanctum vs Safe vs Bank Locker)',
            hi: '३. श्रृंगार स्थानांतरण नियम (गर्भगृह, स्ट्रॉन्ग रूम व बैंक लॉकर)',
            bn: '৩. অলঙ্কার স্থানান্তরের বিধি (গর্ভগৃহ, স্ট্রং রুম ও ব্যাংক লকার)',
            sa: '३. आभरण-स्थानान्तरण-नियमः (गर्भगृह-सुरक्षाकक्ष-कोष-स्थानम्)',
          },
          description: {
            en: 'During major festivals (Janmashtami, Navratri, Shivratri), authorize movement of Suvarna Mukut from Strong Room to Garbhagriha Alankara, logging escort security details.',
            hi: 'प्रमुख उत्सवों में स्ट्रॉन्ग रूम से गर्भगृह में स्वर्ण मुकुट आदि लाने हेतु सुरक्षा विवरण सहित स्थानांतरण लॉग अद्यतन करें।',
            bn: 'মহোৎসবে স্ট্রং রুম থেকে গর্ভগৃহে বিগ্রহের অলঙ্কার আনয়নের সময় অবস্থান আপডেট করুন।',
            sa: 'उत्सवेषु सुरक्षाकक्षतः गर्भगृहे आभरणानयने विवरणं पञ्जीकुर्वन्तु।',
          },
          actionRequired: {
            en: 'Update current location badge in asset record.',
            hi: 'स्थान बैज अद्यतन करें।',
            bn: 'অবস্থান আপডেট করুন।',
            sa: 'स्थान-विवरणं परिवर्तयन्तु।',
          },
          highlightedTerms: ['RATNA_BHANDAR'],
          complianceTag: 'Sanctum Security Protocol',
        },
      ],
      checklistItems: [
        {
          en: 'Calibrated jewelers scale zeroed and tested with standard calibration weights',
          hi: 'स्वर्ण तराजू शून्य पर सेट एवं मानक वजन से पूर्व-परीक्षित',
          bn: 'ডিজিটাল স্বর্ণ পরিমাপক স্কেল প্রমিত বাটখারা দিয়ে পরীক্ষা করা হয়েছে',
          sa: 'मानदण्डः शुद्धतया शून्यस्थाने परीक्षितः',
        },
        {
          en: 'Net precious metal weight recorded separately from gemstones and lac',
          hi: 'रत्नों एवं लाख के वजन को घटाकर केवल शुद्ध धातु का भार दर्ज',
          bn: 'রত্ন ও ভেতরের লাক্ষার ওজন বাদ দিয়ে প্রকৃত ধাতুর ওজন লিপিবদ্ধ',
          sa: 'रत्नानि विहाय केवलं शुद्ध-धातु-भारः पृथक् लिखितः',
        },
        {
          en: 'Physical audit confirmed with personal Trustee PIN entry',
          hi: 'व्यक्तिगत न्यासी पिन दर्ज कर भौतिक ऑडिट की पुष्टि संपन्न',
          bn: 'ব্যক্তিগত ট্রাস্টি পিন দিয়ে সশরীরে উপস্থিতির অডিট সম্পন্ন',
          sa: 'व्यक्तिगत-पिन-सङ्ख्यया वास्तविक-परीक्षणं प्रमाणीकृतम्',
        },
        {
          en: 'All custody movements between Sanctum, Safe, and Bank Locker logged',
          hi: 'गर्भगृह, तिजोरी और बैंक लॉकर के मध्य आभूषणों का आवागमन पूर्णतः दर्ज',
          bn: 'গর্ভগৃহ, সেফ ও ব্যাংক লকারের মধ্যে যেকোনো স্থানান্তরের পূর্ণ বিবরণ সংরক্ষিত',
          sa: 'गर्भगृह-तिजोरी-बैंकस्थानानां मध्ये गमनागमनं पञ्जीकृतम्',
        },
      ],
    },
    ACCOUNTANT: {
      moduleId: 'RATNA_BHANDAR',
      moduleName: {
        en: 'Ratna Bhandar (Sacred Assets, Deity Ornaments & Bullion Vault)',
        hi: 'रत्न भंडार (भगवान के आभूषण, विग्रह एवं बहुमूल्य संपत्ति डेस्क)',
        bn: 'রত্ন ভাণ্ডার (দেববিগ্রহের অলঙ্কার, অষ্টধাতু ও অমূল্য সম্পদ ডেস্ক)',
        sa: 'रत्नभाण्डागारम् (दिव्याभरणाष्टधातुविग्रहकोषः)',
      },
      role: 'ACCOUNTANT',
      roleLabel: {
        en: 'Trust Accountant / Asset Registrar',
        hi: 'ट्रस्ट लेखाकार / संपत्ति पंजीयक',
        bn: 'ট্রাস্ট হিসাবরক্ষক / সম্পদ নিবন্ধক',
        sa: 'न्यास-लेखाकारः / सम्पत्ति-पञ्जीयकः',
      },
      roleSummary: {
        en: 'Maintains the permanent fixed asset ledger for precious metals and stones, reconciles book value with prevailing bullion market rates, and updates CBDT Form 10BD asset registers.',
        hi: 'बहुमूल्य धातु व रत्नों का स्थायी बहीखाता रखना, बाजार भाव से मूल्यांकन मिलाना एवं फॉर्म 10BD में संपत्ति विवरण का संधारण।',
        bn: 'মূল্যবান ধাতু ও রত্নালঙ্কারের স্থায়ী হিসাব খতিয়ান পরিচালনা এবং সিবিডিটি ফর্ম ১০বিডি অনুদান রেজিস্ট্রির সাথে সমন্বয়।',
        sa: 'स्थिर-सम्पत्ति-पञ्जिकायाः संरक्षणं, बाजारमूल्य-समीक्षा तथा आयकर-विवरणी-संयोजनम्।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Reconcile Book Valuation with Daily Metal Rates',
            hi: '१. दैनिक सर्राफा बाजार भाव से बहीखाता मूल्यांकन का मिलान',
            bn: '১. দৈনিক বাজারদর অনুযায়ী স্বর্ণ ও রৌপ্য অলঙ্কারের আনুমানিক মূল্য সমন্বয়',
            sa: '१. प्रतिदिनस्य स्वर्ण-रौप्य-मूल्येन सम्पत्ति-मूल्य-समीक्षणम्',
          },
          description: {
            en: 'Calculate current asset market value using active 24K/22K gold and fine silver rates while maintaining historical donation book cost.',
            hi: '२४ कैरेट व २२ कैरेट सोने तथा चांदी के चालू भाव अनुसार एसेट्स का बाजार मूल्य आकलित करें।',
            bn: 'চলতি বাজার দর হিসাব করে ট্রাস্টের ব্যালেন্স শীটের জন্য সম্পদের সঠিক মূল্য নির্ধারণ করুন।',
            sa: 'स्वर्णस्य रौप्यस्य च चालू-मूल्यम् अनुसृत्य सम्पत्ति-मूल्यं निर्धारयन्तु।',
          },
          actionRequired: {
            en: 'Review top metrics in Ratna Bhandar dashboard.',
            hi: 'डैशबोर्ड में कुल वजन व मूल्यांकन देखें।',
            bn: 'ড্যাশবোর্ডে মোট ওজন ও মূল্য পর্যবেক্ষণ করুন।',
            sa: 'डैशबोर्ड-भागे कुल-भारं मूल्यं च पश्यन्तु।',
          },
          highlightedTerms: ['RATNA_BHANDAR', 'CORPUS_FUND'],
          complianceTag: 'Institute of Chartered Accountants (ICAI) Trust Guidance',
        },
      ],
      checklistItems: [
        {
          en: 'Asset register tags matched with physical engravings / tamper tags',
          hi: 'एसेट टैग का भौतिक आभूषणों के टैग से मिलान पूर्ण',
          bn: 'এসেট রেজিস্টারের ট্যাগ নম্বরের সাথে ফিজিক্যাল ট্যাগের মিল নিশ্চিত',
          sa: 'पञ्जिका-संख्यायाः वास्तविक-टैग-संकेतेन सह मिलनम्',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // MODULE: QUICK_CHANDA_POS (Rapid Temple Counter POS)
  // --------------------------------------------------------------------------
  QUICK_CHANDA_POS: {
    SEVADAR: {
      moduleId: 'QUICK_CHANDA_POS',
      moduleName: {
        en: 'Quick Chanda Counter POS & 80G Receipting',
        hi: 'त्वरित चंदा काउंटर पी.ओ.एस. एवं 80G रसीद',
        bn: 'কুইক চাঁদা কাউন্টার পিওএস ও ৮০জি রসিদ প্রদান',
        sa: 'त्वरित-चन्दा-काउण्टर-पीओएस् तथा ८०G रसीद-विभागः',
      },
      role: 'SEVADAR',
      roleLabel: {
        en: 'Counter Sevadar / POS Cashier',
        hi: 'काउंटर सेवादार / पी.ओ.एस. खजांची',
        bn: 'কাউন্টার সেবাদার / পিওএস ক্যাশিয়ার',
        sa: 'काउण्टर-सेवादारः / पीओएस-कोषाध्यक्षः',
      },
      roleSummary: {
        en: 'Rapidly accepts voluntary CHANDA offerings at temple counters, records devotee SANKALP, collects Cash/UPI/Card payments, and prints thermal 80G receipts.',
        hi: 'मंदिर काउंटर पर भक्तों से स्वेच्छापूर्वक CHANDA स्वीकारना, SANKALP विवरण दर्ज करना, नकद/UPI/कार्ड भुगतान लेना एवं 80G रसीद तत्काल मुद्रित करना।',
        bn: 'মন্দির কাউন্টারে ভক্তদের থেকে স্বতঃস্ফূর্ত CHANDA গ্রহণ, ভক্তের SANKALP নথিভুক্তকরণ, নগদ/ইউপিআই পেমেন্ট গ্রহণ ও তাৎক্ষণিক ৮০জি রসিদ প্রদান।',
        sa: 'मन्दिरकाउण्टरे भक्तैः प्रदत्तं CHANDA स्वीकृत्य, SANKALP प्रतिज्ञां पञ्जीकृत्य, नगद/UPI द्वारा धनं स्वीकृत्य ८०G रसीदपत्रं मुद्रयितुम्।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Fast Devotee Lookup via Mobile',
            hi: '१. मोबाइल नंबर से त्वरित श्रद्धालु खोज',
            bn: '১. মোবাইল নম্বর দিয়ে দ্রুত ভক্ত সন্ধান',
            sa: '१. दूरभाषसंख्यया भक्तस्य त्वरित-अन्वेषणम्',
          },
          description: {
            en: 'Enter 10-digit mobile number into the lookup field. Existing devotee profiles auto-fill name, gotra, and PAN for 80G tax exemptions.',
            hi: 'श्रद्धालु का १० अंकों का मोबाइल नंबर दर्ज करें। पंजीकृत भक्त का नाम, गोत्र और 80G हेतु पैन नंबर स्वतः भर जाएगा।',
            bn: 'ভক্তের ১০ সংখ্যার মোবাইল নম্বর লিখুন। পূর্বনিবন্ধিত ভক্তদের নাম, গোত্র ও ৮০জি করমুক্তির জন্য প্যান নম্বর স্বয়ংক্রিয় পূরণ হবে।',
            sa: 'दशाङ्क-दूरभाषसंख्यां प्रविशन्तु। पूर्वपञ्जीकृत-भक्तस्य नाम, गोत्रं, ८०G कृते PAN संख्या च स्वतः समागमिष्यति।',
          },
          actionRequired: {
            en: 'Type 10 digits in devotee search input; or register new devotee in seconds.',
            hi: 'सर्च बार में १० अंक लिखें या नए भक्त का नाम तुरंत भरें।',
            bn: '১০ সংখ্যার মোবাইল টাইপ করুন বা নতুন ভক্তের তথ্য লিখুন।',
            sa: 'दशाङ्कसंख्यां लिखन्तु उत नूतनं भक्तं योजयन्तु।',
          },
          highlightedTerms: ['CHANDA', 'SANKALP'],
          complianceTag: 'CBDT Form 10BD & Rule 18AB',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Select Seva Items & Chanda Amount',
            hi: '२. सेवा मद एवं चंदा राशि चयन',
            bn: '২. সেবা আইটেম ও চাঁদার পরিমাণ নির্বাচন',
            sa: '२. सेवामदानां चन्दा-राशेश्च चयनम्',
          },
          description: {
            en: 'Tap rapid amount presets (₹101, ₹501, ₹1100, ₹5100) or pick items across General Chanda, Annadanam, Goshala Seva, or Puja Booking with consecrated PRASADAM.',
            hi: 'त्वरित राशि बटन (₹101, ₹501, ₹1100, ₹5100) दबाएं या सामान्य चंदा, अन्नदान, गौशाला सेवा अथवा PRASADAM युक्त पूजा बुकिंग चुनें।',
            bn: 'দ্রুত অঙ্কের বোতাম (₹১০১, ₹৫০১, ₹১১০০, ₹৫১০০) চাপুন অথবা অন্নদান, গোশালা বা PRASADAM সহ পূজা বুকিং কার্টে যোগ করুন।',
            sa: 'त्वरित-राशि-पिञ्जं (₹101, ₹501, ₹1100, ₹5100) नोदयन्तु अथवा सामान्य-चन्दा, अन्नदानं, गोशाला-सेवा, PRASADAM युक्त-पूजां वा चिनुत।',
          },
          actionRequired: {
            en: 'Click catalog cards or quick amount chips to build donation cart.',
            hi: 'कैटलॉग कार्ड अथवा त्वरित राशि बटन पर क्लिक कर कार्ट तैयार करें।',
            bn: 'ক্যাটালগ কার্ড বা দ্রুত বাটনে ক্লিক করে কার্ট তৈরি করুন।',
            sa: 'कार्ड-भागे क्लिक कृत्वा दान-सूचीं रचयन्तु।',
          },
          highlightedTerms: ['CHANDA', 'PRASADAM', 'SANKALP'],
          complianceTag: 'Mandir Seva Rate Schedule & Trust By-laws',
        },
        {
          stepNumber: 3,
          title: {
            en: '3. Collect Payment (Cash / UPI QR / Card)',
            hi: '३. भुगतान संग्रह (नकद / UPI क्यूआर / कार्ड)',
            bn: '৩. অর্থ পরিশোধ গ্রহণ (নগদ / ইউপিআই কিউআর / কার্ড)',
            sa: '३. धनस्वीकरणम् (नगद / UPI / कार्ड)',
          },
          description: {
            en: 'Select devotee preferred payment mode. For UPI, present the dynamic Mandir merchant QR code; for Cash, collect and verify exact tender.',
            hi: 'श्रद्धालु के पसंदीदा भुगतान माध्यम का चयन करें। UPI हेतु मंदिर मर्चेंट क्यूआर दिखाएं; नकद में सही मुद्रा प्राप्त करें।',
            bn: 'ভক্তের সুবিধাজনক পেমেন্ট মোড বেছে নিন। ইউপিআই-এর জন্য কিউআর স্ক্যান করান এবং নগদের ক্ষেত্রে সঠিক নোট বুঝে নিন।',
            sa: 'भक्तस्य इच्छानुसारं माध्यमं चिनुत। UPI कृते QR कोडं दर्शयन्तु, नगदराशौ मुद्रां परीक्ष्य स्वीकुर्वन्तु।',
          },
          actionRequired: {
            en: 'Tap Cash, UPI, or Card mode on tablet interface.',
            hi: 'टैबलेट स्क्रीन पर कैश, यूपीआई अथवा कार्ड चुनें।',
            bn: 'স্ক্রিনে ক্যাশ, ইউপিআই বা কার্ড বোতাম চাপুন।',
            sa: 'टैबलेट-पटले नगद-UPI-कार्ड विकल्पं चिनुत।',
          },
          highlightedTerms: ['CHANDA'],
          complianceTag: 'Reserve Bank of India Merchant Guidelines',
        },
        {
          stepNumber: 4,
          title: {
            en: '4. Instant Thermal 80G Receipt & Sankalp Slip',
            hi: '४. तत्काल थर्मल 80G रसीद एवं संकल्प पर्ची मुद्रण',
            bn: '৪. তাৎক্ষণিক থার্মাল ৮০জি রসিদ ও সংকল্প স্লিপ প্রিন্ট',
            sa: '४. त्वरित-थर्मल-८०G-रसीद तथा सङ्कल्प-पत्र-मुद्रणम्',
          },
          description: {
            en: 'Execute checkout to automatically post to temple treasury ledger, generate official CBDT 80G URN, and trigger high-speed thermal printing of the donation voucher.',
            hi: 'चेकआउट पूरा करते ही मंदिर मुख्य बहीखाते में प्रविष्टि हो जाएगी, 80G URN उत्पन्न होगा और थर्मल रसीद प्रिंट हो जाएगी।',
            bn: 'চেকআউট বাটনে চাপামাত্রই মন্দিরের প্রধান কোষাগারে টাকা যুক্ত হবে, ৮০জি রসিদ তৈরি হবে এবং থার্মাল প্রিন্টার থেকে প্রিন্ট বের হবে।',
            sa: 'चेकआउट-करणेन मन्दिर-कोषे प्रविष्टिः भवति, ८०G URN प्राप्यते, थर्मल-रसीदपत्रं च मुद्रितं भवति।',
          },
          actionRequired: {
            en: 'Click "Process & Print Receipt" and hand over printed thermal voucher to the devotee.',
            hi: '"Process & Print Receipt" बटन दबाएं और मुद्रित पर्ची श्रद्धालु को ससम्मान सौंपें।',
            bn: '"Process & Print Receipt" বোতাম চেপে প্রিন্ট কপিটি ভক্তের হাতে তুলে দিন।',
            sa: '"Process & Print Receipt" नोदयित्वा मुद्रितपत्रं भक्ताय सस्नेहं समर्पयन्तु।',
          },
          highlightedTerms: ['CHANDA', 'SANKALP'],
          complianceTag: 'Income Tax Act Sec 80G(5)(iv) & Form 10BD Real-Time Sync',
        },
      ],
      checklistItems: [
        {
          en: 'Devotee mobile entered and PAN validated if 80G tax receipt requested',
          hi: '80G रसीद हेतु श्रद्धालु का मोबाइल नंबर एवं वैध पैन नंबर दर्ज',
          bn: '৮০জি করমুক্তির জন্য ভক্তের সঠিক মোবাইল ও প্যান নম্বর যাচাই সম্পন্ন',
          sa: '८०G कृते भक्तस्य दूरभाषसंख्या तथा वैध-PAN संख्या निर्धारिता',
        },
        {
          en: 'Correct Seva & Chanda category selected with exact tender received',
          hi: 'सही सेवा एवं चंदा मद चयनित तथा पूर्ण राशि प्राप्त',
          bn: 'সঠিক সেবা ও চাঁদার ধরণ নির্বাচন এবং সম্পূর্ণ অর্থ গ্রহণ নিশ্চিত',
          sa: 'उचित-सेवा-वर्गस्य चयनं तथा सम्पूर्ण-धनस्वीकरणं सुनिश्चितम्',
        },
        {
          en: 'Thermal printer online and receipt handed over with sacred Prasad blessing',
          hi: 'थर्मल प्रिंटर सक्रिय एवं रसीद श्रद्धालु को प्रसाद आशीर्वाद सहित समर्पित',
          bn: 'থার্মাল প্রিন্টার সচল এবং ভক্তকে প্রসাদ আশীর্বাদসহ রসিদ প্রদান',
          sa: 'थर्मल-मुद्रकयन्त्रं सक्रियं तथा सङ्कल्प-रसीदपत्रं भक्ताय समर्पितम्',
        },
      ],
    },
    ACCOUNTANT: {
      moduleId: 'QUICK_CHANDA_POS',
      moduleName: {
        en: 'Quick Chanda Counter POS & 80G Receipting',
        hi: 'त्वरित चंदा काउंटर पी.ओ.एस. एवं 80G रसीद',
        bn: 'কুইক চাঁদা কাউন্টার পিওএস ও ৮০জি রসিদ প্রদান',
        sa: 'त्वरित-चन्दा-काउण्टर-पीओएस् तथा ८०G रसीद-विभागः',
      },
      role: 'ACCOUNTANT',
      roleLabel: {
        en: 'Chief Accountant / Revenue Auditor',
        hi: 'मुख्य लेखाकार / राजस्व लेखापरीक्षक',
        bn: 'প্রধান হিসাবরক্ষক / রাজস্ব নিরীক্ষক',
        sa: 'मुख्य-लेखाकारः / राजस्व-परीक्षकः',
      },
      roleSummary: {
        en: 'Monitors real-time counter collections, verifies daily Cash/UPI reconciliations, audits 80G PAN compliance, and ensures automated ledger posting into Treasury.',
        hi: 'काउंटर संग्रह का वास्तविक समय में निरीक्षण, दैनिक नकद व यूपीआई समाधान, 80G पैन अनुपालन जांच एवं मुख्य बहीखाता समन्वय।',
        bn: 'কাউন্টার সংগ্রহের রিয়েল-টাইম পর্যবেক্ষণ, দৈনিক ক্যাশ ও ইউপিআই সমন্বয়, ৮০জি প্যান যাচাই এবং মূল খতিয়ানে স্বয়ংক্রিয় অন্তর্ভুক্তি নিশ্চিতকরণ।',
        sa: 'काउण्टर-सङ्ग्रहस्य समीक्षणं, दैनिक-आय-व्यय-समाधानं, ८०G PAN अनुपालन-परीक्षणं च मुख्यं कर्तव्यम्।',
      },
      steps: [
        {
          stepNumber: 1,
          title: {
            en: '1. Audit Real-Time Treasury Ledger Postings',
            hi: '१. वास्तविक समय ट्रेजरी बहीखाता प्रविष्टियों का सत्यापन',
            bn: '১. রিয়েল-টাইম ট্রেজারি লেজার পোস্টিং নিরীক্ষণ',
            sa: '१. वास्तविक-समय-कोष-प्रविष्टीनां परीक्षणम्',
          },
          description: {
            en: 'Each Quick Chanda transaction automatically creates a tagged income entry in Treasury under CHANDA_COLLECTION with the counter cashier identifier.',
            hi: 'प्रत्येक त्वरित चंदा लेनदेन कोषागार में काउंटर खजांची के पहचान सहित CHANDA_COLLECTION मद में दर्ज होता है।',
            bn: 'প্রতিটি কুইক চাঁদা লেনদেন স্বয়ংক্রিয়ভাবে কাউন্টার ক্যাশিয়ারের তথ্যসহ ট্রেজারিতে জমা হয়।',
            sa: 'प्रत्येकं चन्दा-व्यवहारः कोषागारे CHANDA_COLLECTION रूपेण पञ्जीकृतः भवति।',
          },
          actionRequired: {
            en: 'Review Income entries in Treasury Ledger filtered by POS Counter.',
            hi: 'ट्रेजरी लेजर में पी.ओ.एस. काउंटर फ़िल्टर कर आय प्रविष्टियों की जांच करें।',
            bn: 'ট্রেজারি লেজারে পিওএস কাউন্টারের আয় পর্যবেক্ষণ করুন।',
            sa: 'कोष-पञ्जिकायां पीओएस्-काउण्टर-आयम् अवलोकयन्तु।',
          },
          highlightedTerms: ['CHANDA', 'CORPUS_FUND'],
          complianceTag: 'Income Tax Act Sec 11 & 12',
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Form 10BD Ready 80G Tax Donation Certification',
            hi: '२. फॉर्म 10BD अनुरूप 80G दान प्रमाणीकरण',
            bn: '২. ফর্ম ১০বিডি উপযোগী ৮০জি দান প্রত্যয়ন',
            sa: '२. फॉर्म 10BD अनुगुणं ८०G दान-प्रमाणीकरणम्',
          },
          description: {
            en: 'Ensure donor PAN numbers provided at POS meet CBDT 10-character checksum criteria for hassle-free annual 10BD filing.',
            hi: 'सुनिश्चित करें कि पीओएस पर दिया गया पैन नंबर वैध है ताकि वार्षिक फॉर्म 10BD में कोई बाधा न आए।',
            bn: 'নিশ্চিত করুন কাউন্টারে সংগৃহীত প্যান নম্বরটি সঠিক যাতে বার্ষিক ফর্ম ১০বিডি জমা দিতে কোনো ত্রুটি না হয়।',
            sa: 'वार्षिक-१०BD-विवरण्याः कृते दत्ता PAN संख्या शुद्धा अस्ति वा इति परीक्षन्तु।',
          },
          actionRequired: {
            en: 'Verify 80G donor tax receipts summary at day end.',
            hi: 'दिन के अंत में 80G दान रसीद सारांश की समीक्षा करें।',
            bn: 'দিনশেষে ৮০জি দান রসিদের সারসংক্ষেপ পর্যালোচনা করুন।',
            sa: 'सायं ८०G दान-रसीद-सारांशं परीक्षन्तु।',
          },
          highlightedTerms: ['CHANDA'],
          complianceTag: 'CBDT Form 10BD Statutory Rule 18AB',
        },
      ],
      checklistItems: [
        {
          en: 'POS Cash drawer reconciled with physical currency sweep at close of counter',
          hi: 'काउंटर बंद होने पर पीओएस रोकड़ का भौतिक नकदी से शत-प्रतिशत मिलान',
          bn: 'কাউন্টার বন্ধের সময় ক্যাশ ড্রয়ারের নগদ টাকার শতভাগ সমন্বয় সম্পন্ন',
          sa: 'काउण्टर-समाप्तौ भौतिक-मुद्रायाः सङ्गणक-कोषेण सह शत-प्रतिशतं मिलनम्',
        },
        {
          en: 'Merchant UPI settlement batch matches digital payment receipts',
          hi: 'मर्चेंट यूपीआई सेटलमेंट बैच का डिजिटल रसीदों से मिलान',
          bn: 'মার্চেন্ট ইউপিআই সেটেলমেন্টের সাথে ডিজিটাল পেমেন্ট রসিদের মিল নিশ্চিত',
          sa: 'UPI सेटलमेण्ट्-राशेः डिजिटल-रसीदैः सह समन्वयः सिद्धः',
        },
      ],
    },
  },
  PANCHANG_ENGINE: {
    moduleId: 'PANCHANG_ENGINE',
    moduleTitle: {
      en: 'Vedic Panchang & Muhurat Astrology Engine',
      hi: 'वैदिक पंचांग एवं मुहूर्त ज्योतिष इंजन',
      bn: 'বৈদিক পঞ্জিকা ও মুহূর্ত জ্যোতিষ ইঞ্জিন',
      sa: 'वैदिक-पञ्चाङ्गम् एवं शुभमुहूर्त-यन्त्रम्',
    },
    domain: 'Domain 3: Vedic Rituals & Ephemeris',
    roles: {
      PUROHIT: {
        roleTitle: {
          en: 'Mukhya Purohit & Jyotishacharya',
          hi: 'मुख्य पुरोहित एवं ज्योतिषाचार्य',
          bn: 'প্রধান পুরোহিত ও জ্যোতিষাচার্য',
          sa: 'मुख्यपुरोहितः एवं ज्योतिषाचार्यः',
        },
        primaryObjective: {
          en: 'Determine authentic Surya-Siddhantic planetary timings based on local temple geo-coordinates, evaluate Tithi-Nakshatra sandhi, and strictly shield sacred rites from Rahu Kaal and Yamaganda.',
          hi: 'मंदिर के अक्षांश-देशांतर के आधार पर सूर्य-सिद्धांत सम्मत पंचांग की गणना करना, तिथि-नक्षत्र संधि का परीक्षण करना एवं अनुष्ठानों को राहु काल व यमघण्ट से सुरक्षित रखना।',
          bn: 'মন্দিরের ভৌগোলিক স্থানাঙ্কের ভিত্তিতে সূর্যসিদ্ধান্তীয় পঞ্জিকা গণনা, তিথি-নক্ষত্র সন্ধিক্ষণ নির্ধারণ এবং রাহু কাল ও যমগণ্ড থেকে শুভানুষ্ঠানকে সুরক্ষিত রাখা।',
          sa: 'स्थान-अक्षांशरेखा-दृष्ट्या सूर्यसिद्धान्तसम्मतं पञ्चाङ्गगणितं कृत्वा राहुकालादि-दोषेभ्यः अनुष्ठानानां रक्षणम्।',
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Verify Local Solar Sunrise (Udaya Lagna) & Geo-Coordinates',
              hi: 'स्थानीय सूर्योदय (उदय लग्न) एवं अक्षांश-देशांतर की पुष्टि',
              bn: 'স্থানীয় সূর্যোদয় ও ভৌগোলিক স্থানাঙ্কের সত্যতা নিশ্চিতকরণ',
              sa: 'सूर्योदयकालस्य अक्षांशरेखायाश्च दृक्-प्रत्यक्षीकरणम्',
            },
            instruction: {
              en: 'Ensure latitude and longitude of the temple sanctum are accurately geocoded. The engine calculates the five planetary limbs of PANCHANG based on the precise local astronomical sunrise rather than standard civil midnight.',
              hi: 'मंदिर गर्भगृह के सटीक अक्षांश-देशांतर सुनिश्चित करें। पंचांग के पाँचों अंग मानक मध्यरात्रि के स्थान पर स्थानीय सूर्योदय काल से स्वतः आकलित होते हैं।',
              bn: 'মন্দির গর্ভগৃহের সঠিক অক্ষাংশ ও দ্রাঘিমাংশ যাচাই করুন। পঞ্জিকার পঞ্চাঙ্গ নাগরিক মধ্যরাত্রির পরিবর্তে নিখুঁত সূর্যোদয়ের ভিত্তিতে নির্ণীত হয়।',
              sa: 'मन्दिरस्य अक्षांश-रेखांशयोः परिशुद्धतां दृष्ट्वा स्थानीयसूर्योदयेनैव पञ्चाङ्ग-गणना सम्पाद्या।',
            },
            highlightedTerms: ['PANCHANG'],
            shastricBasis: 'Surya Siddhanta Chapter 1 (Spashta Bhupati Vidhi)',
          },
          {
            stepNumber: 2,
            title: {
              en: 'Analyze the 5 Limbs: Tithi, Vaara, Nakshatra, Yoga, and Karana',
              hi: 'पंच अंगों का विश्लेषण: तिथि, वार, नक्षत्र, योग एवं करण',
              bn: 'পঞ্চাঙ্গের বিশ্লেষণ: তিথি, বার, নক্ষত্র, যোগ ও করণ',
              sa: 'पञ्चाङ्गानां (तिथि-वार-नक्षत्र-योग-करणानां) परीक्षणम्',
            },
            instruction: {
              en: 'Review the transition timings and sandhi periods of Tithi and Nakshatra. Ensure that sankalpa rituals requiring Shukla or Krishna Paksha specific deities are conducted within the active Tithi span before its termination.',
              hi: 'तिथि एवं नक्षत्र के समाप्ति काल तथा संधि-वेला की समीक्षा करें। शुक्ल अथवा कृष्ण पक्ष के अभीष्ट अनुष्ठान तिथि के समाप्त होने से पूर्व संपन्न कराएं।',
              bn: 'তিথি ও নক্ষত্রের পরিবর্তন সময় ও সন্ধিকাল পর্যবেক্ষণ করুন। বিশেষ তিথির সংকল্প পূজা তিথি সমাপ্ত হওয়ার পূর্বেই সম্পন্ন করুন।',
              sa: 'तिथेः नक्षत्रस्य च समाप्तिसमयम् अवलोक्य तदन्तः एव सङ्कल्पपूर्वकं पूजां निर्वर्तयेत्।',
            },
            highlightedTerms: ['PANCHANG', 'SANKALP'],
            shastricBasis: 'Muhurta Chintamani Tithi-Prakarana',
          },
          {
            stepNumber: 3,
            title: {
              en: 'Enforce Automated Blocking for Rahu Kaal & Yamaganda',
              hi: 'राहु काल एवं यमघण्ट में अनुष्ठान पर स्वचालित रोक',
              bn: 'রাহু কাল ও যমগণ্ডে ধর্মীয় অনুষ্ঠানে স্বয়ংক্রিয় নিষেধাজ্ঞা',
              sa: 'राहुकाले यमगण्डकाले च पूजारम्भे प्रतिबन्धः',
            },
            instruction: {
              en: 'Strictly observe RAHU_KAAL (an 8th part of the daylight period) and Yamaganda. The system automatically restricts high-value ritual booking during this malefic window to prevent ritual doshas.',
              hi: 'दिनमान के आठवें भाग रूपी राहु काल (RAHU_KAAL) तथा यमघण्ट का कड़ाई से पालन करें। कोई भी मांगलिक संकल्प अथवा विवाह इस काल में आरम्भ न हो।',
              bn: 'দিবাভাগের অষ্টমাংশ বিশিষ্ট রাহু কাল (RAHU_KAAL) ও যমগণ্ড সতর্কতার সাথে পরিহার করুন। এই অশুভ সময়ে পূজার বুকিং সফটওয়্যারে স্বয়ংক্রিয়ভাবে অবরুদ্ধ থাকবে।',
              sa: 'दिनमानस्याष्टमांशे राहुकाले मङ्गलाचरणम् आरम्भो वा सर्वथा वर्जनीयः।',
            },
            highlightedTerms: ['RAHU_KAAL'],
            shastricBasis: 'Kalavidhana & Narada Samhita',
          },
          {
            stepNumber: 4,
            title: {
              en: 'Recommend Abhijit & Brahma Muhurat for Devotee Sevas',
              hi: 'अभिजीत एवं ब्रह्म मुहूर्त में शुभ अनुष्ठान की अनुशंसा',
              bn: 'অভিজিৎ ও ব্রহ্ম মুহূর্তে শুভ সেবার সুপারিশ',
              sa: 'अभिजित्-ब्रह्ममुहूर्तेषु शुभकार्याणां प्रशस्तता',
            },
            instruction: {
              en: 'Utilize the auspicious MUHURAT calculator to identify midday Abhijit Muhurat (the 8th Muhurat of the day, immune to major doshas) and early morning Brahma Muhurat for Rudrabhishek, Vivah, and Griha Pravesh.',
              hi: 'अभिजीत मुहूर्त (दिन का ८वां मुहूर्त जो समस्त दोषों का शमन करता है) एवं प्रातः ब्रह्म मुहूर्त का चयन कर भक्तों को शुभ MUHURAT में संकल्प दिलाएं।',
              bn: 'অভিজিৎ মুহূর্ত এবং ব্রাহ্ম মুহূর্তের মতো পরম কল্যাণকর MUHURAT নির্বাচন করে ভক্তদের শুভ পূজার সময়সূচি নির্ধারণ করুন।',
              sa: 'सर्वदोषहरम् अभिजित्-मुहूर्तं ब्राह्ममुहूर्तं च विज्ञाय भक्तेभ्यः श्रेयस्करं कालं निर्दिशेत्।',
            },
            highlightedTerms: ['MUHURAT'],
            shastricBasis: 'Brihat Samhita & Skanda Purana',
          },
        ],
        checklistItems: [
          {
            en: 'Temple sanctum GPS latitude and longitude verified against local ephemeris',
            hi: 'मंदिर गर्भगृह के जीपीएस अक्षांश-देशांतर का स्थानीय पंचांग से मिलान',
            bn: 'মন্দির গর্ভগৃহের জিপিএস স্থানাঙ্কের নির্ভুলতা যাচাইকৃত',
            sa: 'मन्दिरगर्भगृहस्य अक्षांश-रेखांशयोः स्थानिकपञ्चाङ्गेन सह समन्वयः कृतः',
          },
          {
            en: 'Rahu Kaal boundaries calculated dynamically according to daily sunrise and sunset',
            hi: 'दैनिक सूर्योदय व सूर्यास्त के अनुसार राहु काल के समय का गतिशील निर्धारण',
            bn: 'দৈনিক সূর্যোদয় ও সূর্যাস্তের ভিত্তিতে রাহু কালের সময়সীমা নির্ণীত',
            sa: 'प्रतिदिनस्य सूर्योदय-सूर्यास्ताभ्यां राहुकालस्य परिशुद्धं गणितं जातम्',
          },
          {
            en: 'Purohit confirmed active Tithi and Nakshatra prior to initiating Vedic sankalpa',
            hi: 'वैदिक संकल्प आरंभ करने से पूर्व पुरोहित द्वारा वर्तमान तिथि व नक्षत्र की पुष्टि',
            bn: 'পূজা শুরুর পূর্বে পুরোহিত কর্তৃক বর্তমান তিথি ও নক্ষত্রের পূর্ণ নিশ্চয়তা',
            sa: 'वैदिकसङ्कल्पपूर्वं पुरोहितेन प्रचलितायाः तिथेः नक्षत्रस्य च निश्चयः कृतः',
          },
        ],
      },
      TRUSTEE: {
        roleTitle: {
          en: 'Mandir Trustee & Festival Administrator',
          hi: 'मंदिर न्यासी एवं उत्सव व्यवस्थापक',
          bn: 'মন্দির ট্রাস্টি ও মহোৎসব পরিচালক',
          sa: 'मन्दिर-न्यासधारी एवं उत्सव-प्रशासकः',
        },
        primaryObjective: {
          en: 'Supervise automated booking schedules, prevent scheduling sacred festivities or public pujas in Rahu Kaal, and ensure published calendar notices strictly adhere to Vedic time calculations.',
          hi: 'स्वचालित पूजा बुकिंग समय-सारिणी की निगरानी करना, राहु काल में आयोजनों को रोकना, तथा भक्तों को प्रामाणिक वैदिक मुहूर्त उपलब्ध कराना।',
          bn: 'পূজা বুকিং সময়সূচি তদারকি করা, রাহু কালে কোনো ধর্মীয় উৎসব আয়োজন নিষিদ্ধ রাখা এবং প্রামাণিক পঞ্জিকা অনুসরণ নিশ্চিত করা।',
          sa: 'पूजा-बुकिङ्ग-समयसूचीं समीक्ष्य राहुकाले कोऽपि उत्सवः न भवेदिति दृढीकृत्य प्रामाणिक-पञ्चाङ्गस्य परिपालनम्।',
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Review Shastric Panchang Ephemeris & Gate Darshan Timings',
              hi: 'शास्त्रीय पंचांग एवं मंदिर दर्शन समय-सारणी का अनुमोदन',
              bn: 'পঞ্জিকা বিবরণী ও মন্দির দর্শন সময়সূচির অনুমোদন',
              sa: 'पञ्चाङ्गानुसारं मन्दिरदर्शनसमयस्य व्यवस्थापनम्',
            },
            instruction: {
              en: 'Confirm that temple aarti, morning opening, and evening bhoga timings sync seamlessly with PANCHANG astronomical transitions such as Sandhya Kaal and Nishita Kaal.',
              hi: 'आरती, प्रातः पटोद्घाटन एवं सांध्य भोग के समय को पंचांग (PANCHANG) के खगोलीय संधिकाल के अनुरूप अनुमोदित करें।',
              bn: 'মন্দিরের নিত্য আরতি ও ভোগ নিবেদনের সময়সূচি পঞ্জিকার (PANCHANG) খগোलीय পরিবর্তনের সাথে সমন্বয় করুন।',
              sa: 'पञ्चाङ्गोक्त-सन्ध्याकालादि-खगोलीयपरिवर्तनानुसारेण मन्दिरार्तिक-समयस्य नियमनम्।',
            },
            highlightedTerms: ['PANCHANG'],
            complianceTag: 'Agama Shastra Temple Administration Guidelines',
          },
          {
            stepNumber: 2,
            title: {
              en: 'Audit Booking Gateways for Automatic Rahu Kaal Exclusion',
              hi: 'बुकिंग पोर्टल पर राहु काल निषेध का ऑडिट',
              bn: 'বুকিং পোর্টালে রাহু কাল বহির্ভূত রাখার অডিট',
              sa: 'राहुकाल-बहिष्कारस्य सङ्गणकीय-लेखापरीक्षा',
            },
            instruction: {
              en: 'Audit the digital booking desk to verify that devotees cannot mistakenly reserve Griha Pravesh or Vivah during RAHU_KAAL. The system must prompt alternative auspicious MUHURAT slots automatically.',
              hi: 'जाँचें कि बुकिंग प्रणाली में राहु काल (RAHU_KAAL) का समय स्वतः अवरुद्ध रहे और भक्तों को वैकल्पिक शुभ मुहूर्त (MUHURAT) स्वतः सुझाए जाएं।',
              bn: 'নিশ্চিত করুন যেন ভক্তরা ভুলবশত রাহু কালে (RAHU_KAAL) শুভপূজা বুক করতে না পারে এবং বিকল্প শুভ MUHURAT প্রদর্শিত হয়।',
              sa: 'राहुकाले भक्ताः प्रमादादपि पूजां मा कुर्युः इति सङ्गणक-प्रणाल्यां प्रतिबन्धं परीक्षेत।',
            },
            highlightedTerms: ['RAHU_KAAL', 'MUHURAT'],
            complianceTag: 'Trustee Board Religious Compliance Charter',
          },
        ],
        checklistItems: [
          {
            en: 'Festival calendar verified against local Udaya Tithi rules',
            hi: 'उत्सव पंचांग का स्थानीय उदयव्यापिनी तिथि नियमों से सत्यापन',
            bn: 'উৎসবের দিনপঞ্জিকা উদয়ব্যাপিনী তিথির নিয়মে পরীক্ষিত',
            sa: 'उत्सवपञ्जिकायाः उदयव्यापिनी-तिथिनियमानुसारेण प्रमाणीकरणम्',
          },
          {
            en: 'Temple website and digital notices updated with daily Muhurat and Rahu Kaal',
            hi: 'मंदिर सूचना पट्ट व पोर्टल पर दैनिक शुभ मुहूर्त एवं राहु काल का दैनिक अद्यतन',
            bn: 'মন্দির নোটিস বোর্ডে ও পোর্টালে প্রতিদিনের মুহূর্ত ও রাহু কাল প্রকাশ নিশ্চিত',
            sa: 'सूचनाफलके अन्तर्जाले च प्रतिदिनं शुभमुहूर्तस्य राहुकालस्य च प्रकाशनम्',
          },
        ],
      },
    },
  },
  YATRANET_GIS: {
    moduleId: 'YATRANET_GIS',
    moduleTitle: {
      en: 'YatraNet GIS Crowd Density & Emergency SOS Command Center',
      hi: 'यात्रानेट जीआईएस भीड़ घनत्व एवं आपातकालीन एसओएस कमांड सेंटर',
      bn: 'যাত্রানেট জিআইএস ভিড় নিয়ন্ত্রণ ও জরুরি এসওএস কমান্ড সেন্টার',
      sa: 'यात्रानेट-जीआईएस जनसम्मर्द-नियन्त्रणम् एवं आपत्कालीन-कमाण्ड-केन्द्रम्',
    },
    domain: 'Domain 3: Vedic Rituals & Ephemeris',
    roles: {
      TRUSTEE: {
        roleTitle: {
          en: 'Mandir Trustee & Complex Security Administrator',
          hi: 'मंदिर न्यासी एवं संकुल सुरक्षा प्रशासक',
          bn: 'মন্দির ট্রাস্টি ও চত্বর নিরাপত্তা প্রশাসক',
          sa: 'मन्दिर-न्यासधारी एवं संकुल-सुरक्षा-प्रशासकः',
        },
        primaryObjective: {
          en: 'Monitor real-time sector crowd density heatmaps across sacred pilgrim flow corridors and swiftly dispatch Sevadars to alleviate bottlenecks around the Garbhagriha during peak Yatra seasons.',
          hi: 'तीर्थयात्री गलियारों में वास्तविक समय भीड़ घनत्व हीटमैप की निगरानी करना तथा प्रमुख यात्रा पर्वों पर गर्भगृह के संकुलन को दूर करने हेतु सेवादारों की तत्काल तैनाती करना।',
          bn: 'তীর্থযাত্রী করিডোরে রিয়েল-টাইম ভিড়ের ঘনত্ব পর্যবেক্ষণ করা এবং প্রধান যাত্রা উৎসবে গর্ভগৃহের জট নিরসনে দ্রুত সেবাদার মোতায়েন করা।',
          sa: 'तीर्थयात्रि-प्रवाहमार्गेषु जनसम्मर्दस्य प्रत्यक्ष-मानचित्रं समीक्ष्य महायात्रा-काले गर्भगृह-परितः संकुलता-निवारणाय सेवादाराणां शीघ्र-प्रेषणम्।',
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Assess Live Sector Capacities & Pilgrim Flow Inflow',
              hi: 'सजीव सेक्टर क्षमता एवं यात्री प्रवेश प्रवाह का आकलन',
              bn: 'লাইভ সেক্টর ধারণক্ষমতা ও যাত্রী প্রবেশ পর্যালোচনা',
              sa: 'विभागीय-क्षमतायाः यात्रिक-प्रवेश-प्रवाहस्य च पर्यवेक्षणम्',
            },
            instruction: {
              en: 'Continuously audit live telemetry across all major sectors during peak YATRA. Identify sectors exceeding the critical 85% threshold to preempt stampedes or queue exhaustion.',
              hi: 'प्रमुख यात्रा (YATRA) के दौरान सभी सेक्टरों के लाइव डेटा की समीक्षा करें। भगदड़ या थकावट रोकने के लिए ८५% से अधिक क्षमता वाले क्षेत्रों की तत्काल पहचान करें।',
              bn: 'পবিত্র যাত্রা (YATRA) চলাকালীন সকল সেক্টরের ডেটা নিয়মিত পরীক্ষা করুন এবং ৮৫% অতিক্রমকারী সংকটপূর্ণ অঞ্চল শনাক্ত করুন।',
              sa: 'यात्रा-काले सर्वेषु भागेषु जनसम्मर्दं दृष्ट्वा ८५%-अतिसंमर्दयुक्तेषु क्षेत्रेषु सतर्कता विधेया।',
            },
            highlightedTerms: ['YATRA'],
            complianceTag: 'NDMA Religious Mass Gathering Guidelines',
          },
          {
            stepNumber: 2,
            title: {
              en: 'Mitigate Sanctum Bottlenecks Around the Garbhagriha',
              hi: 'गर्भगृह के सम्मुख संकुलन का तत्काल निवारण',
              bn: 'গর্ভগৃহের সম্মুখভাগে ভিড়ের জট নিরসন',
              sa: 'गर्भगृह-द्वारस्य संकुलतायाः निवारणम्',
            },
            instruction: {
              en: 'When the inner sanctum GARBHAGRIHA enters critical red status, trigger the Sevadar Redeployment Tool to transfer idle volunteers from green zones (e.g. Main Gate, Joota Ghar) directly to the inner sanctum barricades.',
              hi: 'जब मुख्य गर्भगृह (GARBHAGRIHA) गंभीर संकुलन (लाल क्षेत्र) में आए, तो सेवादार पुनर्नियोजन साधन का उपयोग कर हरित क्षेत्रों से स्वयंसेवकों को तुरंत गर्भगृह बैरिकेड्स पर तैनात करें।',
              bn: 'যখন প্রধান গর্ভগৃহ (GARBHAGRIHA) সংকটজনক লাল অবস্থায় পৌঁছায়, তখন গ্রিন জোন থেকে সেবাদারদের সরাসরি গর্ভগৃহে স্থানান্তরিত করুন।',
              sa: 'यदा मन्दिरस्य गर्भगृहम् (GARBHAGRIHA) अतिसंमर्दयुक्तं भवति, तदा हरितक्षेत्रेभ्यः सेवादाराः गर्भगृह-रक्षणाय योजनीयाः।',
            },
            highlightedTerms: ['GARBHAGRIHA', 'SEVADAR'],
            complianceTag: 'Sanctum Crowd Velocity & Shastric Decorum Protocol',
          },
        ],
        checklistItems: [
          {
            en: 'Garbhagriha ingress and egress gates calibrated to max safe turnover velocity',
            hi: 'गर्भगृह प्रवेश एवं निकास द्वारों की अधिकतम सुरक्षित गतिशीलता का अंशांकन',
            bn: 'গর্ভগৃহ প্রবেশ ও প্রস্থান দরজায় নিরাপদ গতিবেগ নিশ্চিতকরণ',
            sa: 'गर्भगृह-प्रवेश-निर्गम-द्वाराणां गतिशीलता सुनिश्चिता',
          },
          {
            en: 'Backup medical stretchers and first-aid points on standby across pilgrim holding bays',
            hi: 'यात्री विश्राम क्षेत्रों में बैकअप स्ट्रेचर एवं प्राथमिक चिकित्सा दल सक्रिय',
            bn: 'যাত্রী বিশ্রাম এলাকায় ব্যাকআপ স্ট্রেচার ও প্রাথমিক চিকিৎসা কেন্দ্র প্রস্তুত',
            sa: 'आपत्कालीन-चिकित्सा-शिबिराणां सज्जता प्रमाणीकृता',
          },
        ],
      },
      MANAGER: {
        roleTitle: {
          en: 'Operations Manager & Dispatch Controller',
          hi: 'परिचालन प्रबंधक एवं प्रेषण नियंत्रक',
          bn: 'পরিচালন ব্যবস্থাপক ও ডিসপ্যাচ নিয়ন্ত্রক',
          sa: 'प्रचालन-प्रबन्धकः प्रेषण-नियन्त्रकश्च',
        },
        primaryObjective: {
          en: 'Coordinate on-ground volunteer deployment, oversee automated crowd heatmaps, and maintain uninterrupted devotee flow from holding zones to the sanctum.',
          hi: 'धरातलीय स्वयंसेवक तैनाती का समन्वय करना, स्वचालित भीड़ हीटमैप की निगरानी करना तथा विश्राम क्षेत्रों से गर्भगृह तक निर्बाध यात्री प्रवाह सुनिश्चित करना।',
          bn: 'অন-গ্রাউন্ড স্বেচ্ছাসেবক মোতায়েন সমন্বয় করা, ভিড়ের হিটম্যাপ তদারকি করা এবং নিরবচ্ছিন্ন দর্শন প্রবাহ বজায় রাখা।',
          sa: 'भूस्तरीय-सेवादाराणां नियोजनं कृत्वा दर्शनप्रवाहं निर्बाधं स्थापयेत्।',
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Balance Holding Bay Density with Sanctum Clearance',
              hi: 'विश्राम कक्ष एवं गर्भगृह निकासी संतुलन',
              bn: 'হোল্ডিং বে ও গর্ভগৃহ নিকাশির ভারসাম্য রক্ষা',
              sa: 'विश्रामकक्ष-गर्भगृहयोः जनप्रवाह-सन्तुलनम्',
            },
            instruction: {
              en: 'Adjust gate release intervals between Waiting Hall and GARBHAGRIHA based on live transit velocity to preserve peaceful devotional atmosphere.',
              hi: 'शांतिपूर्ण दर्शन वातावरण बनाए रखने के लिए विश्राम हॉल और गर्भगृह (GARBHAGRIHA) के बीच गेट खोलने के अंतराल को नियंत्रित करें।',
              bn: 'শান্তিপূর্ণ ভক্তিভাব বজায় রাখতে ওয়েটিং হল ও গর্ভগৃহের (GARBHAGRIHA) মধ্যকার গেট খোলার সময় নিয়ন্ত্রণ করুন।',
              sa: 'शान्तिपूर्ण-दर्शनाय विश्रामकक्षस्य गर्भगृहस्य च मध्ये द्वारोद्घाटनसमयं नियन्त्रयेत्।',
            },
            highlightedTerms: ['GARBHAGRIHA'],
            complianceTag: 'Mass Darshan Turnover SOP',
          },
        ],
        checklistItems: [
          {
            en: 'All CCTV and turnstile IoT counters feeding live data into YatraNet GIS',
            hi: 'सभी सीसीटीवी और टर्नस्टाइल काउंटर्स से यात्रानेट जीआईएस में लाइव डेटा प्राप्त',
            bn: 'সকল সিসিটিভি ও টার্নস্টাইল কাউন্টার থেকে লাইভ ডেটা প্রাপ্তি নিশ্চিত',
            sa: 'प्रत्यक्ष-तन्त्रांशेभ्यः यथार्थ-विवरणं प्राप्तम्',
          },
        ],
      },
      SEVADAR: {
        roleTitle: {
          en: 'Sanctum Volunteer & First-Responder Sevadar',
          hi: 'मंदिर स्वयंसेवक एवं त्वरित अनुक्रिया सेवादार',
          bn: 'গর্ভগৃহ স্বেচ্ছাসেবক ও দ্রুত সাড়াদানকারী সেবাদার',
          sa: 'गर्भगृह-स्वयंसेवकः त्वरित-प्रतिसादक-सेवादारः',
        },
        primaryObjective: {
          en: 'Execute immediate field responses to Emergency SOS alerts, administer first-aid to dehydrated pilgrims, and guide elderly devotees through queue channels with compassionate service.',
          hi: 'आपातकालीन एसओएस अलर्ट पर त्वरित धरातलीय कार्रवाई करना, अस्वस्थ तीर्थयात्रियों को प्राथमिक उपचार प्रदान करना तथा करुणापूर्वक कतार प्रबंधन संभालना।',
          bn: 'জরুরি এসওএস সতর্কতায় তাৎক্ষণিক সাড়া প্রদান করা, অসুস্থ যাত্রীদের প্রাথমিক চিকিৎসা দেওয়া এবং নিষ্ঠার সাথে লাইন পরিচালনা করা।',
          sa: 'आपत्कालीन-एसओएस-संकेतेषु त्वरित-कार्याचरणं कृत्वा अस्वस्थ-यात्रिकाणां सेवां सम्पादयेत्।',
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Acknowledge and Respond to Sector Medical SOS',
              hi: 'सेक्टर चिकित्सा एसओएस स्वीकार कर कार्रवाई करना',
              bn: 'সেক্টরের জরুরি মেডিকেল এসওএস গ্রহণ ও সাড়া প্রদান',
              sa: 'आपत्कालीन-चिकित्सा-संकेतं स्वीकृत्य साहाय्य-सम्पादनम्',
            },
            instruction: {
              en: 'Upon receiving a broadcasted SOS (e.g., heat exhaustion or medical distress), the assigned SEVADAR must click "Dispatch Medical Sevadars" in the command center, lock location beacons, and arrive at the sector within 120 seconds.',
              hi: 'जब आपातकालीन एसओएस प्रसारित हो, तो निर्दिष्ट सेवादार (SEVADAR) "Dispatch Medical Sevadars" पर क्लिक करें और १२० सेकंड के भीतर सहायता स्थल पर पहुँचें।',
              bn: 'মেডিকেল এসওএস সতর্কবার্তা পাওয়ামাত্র দায়িত্বপ্রাপ্ত সেবাদার (SEVADAR) কমান্ড সেন্টারে "Dispatch Medical Sevadars" ক্লিক করবেন এবং ১২০ সেকেন্ডে ঘটনাস্থলে পৌঁছাবেন।',
              sa: 'आपत्कालीन-संकेत-प्राप्तौ सेवादारेण (SEVADAR) "Dispatch Medical Sevadars" इति नुत्वा क्षणमात्रे तत्र गन्तव्यम्।',
            },
            highlightedTerms: ['SEVADAR'],
            complianceTag: 'Emergency Medical Golden Hour Standard',
          },
          {
            stepNumber: 2,
            title: {
              en: 'Assist Elderly and Differently-Abled Devotees',
              hi: 'वरिष्ठ एवं दिव्यांग तीर्थयात्रियों की सहायता',
              bn: 'প্রবীণ ও বিশেষ চাহিদাসম্পন্ন ভক্তদের সহায়তা',
              sa: 'वृद्धानां दिव्याङ्गानां च तीर्थयात्रिकाणां साहाय्यम्',
            },
            instruction: {
              en: 'Ensure priority passage channels are kept open for elders and wheelchair-bound devotees without disrupting the primary darshan flow.',
              hi: 'मुख्य दर्शन प्रवाह को बाधित किए बिना वरिष्ठ नागरिकों एवं दिव्यांगों के लिए विशेष सुगम पथ खुला रखें।',
              bn: 'মূল দর্শন প্রবাহ ব্যাহত না করে প্রবীণ ও হুইলচেয়ার ব্যবহারকারীদের জন্য অগ্রাধিকারমূলক প্রবেশপথ উন্মুক্ত রাখুন।',
              sa: 'वृद्ध-दिव्याङ्गेभ्यः विशेष-मार्गं संरक्ष्य निर्बाधं देवदर्शनं कारयेत्।',
            },
            highlightedTerms: ['SEVADAR'],
            shastricBasis: 'Seva Dharma & Narada Bhakti Sutra',
          },
        ],
        checklistItems: [
          {
            en: 'Wearable communication radio or smartphone app synced with YatraNet beacon',
            hi: 'रेडियो या मोबाइल ऐप यात्रानेट बीकन से सक्रिय रूप से कनेक्टेड',
            bn: 'ওয়াকিটকি বা মোবাইল অ্যাপ যাত্রানেটের সাথে যুক্ত',
            sa: 'सञ्चार-यन्त्रं यात्रानेट-तन्त्रेण सह संयोजितम्',
          },
          {
            en: 'Electrolyte water sachets and basic first-aid kit stocked at assigned post',
            hi: 'तैनाती स्थल पर ओआरएस घोल एवं प्राथमिक चिकित्सा किट उपलब्ध',
            bn: 'নির্ধারিত দায়িত্বস্থলে ওআরএস এবং প্রাথমিক চিকিৎসা কিট উপস্থিত',
            sa: 'प्राथमिक-चिकित्सा-पेटिका स्वस्थाने सज्जा',
          },
        ],
      },
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS FOR GLOSSARY MATCHING & PARSING
// ============================================================================

/**
 * Searches the terminology dictionary with multi-language and category support.
 */
export function searchTerminology(
  query: string,
  category?: TermCategory | 'ALL',
  language: 'en' | 'hi' | 'bn' | 'sa' = 'hi'
): ShastricTerm[] {
  const cleanQ = query.trim().toLowerCase();

  return SHASTRIC_TERMINOLOGY.filter((term) => {
    const matchCategory = !category || category === 'ALL' || term.category === category;
    if (!matchCategory) return false;

    if (!cleanQ) return true;

    // Check term key, labels across languages, definitions, synonyms
    const inKey = term.termKey.toLowerCase().includes(cleanQ);
    const inEnLabel = term.label.en.toLowerCase().includes(cleanQ);
    const inHiLabel = term.label.hi.toLowerCase().includes(cleanQ);
    const inBnLabel = term.label.bn.toLowerCase().includes(cleanQ);
    const inSaLabel = term.label.sa.toLowerCase().includes(cleanQ);

    const inDef = term.definition[language].toLowerCase().includes(cleanQ);
    const inSynonyms = term.synonyms?.some((s) => s.toLowerCase().includes(cleanQ));

    return inKey || inEnLabel || inHiLabel || inBnLabel || inSaLabel || inDef || inSynonyms;
  });
}

/**
 * Finds a term by its unique termKey.
 */
export function getTermByKey(key: string): ShastricTerm | undefined {
  return SHASTRIC_TERMINOLOGY.find((t) => t.termKey === key.toUpperCase());
}

/**
 * Retrieves a role-based SOP for a given module and role.
 * Falls back to generic SOP if module or role is not explicitly mapped.
 */
export function getModuleRoleSOP(moduleId: string, role: string): ModuleRoleSOP {
  // Normalize module key
  const normalizedModule = moduleId.toUpperCase().replace(/-/g, '_');
  const normalizedRole = role.toUpperCase();

  const moduleGroup = MODULE_ROLE_SOPS[normalizedModule];
  if (moduleGroup) {
    if (moduleGroup[normalizedRole]) {
      return moduleGroup[normalizedRole];
    }
    // Return first available role in module if exact role not matched
    const firstRoleKey = Object.keys(moduleGroup)[0];
    if (firstRoleKey) {
      return moduleGroup[firstRoleKey];
    }
  }

  // Fallback Generic Module SOP
  return {
    moduleId: normalizedModule || 'GENERAL_DESK',
    moduleName: {
      en: 'Operational Desk & Shastric Governance',
      hi: 'प्रचालन डेस्क एवं शास्त्रीय अभिशासन',
      bn: 'পরিচালনা ডেস্ক এবং শাস্ত্রীয় প্রশাসন',
      sa: 'कार्यप्रणाली-शास्त्रप्रशासन-विभागश्च',
    },
    role: normalizedRole || 'SEVADAR',
    roleLabel: {
      en: 'Authorized Mandir Official / Sevadar',
      hi: 'अधिकृत मंदिर अधिकारी / सेवादार',
      bn: 'অনুমোদিত মন্দির প্রতিনিধি / সেবাদার',
      sa: 'अधिकृत-मन्दिर-कार्यकर्ता',
    },
    roleSummary: {
      en: 'Follow prescribed standard operating protocols, maintain temple ledger integrity, and respect traditional Shastric decorum.',
      hi: 'निर्धारित कार्यप्रणाली का पालन करें, मंदिर बहीखाता की शुचिता बनाए रखें एवं पारंपरिक शास्त्रीय मर्यादा का सम्मान करें।',
      bn: 'নির্ধারিত কার্যপদ্ধতি অনুসরণ করুন, মন্দিরের তহবিলের স্বচ্ছতা বজায় রাখুন এবং ঐতিহ্যবাহী সনাতন মর্যাদা রক্ষা করুন।',
      sa: 'शास्त्रविहित-मार्गम् अनुसृत्य मन्दिरकार्याणि निष्पादयन्तु।',
    },
    steps: [
      {
        stepNumber: 1,
        title: {
          en: '1. Access Verification & Role Permissions Check',
          hi: '१. पहुँच सत्यापन एवं भूमिका अधिकार परीक्षण',
          bn: '১. অনুমতি যাচাই ও দায়িত্ব নিশ্চিতকরণ',
          sa: '१. अधिकार-परीक्षणम्',
        },
        description: {
          en: 'Ensure your active role matches the tasks you perform. Sensitive financial and disciplinary modifications require Trustee sign-off.',
          hi: 'सुनिश्चित करें कि आपकी सक्रिय भूमिका आपके कार्यों के अनुकूल है। वित्तीय निर्णयों के लिए न्यासी अनुमोदन अनिवार्य है।',
          bn: 'নিশ্চিত করুন আপনার বর্তমান ভূমিকা সম্পাদ্য কাজের সাথে সামঞ্জস্যপূর্ণ। আর্থিক বিষয়ে ট্রাস্টির অনুমতি প্রয়োজন।',
          sa: 'स्वस्य अधिकारक्षेत्रं परीक्ष्य कार्यं कुर्वन्तु।',
        },
        complianceTag: 'Sanatani Bandhan RBAC Safeguard',
      },
      {
        stepNumber: 2,
        title: {
          en: '2. Audit Trail & Real-time Record Keeping',
          hi: '२. ऑडिट ट्रेल एवं वास्तविक समय प्रविष्टि संरक्षण',
          bn: '২. অডিট ট্রেইল ও রিয়েল-টাইম তথ্য সংরক্ষণ',
          sa: '२. अभिलेख-संरक्षणम्',
        },
        description: {
          en: 'Every update to treasury, inventory, or sankalpa records is cryptographically time-stamped with your user credentials.',
          hi: 'कोष, भंडार या संकल्प में प्रत्येक बदलाव आपके परिचय के साथ समयबद्ध रूप से सुरक्षित होता है।',
          bn: 'তহবিল, ভাণ্ডার বা পূজার প্রতিটি পরিবর্তন আপনার ইউজার আইডিসহ সময়চিহ্নে সুরক্ষিত হয়।',
          sa: 'सर्वं परिवर्तनं समयचिह्नेन सह सुरक्ष्यते।',
        },
        complianceTag: 'Digital Trust Accounting Standard',
      },
    ],
    checklistItems: [
      {
        en: 'Session authenticated with authorized role credentials',
        hi: 'सत्र अधिकृत भूमिका प्रमाणपत्रों से प्रमाणित',
        bn: 'অনুমোদিত ইউজার দিয়ে লগইন সম্পন্ন',
        sa: 'प्रमाणीकृत-प्रवेशः सम्पन्नः',
      },
      {
        en: 'Shastric decorum and statutory trust norms adhered to',
        hi: 'शास्त्रीय मर्यादा एवं वैधानिक ट्रस्ट नियमों का अक्षरशः पालन',
        bn: 'শাস্ত্রীয় মর্যাদা এবং ট্রাস্টের আইনি নিয়মকানুন অনুসরণ নিশ্চিত',
        sa: 'शास्त्रमर्यादा-पालनं सुनिश्चितम्',
      },
    ],
  };
}

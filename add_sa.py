import re

with open('src/context/LanguageContext.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Sanskrit to TAXONOMY_MAP
sa_taxonomy = """
    },
    sa: {
        Mandir: {
            workspaceLabel: 'मन्दिरम् / देवस्थानम्',
            directoryName: 'भक्त-सूचिका',
            memberTerm: 'भक्ताः',
            fundsTerm: 'प्रणामी / दानम्',
            assetsTerm: 'मन्दिर-सम्पत्तिः',
            inventoryTerm: 'भाण्डागारः',
        },
        Goshala: {
            workspaceLabel: 'गोशाला',
            directoryName: 'गोसेवक-सूचिका',
            memberTerm: 'गोसेवकाः',
            fundsTerm: 'गोसेवा-निधिः',
            assetsTerm: 'गोमाता च नन्दी',
            inventoryTerm: 'तृण-भेषज-भाण्डागारः',
        },
        Sangha: {
            workspaceLabel: 'सङ्घः',
            directoryName: 'सङ्घ-सदस्य-सूचिका',
            memberTerm: 'सदस्याः',
            fundsTerm: 'सहयोग-निधिः',
            assetsTerm: 'सङ्घ-सम्पत्तिः',
            inventoryTerm: 'भाण्डागारः',
        },
        Ashram: {
            workspaceLabel: 'आश्रमः / मठः',
            directoryName: 'साधक-सूचिका',
            memberTerm: 'साधकाः',
            fundsTerm: 'आश्रम-निधिः',
            assetsTerm: 'आश्रम-सम्पत्तिः',
            inventoryTerm: 'पाकशाला च चिकित्सालयः',
        },
        Gurukul: {
            workspaceLabel: 'गुरुकुलम् / विद्यापीठम्',
            directoryName: 'विद्यार्थि-सूचिका',
            memberTerm: 'विद्यार्थिनः',
            fundsTerm: 'गुरु-दक्षिणा',
            assetsTerm: 'परिसर-सम्पत्तिः',
            inventoryTerm: 'पुस्तकालयः',
        },
        Satsang: {
            workspaceLabel: 'सत्सङ्ग-केन्द्रम्',
            directoryName: 'अनुयायि-सूचिका',
            memberTerm: 'अनुयायिनः',
            fundsTerm: 'प्रणामी',
            assetsTerm: 'केन्द्र-सम्पत्तिः',
            inventoryTerm: 'प्रबन्धन-भाण्डागारः',
        },
        Yoga: {
            workspaceLabel: 'योग-केन्द्रम्',
            directoryName: 'अभ्यासि-सूचिका',
            memberTerm: 'योग-साधकाः',
            fundsTerm: 'योग-निधिः',
            assetsTerm: 'उपकरण-सम्पत्तिः',
            inventoryTerm: 'योग-सामग्री',
        },
        Trust: {
            workspaceLabel: 'सेवा-न्यासः',
            directoryName: 'सेवादार-सूचिका',
            memberTerm: 'सेवादारकाः',
            fundsTerm: 'सेवा-निधिः',
            assetsTerm: 'न्यास-सम्पत्तिः',
            inventoryTerm: 'चिकित्सा-भाण्डागारः',
        },
        Tirth: {
            workspaceLabel: 'तीर्थम् / धाम',
            directoryName: 'यात्रि-सूचिका',
            memberTerm: 'तीर्थयात्रिणः',
            fundsTerm: 'तीर्थ-निधिः',
            assetsTerm: 'धाम-सम्पत्तिः',
            inventoryTerm: 'अतिथिभवनम्',
        },
        Samaj: {
            workspaceLabel: 'समाजः',
            directoryName: 'परिवार-सूचिका',
            memberTerm: 'सदस्याः',
            fundsTerm: 'समाज-सहयोगः',
            assetsTerm: 'समाजभवन-सम्पत्तिः',
            inventoryTerm: 'अनुष्ठान-सामग्री',
        },
        AkshayaPatra: {
            workspaceLabel: 'अन्नदान-केन्द्रम्',
            directoryName: 'अन्नदातृ-सूचिका',
            memberTerm: 'अन्नदातारः',
            fundsTerm: 'अन्नदान-निधिः',
            assetsTerm: 'पाकशाला-सम्पत्तिः',
            inventoryTerm: 'अन्न-भाण्डागारः',
        },
        KashiKshetra: {
            workspaceLabel: 'काशी-क्षेत्रम्',
            directoryName: 'पितृ-मोक्ष-सूचिका',
            memberTerm: 'तीर्थ-साधकाः',
            fundsTerm: 'तर्पण-निधिः',
            assetsTerm: 'घाट-सम्पत्तिः',
            inventoryTerm: 'पूजा-सामग्री',
        },
        DharmadaTrust: {
            workspaceLabel: 'धर्मदा-सेवा-न्यासः',
            directoryName: 'दातृ-सूचिका',
            memberTerm: 'न्यासिनः',
            fundsTerm: 'धर्मदा-निधिः',
            assetsTerm: 'सम्पत्तिः',
            inventoryTerm: 'वितरण-सामग्री',
        },
        MahotsavSamiti: {
            workspaceLabel: 'महोत्सव-समितिः',
            directoryName: 'समिति-सूचिका',
            memberTerm: 'कार्यकर्तारः',
            fundsTerm: 'महोत्सव-अनुदानम्',
            assetsTerm: 'मण्डप-सम्पत्तिः',
            inventoryTerm: 'सज्जा-भाण्डागारः',
        },
        PurohitSabha: {
            workspaceLabel: 'पुरोहित-सभा',
            directoryName: 'वैदिक-पण्डित-सूचिका',
            memberTerm: 'आचार्याः',
            fundsTerm: 'दक्षिणा-निधिः',
            assetsTerm: 'यज्ञशाला-सम्पत्तिः',
            inventoryTerm: 'वैदिक-सामग्री',
        },
"""

content = content.replace("PurohitSabha: {\n      workspaceLabel: 'पुरोहित एवं विद्वत् सभा',\n      directoryName: 'वैदिक पंडित पंजिका',\n      memberTerm: 'आचार्य व अर्चक',\n      fundsTerm: 'दक्षिणा कोष',\n      assetsTerm: 'यज्ञशाला संपदा',\n      inventoryTerm: 'वैदिक सामग्री व शास्त्र',\n    },\n  },", "PurohitSabha: {\n      workspaceLabel: 'पुरोहित एवं विद्वत् सभा',\n      directoryName: 'वैदिक पंडित पंजिका',\n      memberTerm: 'आचार्य व अर्चक',\n      fundsTerm: 'दक्षिणा कोष',\n      assetsTerm: 'यज्ञशाला संपदा',\n      inventoryTerm: 'वैदिक सामग्री व शास्त्र',\n    },\n  }," + sa_taxonomy)

content = content.replace("PurohitSabha: {\n      workspaceLabel: 'পুরোহিত ও বিদ্বৎ সভা',\n      directoryName: 'বৈদিক পণ্ডিত রেজিস্ট্রি',\n      memberTerm: 'আচার্য ও অর্চকবৃন্দ',\n      fundsTerm: 'দক্ষিণা পুল',\n      assetsTerm: 'যজ্ঞশালা সম্পদ',\n      inventoryTerm: 'বৈদিক সামগ্রী ও শাস্ত্রগ্রন্থ',\n    },\n  },\n} as any;", "PurohitSabha: {\n      workspaceLabel: 'পুরোহিত ও বিদ্বৎ সভা',\n      directoryName: 'বৈদিক পণ্ডিত রেজিস্ট্রি',\n      memberTerm: 'আচার্য ও অর্চকবৃন্দ',\n      fundsTerm: 'দক্ষিণা পুল',\n      assetsTerm: 'যজ্ঞশালা সম্পদ',\n      inventoryTerm: 'বৈদিক সামগ্রী ও শাস্ত্রগ্রন্থ',\n    },\n  }," + sa_taxonomy + "\n} as any;")

# Now for UI_DICTIONARY
# We need to inject new keys into all dictionaries:
# 'crisis-command', 'dharmicAssistant'

import re

def inject_dict(content, lang, new_keys_str):
    pattern = rf"({lang}:\s*{{)"
    return re.sub(pattern, r"\1\n" + new_keys_str, content)

content = inject_dict(content, "en", "    'crisis-command': 'Crisis Command Center',\n    dharmicAssistant: 'Dharmic AI Query Desk',\n")
content = inject_dict(content, "hi", "    'crisis-command': 'आपातकालीन नियंत्रण कक्ष',\n    dharmicAssistant: 'धार्मिक एआई प्रश्न कक्ष',\n")
content = inject_dict(content, "bn", "    'crisis-command': 'জরুরী কমান্ড সেন্টার',\n    dharmicAssistant: 'ধার্মিক এআই প্রশ্ন ডেস্ক',\n")

sa_dict = """
  sa: {
    dashboard: 'नियन्त्रण-केन्द्रम्',
    live_scan: 'प्रत्यक्ष-स्कैन',
    upload_qr: 'चित्रम् उत्तोलयतु (Upload)',
    qr_instruction: 'स्वतः प्रवेशाय स्व-स्मार्ट-पत्रस्य उपयोगं करोतु',
    qr_autologin_success: 'QR स्वतः-प्रवेशः सफलः!',
    qr_generate_fail: 'पुनर्प्राप्ति-QR निर्माणे विफलम्',
    login_btn: 'सुरक्षित-प्रमाणीकरणम्',
    login_success: 'प्रवेशः सफलः',
    invalid_pin: 'अमान्य PIN अथवा ID',
    qr_not_found: 'चित्रे वैधं QR न प्राप्तम्।',
    registered_phone_id: 'पञ्जीकृतः दूरभाषः / ID',
    auth_pin: 'प्रमाणीकरण PIN',
    searchPlaceholder: '४६ प्रकोष्ठाः, सदस्याः, आदायाः, गोत्राणि अन्वेषयतु...',
    devotees: 'भक्ताः च सदस्याः',
    family: 'परिवारः च कुलम्',
    vanshavali: 'वंशावली',
    guests: 'अतिथि-पञ्जिका',
    bulkImport: 'सामूहिक CSV आरोपणम्',
    treasury: 'राजकोषः',
    taxReceipts: 'कर-प्रमाणपत्राणि (80G/12A)',
    campaigns: 'मन्दिर-निर्माणम्',
    karmaLedger: 'कर्म-पुण्य-पञ्जिका',
    assets: 'स्थिर-सम्पत्तिः',
    inventory: 'भाण्डागारः',
    poojaBooking: 'पूजा-सङ्कल्पः',
    mandirPuja: 'दैनिक-आरती',
    purohitDesk: 'पुरोहित-दैनन्दिनी',
    purohitMarket: 'वैदिक-विद्वान्-मञ्चः',
    pitruShradh: 'पितृपक्षः च श्राद्धम्',
    panchang: 'वैदिक-पञ्चाङ्गम्',
    goshala: 'गोशाला-अभयारण्यम्',
    annadanam: 'अन्नदानम्',
    ashramKutir: 'आश्रम-कुटीरम्',
    dharamshala: 'धर्मशाला (यात्रि-भवनम्)',
    gurukul: 'गुरुकुल-आवासीयम्',
    gurukulAcademy: 'शास्त्र-अकादमी',
    vidyalaya: 'साप्ताहिक-विद्यालयः',
    satsang: 'सत्सङ्गः',
    sanghaDrills: 'सङ्घ-शाखा',
    sevaTrust: 'मानव-सेवा-न्यासः',
    granthLibrary: 'पवित्र-ग्रन्थालयः',
    matrimony: 'विवाह-बन्धनम्',
    utsavPanjika: 'उत्सव-पञ्चाङ्गम्',
    panchayatPolls: 'पञ्चायत-मतदानम्',
    sandeshBroadcast: 'सन्देश-प्रसारणम्',
    socialWall: 'मन्दिर-भित्तिः',
    shlokaFeed: 'श्लोकामृतम्',
    dharmaMarketing: 'धर्म-प्रचार AI',
    trusteeGovernance: 'न्यास-प्रशासनम्',
    legalVault: 'विधिक-तिजोरी',
    sevadarRoster: 'सेवादार-समयसारणी',
    masterSettings: 'संस्थान-विन्यासः',
    spiritualSettings: 'सम्प्रदाय-कुलदेवता',
    platformBroadcast: 'सार्वजनिक-घोषणाः',
    mySpace: 'मम स्थानम् (स्मार्ट-पास)',
    logout: 'निर्गच्छतु (Logout)',
    totalMembers: 'कुल-पञ्जीकृताः',
    totalTreasury: 'राजकोष-शेषः',
    activeCampaigns: 'सक्रिय-सेवा-अभियानानि',
    todaysTithi: 'अद्यतनी तिथिः मुहूर्तम् च',
    viewAll: 'सर्वं पश्यतु',
    actions: 'क्रियाः',
    downloadPdf: 'PDF अवतरणम्',
    exportCsv: 'CSV निर्यातम्',
    saveChanges: 'परिवर्तनानि रक्षतु',
    cancel: 'रद्द करोतु',
    confirm: 'पुष्टिं करोतु',
    addRecord: 'नूतन-अभिलेखः',
    quickPay: 'चन्दा / दक्षिणा',
    printIdCard: 'स्मार्ट-भक्त-पत्रम्',
    liveTelemetry: 'प्रत्यक्ष-दूरमितिः (Telemetry)',
    footerText: 'Made with ❤️ by TrackIQ Academy',
    'crisis-command': 'आपातकालीन-नियन्त्रण-केन्द्रम्',
    dharmicAssistant: 'धार्मिक AI प्रश्न-मञ्चः',
  },
"""

content = content.replace("} as any;", "}" + sa_dict + "\n} as any;")

with open('src/context/LanguageContext.tsx', 'w', encoding='utf-8') as f:
    f.write(content)


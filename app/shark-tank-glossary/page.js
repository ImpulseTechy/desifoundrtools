'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const glossaryTerms = [
  // VALUATION
  {
    name: 'Valuation',
    category: '💰 Valuation',
    difficulty: '🟡 Dimaag Lagao',
    difficultyColor: '#EAB308',
    isTrending: true,
    matlab: 'The estimated total worth of a company',
    laala: '"Beta, teri dukaan kitne mein bikegi agar aaj bechna padhe? Wahi teri valuation hai. Shark log pehlei yahi poochhte hain — aur zyada maango toh \'bahut zyada\' bolke walk out kar dete hain!"',
    sharkTank: 'When founders say "We are valued at X crores"',
    calculatorName: 'Cap Table Dilution Calculator',
    calculatorLink: '/calculators/cap-table-dilution-calculator'
  },
  {
    name: 'Equity',
    category: '💰 Valuation',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: true,
    matlab: 'Ownership percentage in a company',
    laala: '"Maan le teri dukaan hai — tune mujhe 10% equity di. Matlab ab dukaan ka 10% mera. Faayda hua toh 10% mera, tota hua toh 10% mera bhi. Samjha?"',
    sharkTank: '"I want X% equity for Y lakh rupees"',
    calculatorName: 'Cap Table Dilution Calculator',
    calculatorLink: '/calculators/cap-table-dilution-calculator'
  },
  {
    name: 'Dilution',
    category: '💰 Valuation',
    difficulty: '🔴 CA Ko Bulao!',
    difficultyColor: '#EF4444',
    isTrending: false,
    matlab: 'Reduction in ownership % when new shares are issued',
    laala: '"Teri dukaan mein pehle sirf tu tha — 100% tera. Phir ek investor aaya, 20% le gaya. Ab tera 80%. Doosra aaya, aur 15% gaya. Ab tera 65%. Yahi dilution hai — hissa kam hota jaata hai!"',
    sharkTank: 'When multiple sharks invest across rounds',
    calculatorName: 'Cap Table Dilution Calculator',
    calculatorLink: '/calculators/cap-table-dilution-calculator'
  },
  {
    name: 'Pre-Money Valuation',
    category: '💰 Valuation',
    difficulty: '🟡 Dimaag Lagao',
    difficultyColor: '#EAB308',
    isTrending: false,
    matlab: 'Company value BEFORE investment',
    laala: '"Paisa aane SE PEHLE teri dukaan ki keemat. Shark ka cheque aaya nahi abhi — tab teri keemat kya thi? Wahi pre-money. Simple!"',
    sharkTank: 'Valuation negotiation before deal is finalized',
    calculatorName: 'Cap Table Dilution Calculator',
    calculatorLink: '/calculators/cap-table-dilution-calculator'
  },
  {
    name: 'Post-Money Valuation',
    category: '💰 Valuation',
    difficulty: '🟡 Dimaag Lagao',
    difficultyColor: '#EAB308',
    isTrending: false,
    matlab: 'Company value AFTER investment',
    laala: '"Pre-money mein shark ka paisa jod do — ho gayi post-money valuation. Agar teri value 10 crore thi aur shark ne 2 crore diye, toh post-money = 12 crore. Ab iska 2/12 = 16.67% shark ka."',
    sharkTank: 'Calculating equity % after investment',
    calculatorName: 'Cap Table Dilution Calculator',
    calculatorLink: '/calculators/cap-table-dilution-calculator'
  },
  
  // DEALS
  {
    name: 'Royalty',
    category: '📈 Deals',
    difficulty: '🟡 Dimaag Lagao',
    difficultyColor: '#EAB308',
    isTrending: true,
    matlab: 'A % of every sale paid to investor until a fixed amount is returned',
    laala: '"Shark bolta hai — equity nahi chahiye mujhe. Bas har bikri mein se 5% de mujhe, jab tak maine 3 crore wapas na le liye. Yeh royalty deal hai. Seedha maal — koi hissa nahi!"',
    sharkTank: 'When sharks propose royalty instead of equity',
    calculatorName: 'Unit Economics Calculator',
    calculatorLink: '/calculators/unit-economics-calculator'
  },
  {
    name: 'Due Diligence',
    category: '📈 Deals',
    difficulty: '🟡 Dimaag Lagao',
    difficultyColor: '#EAB308',
    isTrending: false,
    matlab: 'Verification of all claims before finalizing investment',
    laala: '"Shark ne haan bol diya camera ke saamne — but asli deal abhi baaki hai! Woh unke CA aur lawyer bhejenge — books dekhenge, numbers check karenge, sab verify karenge. Jhooth nikla toh deal cancel. Yahi due diligence!"',
    sharkTank: 'After handshake on show, before money actually arrives'
  },
  {
    name: 'Term Sheet',
    category: '📈 Deals',
    difficulty: '🟡 Dimaag Lagao',
    difficultyColor: '#EAB308',
    isTrending: false,
    matlab: 'Document outlining deal terms before final agreement',
    laala: '"Verbal mein deal ho gayi — ab kagaz pe likhte hain. Kitna paisa, kitna hissa, kya conditions. Yeh term sheet hai. Sign kiya, toh pakki baat!"',
    sharkTank: 'After show, during actual deal finalization'
  },

  // METRICS
  {
    name: 'Burn Rate',
    category: '🚀 Metrics',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: true,
    matlab: 'How much cash a startup spends per month',
    laala: '"Tu har mahine kitna paisa jala raha hai? Office ka kiraya, staff ka mewanha, server ka bill — sab jodega toh tera burn rate! Shark yahi pehle poochhtey hain — zyada jala toh tension ho jaati hai!"',
    sharkTank: 'Sharks ask "What is your monthly burn?"',
    calculatorName: 'Burn Rate Calculator',
    calculatorLink: '/calculators/burn-rate-calculator'
  },
  {
    name: 'Runway',
    category: '🚀 Metrics',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: false,
    matlab: 'Number of months before cash runs out',
    laala: '"Bank mein 12 lakh hain, har mahine 2 lakh jal rahe hain — toh tera runway 6 mahine ka hai. 6 mahine baad? Dukaan band! Isliye Shark se paisa maangne aaye ho!"',
    sharkTank: 'When sharks ask "How long can you survive without investment?"',
    calculatorName: 'Runway Calculator',
    calculatorLink: '/calculators/runway-calculator'
  },
  {
    name: 'Revenue',
    category: '🚀 Metrics',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: false,
    matlab: 'Total money earned from sales',
    laala: '"Tu ne iss mahine 100 cheezein bechi, 500 rupaye mein ek. Toh tera revenue = 50,000 rupaye. Simple! Par yeh profit nahi hai bhai — abhi toh kharch bhi nikaalega na?"',
    sharkTank: '"What is your monthly revenue?"',
    calculatorName: 'Growth & Revenue Toolbox',
    calculatorLink: '/calculators/growth-revenue-calculator'
  },
  {
    name: 'Profit',
    category: '🚀 Metrics',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: false,
    matlab: 'Revenue minus all expenses',
    laala: '"50,000 revenue aaya — lekin maal kharidne mein 20,000, dukaan ka kiraya 10,000, aur staff ko 15,000 diya. Toh profit sirf 5,000! Revenue aur profit mein BAHUT fark hai — yaad rakh!"',
    sharkTank: 'Sharks always distinguish revenue from profit'
  },
  {
    name: 'EBITDA',
    category: '🚀 Metrics',
    difficulty: '🔴 CA Ko Bulao!',
    difficultyColor: '#EF4444',
    isTrending: true,
    matlab: 'Earnings before interest, tax, depreciation and amortisation',
    laala: '"Yaar yeh wala thoda mushkil hai — par samjhao toh: bank ka byaaj, sarkar ka tax, purani machine ka ghisaav — yeh sab kaat ke jo bachta hai wahi EBITDA. Matlab asli kamai kitni ho rahi hai business se!"',
    sharkTank: 'Valuation discussions for profitable companies',
    calculatorName: 'Efficiency Toolbox',
    calculatorLink: '/calculators/efficiency-calculator'
  },
  {
    name: 'CAC (Customer Acquisition Cost)',
    category: '🚀 Metrics',
    difficulty: '🟡 Dimaag Lagao',
    difficultyColor: '#EAB308',
    isTrending: false,
    matlab: 'Total cost to acquire one customer',
    laala: '"Tu ne Facebook ads mein 10,000 lagaye, 10 customers aaye. Toh ek customer laane mein 1,000 rupaye kharch hue — yahi tera CAC hai. Ab agar woh customer sirf 500 ka saamaan kharide — toh ghata hi ghata!"',
    sharkTank: 'Unit economics discussion',
    calculatorName: 'Unit Economics Calculator',
    calculatorLink: '/calculators/unit-economics-calculator'
  },
  {
    name: 'LTV (Lifetime Value)',
    category: '🚀 Metrics',
    difficulty: '🟡 Dimaag Lagao',
    difficultyColor: '#EAB308',
    isTrending: false,
    matlab: 'Total revenue from one customer over their entire relationship',
    laala: '"Ramesh tera customer hai. Har mahine 500 ka saamaan kharidta hai, 2 saal tak kharidega. Toh Ramesh tera LTV = 12,000 rupaye! Ab agar use laane mein 1,000 lage — toh tera fayda 11,000. Yahi LTV:CAC ka chakkar hai!"',
    sharkTank: 'Subscription business unit economics',
    calculatorName: 'Unit Economics Calculator',
    calculatorLink: '/calculators/unit-economics-calculator'
  },

  // BUSINESS MODELS
  {
    name: 'Bootstrapped',
    category: '🏭 Business Models',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: false,
    matlab: 'Built without external funding',
    laala: '"Apna paisa, apna sapna. Kisi se udhaar nahi, kisi ka hissa nahi. Ghar ki jama-poonji lagayi, dost se 2 lakh udhaare — aur dukaan khadi kar di. Yahi bootstrapping hai — Sharks isko bahut respect dete hain!"',
    sharkTank: 'When founders say they built without investors'
  },
  {
    name: 'B2B',
    category: '🏭 Business Models',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: false,
    matlab: 'Business selling to other businesses',
    laala: '"Tu software banaata hai — par woh koi aam aadmi nahi kharidta. Tere customer bhi dukandaar hain — bade bade companies. Business se business. B2B = Bade se Bada!"',
    sharkTank: 'Explaining customer type to sharks'
  },
  {
    name: 'D2C (Direct to Consumer)',
    category: '🏭 Business Models',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: false,
    matlab: 'Selling directly to end customer, cutting out middlemen',
    laala: '"Pehle tha: Tu → Distributor → Retailer → Customer. D2C mein: Tu → Customer. Beech waale saare hatao! Fayda zyada, control zyada. Nykaa, Mamaearth — yahi karte hain!"',
    sharkTank: 'Many consumer brand pitches on the show'
  },
  {
    name: 'Scalable',
    category: '🏭 Business Models',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: false,
    matlab: 'Ability to grow revenue faster than costs',
    laala: '"Aaj 100 customers, 10 log kaam karte hain. 1000 customers ho gaye — kya 100 log chahiye? Nahi! Software ne sambhaal liya. Yahi scalable hai — zyada becho, kharch zyada nahi bdhta!"',
    sharkTank: 'Sharks always ask "Is this scalable?"'
  },

  // INVESTORS
  {
    name: 'Angel Investor',
    category: '🤝 Investors',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: false,
    matlab: 'First individual investor in an early-stage startup',
    laala: '"Tera idea seedha hai, revenue nahi, proof nahi — par ek banda hai jo bolta hai \'yaar, mujhe vishwas hai tujhme.\' Woh 10 lakh de deta hai. Yahi angel hai — swarg se aaya farishta jab koi aur nahi deta!"',
    sharkTank: 'Founders mention their first investor'
  },
  {
    name: 'Seed Round',
    category: '🤝 Investors',
    difficulty: '🟢 Ekdum Seedha',
    difficultyColor: '#22C55E',
    isTrending: false,
    matlab: 'First formal round of funding',
    laala: '"Beej daalo, ped banao. Seed round = pehla paisa. Isse product banata hai, pehle customers laata hai. Agar beej achha hai — ped bada hoga. Warna... jungle mein kho jaayega."',
    sharkTank: 'Discussing funding history'
  },
  {
    name: 'Valuation Cap',
    category: '🤝 Investors',
    difficulty: '🔴 CA Ko Bulao!',
    difficultyColor: '#EF4444',
    isTrending: false,
    matlab: 'Maximum valuation at which convertible notes convert to equity',
    laala: '"Maine tujhe 1 lakh udhaar diya — bola baad mein hissa le lunga. Par tune bol diya \'maximum 5 crore valuation pe convert hoga.\' Matlab teri value 50 crore ho gayi — toh bhi mera hissa 5 crore wali calculation se. Mera fayda! Yahi cap hai."',
    sharkTank: 'Advanced deal structure discussions'
  }
];

const categories = ['🔥 All Terms', '💰 Valuation', '📈 Deals', '🚀 Metrics', '🏭 Business Models', '🤝 Investors'];
const trendingChips = ['Equity', 'Valuation', 'Burn Rate', 'Royalty', 'EBITDA', 'Runway', 'CAC', 'D2C', 'Bootstrapped'];

const ShareButtons = ({ termName }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleWhatsApp = () => {
    const text = `Yaar '${termName}' ka matlab jaanta hai? Shark Tank India mein yeh baar baar aata hai!\nLaala style mein samjha yahan:\ndesifoundertools.in/shark-tank-glossary 😂`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };
  
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
      <button onClick={handleWhatsApp} style={{ flex: 1, color: '#22c55e', backgroundColor: 'transparent', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(34, 197, 94, 0.3)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.2s' }} className="share-btn-wa">
        📲 WhatsApp
      </button>
      <button onClick={handleCopy} style={{ flex: 1, color: 'var(--color-text-muted)', backgroundColor: 'transparent', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.2s' }} className="share-btn-copy">
        {copied ? '✅ Copied!' : '🔗 Copy Link'}
      </button>
    </div>
  );
};

export default function SharkTankGlossaryPage() {
  const [activeCategory, setActiveCategory] = useState('🔥 All Terms');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulator State
  const [simRevenue, setSimRevenue] = useState('');
  const [simFunding, setSimFunding] = useState('');
  const [simEquity, setSimEquity] = useState('');
  const [simResult, setSimResult] = useState(null);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Term Refs for scrolling
  const termRefs = useRef({});

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesCategory = activeCategory === '🔥 All Terms' || term.category === activeCategory;
    const matchesSearch = term.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          term.laala.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          term.matlab.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleChipClick = (termName) => {
    const el = termRefs.current[termName];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a brief highlight flash
      el.classList.add('flash-highlight');
      setTimeout(() => el.classList.remove('flash-highlight'), 1500);
    }
  };

  const handlePitchSubmit = () => {
    const funding = parseFloat(simFunding);
    const equity = parseFloat(simEquity);
    if (!funding || !equity || equity <= 0) return;
    
    // Implied Valuation = (Funding Amount / Equity%) * 100
    const valuationVal = (funding / equity) * 100;
    const valuationInCrore = valuationVal / 10000000;
    
    setSimResult(valuationInCrore);
  };

  const getSharkVerdicts = (valinCr) => {
    if (valinCr < 2) {
      return [
        { name: 'Aman Gupta', icon: '✅', text: 'Chhota ticket hai — par idea mein dum lag raha hai! Main interested hoon.' },
        { name: 'Namita Thapar', icon: '❌', text: 'Healthcare nahi hai toh main out.' },
        { name: 'Anupam Mittal', icon: '✅', text: 'Early stage mujhe pasand hai. Baat karte hain!' },
        { name: 'Vineeta Singh', icon: '🤔', text: 'Consumer brand hai kya? Batao aur.' },
        { name: 'Peyush Bansal', icon: '❌', text: 'Vision bado pehle. Phir aana.' }
      ];
    } else if (valinCr >= 2 && valinCr <= 10) {
      return [
        { name: 'Aman Gupta', icon: '🤔', text: 'Numbers theek hain. Due diligence ke baad sochenge.' },
        { name: 'Namita Thapar', icon: '🤔', text: 'Interesting! Margins kya hain?' },
        { name: 'Anupam Mittal', icon: '✅', text: 'Valuation thodi negotiate karo. Tab deal ho sakta hai!' },
        { name: 'Vineeta Singh', icon: '🤔', text: 'Market size kitna hai? Convince karo mujhe!' },
        { name: 'Peyush Bansal', icon: '✅', text: 'Scale ka plan solid lagta hai. Main in hoon!' }
      ];
    } else {
      return [
        { name: 'Aman Gupta', icon: '❌', text: 'Bhai, valuation pe wapas aao. Bahut zyada hai.' },
        { name: 'Namita Thapar', icon: '❌', text: 'Justify karo yeh valuation — data chahiye.' },
        { name: 'Anupam Mittal', icon: '❌', text: 'Itne mein toh listed company milti hai.' },
        { name: 'Vineeta Singh', icon: '❌', text: 'Valuation kam karo, tab baat karenge.' },
        { name: 'Peyush Bansal', icon: '❌', text: 'Yeh valuation kaise nikali? Samjhao.' }
      ];
    }
  };

  const getOverallVerdict = (valinCr) => {
    if (valinCr < 2) return { text: "🔥 Hot Deal! Sharks mein hala bol hai!", color: "var(--color-success)", bg: "rgba(34, 197, 94, 0.1)" };
    if (valinCr >= 2 && valinCr <= 10) return { text: "🤝 Negotiate Karo — Deal ho sakta hai!", color: "var(--color-gold)", bg: "rgba(245, 158, 11, 0.1)" };
    return { text: "⚠️ Valuation Kam Karo Yaar!", color: "var(--color-danger)", bg: "rgba(239, 68, 68, 0.1)" };
  };

  const shareSimulatorResult = () => {
    if (simResult === null) return;
    const verdicts = getSharkVerdicts(simResult);
    const yesCount = verdicts.filter(v => v.icon === '✅').length;
    const text = `Maine Shark Tank simulator try kiya!\nMeri implied valuation ₹${simResult.toFixed(2)} crore nikli aur ${yesCount} Sharks ne haan bola!\nTu bhi try kar:\ndesifoundertools.in/shark-tank-glossary`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareQuizResult = () => {
    const text = `Maine Desi Founder Tools ka Shark Tank Quiz try kiya!\nScore: ${quizScore}/5 🦈\nTu kitna karega? Try kar:\ndesifoundertools.in/shark-tank-glossary`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const quizQuestions = [
    {
      q: "Agar pre-money valuation ₹10 crore hai aur Shark ne ₹2 crore invest kiye, toh post-money valuation kya hogi?",
      options: [ {id: 'A', text: "₹8 Crore"}, {id: 'B', text: "₹10 Crore"}, {id: 'C', text: "₹12 Crore"}, {id: 'D', text: "₹2 Crore"} ],
      correct: 'C',
      successText: "✅ Bilkul sahi! Pre + Investment = Post-money. 10+2=12 crore!",
      failText: "❌ Galat! Pre-money MEIN investment JODTEY hain, ghatate nahi!"
    },
    {
      q: "Burn rate kya measure karta hai?",
      options: [ {id: 'A', text: "Company kitne saal purani hai"}, {id: 'B', text: "Har mahine kitna cash kharch hota hai"}, {id: 'C', text: "Revenue kitni tez badhti hai"}, {id: 'D', text: "Profit margin kitna hai"} ],
      correct: 'B',
      successText: "✅ Sahi! Har mahine kitna paisa jalta hai — wahi burn rate!",
      failText: "❌ Nahi yaar! Burn = monthly cash expenditure. Runway calculator try karo!"
    },
    {
      q: "Royalty deal mein Shark kya leta hai?",
      options: [ {id: 'A', text: "Company ka bada hissa"}, {id: 'B', text: "Board seat aur voting rights"}, {id: 'C', text: "Har sale ka X% jab tak fixed amount wapas na aaye"}, {id: 'D', text: "Pure company ka control"} ],
      correct: 'C',
      successText: "✅ Perfect! Royalty = har bikri mein hissa, equity nahi!",
      failText: "❌ Nahi! Royalty mein equity nahi jaati — sirf har sale ka cut milta hai!"
    },
    {
      q: "LTV:CAC 3:1 ka kya matlab hai?",
      options: [ {id: 'A', text: "Company ghate mein hai"}, {id: 'B', text: "Break even ho rahi hai company"}, {id: 'C', text: "Har customer se 3 guna wapas aata hai jo lagaya"}, {id: 'D', text: "Bahut zyada kharch ho raha hai"} ],
      correct: 'C',
      successText: "✅ Investor waala answer! 3:1 = healthy business. Sharks yahi dekhte hain!",
      failText: "❌ Seedha samjho: 1 rupaya lagao, 3 wapas aao. Wahi 3:1 ratio!"
    },
    {
      q: "Bootstrapped startup matlab?",
      options: [ {id: 'A', text: "Government ne fund kiya"}, {id: 'B', text: "Bank loan se chala"}, {id: 'C', text: "Bina bahari investment ke apne paisa se banaya"}, {id: 'D', text: "Foreign investor ne fund kiya"} ],
      correct: 'C',
      successText: "✅ Ekdum sahi! Apna paisa, apna sapna. Sharks ko yeh founders bahut pasand aate hain!",
      failText: "❌ Bootstrapped = self-funded! Koi investor nahi, koi loan nahi — sirf apni mehnat!"
    }
  ];

  const handleQuizAnswer = (optionId) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionId);
    if (optionId === quizQuestions[currentQuestionIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
  };

  return (
    <>
      <section className="hero hero-small">
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🦈 Shark Tank India</h1>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-gold)', marginBottom: '1.5rem', fontWeight: 'vibrant' }}>Explained Like a Laala</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>
            Kabhi Shark Tank dekhte waqt socha — yeh equity-shequity kya hota hai? Valuation ka matlab kya? Yahi sab kuch seedhi Hindi mein.
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="container" style={{ maxWidth: '800px', marginTop: '-1.5rem', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
          <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-gold)', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: '600', border: '1px solid rgba(245, 158, 11, 0.2)' }}>📚 25+ Terms</span>
          <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-gold)', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: '600', border: '1px solid rgba(245, 158, 11, 0.2)' }}>🦈 Shark Tank Season 1–4</span>
          <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-gold)', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: '600', border: '1px solid rgba(245, 158, 11, 0.2)' }}>🇮🇳 Hindi Mein</span>
          <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-gold)', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: '600', border: '1px solid rgba(245, 158, 11, 0.2)' }}>⚡ Free Forever</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          
          {/* SIMULATOR */}
          <div className="simulator-section" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', maxWidth: '1000px', margin: '0 auto 4rem auto', boxShadow: '0 0 20px rgba(245, 158, 11, 0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>🎤 Apna Pitch Try Karo</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Enter karo apne numbers — Sharks kya bolenge?</p>
            </div>
            
            <div className="sim-inputs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Monthly Revenue (₹)</label>
                <input type="number" placeholder="Jaise: 500000" value={simRevenue} onChange={(e) => setSimRevenue(e.target.value)} style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Funding Chahiye (₹)</label>
                <input type="number" placeholder="Jaise: 2000000" value={simFunding} onChange={(e) => setSimFunding(e.target.value)} style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Equity De Rahe Ho (%)</label>
                <input type="number" max="100" placeholder="Jaise: 10" value={simEquity} onChange={(e) => setSimEquity(e.target.value)} style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'white' }} />
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: simResult !== null ? '2.5rem' : '0' }}>
              <button onClick={handlePitchSubmit} style={{ width: '100%', maxWidth: '300px', padding: '1rem', backgroundColor: 'var(--color-gold)', color: '#000', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 'bold', fontSize: '1.125rem', cursor: 'pointer' }}>
                🎤 Pitch Karo!
              </button>
            </div>

            {simResult !== null && (
              <div className="sim-results" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2.5rem', animation: 'fadeIn 0.5s ease' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.75rem', color: 'white', marginBottom: '0.5rem' }}>Teri Implied Valuation: <span style={{ color: 'var(--color-gold)' }}>₹{simResult.toFixed(2)} Crore</span></h3>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  {getSharkVerdicts(simResult).map((shark, idx) => (
                    <div key={idx} style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>{shark.name}</span>
                        <span>{shark.icon}</span>
                      </div>
                      <p style={{ fontStyle: 'italic', fontSize: '0.938rem', color: 'var(--color-text-muted)', margin: 0 }}>&quot;{shark.text}&quot;</p>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-block', backgroundColor: getOverallVerdict(simResult).bg, color: getOverallVerdict(simResult).color, padding: '0.75rem 2rem', borderRadius: 'var(--radius-full)', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '2rem', border: `1px solid ${getOverallVerdict(simResult).color}40` }}>
                    {getOverallVerdict(simResult).text}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/calculators/cap-table-dilution-calculator" className="btn btn-outline" style={{ display: 'block', width: '100%', maxWidth: '350px' }}>
                      📊 Real Cap Table Calculate Karo →
                    </Link>
                    <button onClick={shareSimulatorResult} className="btn" style={{ display: 'block', width: '100%', maxWidth: '350px', backgroundColor: '#25D366', color: '#fff', border: 'none' }}>
                      📲 WhatsApp pe share karo result
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="glossary-controls">
            
            {/* TRENDING CHIPS */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-text)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>🔥 Trending:</span>
                <div className="trending-chips-scroll" style={{ display: 'flex', overflowX: 'auto', gap: '0.75rem', paddingBottom: '0.5rem' }}>
                  {trendingChips.map(chip => (
                    <button key={chip} onClick={() => handleChipClick(chip)} style={{ whiteSpace: 'nowrap', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-gold)', color: 'var(--color-text-muted)', padding: '0.25rem 0.875rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s' }} className="trending-chip">
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="search-wrapper" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
              <input
                type="text"
                placeholder="Koi bhi term dhundo... jaise 'equity' ya 'runway'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glossary-search"
                style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', fontSize: '1rem' }}
              />
            </div>

            <div className="filter-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '4rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="glossary-grid" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', maxWidth: '1000px', margin: '0 auto' }}>
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term, index) => (
                <div key={index} className="term-card" id={`term-${term.name}`} ref={el => termRefs.current[term.name] = el} style={{ position: 'relative' }}>
                  
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${term.difficultyColor}`, color: term.difficultyColor, padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {term.difficulty}
                  </div>

                  <div className="term-header" style={{ marginBottom: '1.25rem' }}>
                    {term.isTrending && (
                      <div style={{ display: 'inline-block', backgroundColor: 'var(--color-gold)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                        🔥 Sabse Zyada Dekha
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--color-text)', marginBottom: '0.5rem', paddingRight: '90px' }}>{term.name}</h3>
                    <span className="term-badge" style={{ fontSize: '0.875rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-gold)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontWeight: '600' }}>{term.category}</span>
                  </div>
                  
                  <hr style={{ borderColor: 'var(--color-border)', margin: '1.5rem 0' }} />
                  
                  <div className="term-body">
                    <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'white' }}>📘 Matlab kya hai:</strong><br /><span style={{ color: 'var(--color-text-muted)' }}>{term.matlab}</span></p>
                    <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--color-gold)' }}>🧔 Laala samjhaate hain:</strong><br /><span style={{ color: 'var(--color-text)', fontStyle: 'italic', lineHeight: '1.5', display: 'block', marginTop: '0.5rem' }}>{term.laala}</span></p>
                    <p style={{ marginBottom: term.calculatorLink ? '1rem' : '0' }}><strong style={{ color: 'white' }}>📺 Shark Tank mein kab suntey ho:</strong><br /><span style={{ color: 'var(--color-text-muted)' }}>{term.sharkTank}</span></p>
                    
                    {term.calculatorLink && (
                      <p style={{ marginTop: '1.5rem', fontWeight: '600' }}>
                        <Link href={term.calculatorLink} style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>
                          🧮 {term.calculatorName} →
                        </Link>
                      </p>
                    )}

                    <ShareButtons termName={term.name} />
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
                <h3>Koi term nahi mila bhai!</h3>
                <p>Kuch aur search karke dekho.</p>
              </div>
            )}
          </div>

          {/* QUIZ SECTION */}
          <div className="quiz-section" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderTop: '4px solid var(--color-gold)', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', maxWidth: '800px', margin: '6rem auto 2rem auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            {!quizFinished ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '2rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>🧠 Kitna Samjhe Shark Tank?</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>5 sawaal — dekho tum kitne bade Shark ho!</p>
                </div>
                
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', color: 'var(--color-gold)', fontWeight: 'bold' }}>
                  <span>Question {currentQuestionIndex + 1} of 5</span>
                  <span>Score: {quizScore}</span>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {quizQuestions[currentQuestionIndex].q}
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {quizQuestions[currentQuestionIndex].options.map(opt => (
                      <button 
                        key={opt.id} 
                        onClick={() => handleQuizAnswer(opt.id)}
                        disabled={selectedAnswer !== null}
                        style={{ 
                          textAlign: 'left', padding: '1rem 1.5rem', borderRadius: 'var(--radius-sm)', 
                          border: '1px solid', backgroundColor: 'rgba(255,255,255,0.02)', fontSize: '1rem',
                          color: 'var(--color-text)', cursor: selectedAnswer === null ? 'pointer' : 'default',
                          borderColor: selectedAnswer === opt.id 
                                        ? (opt.id === quizQuestions[currentQuestionIndex].correct ? '#22c55e' : '#ef4444') 
                                        : (selectedAnswer !== null && opt.id === quizQuestions[currentQuestionIndex].correct ? '#22c55e' : 'var(--color-border)')
                        }}
                      >
                        <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{opt.id}.</span> {opt.text}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedAnswer !== null && (
                  <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-sm)', backgroundColor: selectedAnswer === quizQuestions[currentQuestionIndex].correct ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${selectedAnswer === quizQuestions[currentQuestionIndex].correct ? '#22c55e' : '#ef4444'}`, marginBottom: '1.5rem' }}>
                    <p style={{ margin: 0, color: selectedAnswer === quizQuestions[currentQuestionIndex].correct ? '#22c55e' : '#ef4444', fontWeight: '500' }}>
                      {selectedAnswer === quizQuestions[currentQuestionIndex].correct 
                        ? quizQuestions[currentQuestionIndex].successText 
                        : quizQuestions[currentQuestionIndex].failText}
                    </p>
                  </div>
                )}

                {selectedAnswer !== null && (
                  <button onClick={handleNextQuestion} className="btn" style={{ width: '100%' }}>
                    Agla Sawaal →
                  </button>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-text)', marginBottom: '1rem' }}>Quiz poora hua!</h2>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  {quizScore <= 1 ? '🐟' : quizScore <= 3 ? '🦈' : '🏆'}
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>Score: {quizScore}/5</h3>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
                  {quizScore <= 1 ? "Chhoti Machli! Wapas upar se padho. Shark Tank Season 1 se shuru karo!" : 
                   quizScore <= 3 ? "Rookie Shark! Thoda aur practice karo. Tum acha karte ho!" : 
                   "Poora Shark! Assman Gupta ki kursi ready hai tere liye! Pitch karne aa jao!"}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
                  <button onClick={shareQuizResult} className="btn" style={{ backgroundColor: '#25D366', color: '#fff', border: 'none', width: '100%' }}>
                    📲 Score WhatsApp pe Share Karo!
                  </button>
                  <button onClick={resetQuiz} className="btn-outline" style={{ width: '100%' }}>
                    🔄 Phir Try Karo
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* CALCULATOR SECTION */}
      <section className="section-alt" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Apna Number Calculate Karo 🧮</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
            Ab jab samajh aa gaya — apni startup ki real numbers dekho
          </p>
          
          <div className="tools-grid tools-grid--2col" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <Link href="/calculators/burn-rate-calculator" className="calculator-link-card" style={{ display: 'block', padding: '1.5rem', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
              <h3 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>🔥 Burn Rate Calculator</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.938rem', margin: '0' }}>Calculate your gross and net burn.</p>
            </Link>
            <Link href="/calculators/runway-calculator" className="calculator-link-card" style={{ display: 'block', padding: '1.5rem', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
              <h3 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>⏳ Runway Calculator</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.938rem', margin: '0' }}>Find out how many months of cash you have left.</p>
            </Link>
            <Link href="/calculators/unit-economics-calculator" className="calculator-link-card" style={{ display: 'block', padding: '1.5rem', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
              <h3 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>📈 Unit Economics Calculator</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.938rem', margin: '0' }}>Check your LTV:CAC and profitability.</p>
            </Link>
            <Link href="/calculators/cap-table-dilution-calculator" className="calculator-link-card" style={{ display: 'block', padding: '1.5rem', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
              <h3 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>📊 Cap Table Dilution Calculator</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.938rem', margin: '0' }}>See how much equity you'll lose in your next round.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          ⚠️ Disclaimer: Yeh explanations educational purpose ke liye hain. Funny hai par accurate bhi hai!
        </p>
      </div>
    </>
  );
}

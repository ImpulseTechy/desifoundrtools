'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LaalaCalculatorsPage() {
  // === DUKAAN PROFIT STATE ===
  const [dp, setDp] = useState({ maalKharida: '', maalBecha: '', fixedKharch: '', staffKharch: '' });
  
  const dpBecha = parseFloat(dp.maalBecha) || 0;
  const dpKharida = parseFloat(dp.maalKharida) || 0;
  const dpFixed = parseFloat(dp.fixedKharch) || 0;
  const dpStaff = parseFloat(dp.staffKharch) || 0;

  const dpGrossProfit = dpBecha - dpKharida;
  const dpTotalExpenses = dpFixed + dpStaff;
  const dpNetProfit = dpGrossProfit - dpTotalExpenses;
  const dpMargin = dpBecha > 0 ? ((dpNetProfit / dpBecha) * 100).toFixed(1) : 0;

  // === GST STATE ===
  const [gst, setGst] = useState({ amount: '', type: 'buyer', rate: 18 });
  const gstAmountIn = parseFloat(gst.amount) || 0;
  let gstTotal = 0, gstTax = 0, gstOriginal = 0;
  if (gst.type === 'buyer') {
    gstTax = gstAmountIn * (gst.rate / 100);
    gstTotal = gstAmountIn + gstTax;
    gstOriginal = gstAmountIn;
  } else {
    gstOriginal = gstAmountIn / (1 + gst.rate / 100);
    gstTax = gstAmountIn - gstOriginal;
    gstTotal = gstAmountIn;
  }
  const gstCGST = gstTax / 2;
  const gstSGST = gstTax / 2;

  // === MARKUP STATE ===
  const [mk, setMk] = useState({ cost: '', margin: 20, competitor: '', units: '' });
  const mkCost = parseFloat(mk.cost) || 0;
  const mkMargin = parseFloat(mk.margin) || 0;
  const mkUnits = parseFloat(mk.units) || 0;
  const mkComp = parseFloat(mk.competitor);
  
  const mkSelling = mkCost * (1 + mkMargin / 100);
  const mkProfitPiece = mkSelling - mkCost;
  const mkDailyProfit = mkProfitPiece * mkUnits;
  const mkMonthlyProfit = mkDailyProfit * 26;

  // === EMI STATE ===
  const [emiState, setEmi] = useState({ loan: '', rate: '', duration: 12, income: '' });
  const emiLoan = parseFloat(emiState.loan) || 0;
  const emiRate = parseFloat(emiState.rate) || 0;
  const emiDuration = parseInt(emiState.duration) || 12;
  const emiIncome = parseFloat(emiState.income) || 0;

  const emiMonthlyRate = emiRate / 12 / 100;
  const emiMonthly = emiLoan > 0 && emiMonthlyRate > 0 && emiDuration > 0
    ? (emiLoan * emiMonthlyRate * Math.pow(1 + emiMonthlyRate, emiDuration)) / (Math.pow(1 + emiMonthlyRate, emiDuration) - 1)
    : (emiLoan > 0 && emiDuration > 0 ? emiLoan / emiDuration : 0);
  
  const emiTotalPayment = emiMonthly * emiDuration;
  const emiTotalInterest = emiTotalPayment - emiLoan;
  const emiRatio = emiIncome > 0 ? ((emiMonthly / emiIncome) * 100).toFixed(1) : 0;

  // === STAFF STATE ===
  const [staff, setStaff] = useState({ basic: '', emps: 1, pf: false, esic: false, bonus: '' });
  const stBasic = parseFloat(staff.basic) || 0;
  const stEmps = parseInt(staff.emps) || 1;
  const stBonus = parseFloat(staff.bonus) || 0;
  
  const stPfEmp = staff.pf ? stBasic * 0.12 : 0;
  const stPfEr = staff.pf ? stBasic * 0.13 : 0;
  const stEsicEmp = (staff.esic && stBasic < 21000) ? stBasic * 0.0175 : 0;
  const stEsicEr = staff.esic ? stBasic * 0.0325 : 0;

  const stTakeHome = stBasic - stPfEmp - stEsicEmp + stBonus;
  const stCTC = stBasic + stPfEr + stEsicEr + stBonus;
  const stTotalMonthly = stCTC * stEmps;
  const stTotalYearly = stTotalMonthly * 12;

  // Helpers
  const formatINR = (val) => new Intl.NumberFormat('en-IN').format(Math.round(val));

  const scrollSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="laala-page">
      {/* HERO SECTION */}
      <section className="hero laala-hero">
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧔 Laala Ki Dukaan</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '1.5rem', fontWeight: 'bold' }}>Roz ke kaam ke calculators</p>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Dukaan ke saare hisaab — bilkul seedhe, bilkul Hindi mein. <br/>
            GST se lekar staff salary tak — sab kuch ek jagah. Free mein. Hamesha.
          </p>
          <div className="trust-bar" style={{ justifyContent: 'center' }}>
            <span className="trust-pill">🧮 5 Calculators</span>
            <span className="trust-pill">🇮🇳 Hindi Mein</span>
            <span className="trust-pill">⚡ No Signup</span>
            <span className="trust-pill">₹ INR Based</span>
          </div>
        </div>
      </section>

      {/* STICKY QUICK-JUMP NAV */}
      <div className="laala-sticky-nav">
        <div className="container laala-chips">
          <button onClick={() => scrollSection('dukaan-profit')} className="laala-chip">🏪 Dukaan Profit</button>
          <button onClick={() => scrollSection('gst-calculator')} className="laala-chip">🧾 GST</button>
          <button onClick={() => scrollSection('markup-calculator')} className="laala-chip">📈 Markup</button>
          <button onClick={() => scrollSection('emi-calculator')} className="laala-chip">🏦 EMI</button>
          <button onClick={() => scrollSection('staff-salary')} className="laala-chip">👷 Staff Salary</button>
        </div>
      </div>

      <div className="container laala-calculators-container" style={{ padding: '2rem 1.25rem' }}>
        
        {/* 1. DUKAAN PROFIT */}
        <section id="dukaan-profit" className="laala-calc-section">
          <div className="laala-calc-header">
            <h2>🏪 Dukaan Profit Calculator <span className="laala-badge">🔥 Sabse Popular</span></h2>
            <p>Aaj kitna fayda hua? Roz ka hisaab — ek baar mein. Kitna maal kharida, kitna becha, aur haath mein kya bachha.</p>
          </div>
          
          <div className="calc-layout">
            <div className="calc-inputs">
              <div className="input-group">
                <label>Maal Kharida (₹)</label>
                <input type="number" placeholder="Jaise: 10000" value={dp.maalKharida} onChange={(e) => setDp({...dp, maalKharida: e.target.value})} className="laala-input" />
                <span className="laala-helper">Aaj ka total purchase</span>
              </div>
              <div className="input-group">
                <label>Maal Becha (₹)</label>
                <input type="number" placeholder="Jaise: 15000" value={dp.maalBecha} onChange={(e) => setDp({...dp, maalBecha: e.target.value})} className="laala-input" />
                <span className="laala-helper">Aaj ki total sales</span>
              </div>
              <div className="input-group">
                <label>Kiraya + Bijli (₹)</label>
                <input type="number" placeholder="Jaise: 2000" value={dp.fixedKharch} onChange={(e) => setDp({...dp, fixedKharch: e.target.value})} className="laala-input" />
                <span className="laala-helper">Aaj ka fixed kharch</span>
              </div>
              <div className="input-group">
                <label>Staff Ka Kharch (₹)</label>
                <input type="number" placeholder="Jaise: 1000" value={dp.staffKharch} onChange={(e) => setDp({...dp, staffKharch: e.target.value})} className="laala-input" />
                <span className="laala-helper">Aaj ki staff cost</span>
              </div>
            </div>
            
            <div className="calc-results">
              <div className="laala-grid-2x2">
                <div className="laala-res-card">
                  <div className="laala-res-label">Bechne ke baad</div>
                  <div className="laala-res-val">₹{formatINR(dpGrossProfit)}</div>
                  <div className="laala-res-title">Gross Profit</div>
                </div>
                <div className="laala-res-card">
                  <div className="laala-res-label">Sab expenses</div>
                  <div className="laala-res-val">₹{formatINR(dpTotalExpenses)}</div>
                  <div className="laala-res-title">Total Kharch</div>
                </div>
                <div className="laala-res-card highlight">
                  <div className="laala-res-label">Haath mein aaya</div>
                  <div className="laala-res-val gold">₹{formatINR(dpNetProfit)}</div>
                  <div className="laala-res-title">Net Profit</div>
                </div>
                <div className="laala-res-card">
                  <div className="laala-res-label">Fayda ka percent</div>
                  <div className="laala-res-val">{dpMargin}%</div>
                  <div className="laala-res-title">Profit Margin</div>
                </div>
              </div>
              
              {dpBecha > 0 && (
                <div className={`laala-verdict ${dpNetProfit < 0 ? 'red' : dpMargin < 10 ? 'orange' : dpMargin < 20 ? 'yellow' : dpMargin < 30 ? 'green' : 'gold'}`}>
                  {dpNetProfit < 0 && <><h3>😱 Bhai, aaj tota ho gaya!</h3><p>Kharch zyada hai, kamaai kam. Kal ke liye maal thoda kam mangao aur fixed kharch check karo.</p></>}
                  {dpNetProfit >= 0 && dpMargin < 10 && <><h3>😐 Theek hai... par acha nahi</h3><p>10% se kam margin matlab mushkil chal rahi hai. Selling price badhao ya maal ka cost kam karo.</p></>}
                  {dpMargin >= 10 && dpMargin < 20 && <><h3>👍 Chalao bhai, chalao!</h3><p>20% tak pahunchne ki koshish karo. Ek do cheezein optimize karo.</p></>}
                  {dpMargin >= 20 && dpMargin < 30 && <><h3>😊 Mast chal raha hai dukaan!</h3><p>Yeh margin achha hai. Isko maintain karo aur thoda aur badhao.</p></>}
                  {dpMargin >= 30 && <><h3>🤑 Waah bhai WAAH! Ekdum mast hai!</h3><p>30%+ margin? Tu toh Shark Tank mein jaane layak hai! 🦈</p></>}
                  
                  <div className="laala-target-box">
                    <strong>📊 Kal ka target:</strong><br/>
                    Itna becho toh aaj se 20% zyada fayda hoga: ₹{formatINR(dpBecha * 1.2)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <hr className="laala-separator" />

        {/* 2. GST CALCULATOR */}
        <section id="gst-calculator" className="laala-calc-section">
          <div className="laala-calc-header">
            <h2>🧾 GST Calculator</h2>
            <p>Sarkar ka hissa kitna? GST ka hisaab — seedha aur simple. Buyer ho ya seller — dono ke liye ek hi jagah.</p>
          </div>
          
          <div className="calc-layout">
            <div className="calc-inputs">
              <div className="input-group">
                <label>Amount (₹)</label>
                <input type="number" placeholder="Jaise: 5000" value={gst.amount} onChange={(e) => setGst({...gst, amount: e.target.value})} className="laala-input" />
                <span className="laala-helper">GST ke bina ya saath mein?</span>
              </div>
              <div className="input-group">
                <label>Main hoon:</label>
                <div className="laala-radio-group">
                  <label className="laala-radio">
                    <input type="radio" checked={gst.type === 'buyer'} onChange={() => setGst({...gst, type: 'buyer'})} />
                    <span>🛒 Buyer hoon — GST add karna hai</span>
                  </label>
                  <label className="laala-radio">
                    <input type="radio" checked={gst.type === 'seller'} onChange={() => setGst({...gst, type: 'seller'})} />
                    <span>🏪 Seller hoon — GST nikalna hai</span>
                  </label>
                </div>
              </div>
              <div className="input-group">
                <label>GST Rate:</label>
                <div className="laala-pill-group">
                  <button className={`laala-pill ${gst.rate === 5 ? 'active' : ''}`} onClick={() => setGst({...gst, rate: 5})}>5% <small>Atta, dal, namak</small></button>
                  <button className={`laala-pill ${gst.rate === 12 ? 'active' : ''}`} onClick={() => setGst({...gst, rate: 12})}>12% <small>Kapde, processed food</small></button>
                  <button className={`laala-pill ${gst.rate === 18 ? 'active' : ''}`} onClick={() => setGst({...gst, rate: 18})}>18% <small>Electronics, services</small></button>
                  <button className={`laala-pill ${gst.rate === 28 ? 'active' : ''}`} onClick={() => setGst({...gst, rate: 28})}>28% <small>Car, luxury</small></button>
                </div>
              </div>
            </div>
            
            <div className="calc-results">
              <div className="laala-res-card highlight">
                {gst.type === 'buyer' ? (
                  <>
                    <div className="gst-line"><span>Maal ki asli price:</span> <span>₹{formatINR(gstOriginal)}</span></div>
                    <div className="gst-line"><span>GST ({gst.rate}%):</span> <span>+ ₹{formatINR(gstTax)}</span></div>
                    <hr className="gst-hr"/>
                    <div className="gst-line total"><span>Total dena padega:</span> <span className="gold">₹{formatINR(gstTotal)}</span></div>
                    
                    <div className="gst-breakdown mt-4">
                      <div>CGST ({gst.rate/2}%): ₹{formatINR(gstCGST)}</div>
                      <div>SGST ({gst.rate/2}%): ₹{formatINR(gstSGST)}</div>
                    </div>
                    
                    <div className="laala-tip mt-4">
                      <strong>🧔 Laala bolta hai:</strong> Yeh {gst.rate}% sarkar ka hissa hai. Tu ₹{formatINR(gstOriginal)} ka maal le raha hai toh total ₹{formatINR(gstTotal)} dena padega.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="gst-line"><span>Customer ne diya:</span> <span>₹{formatINR(gstTotal)}</span></div>
                    <div className="gst-line"><span>Usme se GST ({gst.rate}%):</span> <span>- ₹{formatINR(gstTax)}</span></div>
                    <hr className="gst-hr"/>
                    <div className="gst-line total"><span>Tera asli revenue:</span> <span className="gold">₹{formatINR(gstOriginal)}</span></div>
                    
                    <div className="gst-breakdown mt-4">
                      <div>Sarkar ko dena hai: ₹{formatINR(gstTax)}</div>
                      <div>CGST: ₹{formatINR(gstCGST)} | SGST: ₹{formatINR(gstSGST)}</div>
                    </div>
                    
                    <div className="laala-tip mt-4">
                      <strong>🧔 Laala bolta hai:</strong> ₹{formatINR(gstTotal)} tera nahi — usme se ₹{formatINR(gstTax)} sarkar ka hai. Isko side mein rakh de!
                    </div>
                  </>
                )}
              </div>
              
              <div className="laala-gst-table mt-4">
                <h4>Common Items GST Rate:</h4>
                <p>Atta/Dal/Chawal: 0% | Namak/Mirch: 5% | Kapde: 5-12% | Mobile phone: 18% | Restaurant: 5-18% | CA/Lawyer fees: 18% | Car: 28%+</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="laala-separator" />

        {/* 3. MARKUP CALCULATOR */}
        <section id="markup-calculator" className="laala-calc-section">
          <div className="laala-calc-header">
            <h2>📈 Markup & Selling Price</h2>
            <p>Kitne mein bechega toh kitna milega? Sahi daam lagao — na zyada, na kam.</p>
          </div>
          
          <div className="calc-layout">
            <div className="calc-inputs">
              <div className="input-group">
                <label>Maal ka Cost Price (₹)</label>
                <input type="number" placeholder="Jaise: 100" value={mk.cost} onChange={(e) => setMk({...mk, cost: e.target.value})} className="laala-input" />
                <span className="laala-helper">Tujhe kitne mein pada</span>
              </div>
              <div className="input-group">
                <label>Target Profit Chahiye:</label>
                <div className="laala-pill-group sm">
                  {[10, 15, 20, 25, 30].map(m => 
                    <button key={m} className={`laala-pill ${mk.margin === m ? 'active' : ''}`} onClick={() => setMk({...mk, margin: m})}>{m}%</button>
                  )}
                  <input type="number" className="laala-pill-input" placeholder="Custom %" onChange={(e) => setMk({...mk, margin: e.target.value})} value={![10,15,20,25,30].includes(mkMargin) ? mk.margin : ''} />
                </div>
              </div>
              <div className="input-group">
                <label>Competitor Ka Price (₹) <span style={{fontWeight: 'normal', color: 'var(--color-text-muted)'}}>(Optional)</span></label>
                <input type="number" placeholder="Jaise: 140" value={mk.competitor} onChange={(e) => setMk({...mk, competitor: e.target.value})} className="laala-input" />
                <span className="laala-helper">Nearby dukaan kitne mein bech raha hai?</span>
              </div>
              <div className="input-group">
                <label>Aaj kitne pieces bechega?</label>
                <input type="number" placeholder="Jaise: 50" value={mk.units} onChange={(e) => setMk({...mk, units: e.target.value})} className="laala-input" />
              </div>
            </div>
            
            <div className="calc-results">
              <div className="laala-res-card highlight-main">
                <div className="laala-res-label">Tera Sahi Selling Price:</div>
                <div className="laala-res-val gold huge">₹{formatINR(mkSelling)}</div>
              </div>
              
              <div className="laala-res-stats mt-4">
                <div>Profit per piece: <strong>₹{formatINR(mkProfitPiece)}</strong></div>
                <div>Aaj ka total profit: <strong>₹{formatINR(mkDailyProfit)}</strong></div>
                <div>Mahine ka expected profit: <strong>₹{formatINR(mkMonthlyProfit)}</strong></div>
              </div>
              
              {!isNaN(mkComp) && mkComp > 0 && (
                <div className="laala-comp-card mt-4">
                  {mkSelling < mkComp && <><span className="icon">✅</span> Tu competitor se ₹{formatINR(mkComp - mkSelling)} sasta hai! Thoda margin badha sakta hai.</>}
                  {mkSelling === mkComp && <><span className="icon">⚖️</span> Same price hai competitor se.</>}
                  {mkSelling > mkComp && <><span className="icon">⚠️</span> Tu competitor se ₹{formatINR(mkSelling - mkComp)} mahanga hai. Price check karo ya value add karo.</>}
                </div>
              )}
              
              {mkCost > 0 && (
                <div className={`laala-verdict mt-4 ${mkMargin < 10 ? 'red' : mkMargin < 20 ? 'yellow' : mkMargin < 30 ? 'green' : 'gold'}`}>
                  {mkMargin < 10 && <p>😬 Bhai, margin bahut kam hai. Cost price check kar — kuch sasta milega kya?</p>}
                  {mkMargin >= 10 && mkMargin < 20 && <p>👍 Theek hai. Par aur badhega toh aur maza aayega!</p>}
                  {mkMargin >= 20 && mkMargin < 30 && <p>😊 Mast margin hai bhai! Dukaan chalti rahegi.</p>}
                  {mkMargin >= 30 && <p>🤑 Arre wah! Tu toh businessman of the year hai!</p>}
                </div>
              )}
            </div>
          </div>
        </section>
        
        <hr className="laala-separator" />
        
        {/* 4. EMI CALCULATOR */}
        <section id="emi-calculator" className="laala-calc-section">
          <div className="laala-calc-header">
            <h2>🏦 EMI Calculator</h2>
            <p>Loan ki kist kitni banti hai? Bank loan, CC limit, ya koi bhi udhaar — monthly kist ka seedha hisaab.</p>
          </div>
          
          <div className="calc-layout">
            <div className="calc-inputs">
              <div className="input-group">
                <label>Loan Amount (₹)</label>
                <input type="number" placeholder="Jaise: 500000" value={emiState.loan} onChange={(e) => setEmi({...emiState, loan: e.target.value})} className="laala-input" />
                <span className="laala-helper">Kitna udhaar chahiye?</span>
              </div>
              <div className="input-group">
                <label>Interest Rate (% per year)</label>
                <input type="number" placeholder="Jaise: 12" value={emiState.rate} onChange={(e) => setEmi({...emiState, rate: e.target.value})} className="laala-input" />
                <div className="laala-pill-group xs mt-2">
                  {[8, 10, 12, 18, 24].map(r => 
                    <button key={r} className="laala-pill outline" onClick={() => setEmi({...emiState, rate: r})}>{r}% {r===8?'(Home)':r===10?'(Gold)':r===12?'(Personal)':r===18?'(CC)':'(NBFC)'}</button>
                  )}
                </div>
              </div>
              <div className="input-group">
                <label>Loan Duration</label>
                <div className="laala-pill-group sm">
                  {[6, 12, 24, 36, 48, 60].map(d => 
                    <button key={d} className={`laala-pill ${emiState.duration === d ? 'active' : ''}`} onClick={() => setEmi({...emiState, duration: d})}>{d}m</button>
                  )}
                </div>
              </div>
              <div className="input-group">
                <label>Teri Monthly Income (₹)</label>
                <input type="number" placeholder="Jaise: 50000" value={emiState.income} onChange={(e) => setEmi({...emiState, income: e.target.value})} className="laala-input" />
                <span className="laala-helper">Afford kar sakta hai ya nahi — check karunga</span>
              </div>
            </div>
            
            <div className="calc-results">
              <div className="laala-res-card highlight-main gold-border">
                <div className="laala-res-label">Teri Monthly EMI:</div>
                <div className="laala-res-val gold huge">₹{formatINR(emiMonthly)}</div>
              </div>
              
              <div className="laala-res-stats mt-4">
                <div>Total amount dena padega: <strong>₹{formatINR(emiTotalPayment)}</strong></div>
                <div>Sirf interest mein jayega: <strong className="text-red">₹{formatINR(emiTotalInterest)}</strong></div>
                <div>Loan duration: <strong>{emiDuration} months</strong></div>
              </div>
              
              {emiLoan > 0 && emiMonthly > 0 && (
                <>
                  <div className="laala-bar mt-4">
                    <div className="laala-bar-fill principal" style={{width: `${(emiLoan/emiTotalPayment)*100}%`}}></div>
                    <div className="laala-bar-fill interest" style={{width: `${(emiTotalInterest/emiTotalPayment)*100}%`}}></div>
                  </div>
                  <div className="laala-bar-legend text-sm mt-1 text-muted text-center" style={{fontSize: '0.85rem'}}>
                    <span style={{color: '#3b82f6'}}>■</span> Principal: ₹{formatINR(emiLoan)} &nbsp;|&nbsp; 
                    <span style={{color: '#ef4444'}}>■</span> Interest: ₹{formatINR(emiTotalInterest)}
                  </div>
                </>
              )}

              {emiIncome > 0 && (
                <div className={`laala-verdict mt-4 ${emiRatio < 30 ? 'green' : emiRatio < 50 ? 'yellow' : 'red'}`}>
                  {emiRatio < 30 && <><h3 style={{margin:0}}>✅ Afford ho jayega!</h3><p style={{margin:0}}>EMI teri income ka sirf {emiRatio}% hai. Comfortable zone mein hai.</p></>}
                  {emiRatio >= 30 && emiRatio < 50 && <><h3 style={{margin:0}}>⚠️ Thoda tight rahega</h3><p style={{margin:0}}>EMI teri income ka {emiRatio}% hai. Baaki kharchon ka dhyan rakhna.</p></>}
                  {emiRatio >= 50 && <><h3 style={{margin:0}}>❌ Bhai mat le yeh loan!</h3><p style={{margin:0}}>EMI teri income ka {emiRatio}% hai. Bahut zyada hai — ya loan kam lo ya duration badao.</p></>}
                </div>
              )}
            </div>
          </div>
        </section>

        <hr className="laala-separator" />
        
        {/* 5. STAFF SALARY CALCULATOR */}
        <section id="staff-salary" className="laala-calc-section">
          <div className="laala-calc-header">
            <h2>👷 Staff Salary Calculator</h2>
            <p>Kaam waale ko kitna dena padega? Basic salary se lekar PF, ESIC aur actual cost — sab ek baar mein calculate karo.</p>
          </div>
          
          <div className="calc-layout">
            <div className="calc-inputs">
              <div className="input-group">
                <label>Basic Salary (₹ per month)</label>
                <input type="number" placeholder="Jaise: 15000" value={staff.basic} onChange={(e) => setStaff({...staff, basic: e.target.value})} className="laala-input" />
                <span className="laala-helper">Jo tum dene ki soch rahe ho</span>
              </div>
              <div className="input-group">
                <label>Number of Employees</label>
                <input type="number" placeholder="Jaise: 3" value={staff.emps} onChange={(e) => setStaff({...staff, emps: e.target.value})} className="laala-input" />
              </div>
              
              <div className="laala-toggle-row">
                <div className="laala-toggle-info">
                  <label>PF Applicable?</label>
                  <span>20+ employees toh mandatory</span>
                </div>
                <label className="laala-switch">
                  <input type="checkbox" checked={staff.pf} onChange={(e) => setStaff({...staff, pf: e.target.checked})} />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="laala-toggle-row">
                <div className="laala-toggle-info">
                  <label>ESIC Applicable?</label>
                  <span>Salary ₹21,000 se kam toh applicable</span>
                </div>
                <label className="laala-switch">
                  <input type="checkbox" checked={staff.esic} onChange={(e) => setStaff({...staff, esic: e.target.checked})} />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="input-group">
                <label>Bonus/Incentive (₹) <span style={{fontWeight: 'normal', color: 'var(--color-text-muted)'}}>(Optional)</span></label>
                <input type="number" placeholder="Jaise: 1000" value={staff.bonus} onChange={(e) => setStaff({...staff, bonus: e.target.value})} className="laala-input" />
              </div>
            </div>
            
            <div className="calc-results">
              <div className="laala-salary-breakdown">
                <div className="laala-salary-col">
                  <h4>Jo employee dekhta hai:</h4>
                  <div className="gst-line"><span>Basic:</span> <span>₹{formatINR(stBasic)}</span></div>
                  {staff.pf && <div className="gst-line text-red"><span>(-) PF:</span> <span>₹{formatINR(stPfEmp)}</span></div>}
                  {staff.esic && <div className="gst-line text-red"><span>(-) ESIC:</span> <span>₹{formatINR(stEsicEmp)}</span></div>}
                  {stBonus > 0 && <div className="gst-line text-green"><span>(+) Bonus:</span> <span>₹{formatINR(stBonus)}</span></div>}
                  <hr className="gst-hr"/>
                  <div className="gst-line total"><span>Take Home:</span> <span className="text-green">₹{formatINR(stTakeHome)}</span></div>
                </div>
                
                <div className="laala-salary-col ctc-box mt-4">
                  <h4>Jo TUJHE dena padega:</h4>
                  <div className="gst-line"><span>Basic:</span> <span>₹{formatINR(stBasic)}</span></div>
                  {staff.pf && <div className="gst-line"><span>(+) PF (Employer):</span> <span>₹{formatINR(stPfEr)}</span></div>}
                  {staff.esic && <div className="gst-line"><span>(+) ESIC (Employer):</span> <span>₹{formatINR(stEsicEr)}</span></div>}
                  {stBonus > 0 && <div className="gst-line"><span>(+) Bonus:</span> <span>₹{formatINR(stBonus)}</span></div>}
                  <hr className="gst-hr"/>
                  <div className="gst-line total summary"><span>Asli Cost Per Employee:</span> <span className="gold">₹{formatINR(stCTC)}</span></div>
                </div>
              </div>

              {stEmps > 1 && (
                <div className="laala-res-stats mt-4">
                  <div><strong>{stEmps} employees ka total:</strong></div>
                  <div>Monthly Total: <strong>₹{formatINR(stTotalMonthly)}</strong></div>
                  <div>Yearly Total: <strong>₹{formatINR(stTotalYearly)}</strong></div>
                </div>
              )}

              {stBasic > 0 && stCTC > stBasic * 1.1 && (
                <div className="laala-tip mt-4">
                  <strong>🧔 Laala bolta hai:</strong> Tu ₹{formatINR(stBasic)} maan ke chal raha tha par asli kharch ₹{formatINR(stCTC)} hai! {formatINR(stCTC - stBasic)} extra hai bhai.
                </div>
              )}
              
              <div className="laala-tip mt-4" style={{background: 'rgba(255,255,255,0.05)', border: 'none'}}>
                💡 <strong>Yaad rakh:</strong> Ye sirf salary ka kharch hai. Iske upar training, uniform, chai-paani alag se!
                <br/><br/>
                <small className="text-muted">⚠️ Note: PF mandatory hai agar 20+ employees hain. ESIC mandatory hai agar salary ₹21,000 se kam hai. CA se confirm karo apni situation.</small>
              </div>
            </div>
          </div>
        </section>
        
        {/* BOTTOM SECTIONS */}
        <hr className="laala-separator" />
        
        <div className="laala-bottom-sections">
          <div className="laala-bottom-card text-center">
            <h3>Dukaan se Startup tak? 🚀</h3>
            <p className="text-muted">Jab dukaan bade company ban jaaye — yeh tools kaam aayenge</p>
            <div className="laala-pill-group sm" style={{justifyContent: 'center', marginTop: '1rem'}}>
              <Link href="/calculators/burn-rate-calculator" className="laala-pill active">Burn Rate</Link>
              <Link href="/calculators/unit-economics-calculator" className="laala-pill active">Unit Economics</Link>
              <Link href="/calculators/break-even-calculator" className="laala-pill active">Break-Even</Link>
            </div>
          </div>
          
          <div className="laala-bottom-card text-center mt-4">
            <h3>🦈 Shark Tank samajhna hai?</h3>
            <p className="text-muted">Saare business terms — laala style mein</p>
            <Link href="/shark-tank-glossary" className="btn btn-outline" style={{marginTop: '1rem'}}>Glossary Dekho →</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

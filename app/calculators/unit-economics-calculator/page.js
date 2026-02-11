'use client';

import { useState } from 'react';
import CurrencyInput from '../../components/CurrencyInput';
import FAQ from '../../components/FAQ';
import AdPlaceholder from '../../components/AdPlaceholder';
import PremiumCTA from '../../components/PremiumCTA';
import InternalLinks from '../../components/InternalLinks';
import InsightCard from '../../components/InsightCard';
import Link from 'next/link';

/* ── helpers ── */
const fmt = (v) => {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return '₹' + Number(Math.round(v)).toLocaleString('en-IN');
};

const pct = (v) => {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return Number(v).toFixed(1) + '%';
};

const num = (v) => (v === '' || v === undefined ? null : Number(v));

/* ── Tooltip ── */
function Tooltip({ text }) {
    return (
        <span className="ue-tooltip-wrap">
            <svg className="ue-tooltip-icon" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7V7h2v5zm0-6H7V4h2v2z" />
            </svg>
            <span className="ue-tooltip-text">{text}</span>
        </span>
    );
}

/* ── Collapsible Section ── */
function Section({ title, color, open, onToggle, children }) {
    return (
        <div className="ue-section">
            <button className="ue-section-header" onClick={onToggle} type="button">
                <span className="ue-section-title">
                    <span className={`ue-section-dot ${color}`} />
                    <span>{title}</span>
                </span>
                <svg className={`ue-section-chevron ${open ? 'open' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {open && <div className="ue-section-body">{children}</div>}
        </div>
    );
}

/* ── Result Card ── */
function ResultCard({ label, value, tooltip, status }) {
    return (
        <div className={`ue-result-card ${status || ''}`}>
            <div className="ue-result-label">
                {label}
                {tooltip && <Tooltip text={tooltip} />}
            </div>
            <div className="ue-result-value">{value}</div>
        </div>
    );
}

/* ────────────── MAIN COMPONENT ────────────── */
export default function UnitEconomicsCalculator() {
    /* Mode */
    const [startupType, setStartupType] = useState('d2c');
    const [advanced, setAdvanced] = useState(false);

    /* Section toggles */
    const [sec1, setSec1] = useState(true);
    const [sec2, setSec2] = useState(true);
    const [sec3, setSec3] = useState(true);
    const [sec4, setSec4] = useState(false);

    /* Revenue */
    const [sellingPrice, setSellingPrice] = useState('');
    const [aov, setAov] = useState('');
    const [monthlyCustomers, setMonthlyCustomers] = useState('');
    const [repeatPurchases, setRepeatPurchases] = useState('');

    /* Variable Costs */
    const [cogs, setCogs] = useState('');
    const [gatewayFee, setGatewayFee] = useState('2');
    const [shippingCost, setShippingCost] = useState('');
    const [packagingCost, setPackagingCost] = useState('');
    const [returnsRate, setReturnsRate] = useState('');
    const [otherVariable, setOtherVariable] = useState('');

    /* SaaS specifics */
    const [churnRate, setChurnRate] = useState('');

    /* Hardware specifics */
    const [bomCost, setBomCost] = useState('');
    const [mfgCost, setMfgCost] = useState('');

    /* Acquisition */
    const [marketingSpend, setMarketingSpend] = useState('');
    const [newCustomers, setNewCustomers] = useState('');

    /* Retention & Lifetime */
    const [grossMarginOverride, setGrossMarginOverride] = useState('');
    const [customerLifetime, setCustomerLifetime] = useState('');
    const [fixedCosts, setFixedCosts] = useState('');

    /* ── Calculations ── */
    const sp = num(sellingPrice);
    const av = num(aov) || sp;
    const mc = num(monthlyCustomers);
    const rp = num(repeatPurchases) || 1;

    // Variable cost
    const cogsVal = num(cogs) || 0;
    const gwFee = sp ? sp * (num(gatewayFee) || 0) / 100 : 0;
    const ship = num(shippingCost) || 0;
    const pack = num(packagingCost) || 0;
    const retRate = (num(returnsRate) || 0) / 100;
    const otherVar = num(otherVariable) || 0;
    const bomVal = num(bomCost) || 0;
    const mfgVal = num(mfgCost) || 0;

    let totalVariableCost = cogsVal + gwFee + ship + pack + otherVar;
    if (startupType === 'hardware') totalVariableCost += bomVal + mfgVal;
    const returnsCost = sp ? sp * retRate : 0;
    totalVariableCost += returnsCost;

    const contributionMargin = sp !== null ? sp - totalVariableCost : null;
    const contributionMarginPct = sp && sp > 0 ? (contributionMargin / sp) * 100 : null;

    // CAC
    const ms = num(marketingSpend);
    const nc = num(newCustomers);
    const cac = ms !== null && nc !== null && nc > 0 ? ms / nc : null;

    // Gross Margin
    const gmOverride = num(grossMarginOverride);
    const grossMarginPct = gmOverride !== null ? gmOverride : contributionMarginPct;

    // Customer Lifetime
    let cl = num(customerLifetime);
    if (cl === null && startupType === 'saas' && num(churnRate) && num(churnRate) > 0) {
        cl = 1 / (num(churnRate) / 100);
    }
    if (cl === null) cl = rp > 1 ? rp * 3 : 12; // default

    // LTV
    const revenuePerCustomer = av || sp;
    const ltv =
        revenuePerCustomer && grossMarginPct
            ? revenuePerCustomer * (grossMarginPct / 100) * cl
            : null;

    // LTV:CAC
    const ltvCacRatio = ltv && cac && cac > 0 ? ltv / cac : null;
    const ltvCacStatus =
        ltvCacRatio === null ? '' : ltvCacRatio >= 3 ? 'healthy' : ltvCacRatio >= 1 ? 'warning' : 'danger';

    // Payback
    const paybackMonths =
        cac && contributionMargin && contributionMargin > 0
            ? cac / contributionMargin
            : null;

    // Monthly
    const monthlyRevenue = mc && revenuePerCustomer ? mc * revenuePerCustomer : null;
    const monthlyGrossProfit =
        monthlyRevenue && grossMarginPct ? monthlyRevenue * (grossMarginPct / 100) : null;
    const fc = num(fixedCosts) || 0;
    const monthlyNetProfit = monthlyGrossProfit !== null ? monthlyGrossProfit - fc : null;

    // Break-even
    const breakEvenCustomers =
        contributionMargin && contributionMargin > 0 && fc > 0
            ? Math.ceil(fc / contributionMargin)
            : null;


    /* ── Consultant Logic ── */
    const getInsight = () => {
        if (!ltvCacRatio) return null;

        // SCENARIO 1: LTV:CAC > 3 (Excellent)
        if (ltvCacRatio >= 3) {
            return {
                type: 'good',
                verdict: 'Investable Unit Economics 🚀',
                text: `Your LTV:CAC of ${ltvCacRatio.toFixed(1)}x is strong. Investors love seeing >3x because it means you generate ₹3 of value for every ₹1 spent on acquisition.`,
                steps: [
                    'Aggressively scale your marketing budget.',
                    'Experiment with new, more expensive channels (e.g., LinkedIn Ads, Influencers).',
                    'Focus on reducing payback period to improve cash flow.'
                ]
            };
        }

        // SCENARIO 2: LTV:CAC 1 - 3 (Warning)
        if (ltvCacRatio >= 1 && ltvCacRatio < 3) {
            return {
                type: 'warning',
                verdict: 'Optimization Needed ⚠️',
                text: `Your LTV:CAC of ${ltvCacRatio.toFixed(1)}x is okay for early stage, but not ready for scaling. You are burning cash safely, but not efficiently enough for Series A.`,
                steps: [
                    'Increase LTV by improving retention or upselling.',
                    'Decrease CAC by refining audience targeting.',
                    'Test pricing elasticity — can you charge more?'
                ]
            };
        }

        // SCENARIO 3: LTV:CAC < 1 (Broken)
        return {
            type: 'bad',
            verdict: 'Negative Unit Economics 🛑',
            text: `You are losing money on every customer you acquire (LTV:CAC ${ltvCacRatio.toFixed(1)}x). Scaling now effectively burns cash faster with no return.`,
            steps: [
                'Stop paid acquisition immediately.',
                'Fix your gross margins or pricing model.',
                'Rely solely on organic growth until LTV > CAC.'
            ]
        };
    };

    const insight = getInsight();


    /* ── FAQ ── */
    const faqItems = [
        {
            question: 'What are unit economics and why should I care?',
            answer: 'Unit economics measures the direct revenues and costs associated with a single unit of your business (a customer, a product, or a transaction). Positive unit economics means you make money on each unit — the foundation of a scalable business.',
        },
        {
            question: 'What is a good LTV:CAC ratio for Indian startups?',
            answer: 'A ratio of 3:1 or higher is generally considered healthy. It means you earn ₹3 for every ₹1 spent on acquisition. Below 1:1 means you are losing money on every customer acquired.',
        },
        {
            question: 'How is CAC different from CPA?',
            answer: 'CAC (Customer Acquisition Cost) includes all marketing and sales expenses divided by new customers. CPA (Cost Per Acquisition) usually refers to a single campaign or channel cost. CAC is the more comprehensive metric that investors look at.',
        },
        {
            question: 'Should I include team salaries in CAC?',
            answer: 'Yes, a fully-loaded CAC includes marketing spend, sales team salaries, tools, and agency fees. The simple version (marketing spend / new customers) is useful for quick checks, but investors prefer the fully-loaded version.',
        },
        {
            question: 'What is a good payback period?',
            answer: 'For most Indian startups, a payback period under 12 months is healthy. SaaS companies aim for under 18 months. If your payback period exceeds 24 months, you may need to optimize either pricing, costs, or acquisition channels.',
        },
        {
            question: 'How do I calculate LTV for a subscription SaaS business?',
            answer: 'For SaaS: LTV = ARPU × Gross Margin % × Customer Lifetime. Customer Lifetime = 1 / Monthly Churn Rate. For example, if your ARPU is ₹2,000/month, gross margin is 80%, and monthly churn is 5%, then LTV = ₹2,000 × 0.80 × 20 months = ₹32,000.',
        },
        {
            question: 'Why are my unit economics different for D2C vs SaaS vs Hardware?',
            answer: 'Each model has different cost structures. D2C has shipping, returns, and packaging. SaaS has near-zero marginal costs but higher acquisition costs. Hardware has BOM, manufacturing, and inventory costs. This calculator adapts inputs based on your startup type.',
        },
        {
            question: 'How often should I re-calculate unit economics?',
            answer: 'Monthly. As your pricing, costs, and acquisition channels evolve, your unit economics will change. Monthly reviews help you catch negative trends early and optimize proactively.',
        },
    ];

    return (
        <div className="calc-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="breadcrumb-sep">/</span>
                    <Link href="/#calculators">Calculators</Link>
                    <span className="breadcrumb-sep">/</span>
                    <span>Unit Economics Calculator</span>
                </div>

                <h1>Unit Economics Calculator for Startups</h1>
                <p className="calc-subtitle">
                    Understand your CAC, LTV, contribution margin, and profitability in one structured view.
                </p>

                {/* Controls */}
                <div className="ue-controls">
                    <div className="ue-select-group">
                        <label>Startup Type</label>
                        <select value={startupType} onChange={(e) => setStartupType(e.target.value)}>
                            <option value="d2c">D2C / E-commerce</option>
                            <option value="saas">SaaS</option>
                            <option value="hardware">Hardware</option>
                        </select>
                    </div>
                    <div className="ue-select-group">
                        <label>&nbsp;</label>
                        <button
                            className="ue-advanced-toggle"
                            onClick={() => setAdvanced(!advanced)}
                            style={{ margin: 0, width: '100%', justifyContent: 'center' }}
                        >
                            {advanced ? '✕ Basic Mode' : '⚙ Advanced Mode'}
                        </button>
                    </div>
                </div>

                {/* Calculator */}
                <div className="ue-calc-layout">
                    {/* LEFT: Inputs */}
                    <div>
                        {/* Section 1: Revenue */}
                        <Section title="Revenue Inputs" color="green" open={sec1} onToggle={() => setSec1(!sec1)}>
                            <CurrencyInput label="Selling Price per Unit (₹)" value={sellingPrice} onChange={setSellingPrice} placeholder="e.g. 999" />
                            {advanced && (
                                <CurrencyInput label="Average Order Value (₹)" value={aov} onChange={setAov} placeholder="e.g. 1200" />
                            )}
                            <CurrencyInput label="Monthly Customers" value={monthlyCustomers} onChange={setMonthlyCustomers} prefix="" placeholder="e.g. 500" />
                            {advanced && (
                                <CurrencyInput label="Avg. Repeat Purchases per Customer" value={repeatPurchases} onChange={setRepeatPurchases} prefix="" placeholder="e.g. 3" />
                            )}
                        </Section>

                        {/* Section 2: Variable Costs */}
                        <Section title="Variable Costs per Unit" color="blue" open={sec2} onToggle={() => setSec2(!sec2)}>
                            {startupType === 'hardware' ? (
                                <>
                                    <CurrencyInput label="BOM Cost per Unit (₹)" value={bomCost} onChange={setBomCost} placeholder="e.g. 500" />
                                    <CurrencyInput label="Manufacturing Cost per Unit (₹)" value={mfgCost} onChange={setMfgCost} placeholder="e.g. 200" />
                                </>
                            ) : (
                                <CurrencyInput label="Cost of Goods Sold per Unit (₹)" value={cogs} onChange={setCogs} placeholder="e.g. 300" />
                            )}
                            <CurrencyInput label="Payment Gateway Fee (%)" value={gatewayFee} onChange={setGatewayFee} prefix="" suffix="%" placeholder="2" />
                            {(startupType === 'd2c' || startupType === 'hardware') && (
                                <>
                                    <CurrencyInput label="Shipping Cost per Unit (₹)" value={shippingCost} onChange={setShippingCost} placeholder="e.g. 60" />
                                    <CurrencyInput label="Packaging Cost per Unit (₹)" value={packagingCost} onChange={setPackagingCost} placeholder="e.g. 25" />
                                </>
                            )}
                            {startupType === 'd2c' && (
                                <CurrencyInput label="Returns Rate (%)" value={returnsRate} onChange={setReturnsRate} prefix="" suffix="%" placeholder="e.g. 10" />
                            )}
                            {advanced && (
                                <CurrencyInput label="Other Variable Costs (₹)" value={otherVariable} onChange={setOtherVariable} placeholder="e.g. 20" />
                            )}
                        </Section>

                        {/* Section 3: Customer Acquisition */}
                        <Section title="Customer Acquisition" color="yellow" open={sec3} onToggle={() => setSec3(!sec3)}>
                            <CurrencyInput label="Monthly Marketing Spend (₹)" value={marketingSpend} onChange={setMarketingSpend} placeholder="e.g. 200000" />
                            <CurrencyInput label="New Customers Acquired (monthly)" value={newCustomers} onChange={setNewCustomers} prefix="" placeholder="e.g. 100" />
                            {startupType === 'saas' && (
                                <CurrencyInput label="Monthly Churn Rate (%)" value={churnRate} onChange={setChurnRate} prefix="" suffix="%" placeholder="e.g. 5" />
                            )}
                        </Section>

                        {/* Section 4: Retention & Lifetime */}
                        <Section title="Retention & Lifetime" color="purple" open={sec4} onToggle={() => setSec4(!sec4)}>
                            <CurrencyInput label="Gross Margin % (optional override)" value={grossMarginOverride} onChange={setGrossMarginOverride} prefix="" suffix="%" placeholder="auto-calculated" />
                            <CurrencyInput label="Customer Lifetime (months)" value={customerLifetime} onChange={setCustomerLifetime} prefix="" placeholder={startupType === 'saas' && num(churnRate) ? 'from churn rate' : 'e.g. 24'} />
                            {advanced && (
                                <CurrencyInput label="Monthly Fixed Costs (₹)" value={fixedCosts} onChange={setFixedCosts} placeholder="e.g. 300000" />
                            )}
                        </Section>
                    </div>

                    {/* RIGHT: Results */}
                    <div>
                        <div className="ue-results-header">📊 Results</div>
                        <div className="ue-results-grid">
                            <ResultCard
                                label="Contribution Margin"
                                value={contributionMargin !== null ? fmt(contributionMargin) : '—'}
                                tooltip="Revenue minus all variable costs per unit. Higher is better."
                                status={contributionMargin !== null ? (contributionMargin > 0 ? 'healthy' : 'danger') : ''}
                            />
                            <ResultCard
                                label="Contribution Margin %"
                                value={contributionMarginPct !== null ? pct(contributionMarginPct) : '—'}
                                tooltip="Contribution margin as a percentage of selling price."
                                status={contributionMarginPct !== null ? (contributionMarginPct > 30 ? 'healthy' : contributionMarginPct > 0 ? 'warning' : 'danger') : ''}
                            />
                            <ResultCard
                                label="CAC"
                                value={cac !== null ? fmt(cac) : '—'}
                                tooltip="Customer Acquisition Cost = Marketing Spend / New Customers."
                            />
                            <ResultCard
                                label="LTV"
                                value={ltv !== null ? fmt(ltv) : '—'}
                                tooltip="Lifetime Value = Revenue per Customer × Gross Margin × Customer Lifetime."
                                status={ltv !== null && cac !== null ? (ltv > cac * 3 ? 'healthy' : ltv > cac ? 'warning' : 'danger') : ''}
                            />
                            <ResultCard
                                label="LTV : CAC"
                                value={ltvCacRatio !== null ? ltvCacRatio.toFixed(2) + 'x' : '—'}
                                tooltip="Healthy ratio is 3:1 or higher. Below 1:1 means unsustainable."
                                status={ltvCacStatus}
                            />
                            <ResultCard
                                label="Payback Period"
                                value={paybackMonths !== null ? paybackMonths.toFixed(1) + ' mo' : '—'}
                                tooltip="Months to recover your customer acquisition cost from contribution margin."
                                status={paybackMonths !== null ? (paybackMonths <= 12 ? 'healthy' : paybackMonths <= 24 ? 'warning' : 'danger') : ''}
                            />
                            <ResultCard
                                label="Monthly Gross Profit"
                                value={monthlyGrossProfit !== null ? fmt(monthlyGrossProfit) : '—'}
                                tooltip="Monthly revenue × gross margin percentage."
                                status={monthlyGrossProfit !== null ? (monthlyGrossProfit > 0 ? 'healthy' : 'danger') : ''}
                            />
                            <ResultCard
                                label="Monthly Net Profit"
                                value={monthlyNetProfit !== null ? fmt(monthlyNetProfit) : '—'}
                                tooltip="Monthly gross profit minus fixed costs."
                                status={monthlyNetProfit !== null ? (monthlyNetProfit > 0 ? 'healthy' : 'danger') : ''}
                            />
                            {advanced && breakEvenCustomers !== null && (
                                <ResultCard
                                    label="Break-even Customers"
                                    value={breakEvenCustomers.toLocaleString('en-IN')}
                                    tooltip="Number of customers needed to cover your fixed costs."
                                />
                            )}
                            <ResultCard
                                label="Total Variable Cost"
                                value={sp !== null ? fmt(totalVariableCost) : '—'}
                                tooltip="Sum of all per-unit variable costs."
                            />
                        </div>

                        {/* Replaced old LTV:CAC indicator with InsightCard */}
                        <InsightCard insight={insight} />

                        {/* Download CTA */}
                        <div className="ue-download-cta">
                            <p>📥 Download Detailed Financial Model (Coming Soon)</p>
                            <button className="btn btn-outline" disabled>Coming Soon</button>
                        </div>
                    </div>
                </div>

                <AdPlaceholder />

                {/* ── EDUCATIONAL CONTENT ── */}
                <div className="content-section">
                    <h2>What is Unit Economics?</h2>
                    <p>
                        Unit economics is a framework for understanding the fundamental financial health of your startup by analysing the revenue and costs associated with a single "unit" of your business. Depending on your model, a unit could be one customer, one product sold, or one subscription. If your unit economics are positive — meaning you make more from each unit than you spend — your business has the foundation to scale profitably. If they are negative, scaling will only accelerate your losses.
                    </p>
                    <p>
                        For Indian founders, unit economics is especially important because most early-stage capital is limited. Whether you are bootstrapping from personal savings, running a startup from a college hostel, or working with an angel round of ₹25–50 lakhs, every rupee matters. Understanding your CAC, LTV, contribution margin, and payback period gives you the financial clarity to make smart decisions about pricing, marketing spend, and growth.
                    </p>

                    <h2>Why Unit Economics Matters for Indian Founders</h2>
                    <p>
                        India's startup ecosystem has matured significantly. Investors are no longer just looking at GMV or revenue growth — they want to see a clear path to profitability. After the funding winter of 2022–2023, Indian VCs like Peak XV (formerly Sequoia), Accel, and Matrix Partners have shifted their evaluation criteria towards sustainable unit economics.
                    </p>
                    <p>
                        For founders, this means you need to answer these questions clearly:
                    </p>
                    <ul>
                        <li><strong>How much does it cost to acquire a customer?</strong> (CAC)</li>
                        <li><strong>How much revenue does each customer generate over their lifetime?</strong> (LTV)</li>
                        <li><strong>How long does it take to recover acquisition costs?</strong> (Payback period)</li>
                        <li><strong>How much profit do you make per unit sold?</strong> (Contribution margin)</li>
                    </ul>
                    <p>
                        If you cannot answer these confidently, you are flying blind. This calculator helps you structure these answers using real numbers.
                    </p>

                    <h2>Common Mistakes in Calculating CAC</h2>
                    <p>
                        Customer Acquisition Cost seems straightforward — divide marketing spend by new customers. But Indian founders frequently make these errors:
                    </p>
                    <ol>
                        <li><strong>Excluding organic channels:</strong> If 40% of your customers come from organic search or word-of-mouth, your blended CAC is lower than your paid CAC. Track both.</li>
                        <li><strong>Ignoring sales team costs:</strong> If you have a sales team (common in B2B SaaS), their salaries, commissions, and tools should be included in CAC.</li>
                        <li><strong>Not segmenting by channel:</strong> Your Instagram CAC, Google Ads CAC, and referral CAC can be vastly different. Understanding which channels are efficient helps you allocate budget wisely.</li>
                        <li><strong>Using inconsistent time periods:</strong> Calculate CAC over the same period as your customer count. Monthly spend / monthly new customers gives you the cleanest number.</li>
                        <li><strong>Forgetting marketplace commissions:</strong> If you sell on Amazon India or Flipkart, the 15–25% commission is effectively part of your acquisition cost.</li>
                    </ol>

                    <h2>How Investors Evaluate LTV:CAC</h2>
                    <p>
                        The LTV:CAC ratio is one of the most scrutinised metrics in investor due diligence. Here is how Indian VCs typically evaluate it:
                    </p>
                    <ul>
                        <li><strong>LTV:CAC &gt; 3x:</strong> Strong unit economics. The startup can scale profitably. This is what investors want to see before writing a cheque.</li>
                        <li><strong>LTV:CAC 1–3x:</strong> The business works but margins are thin. The founder needs to improve either pricing, retention, or acquisition efficiency before scaling.</li>
                        <li><strong>LTV:CAC &lt; 1x:</strong> The startup is losing money on every customer. Investors will not fund this unless there is a very clear plan to fix it.</li>
                    </ul>
                    <p>
                        Investors also look at the payback period alongside LTV:CAC. Even if your LTV:CAC is 5x, a 36-month payback period means you need a lot of capital upfront to fund growth — a tough sell for early-stage Indian rounds.
                    </p>

                    <h2>SaaS vs D2C Unit Economics: Key Differences</h2>
                    <p>
                        Understanding how unit economics differ by business model helps you benchmark against the right standards:
                    </p>
                    <h3>SaaS</h3>
                    <ul>
                        <li>Near-zero marginal cost per user (70–85% gross margins are normal)</li>
                        <li>Revenue is recurring, so LTV is driven by retention and churn</li>
                        <li>CAC is typically higher because of longer sales cycles (especially in B2B)</li>
                        <li>Key metric: Net Revenue Retention (NRR) — aim for &gt;100%</li>
                    </ul>
                    <h3>D2C / E-commerce</h3>
                    <ul>
                        <li>Significant variable costs: COGS, shipping, packaging, returns</li>
                        <li>Contribution margins are typically 20–45% (depending on the category)</li>
                        <li>LTV depends on repeat purchase behaviour</li>
                        <li>Key challenge in India: high return rates (15–30% in fashion) that destroy margins</li>
                    </ul>
                    <h3>Hardware</h3>
                    <ul>
                        <li>Highest variable cost per unit (BOM + manufacturing + packaging)</li>
                        <li>Margins typically 25–45% (lower than SaaS, similar to D2C)</li>
                        <li>LTV may be limited if the product is a one-time purchase (no recurring revenue)</li>
                        <li>Key challenge in India: managing GST, import duties on components, and logistics costs</li>
                    </ul>

                    <h2>Case Study: An Indian D2C Brand's Unit Economics</h2>
                    <p>
                        Meera runs a skincare D2C brand based in Jaipur. She sells a hero product for ₹799. Here are her actual unit economics:
                    </p>
                    <ul>
                        <li><strong>Selling Price:</strong> ₹799</li>
                        <li><strong>COGS:</strong> ₹180</li>
                        <li><strong>Packaging:</strong> ₹35</li>
                        <li><strong>Shipping:</strong> ₹65</li>
                        <li><strong>Payment Gateway (2%):</strong> ₹16</li>
                        <li><strong>Returns Cost (8%):</strong> ₹64</li>
                        <li><strong>Total Variable Cost:</strong> ₹360</li>
                        <li><strong>Contribution Margin:</strong> ₹439 (55%)</li>
                    </ul>
                    <p>
                        She spends ₹1,50,000/month on Instagram and Google Ads, acquiring 200 new customers. Her CAC is ₹750. An average customer buys 2.5 times over 18 months, with a gross margin of 55%.
                    </p>
                    <p>
                        <strong>LTV = ₹799 × 0.55 × 2.5 = ₹1,099.</strong> Her LTV:CAC is 1.47x — below the 3x benchmark. She needs to either reduce her CAC (perhaps by investing in SEO and organic content), increase repeat purchases (loyalty program, subscription model), or increase her selling price.
                    </p>
                    <p>
                        This is exactly the kind of insight this calculator helps you uncover. Without calculating unit economics, Meera might have continued scaling her ad spend — and scaling her losses.
                    </p>
                </div>

                <PremiumCTA />

                <FAQ items={faqItems} />

                <InternalLinks current="/calculators/unit-economics-calculator" />
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import CurrencyInput from '../../components/CurrencyInput';
import FAQ from '../../components/FAQ';
import AdPlaceholder from '../../components/AdPlaceholder';
import PremiumCTA from '../../components/PremiumCTA';
import InternalLinks from '../../components/InternalLinks';
import InsightCard from '../../components/InsightCard';
import Link from 'next/link';

/* Result Card */
function ResultCard({ label, value, tooltip, status }) {
    return (
        <div className={`ue-result-card ${status || ''}`}>
            <div className="ue-result-label">
                {label}
                {tooltip && (
                    <span className="ue-tooltip-wrap"> ℹ️
                        <span className="ue-tooltip-text">{tooltip}</span>
                    </span>
                )}
            </div>
            <div className="ue-result-value">{value}</div>
        </div>
    );
}

export default function RunwayCalculator() {
    const [cash, setCash] = useState('');
    const [expenses, setExpenses] = useState('');
    const [revenue, setRevenue] = useState('');
    const [liabilities, setLiabilities] = useState(''); // GST/TDS

    const c = Number(cash) || 0;
    const e = Number(expenses) || 0;
    const r = Number(revenue) || 0;
    const l = Number(liabilities) || 0;

    const netBurn = e - r;
    const grossBurn = e;
    const adjCash = c - l;

    // Standard Runway (Net Burn based)
    const runway = netBurn > 0 ? (adjCash > 0 ? adjCash / netBurn : 0) : (adjCash > 0 ? 999 : 0);

    // Zero-Revenue Runway (Gross Burn based)
    const zeroRevRunway = grossBurn > 0 ? (adjCash > 0 ? adjCash / grossBurn : 0) : 0;

    const formatRunway = (val) => {
        if (val === 999) return '∞ (Profitable)';
        if (val < 0) return '0.0 months';
        return val.toFixed(1) + ' months';
    };

    const formatCurrency = (val) => '₹' + Number(val).toLocaleString('en-IN');

    /* ── Consultant Logic ── */
    const getInsight = () => {
        if (!cash || !expenses) return null;

        const isProfitable = netBurn <= 0;

        if (isProfitable) {
            return {
                type: 'good',
                verdict: 'Default Alive (Profitable) 🏰',
                text: 'You are Default Alive. Your revenue covers your expenses. You control your own destiny.',
                steps: ['Focus on efficient growth.', 'Build a cash buffer for aggressive bets.']
            };
        }

        // SCENARIO 1: Danger Zone (< 6 months)
        if (runway < 6) {
            return {
                type: 'bad',
                verdict: 'Critical (Default Dead) 🚨',
                text: `You have ${runway.toFixed(1)} months of runway. You are "Default Dead" unless you raise funds or cut burn immediately.`,
                steps: [
                    'Cut burn by 30% immediately.',
                    'Start a bridge round process NOW.',
                    'Prioritize revenue over long-term R&D.'
                ]
            };
        }

        // SCENARIO 2: Caution Zone (6 - 12 months)
        if (runway >= 6 && runway < 12) {
            return {
                type: 'warning',
                verdict: 'Code Yellow ⚠️',
                text: `You have ${runway.toFixed(1)} months of runway. You are entering the danger zone. Fundraising in India takes 6-9 months.`,
                steps: [
                    'Prepare deck and data room this week.',
                    'Freeze all non-essential hiring.',
                    'Reduce marketing spend to organic channels only.'
                ]
            };
        }

        // SCENARIO 3: Healthy (12+ months)
        return {
            type: 'good',
            verdict: 'Investor Ready ✅',
            text: `You have ${runway.toFixed(1)} months of runway. This gives you enough time to execute and hit milestones before the next round.`,
            steps: [
                'Focus on growth metric health (Net New ARR).',
                'Plan your next raise in 6 months.'
            ]
        };
    };

    const insight = getInsight();

    const faqItems = [
        {
            question: 'What is "Post-GST Runway"?',
            answer: 'It treats your outstanding GST/TDS liabilities as debt that must be paid immediately. Using your raw bank balance can be misleading if 18% of it belongs to the government.',
        },
        {
            question: 'What is "Default Alive"?',
            answer: 'A term coined by Paul Graham. It means: "Will you reach profitability with your current cash and growth rate before you run out of money?" If yes, you are Default Alive.',
        },
        {
            question: 'Why calculate Zero-Revenue Runway?',
            answer: 'It is a stress test. "If all my customers leave tomorrow, how long can I keep the lights on?" It helps you understand your absolute worst-case survival timeline.',
        },
    ];

    return (
        <div className="calc-page">
            <div className="container">
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="breadcrumb-sep">/</span>
                    <Link href="/#calculators">Calculators</Link>
                    <span className="breadcrumb-sep">/</span>
                    <span>Runway Calculator</span>
                </div>

                <h1>Runway Calculator (Survival Toolbox)</h1>
                <p className="calc-subtitle">The "Desi" Reality Check: Post-GST Runway, Zero-Revenue Stress Test, and Default Alive status.</p>

                <div className="ue-calc-layout">
                    <div className="calc-inputs" style={{ gridColumn: 'span 1' }}>
                        <h3>1. Cash Position</h3>
                        <CurrencyInput label="Current Bank Balance (₹)" value={cash} onChange={setCash} placeholder="Total Cash" />
                        <CurrencyInput label="Outstanding GST/TDS Liability (₹)" value={liabilities} onChange={setLiabilities} placeholder="Owed to Govt" />

                        <div className="divider" style={{ margin: '30px 0' }}></div>

                        <h3>2. Burn Rates</h3>
                        <CurrencyInput label="Monthly Expenses (Gross Burn) (₹)" value={expenses} onChange={setExpenses} />
                        <CurrencyInput label="Monthly Revenue (₹)" value={revenue} onChange={setRevenue} placeholder="0 if pre-revenue" />
                    </div>

                    <div className="calc-results" style={{ gridColumn: 'span 1' }}>
                        <div className="ue-results-header">⏳ Survival Timeline</div>
                        <div className="ue-results-grid">
                            <ResultCard label="Standard Runway" value={formatRunway(runway)} status={runway < 6 ? 'danger' : (runway < 12 ? 'warning' : 'healthy')} tooltip="Based on Net Burn (Expenses - Revenue)" />

                            {l > 0 && (
                                <ResultCard label="Post-GST Runway" value={formatRunway((c - l) > 0 ? ((c - l) / (netBurn > 0 ? netBurn : (grossBurn > 0 ? grossBurn : 1))) : 0)} status={(c - l) / (netBurn || 1) < 6 ? 'danger' : ''} tooltip="Runway after paying off government liabilities" />
                            )}

                            <ResultCard label="Zero-Revenue Runway" value={formatRunway(zeroRevRunway)} tooltip="Stress Test: If Revenue drops to 0" />

                            <ResultCard label="Net Burn Rate" value={'₹' + netBurn.toLocaleString('en-IN')} />
                        </div>
                        <InsightCard insight={insight} />
                    </div>
                </div>

                <AdPlaceholder />

                <div className="content-section">
                    <h2>The "Desi" Reality Checks</h2>
                    <p>Standard runway calculators assume your bank balance is all yours. In India, that is rarely true.</p>
                    <h3>Post-GST Runway</h3>
                    <p>If you have ₹1 Cr in the bank but owe ₹18 Lakhs in GST, your real cash is ₹82 Lakhs. Ignoring this can kill your company when the tax bill hits.</p>
                    <h3>Zero-Revenue Runway</h3>
                    <p>What if a global pandemic hits or a regulatory ban stops your business (e.g., TikTok ban)? This metric tells you how long your team can survive post-apocalypse.</p>
                </div>

                <PremiumCTA />
                <FAQ items={faqItems} />
                <InternalLinks current="/calculators/runway-calculator" />
            </div>
        </div>
    );
}

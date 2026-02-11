'use client';

import { useState } from 'react';
import CurrencyInput from '../../components/CurrencyInput';
import FAQ from '../../components/FAQ';
import AdPlaceholder from '../../components/AdPlaceholder';
import PremiumCTA from '../../components/PremiumCTA';
import InternalLinks from '../../components/InternalLinks';
import InsightCard from '../../components/InsightCard';
import Link from 'next/link';

const fmt = (v) => {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return Number(v).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
};

const pct = (v) => {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return Number(v).toFixed(2) + '%';
};

const num = (v) => (v === '' || v === undefined ? null : Number(v));

/* Result Card Component */
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

export default function EfficiencyCalculator() {
    // Inputs
    const [netNewArr, setNetNewArr] = useState('');
    const [netBurn, setNetBurn] = useState('');

    const [smSpend, setSmSpend] = useState('');
    const [magicArr, setMagicArr] = useState('');

    const [growthRate, setGrowthRate] = useState('');
    const [profitMargin, setProfitMargin] = useState('');

    const [valuation, setValuation] = useState('');
    const [totalArr, setTotalArr] = useState('');

    const [totalRevenue, setTotalRevenue] = useState('');
    const [fteCount, setFteCount] = useState('');

    // Calculations
    const nnArr = num(netNewArr);
    const burn = num(netBurn);
    const burnMultiple = nnArr && burn ? burn / nnArr : null;

    const msSpend = num(smSpend);
    const mArr = num(magicArr);
    const magicNumber = msSpend && mArr && msSpend > 0 ? mArr / msSpend : null;

    const gRate = num(growthRate);
    const pMargin = num(profitMargin);
    const rule40 = (gRate !== null && pMargin !== null) ? gRate + pMargin : null;

    const val = num(valuation);
    const tArr = num(totalArr);
    const hypeRatio = val && tArr && tArr > 0 ? val / tArr : null;

    const tRev = num(totalRevenue);
    const emp = num(fteCount);
    const revPerEmp = tRev && emp && emp > 0 ? tRev / emp : null;

    // Consultant Logic
    const getInsight = () => {
        if (burnMultiple !== null) {
            if (burnMultiple < 1) return { type: 'good', verdict: 'Capital Efficient 💎', text: `Burn Multiple of ${burnMultiple.toFixed(2)} is amazing. You are generating more ARR than you are burning cash.`, steps: ['Aggressively scale sales.', 'You are ready for Series A/B.'] };
            if (burnMultiple <= 2) return { type: 'good', verdict: 'Healthy Efficiency ✅', text: `Burn Multiple of ${burnMultiple.toFixed(2)} is standard for venture-backed startups.`, steps: ['Maintain this balance.', 'Optimize CAC if possible.'] };
            return { type: 'bad', verdict: 'Inefficient Growth ⚠️', text: `Burn Multiple of ${burnMultiple.toFixed(2)} is high. You are burning too much cash for every unit of growth.`, steps: ['Cut non-essential spend.', 'Focus on high-quality revenue only (fix churn).'] };
        }
        if (magicNumber !== null) {
            if (magicNumber > 0.75) return { type: 'good', verdict: 'Sales Machine 🚀', text: `Magic Number of ${magicNumber.toFixed(2)} means your sales team is highly efficient.`, steps: ['Pour more fuel (capital) into marketing.'] };
            return { type: 'bad', verdict: 'Sales Inefficiency ⚠️', text: `Magic Number of ${magicNumber.toFixed(2)} is low (<0.75). You are spending too much to acquire ₹1 of ARR.`, steps: ['Review sales commissions/channels.', 'Improve sales enablement/training.'] };
        }
        return null;
    };

    const insight = getInsight();

    const faqItems = [
        { question: 'What is the Burn Multiple?', answer: 'It measures how much cash you burn to generate ₹1 of Net New ARR. Formula: Net Burn / Net New ARR. <1.5 is good.' },
        { question: 'What is the Rule of 40?', answer: 'A principle that says your Growth Rate % + Profit Margin % should exceed 40%. It balances growth vs profitability.' },
        { question: 'What is a good Magic Number?', answer: 'Ideally > 0.7. If it is 1.0, you make back your sales spend in ARR immediately (12 month payback).' }
    ];

    return (
        <div className="calc-page">
            <div className="container">
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="breadcrumb-sep">/</span>
                    <Link href="/#calculators">Calculators</Link>
                    <span className="breadcrumb-sep">/</span>
                    <span>Efficiency Calculator</span>
                </div>

                <h1>Efficiency Calculator</h1>
                <p className="calc-subtitle">Metrics that VCs love: Burn Multiple, Magic Number, Rule of 40, and more.</p>

                <div className="ue-calc-layout">
                    <div className="calc-inputs" style={{ gridColumn: 'span 1' }}>
                        <h3>1. Burn Multiple</h3>
                        <div className="grid-2">
                            <CurrencyInput label="Net New ARR (₹)" value={netNewArr} onChange={setNetNewArr} />
                            <CurrencyInput label="Net Burn (₹)" value={netBurn} onChange={setNetBurn} />
                        </div>

                        <div className="divider" style={{ margin: '30px 0' }}></div>

                        <h3>2. Magic Number</h3>
                        <div className="grid-2">
                            <CurrencyInput label="Net New ARR (Qtr/Mth)" value={magicArr} onChange={setMagicArr} />
                            <CurrencyInput label="S&M Spend (Qtr/Mth)" value={smSpend} onChange={setSmSpend} />
                        </div>

                        <div className="divider" style={{ margin: '30px 0' }}></div>

                        <h3>3. Rule of 40</h3>
                        <div className="grid-2">
                            <CurrencyInput label="Growth Rate (%)" value={growthRate} onChange={setGrowthRate} prefix="" />
                            <CurrencyInput label="Profit Margin (%)" value={profitMargin} onChange={setProfitMargin} prefix="" />
                        </div>

                        <div className="divider" style={{ margin: '30px 0' }}></div>

                        <h3>4. Hype & Scale</h3>
                        <div className="grid-2">
                            <CurrencyInput label="Valuation (₹)" value={valuation} onChange={setValuation} />
                            <CurrencyInput label="Total ARR (₹)" value={totalArr} onChange={setTotalArr} />
                        </div>
                        <div className="grid-2">
                            <CurrencyInput label="Total Revenue (₹)" value={totalRevenue} onChange={setTotalRevenue} />
                            <CurrencyInput label="FTE Count" value={fteCount} onChange={setFteCount} prefix="" />
                        </div>

                    </div>

                    <div className="calc-results" style={{ gridColumn: 'span 1' }}>
                        <div className="ue-results-header">📊 Efficiency Scorecard</div>
                        <div className="ue-results-grid">
                            <ResultCard label="Burn Multiple" value={burnMultiple !== null ? burnMultiple.toFixed(2) : '—'} status={burnMultiple < 1.5 ? 'healthy' : 'danger'} tooltip="Net Burn / Net New ARR" />
                            <ResultCard label="Magic Number" value={magicNumber !== null ? magicNumber.toFixed(2) : '—'} status={magicNumber > 0.75 ? 'healthy' : 'warning'} tooltip="Net New ARR / S&M Spend" />
                            <ResultCard label="Rule of 40 Score" value={rule40 !== null ? rule40.toFixed(1) + '%' : '—'} status={rule40 > 40 ? 'healthy' : 'danger'} tooltip="Growth % + Profit %" />
                            <ResultCard label="Hype Ratio (Val/ARR)" value={hypeRatio ? hypeRatio.toFixed(1) + 'x' : '—'} />
                            <ResultCard label="Rev per Employee" value={fmt(revPerEmp)} status={revPerEmp > 1500000 ? 'healthy' : ''} />
                        </div>
                        <InsightCard insight={insight} />
                    </div>
                </div>

                <AdPlaceholder />

                <div className="content-section">
                    <h2>Understanding Efficiency</h2>
                    <p>In the current funding climate, "Growth at all costs" is dead. Investors demand efficient growth.</p>
                    <h3>Burn Multiple</h3>
                    <p>Proposed by David Sacks (Craft Ventures). It’s the ultimate measure of how much cash you are burning to create growth. Ideally, stay under 2x in early stages and under 1x as you scale.</p>
                    <h3>Rule of 40</h3>
                    <p>The standard for private equity and late-stage SaaS. If (Growth% + Profit%) &gt; 40, you are an elite company commanding a premium valuation.</p>
                </div>

                <PremiumCTA />
                <FAQ items={faqItems} />
                <InternalLinks current="/calculators/efficiency-calculator" />
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import CurrencyInput from '../../components/CurrencyInput';
import ResultBox from '../../components/ResultBox';
import FAQ from '../../components/FAQ';
import AdPlaceholder from '../../components/AdPlaceholder';
import PremiumCTA from '../../components/PremiumCTA';
import InternalLinks from '../../components/InternalLinks';
import InsightCard from '../../components/InsightCard';
import Link from 'next/link';

export default function CapTableDilutionCalculator() {
    const [valuation, setValuation] = useState('');
    const [investment, setInvestment] = useState('');
    const [existingOwnership, setExistingOwnership] = useState('');

    const postMoneyVal = valuation && investment ? Number(valuation) + Number(investment) : null;
    const investorOwnership = postMoneyVal && postMoneyVal > 0 ? ((Number(investment) / postMoneyVal) * 100) : null;
    const newFounderOwnership = existingOwnership && investorOwnership
        ? (Number(existingOwnership) * (1 - investorOwnership / 100))
        : null;
    const dilution = existingOwnership && newFounderOwnership
        ? (Number(existingOwnership) - Number(newFounderOwnership))
        : null;

    const formatCurrency = (val) => '₹' + Number(val).toLocaleString('en-IN');

    const results = [
        { label: 'Post-Money Valuation', value: postMoneyVal ? formatCurrency(postMoneyVal) : '—', small: true },
        { label: 'Investor Ownership', value: investorOwnership ? investorOwnership.toFixed(2) + '%' : '—' },
        { label: 'Your New Ownership', value: newFounderOwnership ? newFounderOwnership.toFixed(2) + '%' : '—' },
        { label: 'Dilution', value: dilution ? dilution.toFixed(2) + '%' : '—', small: true },
    ];

    /* ── Consultant Logic ── */
    const getInsight = () => {
        if (!investorOwnership) return null;

        // SCENARIO 1: Excessive Dilution (> 25%)
        if (investorOwnership > 25) {
            return {
                type: 'bad',
                verdict: 'Too Much Dilution! ⚠️',
                text: `You are giving away ${investorOwnership.toFixed(1)}% of your company in a single round. Unless this is a massive Series A+, this is dangerous. You risk losing control too early.`,
                steps: [
                    'Negotiate a higher valuation to lower dilution.',
                    'Raise less money if possible to preserve equity.',
                    'Check for "participating preferred" clauses which make this worse.'
                ]
            };
        }

        // SCENARIO 2: Ideal Dilution (10-20%)
        if (investorOwnership >= 10 && investorOwnership <= 20) {
            return {
                type: 'good',
                verdict: 'Standard Market Deal ✅',
                text: `Giving away ${investorOwnership.toFixed(1)}% is standard for Seed/Series A rounds in India. You are trading equity for growth capital efficiently.`,
                steps: [
                    'Ensure you have an ESOP pool created (usually 10%).',
                    'Focus on founder vesting terms (standard is 4 years).',
                    'Close the round quickly and get back to building.'
                ]
            };
        }

        // SCENARIO 3: Low Dilution (< 10%)
        return {
            type: 'good',
            verdict: 'Founder Friendly Deal 💎',
            text: `You are only diluting ${investorOwnership.toFixed(1)}%. This is an excellent deal for you, preserving maximum upside.`,
            steps: [
                'Ensure the valuation isn\'t "too high" (creates pressure for next round).',
                'Use the leverage to negotiate better board control terms.',
                'Consider raising slightly more if demand is high.'
            ]
        };
    };

    const insight = getInsight();

    const faqItems = [
        {
            question: 'What is equity dilution?',
            answer: 'Equity dilution happens when a company issues new shares to investors, reducing the percentage ownership of existing shareholders. If you own 100% of your company and raise funding, you will own less than 100% after the round — but your shares may be worth more because the company\'s total value has increased.',
        },
        {
            question: 'How much dilution is normal in an Indian seed round?',
            answer: 'In India, seed rounds typically involve 10–20% dilution. Most accelerators like Y Combinator (for Indian companies) take 7%, while Indian angel networks may take 10–15%. At Series A, 15–25% dilution is common. Aim to give away no more than 20% at any single round.',
        },
        {
            question: 'What is the difference between pre-money and post-money valuation?',
            answer: 'Pre-money valuation is what your company is worth BEFORE the investment. Post-money valuation = Pre-money + Investment amount. So if your pre-money is ₹4 crore and you raise ₹1 crore, post-money is ₹5 crore, and the investor owns 20%.',
        },
        {
            question: 'Should I worry about dilution as a first-time founder?',
            answer: 'Dilution is natural and expected. The key is to ensure each round increases your company\'s value more than it reduces your percentage. Owning 60% of a ₹100 crore company is better than owning 100% of a ₹1 crore company. Focus on growing the pie, not just your slice.',
        },
        {
            question: 'How do ESOPs affect dilution?',
            answer: 'Employee Stock Option Pools (ESOPs) are typically created before a funding round and come out of the founder\'s share. In India, a 10–15% ESOP pool is standard. This means additional dilution for founders beyond what the investor takes. Factor ESOP allocation into your dilution planning.',
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
                    <span>Cap Table Dilution Calculator</span>
                </div>

                <h1>Cap Table &amp; Equity Dilution Calculator</h1>
                <p className="calc-subtitle">Understand how fundraising affects your ownership. Calculate post-money valuation, investor stake, and founder dilution.</p>

                <div className="calc-layout">
                    <div className="calc-inputs">
                        <h3>Enter Your Numbers</h3>
                        <CurrencyInput label="Pre-Money Valuation (₹)" value={valuation} onChange={setValuation} placeholder="e.g. 50000000" />
                        <CurrencyInput label="Investment Amount (₹)" value={investment} onChange={setInvestment} placeholder="e.g. 10000000" />
                        <CurrencyInput label="Your Current Ownership (%)" value={existingOwnership} onChange={setExistingOwnership} prefix="" suffix="%" placeholder="e.g. 100" />
                    </div>
                    <div>
                        <ResultBox results={results} />
                        <InsightCard insight={insight} />
                    </div>
                </div>

                <AdPlaceholder />

                <div className="content-section">
                    <h2>What is a Cap Table?</h2>
                    <p>
                        A capitalization table (cap table) is a document that shows who owns what percentage of your company. It tracks all shareholders — founders, co-founders, investors, ESOP holders, and advisors. For Indian startups, maintaining an accurate cap table from day one is not just good practice — it is essential for fundraising, compliance with the Companies Act, and MCA filings.
                    </p>
                    <p>
                        Every time you raise a funding round, issue new shares, or grant ESOPs, your cap table changes. Understanding how these changes affect your ownership is critical for making informed decisions about fundraising.
                    </p>

                    <h2>How Equity Dilution Works</h2>
                    <p>
                        When you raise external funding, you are essentially creating new shares and selling them to investors. This increases the total number of shares outstanding, which reduces (dilutes) the percentage ownership of existing shareholders.
                    </p>
                    <div className="formula-box">
                        Post-Money Valuation = Pre-Money Valuation + Investment Amount<br />
                        Investor Ownership % = Investment ÷ Post-Money Valuation × 100<br />
                        Your New Ownership = Current % × (1 - Investor Ownership ÷ 100)
                    </div>

                    <h3>Indian Fundraising Example</h3>
                    <p>
                        Amit and Sneha co-founded a fintech startup in Mumbai. Together, they own 100% of the company, split 60-40. An angel investor offers ₹1 crore at a pre-money valuation of ₹4 crore.
                    </p>
                    <ul>
                        <li><strong>Post-money valuation:</strong> ₹4 crore + ₹1 crore = ₹5 crore</li>
                        <li><strong>Investor ownership:</strong> ₹1 crore ÷ ₹5 crore = 20%</li>
                        <li><strong>Amit's new ownership:</strong> 60% × 0.80 = 48%</li>
                        <li><strong>Sneha's new ownership:</strong> 40% × 0.80 = 32%</li>
                        <li><strong>Total dilution per founder:</strong> 20% of their original stake</li>
                    </ul>
                    <p>
                        While both founders now own less in percentage terms, their shares are now valued at the post-money valuation. Amit's 48% of a ₹5 crore company is worth ₹2.4 crore — more than his 60% of the pre-money ₹4 crore valuation (₹2.4 crore). As the company grows, this gap widens in their favor.
                    </p>

                    <h2>Dilution Across Multiple Rounds</h2>
                    <p>
                        Indian startups typically go through several funding rounds: Pre-seed → Seed → Series A → Series B and beyond. Each round compounds dilution. Here is a realistic scenario:
                    </p>
                    <ul>
                        <li><strong>Pre-seed (Angel):</strong> Give away 10–15% → Founder retains 85–90%</li>
                        <li><strong>Seed (₹50L–₹2Cr):</strong> Give away 15–20% → Founder retains ~70%</li>
                        <li><strong>ESOP pool:</strong> Set aside 10% → Founder retains ~63%</li>
                        <li><strong>Series A (₹5–15Cr):</strong> Give away 20–25% → Founder retains ~47–50%</li>
                    </ul>
                    <p>
                        By Series A, a solo founder often holds 45–55% of the company. With a co-founder, individual stakes may be 25–35%. This is normal and expected in the Indian VC ecosystem.
                    </p>

                    <h3>Key Terms Every Indian Founder Should Know</h3>
                    <ol>
                        <li><strong>Pre-money valuation:</strong> Your company's value before investment.</li>
                        <li><strong>Post-money valuation:</strong> Pre-money + investment amount.</li>
                        <li><strong>Liquidation preference:</strong> Investors get paid first during exit — common in Indian term sheets.</li>
                        <li><strong>Anti-dilution clause:</strong> Protects investors if future rounds happen at a lower valuation (down round).</li>
                        <li><strong>ESOP pool:</strong> Shares reserved for employees, typically 10–15% in Indian startups.</li>
                        <li><strong>Vesting schedule:</strong> Standard 4-year vesting with 1-year cliff for both founders and employees in India.</li>
                    </ol>

                    <h3>Tips for Managing Dilution</h3>
                    <ul>
                        <li>Raise only what you need — overfunding leads to unnecessary dilution.</li>
                        <li>Increase your valuation by showing traction before each round.</li>
                        <li>Consider convertible notes or SAFEs for early rounds — they defer valuation discussions.</li>
                        <li>Plan your ESOP pool strategically — negotiate with investors on whether it comes from pre or post-money.</li>
                        <li>Use this calculator to model different scenarios before taking meetings with investors.</li>
                    </ul>
                </div>

                <PremiumCTA />

                <FAQ items={faqItems} />

                <InternalLinks current="/calculators/cap-table-dilution-calculator" />
            </div>
        </div>
    );
}

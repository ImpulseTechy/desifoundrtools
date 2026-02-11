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

export default function BreakEvenCalculator() {
    const [fixedCosts, setFixedCosts] = useState('');
    const [variableCost, setVariableCost] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');

    const contribution = sellingPrice && variableCost ? Number(sellingPrice) - Number(variableCost) : null;
    const breakEvenUnits = contribution && contribution > 0 && fixedCosts ? Math.ceil(Number(fixedCosts) / contribution) : null;
    const breakEvenRevenue = breakEvenUnits && sellingPrice ? breakEvenUnits * Number(sellingPrice) : null;

    const formatCurrency = (val) => '₹' + Number(val).toLocaleString('en-IN');

    const results = [
        { label: 'Break-Even Point', value: breakEvenUnits !== null ? breakEvenUnits.toLocaleString('en-IN') + ' units' : '—' },
        { label: 'Break-Even Revenue', value: breakEvenRevenue !== null ? formatCurrency(breakEvenRevenue) : '—', small: true },
        { label: 'Contribution Margin / Unit', value: contribution !== null ? formatCurrency(contribution) : '—', small: true },
    ];

    /* ── Consultant Logic ── */
    const getInsight = () => {
        if (!sellingPrice || !variableCost || !fixedCosts) return null;

        const sp = Number(sellingPrice);
        const vc = Number(variableCost);
        const fc = Number(fixedCosts);

        // SCENARIO 1: Negative Contribution Margin (Dead on Arrival)
        if (sp <= vc) {
            return {
                type: 'bad',
                verdict: 'Business Model Broken 🛑',
                text: `You are losing ₹${(vc - sp).toLocaleString()} on every unit sold. You will never break even, no matter how much you sell.`,
                steps: [
                    'Raise your prices immediately.',
                    'Reduce variable costs (COGS, shipping, commissions).',
                    'Stop all ad spend until unit economics are positive.'
                ]
            };
        }

        const marginPct = ((sp - vc) / sp) * 100;

        // SCENARIO 2: Low Margin (< 20%)
        if (marginPct < 20) {
            return {
                type: 'warning',
                verdict: 'Razor Thin Margins ⚠️',
                text: `Your contribution margin is only ${marginPct.toFixed(1)}%. You need to sell huge volumes to cover fixed costs. One marketing mistake could wipe out your profits.`,
                steps: [
                    'Bundle products to increase Average Order Value (AOV).',
                    'Negotiate better rates with suppliers for bulk orders.',
                    'Focus on organic channels; paid ads might be too expensive.'
                ]
            };
        }

        // SCENARIO 3: Healthy Margin (> 50%)
        if (marginPct > 50) {
            return {
                type: 'good',
                verdict: 'Healthy Margins (Scalable) 🚀',
                text: `You have a strong ${marginPct.toFixed(1)}% margin. This gives you room to spend on marketing and acquire customers aggressively.`,
                steps: [
                    'Invest in paid acquisition (FB/Google Ads).',
                    'Experiment with discounts/offers to drive volume.',
                    'Hire a sales team if B2B.'
                ]
            };
        }

        // SCENARIO 4: Standard Margin (20-50%)
        return {
            type: 'good',
            verdict: 'Viable Business Model ✅',
            text: `Your ${marginPct.toFixed(1)}% margin is standard for D2C/Retail. You can break even, but keep a tight leash on fixed costs.`,
            steps: [
                'Optimize your marketing funnel to lower CAC.',
                'Keep fixed costs (rent, salaries) under 30% of revenue.',
                'Focus on repeat customers to improve LTV.'
            ]
        };
    };

    const insight = getInsight();

    const faqItems = [
        {
            question: 'What is a break-even point?',
            answer: 'The break-even point is the number of units you need to sell so that your total revenue exactly covers your total costs (fixed + variable). Beyond this point, every additional unit sold generates profit.',
        },
        {
            question: 'How does GST affect break-even calculations in India?',
            answer: 'GST does not typically affect break-even calculations if you are registered and can claim input tax credit. However, if you are not GST-registered or sell to end consumers, the GST component increases your effective cost base. Consider including GST in your variable cost if applicable.',
        },
        {
            question: 'What are typical fixed costs for an Indian startup?',
            answer: 'Common fixed costs include office rent (₹15,000–₹1,00,000/month depending on city), salaries, software subscriptions, internet, insurance, legal and compliance fees, and loan EMIs. These costs remain constant regardless of how many units you sell.',
        },
        {
            question: 'Can I use this for a service-based business?',
            answer: 'Yes. For services, think of each "unit" as a project, client, or service hour. Your variable cost would be the direct cost of delivering that service (e.g., freelancer payments, materials), and your selling price is what you charge the client.',
        },
        {
            question: 'How do I lower my break-even point?',
            answer: 'You can lower your break-even point by reducing fixed costs (e.g., work remotely, use free tools), decreasing variable costs per unit (negotiate supplier rates, optimize production), or increasing your selling price (add value, build brand premium).',
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
                    <span>Break-Even Calculator</span>
                </div>

                <h1>Break-Even Calculator for Indian Startups</h1>
                <p className="calc-subtitle">Calculate the exact number of units you need to sell to cover all your costs and start making profit.</p>

                <div className="calc-layout">
                    <div className="calc-inputs">
                        <h3>Enter Your Numbers</h3>
                        <CurrencyInput label="Total Fixed Costs (₹/month)" value={fixedCosts} onChange={setFixedCosts} placeholder="e.g. 100000" />
                        <CurrencyInput label="Variable Cost per Unit (₹)" value={variableCost} onChange={setVariableCost} placeholder="e.g. 50" />
                        <CurrencyInput label="Selling Price per Unit (₹)" value={sellingPrice} onChange={setSellingPrice} placeholder="e.g. 150" />
                    </div>
                    <div>
                        <ResultBox results={results} />
                        <InsightCard insight={insight} />
                    </div>
                </div>

                <AdPlaceholder />

                <div className="content-section">
                    <h2>What is Break-Even Analysis?</h2>
                    <p>
                        Break-even analysis is one of the most practical financial tools available to startup founders. It answers a simple but critical question: how many units do I need to sell before my business stops losing money and starts making a profit?
                    </p>
                    <p>
                        For Indian founders — whether you are selling a physical product through Amazon India, running a D2C brand, or offering a SaaS subscription — knowing your break-even point helps you set realistic sales targets, price your products correctly, and make sound financial decisions.
                    </p>

                    <h3>The Break-Even Formula</h3>
                    <p>
                        The break-even formula is based on the concept of contribution margin — the amount each unit sold contributes towards covering your fixed costs:
                    </p>
                    <div className="formula-box">
                        Break-Even Units = Fixed Costs ÷ (Selling Price per Unit − Variable Cost per Unit)
                    </div>
                    <p>
                        The denominator (Selling Price − Variable Cost) is your <strong>contribution margin per unit</strong>. The higher your contribution margin, the fewer units you need to sell to break even.
                    </p>

                    <h2>Understanding Fixed vs. Variable Costs</h2>
                    <p>
                        <strong>Fixed costs</strong> are expenses that remain the same regardless of how many units you sell. For an Indian startup, these typically include:
                    </p>
                    <ul>
                        <li>Office rent or co-working space fees</li>
                        <li>Full-time employee salaries</li>
                        <li>Software subscriptions (CRM, email, hosting)</li>
                        <li>Insurance and compliance costs</li>
                        <li>Loan EMIs</li>
                    </ul>
                    <p>
                        <strong>Variable costs</strong> change with each unit produced or sold:
                    </p>
                    <ul>
                        <li>Raw materials or cost of goods</li>
                        <li>Packaging and shipping (significant in India due to logistics costs)</li>
                        <li>Sales commissions</li>
                        <li>Payment gateway fees (typically 2% in India)</li>
                        <li>Marketplace commissions (Amazon, Flipkart fees)</li>
                    </ul>

                    <h3>Indian D2C Startup Example</h3>
                    <p>
                        Raj runs a premium chai brand based in Assam. His monthly fixed costs are ₹1,00,000 (including a small warehouse, one employee, and marketing tools). Each 250g pack costs ₹50 to produce and package (variable cost), and he sells it for ₹150 on his website.
                    </p>
                    <p>
                        His contribution margin is ₹150 − ₹50 = ₹100 per pack.
                    </p>
                    <p>
                        Break-even point: ₹1,00,000 ÷ ₹100 = <strong>1,000 packs per month</strong>.
                    </p>
                    <p>
                        This means Raj needs to sell about 34 packs per day to cover his costs. Every pack sold beyond 1,000 is pure profit (before taxes). This clarity helps him plan his marketing budget and set realistic daily sales targets.
                    </p>

                    <h2>How to Use Break-Even Analysis Effectively</h2>
                    <p>
                        Break-even analysis is not just a one-time calculation. Smart founders use it in several ways:
                    </p>
                    <ol>
                        <li><strong>Pricing decisions:</strong> Test different price points and see how they affect your break-even point. A ₹20 increase in price can dramatically reduce the units you need to sell.</li>
                        <li><strong>New product launches:</strong> Before launching a new SKU, calculate if the expected sales volume exceeds the break-even point.</li>
                        <li><strong>Cost optimization:</strong> If you negotiate a lower variable cost with your supplier, your contribution margin increases and break-even drops.</li>
                        <li><strong>Investor conversations:</strong> Being able to show your break-even analysis demonstrates financial understanding and builds investor confidence.</li>
                    </ol>

                    <h3>Limitations to Keep in Mind</h3>
                    <p>
                        Break-even analysis assumes that variable costs remain constant per unit and that selling price does not change. In reality, Indian startups often deal with bulk discounts, seasonal pricing, and marketplace fee changes. Use break-even as a directional guide, and revisit it monthly as your cost structure evolves.
                    </p>
                </div>

                <PremiumCTA />

                <FAQ items={faqItems} />

                <InternalLinks current="/calculators/break-even-calculator" />
            </div>
        </div>
    );
}

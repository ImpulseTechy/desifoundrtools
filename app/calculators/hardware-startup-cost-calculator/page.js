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

export default function HardwareStartupCostCalculator() {
    const [bom, setBom] = useState('');
    const [manufacturing, setManufacturing] = useState('');
    const [packaging, setPackaging] = useState('');
    const [gst, setGst] = useState('');
    const [marketing, setMarketing] = useState('');
    const [margin, setMargin] = useState('40');

    const baseCost = [bom, manufacturing, packaging, marketing]
        .filter(v => v !== '')
        .reduce((sum, v) => sum + Number(v), 0);

    const gstAmount = gst && baseCost > 0 ? baseCost * (Number(gst) / 100) : 0;
    const totalCost = baseCost > 0 ? baseCost + gstAmount : null;
    const sellingPrice = totalCost && margin ? (totalCost / (1 - Number(margin) / 100)).toFixed(0) : null;
    const profitPerUnit = sellingPrice && totalCost ? (Number(sellingPrice) - totalCost).toFixed(0) : null;

    const formatCurrency = (val) => '₹' + Number(val).toLocaleString('en-IN');

    const results = [
        { label: 'Total Cost per Unit', value: totalCost ? formatCurrency(totalCost.toFixed(0)) : '—' },
        { label: 'GST Component', value: gstAmount > 0 ? formatCurrency(gstAmount.toFixed(0)) : '—', small: true },
        { label: `Selling Price (${margin || 40}% margin)`, value: sellingPrice ? formatCurrency(sellingPrice) : '—' },
        { label: 'Profit per Unit', value: profitPerUnit ? formatCurrency(profitPerUnit) : '—', small: true },
    ];

    /* ── Consultant Logic ── */
    const getInsight = () => {
        if (!sellingPrice || !margin) return null;

        const grossMargin = Number(margin);

        // SCENARIO 1: Low Margin (< 30%)
        if (grossMargin < 30) {
            return {
                type: 'bad',
                verdict: 'Margin Too Low ⚠️',
                text: `Hardware is capital intensive. A ${grossMargin}% margin leaves very little room for distribution commissions (often 15-30%), returns, and warranty costs.`,
                steps: [
                    'Aim for at least 40-50% gross margin for retail readiness.',
                    'Reduce BOM cost by sourcing alternative components.',
                    'Sell D2C initially to avoid distributor markups.'
                ]
            };
        }

        // SCENARIO 2: Healthy Margin (30-50%)
        if (grossMargin >= 30 && grossMargin <= 50) {
            return {
                type: 'good',
                verdict: 'Standard Hardware Margins ✅',
                text: `A ${grossMargin}% margin is typical for consumer electronics in India. You have enough buffer for marketing and operations.`,
                steps: [
                    'Focus on volume to drive manufacturing costs down.',
                    'Negotiate net-30 or net-60 payment terms with suppliers.',
                    'Keep a close watch on inventory turnover.'
                ]
            };
        }

        // SCENARIO 3: High Margin (> 50%)
        return {
            type: 'good',
            verdict: 'Premium Hardware Margins 💎',
            text: `A ${grossMargin}% margin is excellent for hardware. This suggests you have strong IP or a premium brand positioning.`,
            steps: [
                'Invest the surplus margin into R&D for V2.',
                'Expand into retail channels (Croma, Reliance Digital) — you can afford their margins.',
                'Build a robust warranty and service network.'
            ]
        };
    };

    const insight = getInsight();

    const faqItems = [
        {
            question: 'What is BOM cost?',
            answer: 'BOM (Bill of Materials) cost is the total cost of all raw materials, components, and parts needed to manufacture one unit of your product. For a hardware startup, this includes PCBs, sensors, enclosures, cables, connectors, and any other physical components.',
        },
        {
            question: 'What GST rate applies to hardware products in India?',
            answer: 'Most electronic hardware products fall under 18% GST in India. However, rates vary: computer parts may be 18%, finished computers 18%, IoT devices 18%, and some specialized equipment may be 28%. Check the HSN code for your specific product on the GST portal.',
        },
        {
            question: 'What is a good profit margin for hardware startups in India?',
            answer: 'Hardware margins in India are typically lower than software. A 30–50% gross margin is considered healthy. Consumer electronics often operate at 20–35% margins, while industrial/B2B hardware can achieve 40–60%. Factor in returns, warranty costs, and distribution margins.',
        },
        {
            question: 'Should I include R&D costs in unit cost?',
            answer: 'R&D costs are typically treated as fixed costs and spread over the expected number of units sold over the product lifecycle. They should not be included in variable per-unit cost calculations. However, for financial planning, ensure your selling price over total expected volume covers R&D investment.',
        },
        {
            question: 'How do I estimate manufacturing cost in India?',
            answer: 'Get quotes from 3–5 contract manufacturers. In India, Noida, Pune, and Shenzhen (for PCB assembly) are common hubs. Manufacturing cost includes: labor, machine time, tooling (amortized), quality testing, and factory overhead per unit. Ask for MOQ-based pricing tiers.',
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
                    <span>Hardware Startup Cost Calculator</span>
                </div>

                <h1>Hardware Startup Cost Calculator for India</h1>
                <p className="calc-subtitle">Estimate your per-unit cost including BOM, manufacturing, packaging, GST, and marketing. Set a data-driven selling price.</p>

                <div className="calc-layout">
                    <div className="calc-inputs">
                        <h3>Enter Your Numbers</h3>
                        <CurrencyInput label="BOM Cost per Unit (₹)" value={bom} onChange={setBom} placeholder="e.g. 500" />
                        <CurrencyInput label="Manufacturing Cost per Unit (₹)" value={manufacturing} onChange={setManufacturing} placeholder="e.g. 200" />
                        <CurrencyInput label="Packaging Cost per Unit (₹)" value={packaging} onChange={setPackaging} placeholder="e.g. 50" />
                        <CurrencyInput label="GST Rate (%)" value={gst} onChange={setGst} prefix="" suffix="%" placeholder="e.g. 18" />
                        <CurrencyInput label="Marketing Cost per Unit (₹)" value={marketing} onChange={setMarketing} placeholder="e.g. 100" />
                        <CurrencyInput label="Target Profit Margin (%)" value={margin} onChange={setMargin} prefix="" suffix="%" placeholder="e.g. 40" />
                    </div>
                    <div>
                        <ResultBox results={results} />
                        <InsightCard insight={insight} />
                    </div>
                </div>

                <AdPlaceholder />

                <div className="content-section">
                    <h2>Understanding Hardware Startup Costs in India</h2>
                    <p>
                        Building a hardware startup in India is a fundamentally different challenge compared to software. You are dealing with physical components, supply chains, manufacturing processes, logistics, and regulatory compliance — all of which have direct cost implications for every single unit you ship.
                    </p>
                    <p>
                        Unlike SaaS startups where marginal costs approach zero, hardware startups face significant per-unit costs that must be carefully calculated to ensure profitability. Getting your unit economics right from the start is not optional — it is survival.
                    </p>

                    <h3>Breaking Down Per-Unit Costs</h3>
                    <p>
                        Every hardware product's cost can be broken into these key components:
                    </p>
                    <div className="formula-box">
                        Total Cost = BOM + Manufacturing + Packaging + GST + Marketing per Unit
                    </div>

                    <p>
                        <strong>BOM (Bill of Materials):</strong> This is the biggest variable cost for most hardware products. It includes every component — from the main microcontroller to the smallest resistor. In India, sourcing from domestic distributors may be more expensive than importing from China, but offers faster lead times and lower MOQs.
                    </p>
                    <p>
                        <strong>Manufacturing Cost:</strong> This covers the labor, machine time, and factory overhead needed to assemble one unit. India has growing manufacturing capabilities, with hubs in Noida, Pune, Bangalore, and Chennai. Contract manufacturers typically offer tiered pricing — higher volumes mean lower per-unit costs.
                    </p>
                    <p>
                        <strong>Packaging:</strong> Often underestimated, packaging costs in India can range from ₹20 for simple boxes to ₹200+ for premium, branded packaging. If you are selling D2C, packaging is part of your brand experience and affects customer perception.
                    </p>

                    <h2>GST for Hardware Startups</h2>
                    <p>
                        India's GST system significantly impacts hardware startup economics. Most electronic products fall under the 18% GST slab. Understanding how GST works is critical:
                    </p>
                    <ul>
                        <li><strong>Input tax credit:</strong> As a GST-registered business, you can claim credit on GST paid on your inputs (components, raw materials). This effectively means GST only applies to the value you add.</li>
                        <li><strong>HSN codes:</strong> Each product category has an HSN code that determines the applicable GST rate. Get this right early — incorrect classification can lead to compliance issues.</li>
                        <li><strong>Interstate vs. intrastate:</strong> IGST (inter-state) vs. CGST+SGST (intra-state) — while the total rate is the same, the compliance process differs.</li>
                        <li><strong>Export benefits:</strong> If you plan to export, hardware products can benefit from GST refunds and LUT (Letter of Undertaking) for zero-rated exports.</li>
                    </ul>

                    <h3>Real-World Hardware Startup Example</h3>
                    <p>
                        Varun is building an IoT-based water quality monitoring device in Bangalore. Here is his per-unit cost breakdown for a production run of 500 units:
                    </p>
                    <ul>
                        <li><strong>BOM:</strong> ₹1,200 (sensors ₹400, PCB ₹300, enclosure ₹200, display ₹150, misc ₹150)</li>
                        <li><strong>Manufacturing:</strong> ₹400 (assembly, soldering, testing, QC)</li>
                        <li><strong>Packaging:</strong> ₹100 (custom box, manual, warranty card)</li>
                        <li><strong>Marketing per unit:</strong> ₹200 (digital ads amortized + marketplace commissions)</li>
                        <li><strong>Subtotal:</strong> ₹1,900</li>
                        <li><strong>GST (18%):</strong> ₹342</li>
                        <li><strong>Total cost:</strong> ₹2,242 per unit</li>
                    </ul>
                    <p>
                        With a 40% margin target, Varun should price his device at approximately ₹3,737. He rounds this to ₹3,799 for the market. At 500 units, his profit is approximately ₹7,78,500 — enough to fund the next iteration.
                    </p>

                    <h2>Setting the Right Selling Price</h2>
                    <p>
                        Pricing hardware in India requires balancing multiple factors:
                    </p>
                    <ol>
                        <li><strong>Cost-plus pricing:</strong> Start with your total cost and add a target margin. This calculator uses this approach.</li>
                        <li><strong>Market comparison:</strong> Research what similar products cost on Amazon India, Flipkart, or through B2B channels.</li>
                        <li><strong>Value-based pricing:</strong> If your product solves a significant pain point (e.g., saves ₹10,000/month for factories), you can price higher.</li>
                        <li><strong>Channel margins:</strong> If selling through distributors (30–40% margin) or marketplaces (15–25% commission), your MRP needs to be higher.</li>
                    </ol>

                    <h3>Scaling Cost Reduction Strategies</h3>
                    <ul>
                        <li>Negotiate bulk pricing with component distributors once you cross MOQ thresholds.</li>
                        <li>Consider Design for Manufacturing (DFM) reviews to reduce assembly complexity.</li>
                        <li>Explore government subsidies — PLI (Production Linked Incentive) schemes offer 4–6% incentives for electronics manufacturing in India.</li>
                        <li>Move from imported to domestically sourced components where possible.</li>
                    </ul>
                </div>

                <PremiumCTA />

                <FAQ items={faqItems} />

                <InternalLinks current="/calculators/hardware-startup-cost-calculator" />
            </div>
        </div>
    );
}

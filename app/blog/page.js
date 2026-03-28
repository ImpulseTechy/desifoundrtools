'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts } from '../data/blogPosts';

const categories = ['All', 'SaaS Metrics', 'Fundraising', 'Survival', 'Unit Economics', 'Hardware'];

const readingTimes = {
  'why-most-indian-startups-die-before-series-a': '7 min read',
  'the-rule-of-40-vc-benchmarks-2026': '8 min read',
  'calculating-cac-india-hidden-costs': '7 min read',
  'burn-rate-guide': '9 min read',
  'runway-guide': '8 min read',
  'ltv-cac-guide': '10 min read',
  'valuation-guide': '11 min read',
  'cap-table-guide': '9 min read',
  'mrr-vs-arr-guide': '8 min read',
  'unit-economics-guide': '10 min read',
  'break-even-guide': '8 min read',
  'hardware-costs-guide': '9 min read',
  'sales-velocity-guide': '8 min read',
};

function getReadingTime(slug) {
  return readingTimes[slug] || '8 min read';
}

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="blog-page">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span>Blog</span>
        </div>

        <section className="hero-mini">
          <h1>Founder <em>Education</em></h1>
          <p>Practical guides and benchmarks for the Indian startup ecosystem.</p>
        </section>

        {/* Category Filter Tabs */}
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? 'filter-tab--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="featured-card">
            <span className="featured-badge">Featured</span>
            <div className="featured-content">
              <div className="blog-card-meta">
                <span>{featuredPost.date}</span> • <span>{featuredPost.author}</span> • <span className="read-time">📖 {getReadingTime(featuredPost.slug)}</span>
              </div>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <span className="blog-card-link">Read Guide →</span>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="blog-grid">
          {[...otherPosts]
            .sort((a, b) => new Date(b.date.replace('Last Updated: ', '')) - new Date(a.date.replace('Last Updated: ', '')))
            .map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-card">
              <div className="blog-card-meta">
                <span>{post.date}</span> • <span>{post.author}</span>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-footer">
                <span className="read-time">📖 {getReadingTime(post.slug)}</span>
                <span className="blog-card-link">Read Guide →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

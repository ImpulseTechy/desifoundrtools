import Link from 'next/link';
import { blogPosts } from '../data/blogPosts';

export const metadata = {
  title: 'Founder Education & Blog | Desi Founder Tools',
  description: 'Practical advice, benchmarks, and strategies for Indian startup founders. Learn about burn rate, unit economics, and fundraising.',
};

export default function BlogListing() {
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

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-card">
              <div className="blog-card-meta">
                <span>{post.date}</span> • <span>{post.author}</span>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <span className="blog-card-link">Read Guide →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

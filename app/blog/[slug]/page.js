import Link from 'next/link';
import { blogPosts } from '../../data/blogPosts';
import InternalLinks from '../../components/InternalLinks';
import PremiumCTA from '../../components/PremiumCTA';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Desi Founder Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1>Post Not Found</h1>
        <Link href="/blog" className="btn btn-primary mt-10">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href="/blog">Blog</Link>
          <span className="breadcrumb-sep">/</span>
          <span>Article</span>
        </div>

        <article className="post-content-wrap">
          <header className="post-header">
            <div className="post-meta">
              <span>{post.date}</span> • <span>By {post.author}</span>
            </div>
            <h1>{post.title}</h1>
            <p className="post-excerpt-large">{post.excerpt}</p>
          </header>

          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="post-footer">
            <div className="post-share">
              <h3>Share this guide with a founder</h3>
              <p>Knowledge is free. Building a business is hard. Help a fellow founder today.</p>
            </div>
          </div>
        </article>

        <PremiumCTA />
        <InternalLinks current="/blog" />
      </div>
    </div>
  );
}

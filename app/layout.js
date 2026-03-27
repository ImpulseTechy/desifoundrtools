import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL('https://desifoundertools.in'),
  title: {
    default: 'Desi Founder Tools — Practical Financial Tools for Indian Startup Founders',
    template: '%s | Desi Founder Tools',
  },
  description: 'Free financial calculators for Indian startup founders. Calculate burn rate, runway, break-even, cap table dilution, and hardware startup costs instantly.',
  keywords: ['startup calculator', 'burn rate calculator', 'runway calculator India', 'Indian startup tools', 'cap table dilution', 'break even calculator', 'desi founder tools'],
  authors: [{ name: 'Desi Founder Tools', url: 'https://desifoundertools.in' }],
  creator: 'Desi Founder Tools',
  publisher: 'Desi Founder Tools',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://desifoundertools.in',
    siteName: 'Desi Founder Tools',
    title: 'Desi Founder Tools — Practical Financial Tools for Indian Startup Founders',
    description: 'Free financial calculators for Indian startup founders. Calculate burn rate, runway, break-even, cap table dilution, and more — instantly.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desi Founder Tools — Practical Financial Tools for Indian Startup Founders',
    description: 'Free financial calculators for Indian startup founders. Burn rate, runway, cap table, and more.',
    creator: '@desifoundertools',
  },
  icons: {
    icon: '/desi-founder-tools-logo.svg',
    shortcut: '/desi-founder-tools-logo.svg',
  },
  alternates: {
    canonical: 'https://desifoundertools.in',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://desifoundertools.in/#website',
      url: 'https://desifoundertools.in',
      name: 'Desi Founder Tools',
      description: 'Free financial calculators for Indian startup founders.',
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://desifoundertools.in/blog?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://desifoundertools.in/#organization',
      name: 'Desi Founder Tools',
      url: 'https://desifoundertools.in',
      description: 'Practical financial tools built for Indian startup founders.',
      foundingDate: '2026',
      areaServed: 'IN',
      knowsAbout: [
        'Startup Finance',
        'Burn Rate',
        'Runway Calculator',
        'Cap Table',
        'Unit Economics',
        'Indian Startup Ecosystem',
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Some browser extensions inject body attributes before React hydrates. */}
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

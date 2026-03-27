import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'Desi Founder Tools — Practical Financial Tools for Indian Startup Founders',
    template: '%s | Desi Founder Tools',
  },
  description: 'Free financial calculators for Indian startup founders. Calculate burn rate, runway, break-even, cap table dilution, and hardware startup costs instantly.',
  keywords: ['startup calculator', 'burn rate calculator', 'runway calculator India', 'Indian startup tools', 'cap table dilution', 'break even calculator'],
  icons: {
    icon: '/desi-founder-tools-logo.svg',
    shortcut: '/desi-founder-tools-logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Some browser extensions inject body attributes before React hydrates. */}
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Manrope, Newsreader, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import {
  LanguageRuntime,
  LanguageSelector,
} from '@/components/language-runtime';
import './globals.css';
import './extended.css';
import './pricing.css';
import './equipment.css';
import './theme-v2.css';
import './industries.css';
import './about.css';
import './fixes.css';
import { MobileNav } from '@/components/mobile-nav';

const sans = Manrope({ variable: '--font-sans', subsets: ['latin'] });
const display = Newsreader({ variable: '--font-display', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
export const metadata: Metadata = {
  title: {
    default: 'Nexavoris | AI & ERP Systems',
    template: '%s | Nexavoris',
  },
  description:
    'Private enterprise AI, ERP implementation, and intelligent business automation for growing companies.',
  metadataBase: new URL('https://nexavoris.ai'),
  alternates: { canonical: './' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Nexavoris AI & ERP Systems',
    description: 'One integrated operating system for your business.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Nexavoris AI & ERP Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexavoris AI & ERP Systems',
    description: 'Private AI, ERP, and automation for operational businesses.',
    images: ['/og.png'],
  },
};
const nav = [
  ['AI Solutions', '/ai-solutions'],
  ['ERP Solutions', '/erp-solutions'],
  ['Website Design', '/website-design'],
  ['AI + ERP', '/ai-erp'],
  ['Equipment', '/equipment'],
  ['Industries', '/industries'],
  ['Pricing', '/pricing'],
  ['About', '/about'],
];
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://nexavoris.ai/#organization',
      name: 'Nexavoris',
      url: 'https://nexavoris.ai',
      logo: 'https://nexavoris.ai/nexavoris-logo.png',
      slogan: 'AI that understands your business. ERP that runs it.',
      description:
        'Nexavoris provides private enterprise AI systems, ERP consulting and implementation (including Odoo), intelligent business automation, and website design for operational businesses.',
      email: 'info@nexavoris.ai',
      telephone: '+1-281-258-8000',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '13366 Murphy Road',
        addressLocality: 'Stafford',
        addressRegion: 'TX',
        postalCode: '77477',
        addressCountry: 'US',
      },
      knowsAbout: [
        'Private enterprise AI',
        'ERP implementation',
        'Odoo',
        'Business automation',
        'Website design',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://nexavoris.ai/#website',
      url: 'https://nexavoris.ai',
      name: 'Nexavoris | AI & ERP Systems',
      inLanguage: ['en-US', 'zh-CN', 'zh-TW', 'es'],
      publisher: { '@id': 'https://nexavoris.ai/#organization' },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} ${mono.variable}`}>
        <LanguageRuntime />
        <header>
          <a className="brand logo-brand" href="/" aria-label="Nexavoris home">
            <Image
              src="/nexavoris-logo.png"
              alt="Nexavoris AI & ERP Systems"
              width={210}
              height={105}
              priority
            />
          </a>
          <nav>
            {nav.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <LanguageSelector />
          <a className="nav-cta" href="/contact">
            Schedule a Consultation <ArrowUpRight size={16} />
          </a>
          <MobileNav links={nav} />
        </header>
        {children}
        <footer>
          <div className="footer-company">
            <a
              className="logo-brand footer-logo"
              href="/"
              aria-label="Nexavoris home"
            >
              <Image
                src="/nexavoris-logo.png"
                alt="Nexavoris AI & ERP Systems"
                width={205}
                height={103}
              />
            </a>
            <p>AI that understands your business. ERP that runs it.</p>
          </div>
          <address className="footer-contact">
            <span>
              <MapPin size={16} />
              <span>
                13366 Murphy Road
                <br />
                Stafford, TX 77477
              </span>
            </span>
            <a href="tel:+12812588000">
              <Phone size={16} />
              281-258-8000
            </a>
            <a href="mailto:info@nexavoris.ai">
              <Mail size={16} />
              info@nexavoris.ai
            </a>
          </address>
          <span className="footer-copyright">
            © 2026 Nexavoris. All rights reserved.
          </span>
        </footer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

/** Disclosure menu for viewports under 1000px, where the origin design
 *  hides the header nav entirely. Rendered inside <header>. */
export function MobileNav({ links }: { links: string[][] }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <div className="mobile-nav">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(v => !v)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="mobile-menu-cta" href="/contact" onClick={() => setOpen(false)}>
            Schedule a Consultation
          </a>
        </nav>
      )}
    </div>
  );
}

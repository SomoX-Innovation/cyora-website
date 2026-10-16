'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/site';
import { Menu } from './Icons';
import clsx from './clsx';

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 border-b transition-all duration-500',
          solid ? 'border-gold/20 bg-ink/95 py-3 backdrop-blur-md' : 'border-transparent py-5',
        )}
      >
        <div className="wrap flex items-center justify-between gap-8">
          <Link href="/" aria-label="CYORA home" className="flex min-h-[44px] items-center pl-[.42em] font-serif text-[30px] font-normal tracking-[0.42em] text-ivory hover:text-gold">
            CYORA
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
            {nav.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={clsx(
                    'group relative py-3 text-xs uppercase tracking-[0.2em] transition-colors',
                    active ? 'text-gold' : 'text-ivory/80 hover:text-ivory',
                  )}
                >
                  {item.label}
                  <span className={clsx('absolute bottom-1.5 left-0 h-px bg-gold transition-all duration-500', active ? 'w-full' : 'w-0 group-hover:w-full')} />
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3.5">
            <Link href="/export-wholesale#enquiry" className="btn btn-gold hidden min-h-[46px] px-5 xl:inline-flex">
              Request a Quote
            </Link>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center border border-ivory/35 text-ivory xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu open={open} />
            </button>
          </div>
        </div>
      </header>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="fade-in fixed inset-0 z-40 flex flex-col gap-1.5 overflow-y-auto bg-ink px-7 pb-10 pt-32 xl:hidden">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="border-b border-gold/20 py-2 font-serif text-[38px] text-ivory">
              {item.label}
            </Link>
          ))}
          <Link href="/export-wholesale#enquiry" className="btn btn-gold mt-8">
            Request a Quote
          </Link>
        </nav>
      )}
    </>
  );
}

'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import clsx from './clsx';

type Props = { as?: ElementType; className?: string; children: ReactNode; id?: string; delay?: number } & Record<string, unknown>;

/** Fades content up as it enters the viewport. Respects prefers-reduced-motion via CSS. */
export default function Reveal({ as: Tag = 'div', className, children, delay = 0, ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={clsx('reveal', visible && 'is-visible', className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}

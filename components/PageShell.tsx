import type { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Corner brackets (fixed, full viewport) */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 998 }}>
        {[
          { top: 16, left: 16, borderWidth: '3px 0 0 3px' },
          { top: 16, right: 16, borderWidth: '3px 3px 0 0' },
          { bottom: 16, left: 16, borderWidth: '0 0 3px 3px' },
          { bottom: 16, right: 16, borderWidth: '0 3px 3px 0' },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            ...pos,
            width: 32,
            height: 32,
            borderColor: 'var(--green)',
            borderStyle: 'solid',
          }} />
        ))}
      </div>

      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

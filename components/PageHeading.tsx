export default function PageHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <p style={{
        fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
        fontSize: '8px',
        letterSpacing: '2px',
        lineHeight: 1.6,
        color: 'var(--green)',
        marginBottom: '14px',
      }}>
        {eyebrow}
      </p>
      <h1 style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(28px, 5vw, 48px)',
        letterSpacing: '4px',
        color: 'var(--white)',
        lineHeight: 1.1,
      }}>
        {title}
      </h1>
    </div>
  );
}

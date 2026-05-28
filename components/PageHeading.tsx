export default function PageHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '5px',
        color: 'var(--green)',
        marginBottom: '12px',
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

export default function ImgPlaceholder({ caption }: { caption: string }) {
  return (
    <div style={{
      background: 'var(--forest)',
      border: '1px dashed rgba(135,206,52,0.3)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '220px',
      gap: '8px',
      padding: '24px',
    }}>
      <span style={{
        fontFamily: 'monospace',
        fontSize: '11px',
        letterSpacing: '2px',
        color: 'rgba(135,206,52,0.4)',
      }}>
        SCREENSHOT KOMMER
      </span>
      <span style={{
        fontFamily: 'monospace',
        fontSize: '10px',
        color: 'rgba(122,172,174,0.5)',
        textAlign: 'center',
      }}>
        {caption}
      </span>
    </div>
  );
}

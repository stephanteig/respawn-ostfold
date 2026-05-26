export default function LogoFull({ size = 260 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 498.78 498.78"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Background */}
      <rect fill="#102c31" width="498.78" height="498.78" />

      {/* Corner brackets */}
      <path d="M472.63,436.87v35.76h-35.76" fill="none" stroke="#87ce34" strokeWidth="2.5" strokeMiterlimit="10" />
      <path d="M473.2,61.34V25.58h-35.76" fill="none" stroke="#87ce34" strokeWidth="2.5" strokeMiterlimit="10" />
      <path d="M25.91,61.66V25.91h35.76" fill="none" stroke="#87ce34" strokeWidth="2.5" strokeMiterlimit="10" />
      <path d="M26.03,436.99v35.76h35.76" fill="none" stroke="#87ce34" strokeWidth="2.5" strokeMiterlimit="10" />

      {/* Icon */}
      <rect fill="none" stroke="#87ce34" strokeWidth="5" strokeMiterlimit="10" x="177.87" y="99.85" width="143.04" height="143.04" />
      <rect fill="#87ce34" opacity="0.4" x="171.37" y="93.35" width="13" height="13" />
      <rect fill="#87ce34" opacity="0.4" x="314.41" y="93.35" width="13" height="13" />
      <rect fill="#87ce34" opacity="0.4" x="171.37" y="236.39" width="13" height="13" />
      <rect fill="#87ce34" opacity="0.4" x="314.41" y="236.39" width="13" height="13" />
      <rect fill="#1e4835" x="194.13" y="116.11" width="110.53" height="110.53" />
      <rect fill="#316364" x="210.38" y="132.36" width="78.02" height="78.02" />
      <rect fill="#87ce34" opacity="0.8" x="226.64" y="148.61" width="45.51" height="45.51" />
      <rect fill="#ffffff" x="239.64" y="161.62" width="19.51" height="19.51" />

      {/* Separator */}
      <line x1="66.6" y1="342.7" x2="210.38" y2="342.7" fill="none" stroke="#87ce34" strokeOpacity="0.5" strokeMiterlimit="10" />
      <polygon fill="#87ce34" opacity="0.8" points="249.39 329.7 265.65 342.7 249.39 355.71 233.14 342.7 249.39 329.7" />
      <line x1="288.4" y1="342.7" x2="429.99" y2="342.7" fill="none" stroke="#87ce34" strokeOpacity="0.5" strokeMiterlimit="10" />

      {/* RESPAWN */}
      <text
        x="249.39"
        y="316"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="76"
        fontFamily="'Share Tech Mono', monospace"
        letterSpacing="3"
      >
        RESPAWN
      </text>

      {/* ØSTFOLD */}
      <text
        x="249.39"
        y="408"
        textAnchor="middle"
        fill="#87ce34"
        fontSize="26"
        fontFamily="'Press Start 2P', 'Share Tech Mono', monospace"
        letterSpacing="2"
      >
        ØSTFOLD
      </text>
    </svg>
  );
}

// src/components/atoms/GeometricCanvas.tsx

export function GeometricCanvas() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Long diagonals */}
      <line x1="0"   y1="200" x2="1440" y2="700" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="0"   y1="600" x2="1440" y2="100" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="200" y1="0"   x2="900"  y2="900" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="800" y1="0"   x2="1440" y2="600" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

      {/* Hairline horizontals */}
      <line x1="0" y1="150" x2="1440" y2="150" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
      <line x1="0" y1="350" x2="1440" y2="350" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
      <line x1="0" y1="550" x2="1440" y2="550" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
      <line x1="0" y1="720" x2="1440" y2="720" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
      <line x1="0" y1="820" x2="1440" y2="820" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />

      {/* Hairline verticals */}
      <line x1="360"  y1="0" x2="360"  y2="900" stroke="white" strokeOpacity="0.02" strokeWidth="0.5" />
      <line x1="1080" y1="0" x2="1080" y2="900" stroke="white" strokeOpacity="0.02" strokeWidth="0.5" />

      {/* Large inset rectangle */}
      <rect x="72" y="45" width="1296" height="810" fill="none" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

      {/* Corner brackets — top-left */}
      <polyline points="72,120 72,45 147,45"    fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
      {/* Corner brackets — bottom-right */}
      <polyline points="1368,780 1368,855 1293,855" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
      {/* Corner brackets — top-right */}
      <polyline points="1293,45 1368,45 1368,120"   fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
      {/* Corner brackets — bottom-left */}
      <polyline points="147,855 72,855 72,780"       fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
    </svg>
  );
}

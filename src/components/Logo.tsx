export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#gradient1)"
        stroke="white"
        strokeWidth="2"
      />
      
      {/* Heart shape */}
      <path
        d="M50 75 C40 65, 30 55, 30 45 C30 35, 40 30, 50 35 C60 30, 70 35, 70 45 C70 55, 60 65, 50 75 Z"
        fill="white"
        opacity="0.9"
      />
      
      {/* Pulse line */}
      <path
        d="M20 50 L35 50 L40 35 L45 65 L50 20 L55 80 L60 40 L65 50 L80 50"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        opacity="0.8"
      />
      
      {/* Blood pressure reading */}
      <text
        x="50"
        y="88"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontWeight="600"
      >
        120/80
      </text>
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
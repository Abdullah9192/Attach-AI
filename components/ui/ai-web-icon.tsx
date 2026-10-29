export function AiWebIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="12" cy="12" r="9" />
      {/* Vertical line through center */}
      <path d="M12 3v18" />
      {/* Top latitude curve */}
      <path d="M5 8.5c2-1.5 5-1.5 7 0s5 1.5 7 0" />
      {/* Middle latitude curve */}
      <path d="M5 12h14" />
      {/* Bottom latitude curve */}
      <path d="M5 15.5c2 1.5 5 1.5 7 0s5-1.5 7 0" />
    </svg>
  )
}

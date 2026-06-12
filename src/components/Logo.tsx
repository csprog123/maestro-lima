// SmartFix brand mark: a rounded navy house enclosing a white wrench.
// Inline SVG so it inherits the navy theme and stays crisp at any size.
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="SmartFix"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* House — pentagon with rounded corners via a matching round-joined stroke */}
      <path
        d="M24 4 L43 21 L43 44 L5 44 L5 21 Z"
        className="fill-brand stroke-brand"
        strokeWidth={6}
        strokeLinejoin="round"
      />
      {/* Wrench */}
      <g
        transform="translate(10.2 14.2) scale(1.15)"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </g>
    </svg>
  );
}

import React from 'react';

/**
 * CharityOneIcon - A modern heart with a bold "1" carved inside.
 * Designed for visibility and branding in dark/light modes.
 */
export const CharityOneIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    className={className}
    role="img"
    aria-label="CharityOne Logo"
  >
    <defs>
      {/* Mask to cut the number "1" from the heart */}
      <mask id="heart-mask">
        {/* Full heart filled with white (visible) */}
        <rect width="32" height="32" fill="white" />
        {/* The "1" shape (cut out with black) */}
        <path
          d="M16 8 L16 22 L14 22 L14 12 L12 14 L12 11 L16 8 Z"
          fill="black"
        />
      </mask>
    </defs>

    {/* Heart with mask that cuts out the "1" */}
    <path
      d="M16 28s-7.5-6.5-10.5-10C3.4 15 2 12.7 2 10A7 7 0 0 1 9 3c2.3 0 4.4 1.2 5.5 3C15.6 4.2 17.7 3 20 3a7 7 0 0 1 7 7c0 2.7-1.4 5-3.5 8S16 28 16 28Z"
      fill="currentColor"
      mask="url(#heart-mask)"
    />

    {/* Sparkle above the heart */}
    <path
      d="M22 5l0.5 1.2L24 6l-1.2 0.5L22 8l-0.5-1.5L20 6l1.5-0.3L22 5z"
      fill="currentColor"
      opacity="0.7"
    />
  </svg>
);

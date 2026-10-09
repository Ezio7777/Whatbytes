/** Brand mark: a shopping bag with a check, white tile for use on the blue header */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="40" height="40" rx="10" fill="#fff" />
      <path
        d="M12 15h16l1.6 14.2a2 2 0 0 1-2 2.3H12.4a2 2 0 0 1-2-2.3L12 15z"
        fill="#0B57A8"
      />
      <path
        d="M16 15v-1.5a4 4 0 0 1 8 0V15"
        fill="none"
        stroke="#0B57A8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M16.5 23.2l2.6 2.6 4.6-5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

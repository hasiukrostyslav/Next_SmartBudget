import React from 'react';

interface SelectWrapperProps {
  ref: React.RefObject<HTMLDivElement | null>;
  onBlur: (e: React.FocusEvent) => void;
  children: React.ReactNode;
}

// Positions the popover and closes it when focus leaves. The trigger button
// carries the ARIA state (aria-haspopup, aria-expanded, aria-controls); a role
// here duplicated it and pointed aria-controls at an id that did not exist.
export default function SelectWrapper({
  ref,
  onBlur,
  children,
}: SelectWrapperProps) {
  return (
    <div ref={ref} className="relative" onBlur={onBlur}>
      {children}
    </div>
  );
}

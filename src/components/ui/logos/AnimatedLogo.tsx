import Link from 'next/link';

import Logo from './Logo';

interface AnimatedLogoProps {
  isCollapsed: boolean;
}

// The key remounts the wrapper when the sidebar collapses or expands, which
// replays the CSS fade (animate-logo-in in styles/animations.css). This used
// to be motion's AnimatePresence, a 6 MB dependency for one transition.
export default function AnimatedLogo({ isCollapsed }: AnimatedLogoProps) {
  return (
    <Link className="outline-round-sm flex justify-center" href="/">
      <div
        key={isCollapsed ? 'sm' : 'lg'}
        className="animate-logo-in motion-reduce:animate-none"
      >
        <Logo className="h-10" type={isCollapsed ? 'sm' : 'lg'} />
      </div>
    </Link>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';

// Measures how many items fit on a single row of `containerRef`, reserving
// room for the "+N more" button when the items overflow. Render every item in
// the hidden `measureRef` layer so widths stay stable as the visible row is
// sliced.
export function useOverflowList(count: number, buttonWidth = 100, gap = 8) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(count);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const recalc = () => {
      const available = container.clientWidth;
      const widths = Array.from(measure.children).map(
        (child) => (child as HTMLElement).offsetWidth,
      );

      // Everything fits without needing the "+N more" button.
      const total = widths.reduce((sum, w) => sum + w + gap, 0) - gap;
      if (total <= available) {
        setVisible(count);
        return;
      }

      // Overflowing: reserve space for the button and count what fits.
      let used = 0;
      let fit = 0;
      for (const width of widths) {
        if (used + width + buttonWidth > available) break;
        used += width + gap;
        fit++;
      }
      setVisible(fit);
    };

    const observer = new ResizeObserver(recalc);
    observer.observe(container);
    recalc();

    return () => observer.disconnect();
  }, [count, buttonWidth, gap]);

  return { containerRef, measureRef, visible };
}

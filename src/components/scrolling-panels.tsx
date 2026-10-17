import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollingPanels({ label, children }: { label: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let hovered = false;
    let touching = false;
    let focused = false;
    let expanded = false;
    let frame = 0;
    let previous = 0;
    let position = element.scrollLeft;
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
    observer.observe(element);
    const enter = () => { hovered = true; };
    const leave = () => { hovered = false; };
    const touchStart = () => { touching = true; };
    const touchEnd = () => { touching = false; };
    const focus = () => { focused = true; };
    const blur = (event: FocusEvent) => { focused = event.relatedTarget instanceof Node && element.contains(event.relatedTarget); };
    const toggle = () => { expanded = Boolean(element.querySelector('details[open]')); };
    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointerleave', leave);
    element.addEventListener('touchstart', touchStart, { passive: true });
    element.addEventListener('touchend', touchEnd);
    element.addEventListener('touchcancel', touchEnd);
    element.addEventListener('focusin', focus);
    element.addEventListener('focusout', blur);
    element.addEventListener('toggle', toggle, true);
    toggle();
    const tick = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (playing && visible && !hovered && !touching && !focused && !expanded && !motion.matches && !document.hidden) {
        const end = element.scrollWidth - element.clientWidth;
        if (end > 0) {
          if (element.scrollLeft >= end - 1) direction.current = -1;
          if (element.scrollLeft <= 0) direction.current = 1;
          position = Math.max(0, Math.min(end, position + direction.current * elapsed * 0.028));
          element.scrollLeft = position;
        }
      } else {
        position = element.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointerleave', leave);
      element.removeEventListener('touchstart', touchStart);
      element.removeEventListener('touchend', touchEnd);
      element.removeEventListener('touchcancel', touchEnd);
      element.removeEventListener('focusin', focus);
      element.removeEventListener('focusout', blur);
      element.removeEventListener('toggle', toggle, true);
    };
  }, [playing]);

  function step(amount: number) {
    setPlaying(false);
    const element = rail.current;
    if (!element) return;
    const panel = element.querySelector('article');
    element.scrollBy({ left: amount * ((panel?.getBoundingClientRect().width ?? 320) + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  return <div className="scrolling-panels">
    <div className="panel-navigation" role="group" aria-label={`${label} navigation`}>
      <Button variant="ghost" size="icon" onClick={() => step(-1)} aria-label={`Previous ${label}`} title="Previous"><ArrowLeft /></Button>
      <Button variant="ghost" size="icon" onClick={() => setPlaying(value => !value)} aria-label={playing ? `Pause ${label}` : `Play ${label}`} title={playing ? 'Pause' : 'Play'} aria-pressed={!playing}>{playing ? <Pause /> : <Play />}</Button>
      <Button variant="ghost" size="icon" onClick={() => step(1)} aria-label={`Next ${label}`} title="Next"><ArrowRight /></Button>
    </div>
    <div ref={rail} className="panel-rail" role="region" aria-label={label} tabIndex={0}>{children}</div>
  </div>;
}
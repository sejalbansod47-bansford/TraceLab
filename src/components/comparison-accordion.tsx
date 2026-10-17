import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Comparison = [string, string, string, string, string, string];

export function ComparisonAccordion({ items }: { items: Comparison[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const element = container.current;
    if (!element || !playing || paused) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
    observer.observe(element);
    const timer = window.setInterval(() => {
      if (visible && !motion.matches && !document.hidden) setActive(value => (value + 1) % items.length);
    }, 10000);
    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, [items.length, playing, paused, active]);

  function select(index: number) {
    setPlaying(false);
    setActive((index + items.length) % items.length);
  }

  return <div className="scrolling-panels comparison-carousel" ref={container}
    onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}
    onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="panel-navigation" role="group" aria-label="Tool comparisons navigation">
      <span className="comparison-count" aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
      <Button variant="ghost" size="icon" onClick={() => select(active - 1)} aria-label="Previous Tool comparisons" title="Previous"><ArrowLeft /></Button>
      <Button variant="ghost" size="icon" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause Tool comparisons' : 'Play Tool comparisons'} title={playing ? 'Pause' : 'Play'} aria-pressed={!playing}>{playing ? <Pause /> : <Play />}</Button>
      <Button variant="ghost" size="icon" onClick={() => select(active + 1)} aria-label="Next Tool comparisons" title="Next"><ArrowRight /></Button>
    </div>
    <div className="comparison-accordion" role="region" aria-label="Tool comparisons">
      {items.map(([tag, title, short, them, us, theyWin], index) => <article className="comparison-fold" data-active={active === index} key={tag}>
        <Button variant="ghost" className="comparison-tab" aria-label={`Show comparison ${index + 1}: ${title}`} aria-expanded={active === index} aria-controls={`${id}-${index}`} onClick={() => select(index)}>
          <span>{String(index + 1).padStart(2, '0')}</span><span className="comparison-tab-title">{tag.replace('vs ', '')}</span><ArrowUpRight aria-hidden="true" />
        </Button>
        <div className="comparison-fold-body" id={`${id}-${index}`} aria-hidden={active !== index} inert={active !== index}>
          {active === index && <div className="comparison-reading" key={index}>
            <span className="kicker">{tag}</span><h3>{title}</h3><p className="short">{short}</p>
            <details className="more" open onClick={event => { if ((event.target as HTMLElement).closest('summary')) setPlaying(false); }}>
              <summary>Why</summary>
              <p><b>How they work.</b> {them}</p>
              <p><b>How TraceLab works.</b> {us}</p>
              <p><b>Where they still win.</b> {theyWin}</p>
            </details>
          </div>}
        </div>
      </article>)}
    </div>
  </div>;
}
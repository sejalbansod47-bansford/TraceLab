import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Comparison = [string, string, string, string, string, string];

export function ComparisonGrid({ items }: { items: Comparison[] }) {
  const [active, setActive] = useState(0);
  function step(direction: number) {
    setActive(value => (value + direction + items.length) % items.length);
  }
  return <div className="comparison-switcher">
    <div className="panel-navigation" role="group" aria-label="Tool comparison navigation">
      <span className="comparison-count">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
      <Button variant="ghost" size="icon" onClick={() => step(-1)} aria-label="Previous comparison" title="Previous"><ArrowLeft /></Button>
      <Button variant="ghost" size="icon" onClick={() => step(1)} aria-label="Next comparison" title="Next"><ArrowRight /></Button>
    </div>
    <div className="comparison-folds" aria-label="Tool comparisons">
      {items.map(([tag, title, short, theirs, ours, wins], index) => <article className="comparison-fold" data-active={active === index} key={tag}>
        <Button variant="ghost" className="comparison-tab" onClick={() => setActive(index)} aria-label={`Show ${tag}`} aria-expanded={active === index}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="comparison-tab-title">{tag.replace(/^vs /, '')}</span>
          <ArrowUpRight size={14} />
        </Button>
        {active === index && <div className="comparison-reading">
          <span className="kicker">{tag}</span>
          <h3>{title}</h3>
          <p className="short">{short}</p>
          <div className="comparison-explanation">
            <p><b>How they work.</b> {theirs}</p>
            <p><b>How TraceLab works.</b> {ours}</p>
            <p><b>Where they still win.</b> {wins}</p>
          </div>
        </div>}
      </article>)}
    </div>
  </div>;
}

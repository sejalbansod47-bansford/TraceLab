import { useId, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FutureFlipCard({ tag, title, body, limit, index }: {
  tag: string; title: string; body: string; limit: string; index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const id = useId();
  return <article className="future-flip-card" data-flipped={flipped} aria-label={tag}>
    <div className="science-flip-inner">
      <div className="future-flip-face" aria-hidden={flipped} inert={flipped}>
        <div className="panel-heading"><span className="kicker">{tag}</span><span className="panel-number">{String(index + 1).padStart(2, '0')}</span></div>
        <h3>{title}</h3>
        <Button variant="ghost" size="icon" className="science-flip-toggle" onClick={() => setFlipped(true)} aria-controls={id} aria-expanded={false} aria-label={`Read more: ${tag}`} title="Read more"><Plus /></Button>
      </div>
      <div className="future-flip-face future-flip-back" aria-hidden={!flipped} inert={!flipped}>
        <div id={id} className="future-flip-reading" tabIndex={flipped ? 0 : -1} role="region" aria-label={`${tag} explanation`}>
          <span className="kicker">{tag}</span>
          <p>{body}</p>
          <p className="science-flip-limit"><b>Known limit.</b> {limit}</p>
        </div>
        <Button variant="ghost" size="icon" className="science-flip-toggle" onClick={() => setFlipped(false)} aria-controls={id} aria-expanded={true} aria-label={`Back to ${tag}`} title="Back"><X /></Button>
      </div>
    </div>
  </article>;
}

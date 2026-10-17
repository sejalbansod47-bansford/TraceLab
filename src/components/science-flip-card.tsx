import { useId, useState } from 'react';
import { Plus, X, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScienceFlipCard({ tech, title, body, limit, icon: Icon, index }: {
  tech: string; title: string; body: string; limit: string; icon: LucideIcon; index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const id = useId();
  return <article className="science-flip-card" data-flipped={flipped} aria-label={tech}>
    <div className="science-flip-inner">
      <div className="science-flip-face science-flip-front" aria-hidden={flipped} inert={flipped}>
        <div className="science-flip-label"><span className="kicker">{tech}</span><span className="fine">{String(index + 1).padStart(2, '0')}</span></div>
        <Icon className="science-flip-symbol" strokeWidth={1.2} aria-hidden="true" />
        <h3>{title}</h3>
      </div>
      <div className="science-flip-face science-flip-back" aria-hidden={!flipped} inert={!flipped}>
        <div id={id} className="science-flip-reading" tabIndex={flipped ? 0 : -1} role="region" aria-label={`${tech} explanation`}>
          <span className="kicker">{tech}</span>
          <h3>{title}</h3>
          <p>{body}</p>
          <p className="science-flip-limit"><b>What it can’t do.</b> {limit}</p>
        </div>
      </div>
    </div>
    <Button variant="ghost" size="icon" className="science-flip-toggle" onClick={() => setFlipped(value => !value)} aria-expanded={flipped} aria-controls={id} aria-label={flipped ? `Back to ${tech}` : `Why: ${tech}`} title={flipped ? 'Back' : 'Why'}>{flipped ? <X /> : <Plus />}</Button>
  </article>;
}
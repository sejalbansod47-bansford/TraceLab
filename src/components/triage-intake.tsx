import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { buildReport, demoEvidence, lineage, leftOut, rejectedClaims, validateDemoSelection } from '@/lib/triage-demo';
import original from '@/assets/synthetic-courtyard.jpg';
import crop from '@/assets/synthetic-crop.jpg';
import tone from '@/assets/synthetic-tone.jpg';
import small from '@/assets/synthetic-small.jpg';

const fixtures = [['A', original, '1536 × 1024'], ['B', original, '1536 × 1024'], ['C', crop, '1536 × 1024'], ['D', tone, '1536 × 1024'], ['E', small, '768 × 512']] as const;
const heat = Array.from({ length: 96 }, (_, i) => { const x = i % 12, y = Math.floor(i / 12); return x > 2 && x < 10 && y > 1 && y < 7; });

export function TriageIntake({ startLoaded = false }: { startLoaded?: boolean }) {
  const input = useRef<HTMLInputElement>(null);
  const [loaded, setLoaded] = useState(startLoaded);
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const [notice, setNotice] = useState('');
  const [dragging, setDragging] = useState(false);
  const [evidence, setEvidence] = useState<(typeof demoEvidence)[number] | null>(null);
  const selectFiles = (files: File[]) => setNotice(validateDemoSelection(files));
  function run() {
    if (!loaded || phase === 'running') return;
    setPhase('running');
    window.setTimeout(() => setPhase('done'), 1300);
  }
  function download() {
    const url = URL.createObjectURL(new Blob([buildReport()], { type: 'text/plain' }));
    const a = document.createElement('a'); a.href = url; a.download = 'tracelens-synthetic-brief.txt'; a.click(); URL.revokeObjectURL(url);
  }
  return <section>
    <div className="page-head"><span className="kicker">the app</span><h1 className="h2">drop the copies. <em>A goes first.</em></h1></div>
    <div className="app-grid">
      <div className={`drop ${dragging ? 'on' : ''}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); selectFiles(Array.from(e.dataTransfer.files)); }}>
        <input ref={input} className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" multiple aria-label="Select PNG, JPG, or WebP pictures" onChange={e => { selectFiles(Array.from(e.target.files ?? [])); e.target.value = ''; }} />
        {loaded ? <>
          <div className="order">{fixtures.map(([l, src, size]) => <figure key={l}><img src={src} width={1536} height={1024} alt={`Synthetic courtyard copy ${l}`} /><figcaption><b>{l}</b><span>{size}</span></figcaption></figure>)}</div>
          <p className="fine">Order: A is the reference. B–E are compared to it.</p>
          <button className="btn btn-sm" onClick={() => { setLoaded(false); setPhase('idle'); }} disabled={phase === 'running'}>clear</button>
        </> : <>
          <h3>drop pictures here</h3><p className="fine">PNG, JPG, or WebP · put your reference first</p>
          <button className="btn" onClick={() => input.current?.click()}>choose files</button>
        </>}
      </div>
      <div className="panel">
        <h3>run a first pass</h3>
        <ol><li>Load copies, A first</li><li>Run triage</li><li>Read the cited brief</li></ol>
        {notice && <p className="notice" role="alert">{notice}</p>}
        <div className="ctas">
          <button className="btn" onClick={() => { setLoaded(true); setPhase('idle'); setNotice(''); }} disabled={phase === 'running'}>use synthetic A–E</button>
          <button className="btn btn-fill" onClick={run} disabled={!loaded || phase === 'running'}>{phase === 'running' ? <><Loader2 size={16} className="spin" /> running</> : 'run triage'}</button>
        </div>
        <p className="fine">Files stay local. Only measurement JSON would leave your machine. In this demo, nothing does.</p>
      </div>
    </div>
    {phase === 'done' && <div className="results" aria-live="polite">
      <div className="panel wide"><span className="kicker">lineage</span>
        <div className="lineage">{lineage.map((l, i) => <span key={l} style={{ display: 'contents' }}>{i > 0 && <span className="arrow">→</span>}<span className="node">{l}<small>{['reference', 'exact copy', 'cropped', 'tone'][i]}</small></span></span>)}<span className="node out">{leftOut}<small>left out</small></span></div>
      </div>
      <div className="panel"><span className="kicker">difference map · A vs D</span><div className="heat" aria-label="Placeholder difference heatmap">{heat.map((h, i) => <i key={i} className={h ? '' : 'lo'} />)}</div><p className="fine">Placeholder. Real maps come from measurement.</p></div>
      <div className="panel"><span className="kicker">rejected by the sceptic</span><ul className="rejected">{rejectedClaims.map(c => <li key={c}>{c}</li>)}</ul><p className="fine">No citation, no claim.</p></div>
      <div className="panel wide"><span className="kicker">evidence</span>
        {demoEvidence.map(r => <div className="row" key={r.id}><button className="id" onClick={() => setEvidence(r)} aria-label={`View evidence ${r.id}`}>{r.id}</button><span>{r.title}</span><span className="fine">{r.status}</span></div>)}
        <div className="ctas"><button className="btn btn-fill" onClick={download}>download report</button></div>
      </div>
    </div>}
    <Dialog open={evidence !== null} onOpenChange={o => { if (!o) setEvidence(null); }}><DialogContent><DialogHeader><DialogTitle>{evidence?.id} · {evidence?.title}</DialogTitle><DialogDescription>Synthetic fixture evidence</DialogDescription></DialogHeader><p>{evidence?.detail}</p></DialogContent></Dialog>
  </section>;
}

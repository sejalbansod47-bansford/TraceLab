import { useRef, useState } from 'react';
import { ArrowRight, Check, FileImage, FlaskConical, Loader2, Upload, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { demoEvidence, validateDemoSelection } from '@/lib/triage-demo';
import original from '@/assets/synthetic-courtyard.jpg';
import crop from '@/assets/synthetic-crop.jpg';
import tone from '@/assets/synthetic-tone.jpg';
import small from '@/assets/synthetic-small.jpg';

const fixtures = [original, original, crop, tone, small];
export function TriageIntake() {
  const input = useRef<HTMLInputElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const [notice, setNotice] = useState('');
  const [dragging, setDragging] = useState(false);
  const [evidence, setEvidence] = useState<(typeof demoEvidence)[number] | null>(null);
  function selectFiles(files: File[]) { setNotice(validateDemoSelection(files)); }
  function run() {
    if (!loaded || phase === 'running') return;
    setPhase('running');
    window.setTimeout(() => setPhase('done'), 1300);
  }
  return <section id="try" className="intake-section section-anchor">
    <div className="section-heading"><div><span className="eyebrow">YOUR FIRST PASS STARTS HERE</span><h2>A small set. A clearer picture.</h2></div><span className="quiet-label"><FlaskConical size={15} /> Interactive synthetic demo</span></div>
    <div className="intake-layout">
      <div className="intake-main">
        <div className={`dropzone ${dragging ? 'is-dragging' : ''}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); selectFiles(Array.from(event.dataTransfer.files)); }}>
          <input ref={input} className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" multiple aria-label="Select PNG, JPG, or WebP pictures" onChange={event => { selectFiles(Array.from(event.target.files ?? [])); event.target.value = ''; }} />
          {loaded ? <><div className="fixture-grid">{fixtures.map((src, index) => <div className="fixture" key={index}><img src={src} width={1536} height={1024} loading="lazy" alt={`Synthetic courtyard copy ${String.fromCharCode(65 + index)}`} /><span>{String.fromCharCode(65 + index)}<span>{index === 4 ? '768 × 512' : '1536 × 1024'}</span></span></div>)}</div><div className="loaded-line"><span><Check size={15} /> 5 synthetic pictures ready</span><Button variant="ghost" size="icon" aria-label="Remove synthetic pictures" onClick={() => { setLoaded(false); setPhase('idle'); }} disabled={phase === 'running'}><X /></Button></div></> : <><div className="upload-icon"><Upload size={24} strokeWidth={1.5} /></div><h3>Drop copies of your pictures</h3><p>PNG, JPG, or WebP</p><Button variant="outline" onClick={() => input.current?.click()}>Choose pictures <ArrowUpRight /></Button><span className="drop-note">Synthetic demo only. Real files are not processed.</span></>}
        </div>
        {notice && <p className="intake-notice" role="alert">{notice}</p>}
        <div className="intake-actions"><Button variant="outline" onClick={() => { setLoaded(true); setPhase('idle'); setNotice(''); }} disabled={phase === 'running'}><FlaskConical /> Use synthetic A–E</Button><Button onClick={run} disabled={!loaded || phase === 'running'}>{phase === 'running' ? <><Loader2 className="spin" /> Running demo</> : <>Run triage <ArrowRight /></>}</Button></div>
        <p className="local-note"><ShieldCheck size={14} /> Nothing is uploaded. This demo stays in your browser.</p>
      </div>
      <aside className="intake-aside"><span className="eyebrow">WHAT COMES BACK</span><h3>A review brief,<br />not a verdict.</h3><div className="deliverable"><FileImage /><div><strong>Copies, connected</strong><p>Which files belong in the same family.</p></div></div><div className="deliverable"><ArrowUpRight /><div><strong>Changes, made explicit</strong><p>Framing, tone, size, and encoding.</p></div></div><div className="deliverable"><ShieldCheck /><div><strong>Evidence, not confidence theatre</strong><p>Citable observations. Clear abstentions.</p></div></div><div className="demo-disclaimer">This is a scripted example using known synthetic transformations. No analysis service is connected.</div></aside>
    </div>
    {phase === 'done' && <div className="results" aria-live="polite"><div className="result-heading"><div><span className="eyebrow">SYNTHETIC REVIEW BRIEF</span><h3>One family. Four kinds of change.</h3></div><span className="result-status"><Check size={14} /> Demo complete</span></div><div className="result-table">{demoEvidence.map(row => <div className="result-row" key={row.id}><span className="file-pair">{row.files}</span><div><strong>{row.title}</strong><p>{row.observation} <Button variant="link" size="sm" onClick={() => setEvidence(row)} aria-label={`View evidence ${row.id}`}>[{row.id}] <ArrowUpRight /></Button></p></div><span className={row.id === 'E-005' ? 'finding-status abstain' : 'finding-status'}>{row.status}</span></div>)}</div><p className="result-note">Human review required · Known fixture transformations, not forensic conclusions</p></div>}
    <Dialog open={evidence !== null} onOpenChange={open => { if (!open) setEvidence(null); }}><DialogContent><DialogHeader><DialogTitle>{evidence?.id} · {evidence?.title}</DialogTitle><DialogDescription>Synthetic fixture evidence · {evidence?.files}</DialogDescription></DialogHeader><p className="evidence-detail">{evidence?.detail}</p></DialogContent></Dialog>
  </section>;
}
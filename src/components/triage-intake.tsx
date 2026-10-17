import { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Loader2, Plus, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgentOrchestration } from '@/components/agent-orchestration';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AGENTS, API_BASE, createCase, fileUrl, getEvidence, getReport, openEvents, originalUrl, reportUrl, validateSelection,
  type EngineEvent, type Evidence, type EvidenceItem, type ReportManifest, type Sceptic,
} from '@/lib/tracelab-api';

type Phase = 'idle' | 'measuring' | 'agents' | 'done' | 'error';
type Trail = { state: string; extra?: string | undefined }[];
const DEMO_CLAIMS = 'C was tampered with because its metadata was stripped.\nThe account @synthetic_account shown in D is the person who edited the van into the photo.';
const LABELS = 'ABCDEFGHIJ';
// "B is a crop of A (…)" -> "a crop of A"; weak tie-break links are labelled as such
const edgeLabel = (basis: string) => basis.startsWith('weak') ? 'weak link' : (basis.split(' (')[0] ?? '').replace(/^.*? (is|contains) /, (_m, v) => (v === 'contains' ? 'contains ' : ''));

function Chips({ ids, onOpen }: { ids: string[]; onOpen: (id: string) => void }) {
  if (!ids?.length) return <span className="ev-chip uncited">uncited</span>;
  return <>{ids.map(id => <button type="button" key={id} className="ev-chip" onClick={() => onOpen(id)}>{id}</button>)}</>;
}

export function TriageIntake({ startLoaded = false, replayCase }: { startLoaded?: boolean; replayCase?: string | undefined }) {
  const input = useRef<HTMLInputElement>(null);
  const esRef = useRef<EventSource | null>(null);
  const [demo, setDemo] = useState(startLoaded);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [notice, setNotice] = useState('');
  const [dragging, setDragging] = useState(false);
  const [claims, setClaims] = useState(startLoaded ? DEMO_CLAIMS : '');
  const [forceMalformed, setForceMalformed] = useState(true);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [ev, setEv] = useState<Evidence | null>(null);
  const [trails, setTrails] = useState<Record<string, Trail>>({});
  const [sceptic, setSceptic] = useState<Sceptic | null>(null);
  const [report, setReport] = useState<ReportManifest | null>(null);
  const [runInfo, setRunInfo] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => () => { esRef.current?.close(); previews.forEach(URL.revokeObjectURL); }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (replayCase) void startReplay(replayCase); }, [replayCase]);  // eslint-disable-line react-hooks/exhaustive-deps

  const evIndex: Record<string, EvidenceItem> = Object.fromEntries((ev?.evidence ?? []).map(x => [x.id, x]));
  const loaded = demo || files.length > 0;
  const busy = phase === 'measuring' || phase === 'agents';

  function selectFiles(list: File[]) {
    const err = validateSelection(list);
    if (err) { setNotice(err); return; }
    previews.forEach(URL.revokeObjectURL);
    setFiles(list); setPreviews(list.map(f => URL.createObjectURL(f)));
    setDemo(false); setNotice(''); setPhase('idle');
    if (claims === DEMO_CLAIMS) setClaims('');
  }
  function clear() { previews.forEach(URL.revokeObjectURL); setFiles([]); setPreviews([]); setDemo(false); setPhase('idle'); }
  function useDemo() { clear(); setDemo(true); setClaims(DEMO_CLAIMS); setNotice(''); }

  function setState(agent: string, state: string, extra?: string) {
    setTrails(t => {
      const cur = [...(t[agent] ?? [])];
      const last = cur[cur.length - 1];
      if (last && last.state === state) cur[cur.length - 1] = { state, extra: extra ?? last.extra };
      else cur.push({ state, extra });
      return { ...t, [agent]: cur };
    });
  }
  function onEvent(id: string) {
    return async (e: EngineEvent) => {
      if (e.type === 'run_start') setState('coordinator', 'running');
      else if (e.type === 'agent_state') {
        if (e.state === 'queued') return setState(e.agent, 'queued');
        const extra = e.state === 'recovered' ? e.recovery_id : e.state === 'vetoed' ? `${e.rejected} rejected` : e.state === 'done' && e.claims ? `${e.claims} claims` : undefined;
        setState(e.agent, e.state, extra);
      } else if (e.type === 'sceptic') setSceptic(e.data);
      else if (e.type === 'report_ready') { const r = await getReport(id); if (r) { setReport(r); if (r.sceptic) setSceptic(r.sceptic); } }
      else if (e.type === 'error') setNotice(e.text);
      else if (e.type === 'run_end') {
        setState('coordinator', e.subtype === 'success' ? 'done' : 'malformed');
        setRunInfo(e.subtype === 'success' ? `${((e.duration_ms ?? 0) / 1000).toFixed(0)}s · $${(e.cost_usd ?? 0).toFixed(2)}` : `ended: ${e.subtype}`);
        setPhase(e.subtype === 'success' ? 'done' : 'error');
        esRef.current?.close();
        const r = await getReport(id); if (r) { setReport(r); if (r.sceptic) setSceptic(r.sceptic); }
      }
    };
  }

  function resetRun() {
    esRef.current?.close();
    setTrails(Object.fromEntries(AGENTS.map(a => [a, [{ state: 'queued' }]])));
    setSceptic(null); setReport(null); setRunInfo(''); setEv(null); setCaseId(null);
  }

  async function run() {
    if (!loaded || busy) return;
    resetRun(); setPhase('measuring'); setNotice('');
    try {
      const res = await createCase({ files: demo ? [] : files, demo, question: '', claims, forceMalformed });
      setCaseId(res.case_id); setEv(res.evidence); setPhase('agents');
      esRef.current = openEvents(res.case_id, onEvent(res.case_id));
    } catch (err) {
      setPhase('error');
      setNotice(`Could not reach the TraceLab engine at ${API_BASE}. ${(err as Error).message}`);
    }
  }

  async function startReplay(id: string) {
    resetRun(); setPhase('agents');
    try {
      setEv(await getEvidence(id)); setCaseId(id);
      esRef.current = openEvents(id, onEvent(id), 4);
    } catch (err) { setPhase('error'); setNotice(`Replay failed: ${(err as Error).message}`); }
  }

  const lin = ev?.lineage_hypothesis;
  const diffs = (ev?.evidence ?? []).filter(x => x.kind === 'difference_map');
  const mainDiff = [...diffs].sort((a, b) => b.data.changed_pixel_frac - a.data.changed_pixel_frac)[0];
  const order = lin ? [lin.root, ...lin.edges.map(e => e.child)] : [];
  const openItem = open ? evIndex[open] : null;
  const synthetic = ev ? ev.synthetic_only : demo;

  return <section>
    <div className={`mode-banner ${synthetic ? '' : 'private'}`} role="status">
      {synthetic ? 'SYNTHETIC DEMO DATA ONLY. No real media' : 'Private set. No identity matching. Triage for a human expert, not a verdict'}
    </div>
    <div className="editorial intake-layout">
      <div className="intro">
        <span className="kicker">The app / Private picture triage</span>
        <h1 className="display">Drop the<br />copies.<br /><em>A goes first.</em></h1>
        <div className="intro-bottom">
          <p className="lede">A is the reference.<br />B, C, … are compared to it.</p>
          <div className={`drop ${dragging ? 'on' : ''}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); selectFiles(Array.from(e.dataTransfer.files)); }}>
            <input ref={input} className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" multiple aria-label="Select PNG, JPG, or WebP pictures" onChange={e => { selectFiles(Array.from(e.target.files ?? [])); e.target.value = ''; }} />
            {loaded ? <>
              {demo
                ? <p className="lede" style={{ margin: 0 }}>Synthetic set A–E (bundled with the engine): original, inserted object, social re-save, screenshot with false caption, unrelated picture.</p>
                : <div className="order">{previews.map((src, i) => <figure key={src}><img src={src} alt={`Upload ${LABELS[i]}`} /><figcaption><b>{LABELS[i]}</b><span>{files[i]?.name.slice(0, 18)}</span></figcaption></figure>)}</div>}
              <Button variant="traceOutline" size="sm" onClick={clear} disabled={busy}><X />clear</Button>
            </> : <>
              <span className="upload-emblem" aria-hidden="true"><Upload size={24} /></span>
              <h3>Drop pictures here</h3>
              <p className="fine">PNG, JPG, or WebP · reference first</p>
              <Button variant="traceOutline" onClick={() => input.current?.click()}><Plus />choose files</Button>
            </>}
          </div>
        </div>
      </div>
      <div className="right-stack">
        <section className="editorial-block set-panel">
          <div className="block-label"><span className="tag">01 / Your set</span><span className="fine">{demo ? 5 : files.length} pictures ready</span></div>
          <label className="field-label" htmlFor="claims">Claims to check (optional, one per line. The sceptic judges them)</label>
          <textarea id="claims" className="claims-input" value={claims} onChange={e => setClaims(e.target.value)} placeholder="e.g. The cup was always on the table." disabled={busy} />
          <label className="check"><input type="checkbox" checked={forceMalformed} onChange={e => setForceMalformed(e.target.checked)} disabled={busy} /> Force one broken agent reply (recovery demo)</label>
          <Button variant="traceOutline" size="sm" onClick={useDemo} disabled={busy}><Plus />use synthetic A–E</Button>
          {notice && <p className="notice" role="alert">{notice}</p>}
        </section>
        <section className="editorial-block">
          <div className="block-label"><span className="tag">02 / First pass</span><span className="fine">{phase === 'done' ? `Brief ready · ${runInfo}` : phase === 'measuring' ? 'Measuring pixels…' : phase === 'agents' ? 'Agents working…' : phase === 'error' ? 'Stopped' : 'Awaiting triage'}</span></div>
          <h2 className="statement">Measure.<br /><span>Then question.</span></h2>
          <p>Code fingerprints and aligns every picture. Then Claude agents read only those measurements, a sceptic throws out what isn't cited, and you get the brief.</p>
          <Button variant="trace" onClick={run} disabled={!loaded || busy}>{busy ? <><Loader2 className="spin" />{phase === 'measuring' ? 'measuring' : 'agents running'}</> : <>run triage<ArrowRight /></>}</Button>
          <p className="fine">Pictures go only to the TraceLab engine. Claude receives measurement JSON, never the pictures.</p>
        </section>
      </div>
    </div>

    {ev && caseId && lin && <div className="results" aria-live="polite">
      <div className="result-heading">
        <span className="kicker">{synthetic ? 'Synthetic brief' : 'Private brief'} / {caseId}</span>
        {report && <div className="dl-row">
          <Button asChild variant="trace"><a href={reportUrl(caseId, 'md', true)}><Download />download report</a></Button>
          <Button asChild variant="traceOutline"><a href={reportUrl(caseId, 'json', true)}><Download />JSON manifest</a></Button>
        </div>}
      </div>

      <div className="result-pair">
      <section className="result-section">
        <span className="kicker">01 · The family</span>
        <div className="lineage">{order.map((l, i) => <Fragment key={l}>{i > 0 && <span className="arrow">→</span>}<span className="node">{l}<small>{i === 0 ? 'reference' : edgeLabel(lin.edges[i - 1]?.direction_basis ?? '')}</small></span></Fragment>)}
          {lin.excluded.map(x => <span className="node out" key={x}>{x}<small>left out</small></span>)}</div>
        <p className="fine">{order.join(' → ')} {order.length === 1 ? 'stands alone' : 'are one family'}.{lin.excluded.length > 0 ? ` ${lin.excluded.join(', ')} left out.` : ''}</p>
        <details className="more">
          <summary>Why this order</summary>
          <p className="fine">{lin.method} <Chips ids={[lin.id]} onOpen={setOpen} /></p>
          <ul className="edge-list">{lin.edges.map(e => <li key={e.child}><b>{e.parent} → {e.child}</b> {e.direction_basis} <Chips ids={e.evidence_ids} onOpen={setOpen} /></li>)}
            {lin.excluded.length > 0 && <li><b>Left out: {lin.excluded.join(', ')}</b> no geometric alignment with any linked picture <Chips ids={lin.exclusion_evidence_ids} onOpen={setOpen} /></li>}</ul>
        </details>
      </section>

      <section className="result-section">
        <span className="kicker">02 · Where it changed</span>
        {diffs.length ? <>
          <div className="diff-row">{[...diffs].sort((a, b) => b.data.changed_pixel_frac - a.data.changed_pixel_frac).map(d => {
            const box = d.data.regions_px_in_drawn_on?.[0];
            return <figure key={d.id} className={d === mainDiff ? 'focus' : ''}>
              <span className="diff-frame"><img src={fileUrl(caseId, d.data.heatmap)} alt={`${d.data.child} compared with ${d.data.parent}`} /></span>
              <figcaption><b>{d.data.child} vs {d.data.parent}</b><span className="fine">{d.data.localized_regions} region{d.data.localized_regions === 1 ? '' : 's'}{box ? ` · ${box.w}×${box.h}px` : ''}</span></figcaption>
            </figure>;
          })}</div>
          <details className="more">
            <summary>Measurements</summary>
            <ul className="edge-list">{diffs.map(d => {
              const box = d.data.regions_px_in_drawn_on?.[0];
              return <li key={d.id}><b>{d.data.child} vs {d.data.parent}</b> {d.data.localized_regions} localized region(s){box ? `, box x=${box.x}, y=${box.y}, ${box.w}×${box.h}px` : ''}. <Chips ids={[d.id]} onOpen={setOpen} /></li>;
            })}</ul>
          </details>
        </> : <p className="fine">No linked pairs to compare.</p>}
      </section>
      </div>

      <section className="result-section">
        <span className="kicker">03 · Who checked it</span>
        <p className="fine">Three specialists read the measurements together. The sceptic can throw a claim out.</p>
        <AgentOrchestration trails={trails} />
      </section>

      <section className="result-section">
        <span className="kicker">04 · Thrown out</span>
        {sceptic ? <>
          <p className="fine">Veto {sceptic.veto ?? 'none'} · {sceptic.accepted.length} kept · {sceptic.rejected.length} thrown out.</p>
          {sceptic.rejected.length > 0 && <details className="more">
            <summary>What was thrown out</summary>
            <ul className="rejected">{sceptic.rejected.map((r, i) => <li key={i}><span className="claim">{r.text}</span> <span className="fine">{r.source}: {r.reason}</span> <Chips ids={r.evidence_ids} onOpen={setOpen} /></li>)}</ul>
          </details>}
        </> : <p className="fine">The sceptic runs after the three analysts.</p>}
      </section>

      {report?.report && <section className="result-section brief">
        <span className="kicker">05 · The brief</span>
        <h2>{report.report.title}</h2>
        <p>{report.report.summary}</p>
        <details className="more">
          <summary>Findings and limits</summary>
          {report.report.sections?.map(s => <div key={s.heading}><h3>{s.heading}</h3><ul>{s.findings.map((f, i) => <li key={i}>{f.text} <Chips ids={f.evidence_ids} onOpen={setOpen} /></li>)}</ul></div>)}
          {report.recoveries.length > 0 && <div><h3>Agent recovery</h3><ul>{report.recoveries.map(r => <li key={r.id}><span className="ev-chip static">{r.id}</span> {r.detail}</li>)}</ul></div>}
          <div className="limits"><h3>Limitations</h3><ul>{report.limitations.map(l => <li key={l}>{l}</li>)}</ul></div>
        </details>
      </section>}

      <section className="result-section">
        <span className="kicker">06 · The files</span>
        <div className="thumbs">{Object.entries(ev.images).map(([L, im]) => {
          const out = lin.excluded.includes(L);
          return <figure key={L} className={out ? 'out' : ''}>
            <img src={originalUrl(caseId, im.file)} alt={`Preserved ${L}`} />
            <figcaption><b>{L}</b> <span className="pill">{out ? 'left out' : L === lin.root ? 'root' : 'linked'}</span></figcaption>
          </figure>;
        })}</div>
        <details className="more">
          <summary>Fingerprints</summary>
          <p className="fine">A sha256 proves this exact file wasn’t changed after upload. It does not prove the picture is true.</p>
          <ul className="edge-list">{Object.entries(ev.images).map(([L, im]) => {
            const meta = ev.evidence.find(x => x.kind === 'metadata' && x.subject[0] === L);
            const hash = ev.evidence.find(x => x.kind === 'sha256' && x.subject[0] === L);
            return <li key={L}><b>{L}</b> {meta?.data.format} {im.width}×{im.height}{meta?.data.metadata_present ? '' : ' · no metadata'} · sha256 {im.sha256.slice(0, 12)}… {hash && <Chips ids={[hash.id, meta!.id]} onOpen={setOpen} />}</li>;
          })}</ul>
        </details>
      </section>
    </div>}

    <Dialog open={open !== null} onOpenChange={o => { if (!o) setOpen(null); }}>
      <DialogContent>
        <DialogHeader><DialogTitle>{open}{openItem ? ` · ${openItem.kind}` : ''}</DialogTitle>
          <DialogDescription>{openItem ? openItem.note : open?.startsWith('LIN') ? 'Lineage hypothesis' : 'Not in evidence.json. A sceptic should reject this citation.'}</DialogDescription></DialogHeader>
        <pre className="ev-data">{JSON.stringify(openItem ? openItem.data : open?.startsWith('LIN') ? lin : {}, null, 2)}</pre>
      </DialogContent>
    </Dialog>
  </section>;
}

import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowLeft, Play } from 'lucide-react';
import { ScanMark } from '@/components/site';
import original from '@/assets/synthetic-courtyard.jpg';
import crop from '@/assets/synthetic-crop.jpg';
import tone from '@/assets/synthetic-tone.jpg';

export const Route = createFileRoute('/pitch')({
  validateSearch: (s: Record<string, unknown>): { slide?: number } => {
    const n = Number(s['slide']);
    return Number.isFinite(n) && n >= 1 ? { slide: Math.floor(n) } : {};
  },
  head: () => ({ meta: [
    { title: 'TraceLab pitch — same photo, different story' },
    { name: 'description', content: 'Fifteen slides on TraceLab: private picture triage that is measured, cited and sceptic-checked.' },
    { property: 'og:title', content: 'TraceLab pitch deck' },
    { property: 'og:description', content: 'Measure first. Then a judge. Triage for human expert review.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Pitch,
});

function S({ kicker, title, children }: { kicker: string; title?: ReactNode; children?: ReactNode }) {
  return <div className="slide-inner"><p className="slide-kicker">{kicker}</p>{title && <h2 className="slide-title">{title}</h2>}{children}</div>;
}

const science: [string, string, string][] = [
  ['SHA-256 hash', 'A fingerprint for the exact file.', 'Proves unchanged, not true.'],
  ['EXIF metadata', 'The camera’s notes inside the file.', 'Missing metadata is not tampering.'],
  ['Perceptual hash', 'A fingerprint of how it looks.', 'Crops shift it — never used alone.'],
  ['ORB + RANSAC', 'Matches corners to line pictures up.', 'Extreme edits can break alignment.'],
  ['Difference map', 'Subtracts aligned pixels → heatmap + box.', 'Shows where, never who or why.'],
  ['Lineage rules', 'A crop comes after the wider picture.', 'A hypothesis, not a verdict.'],
];

const slides: { title: string; body: ReactNode }[] = [
  { title: 'Title', body: <div className="slide-inner slide-hero">
    <p className="slide-logo"><ScanMark size={64} />TraceLab</p>
    <h1 className="slide-title-lg">Same photo.<br />Different story.</h1>
    <p className="slide-subtitle">Private picture triage — measured, cited, sceptic-checked.</p>
    <p className="slide-caption muted">Accel AI Innovate London · 15 Oct 2026</p>
  </div> },
  { title: 'The problem', body: <S kicker="The problem" title={<>Reviewers don’t get one picture.<br />They get a pile of copies.</>}>
    <div className="slide-row3">{['Which are the same photo?', 'Which came first?', 'What changed?'].map((q, i) => <div key={q} className="slide-card"><span className="slide-num">0{i + 1}</span><p className="slide-body-lg">{q}</p></div>)}</div>
    <div className="slide-strip">{[original, crop, tone].map((s) => <img key={s} src={s} alt="" />)}</div>
  </S> },
  { title: 'Who it’s for', body: <S kicker="Who it’s for" title="Teams that hold the files — and must explain the call.">
    <div className="slide-row3">{[
      ['Trust & Safety', 'A reported post has five variants; a moderator must decide fast and justify it on appeal.'],
      ['Newsroom verification', 'A viral image arrives with a dramatic caption: original, crop, or doctored copy?'],
      ['Investigators', 'A folder of files that cannot be uploaded to public search.'],
    ].map(([h, p]) => <div key={h} className="slide-card"><h3 className="slide-subtitle">{h}</h3><p className="slide-body">{p}</p></div>)}</div>
  </S> },
  { title: 'Why current tools fall short', body: <S kicker="Why current tools fall short" title="Built for a different question.">
    <ul className="slide-list">{['One image at a time — no view of the family.', 'Public web search — not allowed for private material.', 'Unexplained “fake” scores — nobody can check them.'].map((t) => <li key={t} className="slide-body-lg">{t}</li>)}</ul>
  </S> },
  { title: 'How it works', body: <S kicker="How it works" title="Measure once. Interpret in parallel. Let a sceptic say no.">
    <div className="slide-flow">{['Drop the copies', 'Code measures', '3 specialists in parallel', 'Sceptic', 'Cited report'].map((t, i, a) => <div key={t} className="slide-flow-item"><div className="slide-card"><span className="slide-num">0{i + 1}</span><p className="slide-body">{t}</p></div>{i < a.length - 1 && <ArrowRight size={48} />}</div>)}</div>
    <p className="slide-body muted slide-narrow">No AI in the measuring step — the same files always give the same numbers.</p>
  </S> },
  { title: 'The science', body: <S kicker="The science · how we know" title="Standard, published, open-source techniques.">
    <div className="slide-grid3">{science.map(([h, p, c]) => <div key={h} className="slide-card"><h3 className="slide-body-lg strong">{h}</h3><p className="slide-caption">{p}</p><p className="slide-caption muted">Can’t: {c}</p></div>)}</div>
  </S> },
  { title: 'Agent architecture', body: <S kicker="The agent architecture · Claude Agent SDK" title="The AI checks the AI.">
    <div className="slide-arch">
      <div className="slide-node">Coordinator</div><ArrowRight size={48} />
      <div className="slide-parallel">{['Provenance', 'Lineage', 'Visual'].map((n) => <div key={n} className="slide-node light">{n}</div>)}</div><ArrowRight size={48} />
      <div className="slide-node">Sceptic <small>veto</small></div><ArrowRight size={48} />
      <div className="slide-node light">Report</div>
    </div>
    <div className="slide-pills">{['Parallel hand-off', 'Retry & recover · RECOVERY-001', 'Hard limits: 14 turns · $2'].map((t) => <span key={t} className="slide-pill">{t}</span>)}</div>
  </S> },
  { title: 'Proof: synthetic', body: <S kicker="Proof · synthetic set A–E" title="The answer key was never shown to the app.">
    <div className="slide-stats">{[['21/21', 'definition-of-done checks'], ['3', 'clean full runs'], ['0.92', 'IoU vs hidden mask'], ['0', 'false alarms']].map(([n, l]) => <div key={l}><p className="slide-stat">{n}</p><p className="slide-caption">{l}</p></div>)}</div>
    <p className="slide-body slide-narrow">Order A → B → C → D. Unrelated image E rejected — 0 geometric matches.</p>
  </S> },
  { title: 'Proof: real photos', body: <S kicker="Proof · real iPhone photos" title="It built the branching family tree.">
    <div className="slide-tree"><span>A</span><span>→ B → C</span><span className="slide-tree-b">↘ D</span></div>
    <ul className="slide-list">{['Found the cup, the text sticker and the can — in the right places.', 'Handled sideways phone photos, HEIC → JPEG, crops and screenshot bars.'].map((t) => <li key={t} className="slide-body-lg">{t}</li>)}</ul>
  </S> },
  { title: 'The sceptic', body: <S kicker="The sceptic" title="Claims it threw out.">
    <div className="slide-rejects">{[
      ['“Who edited this?”', 'Identity inference — refused.'],
      ['“C was tampered with because its metadata was stripped.”', 'Missing metadata is not tampering.'],
      ['“This file is larger.”', 'Analyst mistake — the cited data does not support it.'],
    ].map(([c, r]) => <div key={c} className="slide-reject"><s className="slide-body-lg">{c}</s><span className="slide-caption">{r}</span></div>)}</div>
  </S> },
  { title: 'Responsible by design', body: <S kicker="Responsible by design" title="What it refuses is part of the product.">
    <div className="slide-grid3 five">{['No face recognition', 'No web search', 'No names of people or editors', 'Pictures never sent to the AI', 'Limitations in every report'].map((t) => <div key={t} className="slide-card center"><p className="slide-body-lg">{t}</p></div>)}</div>
  </S> },
  { title: 'Speed & cost', body: <S kicker="Speed & cost" title="A first pass in about a minute and a half.">
    <div className="slide-stats three">{[['~90 s', 'per case (85–93 s measured)'], ['~$0.35', 'AI cost per case'], ['14 · $2', 'hard caps: turns · spend']].map(([n, l]) => <div key={l}><p className="slide-stat">{n}</p><p className="slide-caption">{l}</p></div>)}</div>
  </S> },
  { title: 'Business', body: <S kicker="Business model · proposed" title="Start where they already think in evidence.">
    <div className="slide-row3">{[['SaaS per seat', 'Plus a per-case usage component.'], ['Private deployment', 'Customer’s own cloud, for regulated teams.'], ['API', 'Platforms run triage on reported content.']].map(([h, p]) => <div key={h} className="slide-card"><h3 className="slide-subtitle">{h}</h3><p className="slide-body">{p}</p></div>)}</div>
    <p className="slide-body muted slide-narrow">First customers: newsroom verification desks and mid-size platform T&amp;S teams. Proposed — no revenue or customers yet.</p>
  </S> },
  { title: 'Live demo', body: <div className="slide-inner slide-hero">
    <p className="slide-kicker">Live demo</p>
    <h2 className="slide-title-lg">One photo. Four copies.</h2>
    <div className="slide-ctas">
      <Link to="/app" search={{ replay: 'demo' } as never} className="slide-cta fill"><Play size={36} />Recorded run</Link>
      <Link to="/app" className="slide-cta">Open the app <ArrowRight size={36} /></Link>
    </div>
  </div> },
  { title: 'Close', body: <div className="slide-inner slide-hero">
    <p className="slide-logo"><ScanMark size={64} />TraceLab</p>
    <h2 className="slide-title-lg">Measure first.<br />Then a judge.</h2>
    <p className="slide-body">trace-sight-lens.vercel.app · /app · /how</p>
    <p className="slide-caption muted">Triage for human expert review — not a verdict. Tested on one synthetic and one real phone set; not yet validated at scale.</p>
  </div> },
];

function Pitch() {
  const { slide = 1 } = Route.useSearch();
  const navigate = useNavigate({ from: '/pitch' });
  const i = Math.min(Math.max(slide, 1), slides.length) - 1;
  const go = (n: number) => { const t = Math.min(Math.max(n, 0), slides.length - 1); if (t !== i) navigate({ search: { slide: t + 1 }, replace: true }); };
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    const el = stage.current; if (!el) return;
    const fit = () => setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080));
    fit(); const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(i + 1); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(i - 1); }
      else if (e.key === 'Home') go(0); else if (e.key === 'End') go(slides.length - 1);
    };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });
  useEffect(() => { document.title = `${i + 1}/${slides.length} — ${slides[i]!.title} · TraceLab`; }, [i]);

  return <main className="pitch" ref={stage}
    onClick={(e) => { if ((e.target as HTMLElement).closest('a,button')) return; go(e.clientX > window.innerWidth / 3 ? i + 1 : i - 1); }}
    onTouchStart={(e) => { touch.current = e.touches[0]!.clientX; }}
    onTouchEnd={(e) => { if (touch.current == null) return; const d = e.changedTouches[0]!.clientX - touch.current; touch.current = null; if (Math.abs(d) > 50) go(d < 0 ? i + 1 : i - 1); }}>
    <div className="slide-wrapper" style={{ transform: `scale(${scale})` }}>
      <section className="slide-content" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}: ${slides[i]!.title}`}>{slides[i]!.body}</section>
    </div>
    <div className="pitch-chrome">
      <Link to="/" className="pitch-home" aria-label="Back to site"><ScanMark size={22} /></Link>
      <button type="button" aria-label="Previous slide" onClick={() => go(i - 1)} disabled={i === 0}><ArrowLeft size={16} /></button>
      <span className="pitch-count">{String(i + 1).padStart(2, '0')} / {slides.length}</span>
      <button type="button" aria-label="Next slide" onClick={() => go(i + 1)} disabled={i === slides.length - 1}><ArrowRight size={16} /></button>
    </div>
  </main>;
}

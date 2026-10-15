import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, ArrowDown, ScanLine, Copy, Crop, SlidersHorizontal, Newspaper, ShieldCheck, Search, Upload, Binary, Users, CircleSlash, Zap, LockKeyhole, Fingerprint, Check, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TriageIntake } from '@/components/triage-intake';
import original from '@/assets/synthetic-courtyard.jpg';
import crop from '@/assets/synthetic-crop.jpg';
import tone from '@/assets/synthetic-tone.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'TraceLens — A clearer first pass on your pictures' },
    { name: 'description', content: 'Connect picture copies, understand changes, and inspect evidence. TraceLens is private-folder triage for human expert review, not a forensic verdict.' },
    { property: 'og:title', content: 'TraceLens — See the copies. Understand the changes.' },
    { property: 'og:description', content: 'Code measures. Specialists interpret. A sceptic checks the evidence. Explore the synthetic TraceLens demo.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
function Brand() { return <a className="brand" href="#top" aria-label="TraceLens home"><span className="brand-symbol"><ScanLine size={15} strokeWidth={1.6} /></span>TraceLens</a>; }
const steps = [
  { icon: Upload, title: 'Drop the copies', text: 'Start with the pictures you already hold. One private folder. No hunting across the web.' },
  { icon: Binary, title: 'Code measures', text: 'File properties, hashes, and image differences. Measurements before interpretation.' },
  { icon: Users, title: 'Specialists in parallel', text: 'Focused specialists interpret the measurements from different angles. Each claim cites its evidence.' },
  { icon: CircleSlash, title: 'The sceptic can say no', text: 'A separate pass challenges every claim. No supporting evidence? The claim does not make the brief.' },
];
function Index() {
 return <div id="top">
  <div className="demo-banner" role="status"><span className="banner-dot" /> SYNTHETIC DEMO DATA ONLY — no real media</div>
  <div className="container">
    <header className="site-header"><Brand /><nav className="nav" aria-label="Main navigation"><a href="#how">How it works</a><a href="#principles">Our principles</a><a href="#try" className="nav-cta">Try TraceLens <ArrowUpRightIcon /></a></nav></header>
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <span className="eyebrow"><span className="eyebrow-dot" /> PRIVATE PICTURES. CHECKABLE EVIDENCE.</span>
        <h1 id="hero-title">TraceLens.<br />See the copies.<br /><span>Understand the changes.</span></h1>
        <p className="hero-description">A first pass on a folder of pictures. Find which copies belong together and what actually changed. Code measures. Specialists interpret. A sceptic checks the claims.</p>
        <div className="hero-actions"><Button asChild className="main-cta"><a href="#try">Try it with your pictures <ArrowRight /></a></Button><a className="hero-secondary" href="#how">See how it works <ArrowDown size={14} /></a></div>
        <p className="hero-boundary">Built for human expert review. Not a certified forensic verdict.</p>
        <div className="comparison-stage" aria-label="Synthetic picture comparison">
          <div className="stage-top"><span><Copy size={12} /> ONE PICTURE. DIFFERENT COPIES.</span><span><FlaskConical size={11} /> SYNTHETIC EXAMPLE</span></div>
          <div className="stage-gallery">
            <div className="picture"><img src={original} alt="Synthetic concrete courtyard with a tree and a red bicycle, source copy A" width={1536} height={1024} /><div className="picture-caption"><b>A / source copy</b><span>1536 × 1024</span></div><i className="connector" /></div>
            <div className="picture"><img src={crop} alt="Synthetic courtyard with changed framing, copy C" width={1536} height={1024} /><div className="picture-caption"><b>C / cropped</b><span>1536 × 1024</span></div><i className="connector" /></div>
            <div className="picture"><img src={tone} alt="Synthetic courtyard with muted colours, copy D" width={1536} height={1024} /><div className="picture-caption"><b>D / tone adjusted</b></div></div>
          </div>
          <div className="stage-bottom"><span><Copy size={13} /> Same picture family</span><span><Crop size={13} /> Different framing</span><span><SlidersHorizontal size={13} /> Changed tone</span></div>
        </div>
        <div className="audience"><span>For teams that already hold the files</span><div className="audience-items"><span><Newspaper size={16} /> Newsrooms</span><span><ShieldCheck size={16} /> Platform trust teams</span><span><Search size={16} /> Investigators</span></div></div>
      </section>
      <section id="how" className="workflow-section section-anchor"><div className="section-heading"><div><span className="eyebrow">HOW IT WORKS</span><h2>Measured first. Questioned always.</h2></div><p>A deliberate sequence, with a clear line between what the files show and what we can say.</p></div><div className="steps">{steps.map((step, index) => <article className="step" key={step.title}><div className="step-top"><span>0{index + 1}</span><step.icon size={21} strokeWidth={1.5} /></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>
    </main>
  </div>
  <section id="principles" className="principles-band section-anchor"><div className="container principles-section"><div className="section-heading"><div><span className="eyebrow">LESS SPECULATION. MORE SUBSTANCE.</span><h2>Useful by design. Careful by default.</h2></div></div><div className="principles-grid"><article className="principle"><Zap strokeWidth={1.5} /><h3>Less work. Better focus.</h3><p>Group related copies before reviewing them one by one. Parallel specialists give experts a focused place to start.</p><span className="principle-note"><Check size={12} /> Triage, not a replacement for expertise</span></article><article className="principle"><LockKeyhole strokeWidth={1.5} /><h3>Your files. A firm boundary.</h3><p>The scope is the pictures you already hold. No face matching. No public web search. No searching for people.</p><span className="principle-note"><Check size={12} /> No identity inference</span></article><article className="principle"><Fingerprint strokeWidth={1.5} /><h3>Every claim leaves a trail.</h3><p>Every sentence in the brief carries an evidence ID. Follow it to the measurement, or see why the sceptic abstained.</p><span className="principle-note"><Check size={12} /> Evidence you can inspect</span></article></div></div></section>
  <div className="container"><div className="positioning"><span>Clear about what we're not.</span><div className="not-list"><span><CircleSlash /> Not a reverse-image search</span><span><CircleSlash /> Not a fakeness score</span><span><CircleSlash /> Not a courtroom stamp</span></div></div><TriageIntake /><footer className="footer"><Brand /><div className="footer-copy"><p>TraceLens · Triage for human expert review.</p><p>SHA-256 is fixity, not truth.</p></div></footer></div>
 </div>;
}
function ArrowUpRightIcon() { return <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.3" /></svg>; }

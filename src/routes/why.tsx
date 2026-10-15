import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer, PictureStrip, AppLink } from '@/components/site';
import { Check, ArrowUpRight } from 'lucide-react';
export const Route = createFileRoute('/why')({ head: () => ({ meta: [
  { title: 'why TraceLab — inside the folder, not the internet' }, { name: 'description', content: 'How TraceLab differs technically from single-image forensics, error-level analysis, reverse search, fakeness detectors and capture provenance — and where it is going next.' },
  { property: 'og:title', content: 'inside the folder. not the internet.' }, { property: 'og:description', content: 'Efficient, ethical, checkable picture triage for human experts.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
] }), component: Why });

const compare: [string, string, string, string, string][] = [
  ['vs single-image forensic suites', 'Families, not one file at a time.',
   'Desktop suites analyse one picture deeply: error-level, noise, JPEG ghosts, clone detection. An expert drives each filter by hand. Working out which of fifty files are copies of each other — and in what order — is still manual.',
   'TraceLab works on the whole set at once. A 64-bit perceptual hash (pHash + dHash) cheaply shortlists look-alike pairs; ORB keypoints matched with RANSAC then fit the geometric transform between every candidate pair, so crops, resizes and screenshots still join the right family. Stated lineage rules order the versions into a tree, with weak links marked.',
   'Deep analysis of a single image. TraceLab is the step before: it hands the expert one family, already ordered.'],
  ['vs error-level analysis tools', 'Compared to a sibling, not to a re-save.',
   'Error-level analysis re-saves a JPEG at a fixed quality and shows the residual. Recompression, resizing, sharp text and high-contrast edges all light up, and there is no reference picture, so false alarms are common.',
   'TraceLab lines two real versions up with a RANSAC homography, warps one onto the other and subtracts them pixel by pixel. Gaussian smoothing plus a threshold removes recompression speckle; what survives is boxed as a content change. On synthetic copy B the box overlaps the true edit at IoU 0.92. Recompression alone is never reported as tampering — the sceptic rejects that claim.',
   'Spotting oddities inside a lone picture when no other version exists.'],
  ['vs reverse image search', 'A closed world, by design.',
   'Reverse search uploads your picture to a public index and finds copies already on the open web. Unpublished or sensitive sets get no answers — and uploading them is itself a leak.',
   'TraceLab only compares the files you drop in. Web search and web fetch are denied at the agent tool layer. An unrelated picture is rejected on evidence, not ignored: synthetic file E gets 0 RANSAC inliers against the family and is excluded with that measurement cited.',
   'Finding where a public picture appeared online.'],
  ['vs “fakeness” detectors', 'Evidence IDs, not a percentage.',
   'Classifier detectors return one opaque probability. They shift when a new generator or a new compression path appears, and they cannot say which pixels or which fact drove the score.',
   'TraceLab gives no score. Deterministic code measures once (SHA-256, metadata, hashes, alignment, difference map) and writes evidence IDs such as HASH-001, ALN-003, DIFF-002. Claude agents only read that JSON. A separate sceptic agent, with a fresh context and a different prompt from the report writer, vetoes any sentence without an evidence ID, any recompression-as-tamper claim and any guess about identity or authorship.',
   'Flagging a single picture for possible synthesis in bulk. TraceLab does not do this today — see future scope.'],
  ['vs capture provenance (content credentials)', 'Works when the credentials are gone.',
   'Signed capture manifests prove a picture’s history — if the camera or app signed it and the manifest survived. Messaging apps and social sites routinely strip it.',
   'TraceLab needs nothing embedded. It fingerprints each upload with SHA-256 on arrival, keeps the original read-only, and rebuilds the history from the pixels themselves. Missing metadata is recorded as normal, never as evidence of tampering.',
   'Cryptographic proof of origin, when the chain is intact.'],
  ['vs asking a vision chatbot', 'The model never sees the pictures.',
   'Pasting pictures into a general chatbot gives fluent answers that change between runs, cite nothing, and send the images to a third party.',
   'Built on the Claude Agent SDK: a coordinator runs provenance, lineage and visual specialists in parallel, then the sceptic, then the report. Every run has hard turn and budget caps; a malformed agent reply is caught and recovered. Same files in, same measurements out — about 90 seconds and $0.35 per case.',
   'Open-ended questions about what a picture shows.'],
];

const future: [string, string, string, string][] = [
  ['01 · Read the labels that already exist', 'Content credentials and watermarks.',
   'Parse signed capture manifests and IPTC “digital source type” fields where they survive, and run published watermark detectors where a generator vendor makes one available. Each result becomes a cited provenance item, like every other measurement.',
   'Labels can be stripped, so their absence will never be read as “real”.'],
  ['02 · Characterise the edited region', 'Is the change statistically different?',
   'When the aligned difference map finds a changed region, compare its noise residual and frequency spectrum with the untouched area of the same picture. Generative fill and upscaling leave different camera-noise and periodic spectral traces from a sensor photograph. The output is a measurement on that box, not a label on the file.',
   'Heavy recompression and resizing wash these traces out; small regions give weak statistics.'],
  ['03 · Detectors as evidence, never a verdict', 'An ensemble the sceptic can veto.',
   'Run open, published detectors locally on the engine’s GPU — pictures still never leave it. Report each score with its calibration set and known failure modes. New sceptic rule: no “AI-generated” claim from one detector alone; it must agree with an independent signal such as a credential or a region statistic.',
   'Detectors age as generators change, so every score will carry the detector version and date.'],
  ['04 · An open, shifting benchmark', 'Measure false alarms per transformation.',
   'Build synthetic chains — camera photo, generative inpaint, recompress, screenshot, crop — and publish false-positive and miss rates for each step, refreshed as new generators ship. Thresholds and results go in every report.',
   'Synthetic benchmarks never fully match real-world material; that limit stays in the report.'],
];

function Compare() {
  return <section className="science" aria-labelledby="compare-title">
    <div className="science-head">
      <span className="kicker">Under the hood / How it compares</span>
      <h2 id="compare-title" className="display science-title">Different tools<br /><em>answer different questions.</em></h2>
      <p className="lede">Most image tools look at one picture, or at the whole internet. TraceLab looks at the private set in front of you — and shows its working.</p>
    </div>
    <div className="science-grid">{compare.map(([tag, title, them, us, theyWin]) => <article className="sci" key={tag}>
      <span className="tag">{tag}</span><h3>{title}</h3>
      <p><b className="sci-label">How they work:</b> {them}</p>
      <p className="ours"><b className="sci-label">How TraceLab works:</b> {us}</p>
      <p className="limit"><b>Where they still win:</b> {theyWin}</p>
    </article>)}</div>
  </section>;
}

function Future() {
  return <section className="science" aria-labelledby="future-title">
    <div className="science-head">
      <span className="kicker">Future scope / Roadmap — not shipped</span>
      <h2 id="future-title" className="display science-title">Next: AI-generated pictures.<br /><em>Same rules.</em></h2>
      <p className="lede">Today TraceLab compares versions; it does not tell you whether a picture was AI-generated. This is how we plan to add that without becoming another opaque score: every signal cited, the sceptic still in charge, pictures still private.</p>
    </div>
    <div className="science-grid">{future.map(([tag, title, body, limit]) => <article className="sci" key={tag}>
      <span className="tag">{tag}</span><h3>{title}</h3><p>{body}</p><p className="limit"><b>Known limit:</b> {limit}</p>
    </article>)}</div>
  </section>;
}

function Why() {
  return <div className="wrap"><Header /><main className="editorial"><section className="intro"><span className="kicker">Why TraceLab / Deliberately bounded</span><h1 className="display">Inside<br />the folder.<br /><em>Not the<br />internet.</em></h1><div className="intro-bottom"><p className="lede">The files you hold.<br />Only the claims you can check.</p><PictureStrip /></div></section><div className="right-stack"><section className="editorial-block"><div className="block-label"><span className="tag">01 / Less noise</span><ArrowUpRight size={22} /></div><div className="big-stat">01<span>family at a time.</span></div><h2>Efficient. And checkable.</h2><p>Group the copies first. Review one family, not fifty files. Every line carries an evidence ID — follow it, or see why it was thrown out.</p><div className="proof-line"><Check size={16} /><span>Measured, cited, open to review.</span></div></section><section className="editorial-block"><div className="block-label"><span className="tag">02 / Clear boundaries</span><span className="fine">Ethical by design</span></div><h2 className="statement">Pictures.<br /><span>Not identities.</span></h2><p>No face matching. No public web search. No naming anyone.</p><div className="nots"><span>Not a reverse search</span><span>Not a fakeness score</span><span>Not a courtroom stamp</span></div><AppLink /></section></div></main><Compare /><Future /><Footer /></div>;
}

import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer, PictureStrip, AppLink } from '@/components/site';
import { Check } from 'lucide-react';
import { ScrollingPanels } from '@/components/scrolling-panels';
import { ComparisonGrid } from '@/components/comparison-grid';
import { FutureFlipCard } from '@/components/future-flip-card';
export const Route = createFileRoute('/why')({ head: () => ({ meta: [
  { title: 'why TraceLab: inside the folder, not the internet' }, { name: 'description', content: 'How TraceLab differs technically from single-image forensics, error-level analysis, reverse search, fakeness detectors and capture provenance, and where it is going next.' },
  { property: 'og:title', content: 'inside the folder. not the internet.' }, { property: 'og:description', content: 'Efficient, ethical, checkable picture triage for human experts.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
] }), component: Why });

const compare: [string, string, string, string, string, string][] = [
  ['vs single-image forensic suites', 'Families, not one file at a time.', 'One family, already in order.',
   'Desktop suites analyse one picture deeply: error level, noise, JPEG ghosts, clone detection. An expert drives each filter by hand. Working out which of fifty files are copies, and in what order, is still manual.',
   'TraceLab works on the whole set at once. A perceptual hash shortlists lookalike pairs. ORB keypoints and RANSAC then line up crops, resizes and screenshots. Stated rules put the versions in a tree, and weak links are marked.',
   'Deep analysis of a single image. TraceLab is the step before: it hands the expert one family, already ordered.'],
  ['vs error-level analysis tools', 'Compared to a sibling, not to a re-save.', 'The box is the real change.',
   'Error-level analysis re-saves a JPEG at a fixed quality and shows the residual. Recompression, resizing, sharp text and high-contrast edges all light up, and there is no reference picture, so false alarms are common.',
   'TraceLab lines two real versions up, lays one on the other, and subtracts them. Smoothing removes recompression speckle. What survives is boxed. On synthetic copy B the box overlaps the true edit at IoU 0.92. Recompression alone is never reported as tampering. The sceptic rejects that claim.',
   'Spotting oddities inside a lone picture when no other version exists.'],
  ['vs reverse image search', 'A closed world, by design.', 'Nothing leaves the folder.',
   'Reverse search uploads your picture to a public index. Unpublished sets get no answers, and uploading them is itself a leak.',
   'TraceLab only compares the files you drop in. Web search is denied for the agents. Synthetic file E gets 0 matching points and is left out, with that measurement cited.',
   'Finding where a public picture appeared online.'],
  ['vs “fakeness” detectors', 'Evidence IDs, not a percentage.', 'Every sentence can be opened.',
   'Classifier detectors return one opaque probability. They shift when a new generator appears, and they cannot say which pixels drove the score.',
   'TraceLab gives no score. Code measures once and writes IDs such as HASH-001, ALN-003, DIFF-002. Claude only reads that JSON. A separate sceptic throws out any sentence without an ID, any recompression-as-tamper claim, and any guess about who is in the picture.',
   'Flagging a single picture for possible synthesis in bulk. TraceLab does not do this today. See future scope.'],
  ['vs capture provenance', 'Works when the credentials are gone.', 'The pixels still show the order.',
   'Signed capture manifests prove a picture’s history if the camera signed it and the manifest survived. Messaging apps usually strip it.',
   'TraceLab needs nothing embedded. It fingerprints each upload on arrival, keeps the original read-only, and rebuilds the history from the pixels. Missing metadata is recorded as normal, never as tampering.',
   'Cryptographic proof of origin, when the chain is intact.'],
  ['vs asking a vision chatbot', 'The model never sees the pictures.', 'Claude only reads the measurements.',
   'Pasting pictures into a chatbot gives fluent answers that change between runs, cite nothing, and send the images to a third party.',
   'A coordinator runs provenance, lineage and visual specialists in parallel, then the sceptic, then the report. Every run has hard caps. A broken reply is caught and retried. Same files in, same measurements out. About 90 seconds and $0.35 a case.',
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
   'Run open, published detectors locally on the engine’s GPU. Pictures still never leave it. Report each score with its calibration set and known failure modes. New sceptic rule: no “AI-generated” claim from one detector alone. It must agree with a second signal, such as a credential or a region statistic.',
   'Detectors age as generators change, so every score will carry the detector version and date.'],
  ['04 · An open, shifting benchmark', 'Measure false alarms per transformation.',
   'Build synthetic chains: camera photo, generative inpaint, recompress, screenshot, crop. Publish false-positive and miss rates for each step, refreshed as new generators ship. Thresholds and results go in every report.',
   'Synthetic benchmarks never fully match real-world material; that limit stays in the report.'],
];

function Compare() {
  return <section className="science" aria-labelledby="compare-title">
    <div className="science-head">
      <span className="kicker">Under the hood / How it compares</span>
      <h2 id="compare-title" className="display science-title">Different tools<br /><em>answer different questions.</em></h2>
      <p className="lede">Most tools look at one picture, or at the whole internet. TraceLab looks at the folder in front of you.</p>
    </div>
    <ComparisonGrid items={compare} />
  </section>;
}

function Future() {
  return <section className="science" aria-labelledby="future-title">
    <div className="science-head">
      <span className="kicker">Future scope / Not shipped yet</span>
      <h2 id="future-title" className="display science-title">Next: AI-generated pictures.<br /><em>Same rules.</em></h2>
      <p className="lede">Today TraceLab compares versions. It does not say whether a picture was AI-generated.</p>
    </div>
    <ScrollingPanels label="Future scope">{future.map(([tag, title, body, limit], i) => <FutureFlipCard key={tag} tag={tag.slice(5)} title={title} body={body} limit={limit} index={i} />)}</ScrollingPanels>
  </section>;
}

function Why() {
  return <div className="wrap"><Header /><main className="editorial why"><section className="intro"><span className="kicker">Why TraceLab / Deliberately bounded</span><h1 className="display">Inside<br />the folder.<br /><em>Not the<br />internet.</em></h1><div className="intro-bottom"><p className="lede">The files you hold.<br />Only the claims you can check.</p><PictureStrip /></div></section><div className="right-stack"><section className="editorial-block"><div className="block-label"><span className="tag">01 / Less noise</span></div><div className="big-stat big-stat-compact">01<span>family at a time.</span></div><h2>Efficient. And checkable.</h2><p>Group the copies first. Review one family, not fifty files. Every line carries an evidence ID. Follow it, or see why it was thrown out.</p><div className="proof-line"><Check size={16} /><span>Measured, cited, open to review.</span></div></section><section className="editorial-block"><div className="block-label"><span className="tag">02 / Clear boundaries</span><span className="fine">Ethical by design</span></div><h2 className="statement">Pictures.<br /><span>Not identities.</span></h2><p>No face matching. No public web search. No naming anyone.</p><div className="nots"><span>Not a reverse search</span><span>Not a fakeness score</span><span>Not a courtroom stamp</span></div><AppLink /></section></div></main><Compare /><Future /><Footer /></div>;
}

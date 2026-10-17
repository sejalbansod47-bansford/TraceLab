import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer, PictureStrip, AppLink } from '@/components/site';
export const Route = createFileRoute('/how')({ head: () => ({ meta: [
  { title: 'how TraceLab works: four steps' }, { name: 'description', content: 'Drop copies, code measures once, three specialists at once, a sceptic can say no.' },
  { property: 'og:title', content: 'how TraceLab works' }, { property: 'og:description', content: 'Measured once. Interpreted in parallel. Checked by a sceptic.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
] }), component: How });
const steps = [
  ['01', 'Drop the copies.', 'The pictures you already hold. One private folder. Reference first.'],
  ['02', 'Measure once.', 'Hashes, sizes, pixel differences. Only measurement JSON would leave your machine.'],
  ['03', 'Interpret in parallel.', 'Framing, tone, encoding. Three specialists. Each claim cites a measurement.'],
  ['04', 'Let the sceptic check.', 'No citation, no claim. What can’t be shown is left out.'],
];
const science: [string, string, string, string][] = [
  ['SHA-256 · cryptographic hash', 'A fingerprint for the exact file.',
   'SHA-256 turns a file’s bytes into a 64-character code. Change one pixel, or just re-save the file, and the code changes completely. It is practically impossible to work backwards, or to craft a different file with the same code. We fingerprint every upload the moment it arrives and keep a read-only copy, so anyone can later prove the file we analysed is byte-for-byte the one you gave us.',
   'Proves a file hasn’t changed since upload, not that the picture is true. Two saves of the same photo get different codes, so it can’t say two copies show the same scene.'],
  ['EXIF / PNG metadata', 'The camera’s notes inside the file.',
   'Phones write notes into each photo: model, time, which way up it was held. We read them, and turn the picture upright if the phone stored it sideways.',
   'Apps and social sites routinely strip or rewrite these notes. Missing metadata is normal, not evidence of tampering.'],
  ['Perceptual hash · pHash / dHash', 'A fingerprint for how it looks.',
   'We shrink the picture to a tiny greyscale thumbnail and record its broad light-and-dark pattern as 64 bits. Resized or recompressed copies keep nearly the same pattern; a different photo doesn’t. 0 = looks identical; around 30 or more usually means a different picture.',
   'Crops, borders and screenshots shift the pattern, so a look-alike score alone can miss a real copy.'],
  ['ORB keypoints + RANSAC', 'Lining the pictures up.',
   'ORB finds thousands of distinctive corners in each picture, window edges, keys, text, and matches them between pictures. RANSAC repeatedly guesses how one picture was moved, scaled or cropped to fit the other, and keeps the guess most matches agree with. Enough agreeing matches across a wide area means the same scene, even after a crop, resize or screenshot. Unrelated photos get close to zero.',
   'Very heavy edits, mirroring or tiny crops can break alignment. The thresholds are written into every report.'],
  ['Aligned difference map', 'Finding what changed.',
   'With two pictures lined up, we lay one exactly on the other and subtract them pixel by pixel. Smoothing removes the faint speckle of re-compression; anything still bright is a real content change. We heat-map it and box it.',
   'Shows where something changed between two versions, not why, or by whom. A tiny or subtle edit can fall under the threshold.'],
  ['Lineage rules', 'Putting versions in order.',
   'Plain, stated rules: a crop comes after the wider picture; a screenshot after what’s inside it; a compressed, metadata-stripped copy after a full-quality one. If two versions tie, the one that differs more from the rest probably came later, and that link is marked “weak”.',
   'A hypothesis with its reasons attached, for a person to check. Not a verdict.'],
  ['Face detection · OpenCV Haar cascade', 'Privacy: blur, never identify.',
   'A simple detector looks for face-shaped patterns and blurs them in everything we show or export. It answers “is there a face here?”, never “whose face is it?”. No face matching, no web search. The fingerprinted original is kept unchanged, so the evidence chain stays intact.',
   'A basic detector can miss faces or blur something that isn’t one. Check outputs before sharing.'],
  ['Claude Agent SDK', 'Specialists that only read measurements.',
   'After the code has measured, a coordinator hands the numbers to three Claude specialists at once (provenance, lineage, visual). A separate sceptic agent throws out any claim without an evidence id, and any guess at who is in a picture or who edited it. Claude never sees the pictures, only the measurement JSON.',
   'Language models can still word things badly; that is why every sentence carries an id you can open, and the sceptic must pass it first.'],
];

function Science() {
  return <section className="science" aria-labelledby="science-title">
    <div className="science-head">
      <span className="kicker">The science, in plain words</span>
      <h2 id="science-title" className="display science-title">Standard, published techniques.<br /><em>No black box.</em></h2>
      <p className="lede">Ordinary open-source image science. OpenCV, imagehash, Python’s hashlib. Plain code, same answer every time.</p>
    </div>
    <div className="point-grid">{[science.slice(0, 4), science.slice(4)].map((col, i) => <article className="point-card" key={i}>
      <ul className="point-list">{col.map(([tech, title, body, limit]) => <li key={tech}>
        <span className="tag">{tech}</span>
        <h3>{title}</h3>
        <details className="more">
          <summary>Why</summary>
          <p>{body}</p>
          <p><b>What it can’t do.</b> {limit}</p>
        </details>
      </li>)}</ul>
    </article>)}</div>
  </section>;
}

function How() {
  return <div className="wrap"><Header /><main className="editorial"><section className="intro"><span className="kicker">How it works / 01 to 04</span><h1 className="display">Four steps.<br /><em>No<br />guessing.</em></h1><div className="intro-bottom"><p className="lede">Measured by code.<br />Checked before it becomes a claim.</p><PictureStrip /><AppLink demo /></div></section><div className="right-stack">{[steps.slice(0, 2), steps.slice(2)].map((group, i) => <section className="editorial-block process-block" key={i}><div className="block-label"><span className="tag">{i === 0 ? 'Input / Measurement' : 'Interpretation / Review'}</span><span className="fine">{i === 0 ? 'The files' : 'The findings'}</span></div>{group.map(([n, title, text]) => <article className="process-step" key={n}><span className="step-num">{n}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</section>)}</div></main><Science /><Footer /></div>;
}

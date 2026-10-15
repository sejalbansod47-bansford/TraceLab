import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer, PictureStrip, AppLink } from '@/components/site';
export const Route = createFileRoute('/how')({ head: () => ({ meta: [
  { title: 'how trace works — four steps' }, { name: 'description', content: 'Drop copies, code measures once, three specialists at once, a sceptic can say no.' },
  { property: 'og:title', content: 'how trace works' }, { property: 'og:description', content: 'Measured once. Interpreted in parallel. Checked by a sceptic.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
] }), component: How });
const steps = [
  ['01', 'Drop the copies.', 'The pictures you already hold. One private folder. Reference first.'],
  ['02', 'Measure once.', 'Hashes, sizes, pixel differences. Only measurement JSON would leave your machine.'],
  ['03', 'Interpret in parallel.', 'Framing, tone, encoding. Three specialists. Each claim cites a measurement.'],
  ['04', 'Let the sceptic check.', 'No citation, no claim. What can’t be shown is left out.'],
];
function How() {
  return <div className="wrap"><Header /><main className="editorial"><section className="intro"><span className="kicker">How it works / 01—04</span><h1 className="display">Four steps.<br /><em>No<br />guessing.</em></h1><div className="intro-bottom"><p className="lede">Measured by code.<br />Checked before it becomes a claim.</p><PictureStrip /><AppLink demo /></div></section><div className="right-stack">{[steps.slice(0, 2), steps.slice(2)].map((group, i) => <section className="editorial-block process-block" key={i}><div className="block-label"><span className="tag">{i === 0 ? 'Input / Measurement' : 'Interpretation / Review'}</span><span className="fine">{i === 0 ? 'The files' : 'The findings'}</span></div>{group.map(([n, title, text]) => <article className="process-step" key={n}><span className="step-num">{n}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</section>)}</div></main><Footer /></div>;
}

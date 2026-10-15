import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer } from '@/components/site';

export const Route = createFileRoute('/how')({
  head: () => ({ meta: [
    { title: 'how trace works — four steps' },
    { name: 'description', content: 'Drop copies, code measures once, three specialists at once, a sceptic can say no.' },
    { property: 'og:title', content: 'how trace works' },
    { property: 'og:description', content: 'Measured once. Interpreted in parallel. Checked by a sceptic.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: How,
});

const steps = [
  ['drop copies', 'The pictures you already hold. One private folder.'],
  ['code measures once', 'Hashes, sizes, pixel differences. Only this measurement JSON leaves your machine.'],
  ['three specialists at once', 'Framing, tone, encoding. Each claim cites a measurement.'],
  ['a sceptic can say no', 'No citation, no claim. What can’t be shown is left out.'],
];

function How() {
  return <div className="wrap">
    <Header />
    <main className="page">
      <div className="page-head"><span className="kicker">how it works</span><h1 className="h2">four steps. <em>no guessing.</em></h1></div>
      <div className="steps">{steps.map(([t, p], i) => <article className="step" key={t}><span className="step-num">0{i + 1}</span><div><h3>{t}</h3><p>{p}</p></div></article>)}</div>
    </main>
    <Footer />
  </div>;
}

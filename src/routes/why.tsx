import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer } from '@/components/site';

export const Route = createFileRoute('/why')({
  head: () => ({ meta: [
    { title: 'why trace — inside the folder, not the internet' },
    { name: 'description', content: 'Efficient, ethical, checkable. TraceLens works only on the pictures you hold.' },
    { property: 'og:title', content: 'inside the folder. not the internet.' },
    { property: 'og:description', content: 'Efficient, ethical, checkable picture triage for human experts.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Why,
});

const cards = [
  ['efficient', 'Group the copies first. Review one family, not fifty files.'],
  ['ethical', 'No face matching. No public web search. No naming anyone.'],
  ['checkable', 'Every line carries an evidence ID. Follow it, or see why it was thrown out.'],
];

function Why() {
  return <div className="dark"><div className="wrap">
    <Header />
    <main className="page">
      <div className="page-head"><span className="kicker">why it’s built this way</span><h1 className="h2">inside the folder. <em>not the internet.</em></h1></div>
      <div className="cards">{cards.map(([k, p]) => <article className="card" key={k}><span className="k">{k}</span><p>{p}</p></article>)}</div>
      <div className="nots"><span>not a reverse search</span><span>not a fakeness score</span><span>not a courtroom stamp</span></div>
    </main>
    <Footer />
  </div></div>;
}

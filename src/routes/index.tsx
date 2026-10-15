import { createFileRoute, Link } from '@tanstack/react-router';
import { Header, Footer } from '@/components/site';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'trace — which copies are the same photo' },
    { name: 'description', content: 'TraceLens is a first pass on a private folder of pictures: which copies belong together and what changed. Triage for a human expert, not a verdict.' },
    { property: 'og:title', content: 'trace — which copies are the same photo. what changed.' },
    { property: 'og:description', content: 'Private set. No faces. No web. Code measures, specialists interpret, a sceptic can say no.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Home,
});

function Home() {
  return <div className="wrap">
    <Header />
    <main className="home">
      <div className="home-copy">
        <span className="kicker">private set · no faces · no web</span>
        <h1 className="display">which copies are the same photo. <em>what changed.</em></h1>
        <p className="lede">Drop the copies you already hold. Get a short, cited brief back.</p>
        <div className="ctas"><Link to="/app" className="btn btn-fill">open the app</Link><Link to="/app" search={{ demo: true }} className="btn">synthetic A–E</Link></div>
        <p className="fine">Triage for a human expert, not a verdict.</p>
      </div>
      <div className="ticket" aria-label="Example result: A, B, C and D are one family; E is left out">
        <div className="ticket-head"><span>ONE FAMILY</span><span>NO. 0001</span></div>
        <div className="chain">A<span className="arrow">→</span>B<span className="arrow">→</span>C<span className="arrow">→</span>D</div>
        <div className="left-out"><b>E</b><span>left out. the sceptic couldn’t cite it.</span></div>
      </div>
    </main>
    <Footer />
  </div>;
}

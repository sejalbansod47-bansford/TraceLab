import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer, PictureStrip, AppLink } from '@/components/site';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'TraceLab: which copies are the same photo' },
    { name: 'description', content: 'TraceLab is a first pass on a private folder of pictures: which copies belong together and what changed. Triage for a human expert, not a verdict.' },
    { property: 'og:title', content: 'TraceLab: which copies are the same photo. what changed.' },
    { property: 'og:description', content: 'Private set. No faces. No web. Code measures, specialists interpret, a sceptic can say no.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Home,
});
function Home() {
  return <div className="wrap"><Header /><main className="editorial home">
    <section className="intro"><span className="kicker">Private picture triage / TraceLab</span><h1 className="display">Same photo.<br /><em>Different<br />story.</em></h1><div className="intro-bottom"><p className="lede">Which copies belong together.<br />What actually changed.</p><PictureStrip /><p className="fine">Private set. No faces. No web.</p></div></section>
    <div className="right-stack"><section className="editorial-block"><div className="block-label"><span className="tag">01 / The family</span><span className="fine">Trial A–D</span></div><div className="family-chain">A<span>→</span>B<span>→</span>C<span>→</span>D</div><h2>One photo. Four copies.</h2><p>Start with the pictures you already hold. Code measures the files. Specialists interpret the differences.</p><AppLink /></section>
    <section className="editorial-block"><div className="block-label"><span className="tag">02 / The boundary</span></div><div className="big-stat">Out<span>when it does not fit.</span></div><h2>A sceptic can say no.</h2><p>No citation, no claim. A short, cited brief for a human expert, not a forensic verdict.</p><AppLink /></section></div>
  </main><Footer /></div>;
}

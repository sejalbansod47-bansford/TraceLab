import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer, PictureStrip, AppLink } from '@/components/site';
import { Check, ArrowUpRight } from 'lucide-react';
export const Route = createFileRoute('/why')({ head: () => ({ meta: [
  { title: 'why TraceLab — inside the folder, not the internet' }, { name: 'description', content: 'Efficient, ethical, checkable. TraceLab works only on the pictures you hold.' },
  { property: 'og:title', content: 'inside the folder. not the internet.' }, { property: 'og:description', content: 'Efficient, ethical, checkable picture triage for human experts.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
] }), component: Why });
function Why() {
  return <div className="wrap"><Header /><main className="editorial"><section className="intro"><span className="kicker">Why TraceLab / Deliberately bounded</span><h1 className="display">Inside<br />the folder.<br /><em>Not the<br />internet.</em></h1><div className="intro-bottom"><p className="lede">The files you hold.<br />Only the claims you can check.</p><PictureStrip /></div></section><div className="right-stack"><section className="editorial-block"><div className="block-label"><span className="tag">01 / Less noise</span><ArrowUpRight size={22} /></div><div className="big-stat">01<span>family at a time.</span></div><h2>Efficient. And checkable.</h2><p>Group the copies first. Review one family, not fifty files. Every line carries an evidence ID — follow it, or see why it was thrown out.</p><div className="proof-line"><Check size={16} /><span>Measured, cited, open to review.</span></div></section><section className="editorial-block"><div className="block-label"><span className="tag">02 / Clear boundaries</span><span className="fine">Ethical by design</span></div><h2 className="statement">Pictures.<br /><span>Not identities.</span></h2><p>No face matching. No public web search. No naming anyone.</p><div className="nots"><span>Not a reverse search</span><span>Not a fakeness score</span><span>Not a courtroom stamp</span></div><AppLink /></section></div></main><Footer /></div>;
}

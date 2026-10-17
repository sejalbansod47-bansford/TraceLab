import { createFileRoute, Link } from '@tanstack/react-router';
import { Header, Footer } from '@/components/site';

export const Route = createFileRoute('/terms')({
  head: () => ({ meta: [
    { title: 'TraceLab usage & limitations' },
    { name: 'description', content: 'Portfolio prototype status, responsible picture uploads and the limits of TraceLab triage results.' },
    { property: 'og:title', content: 'TraceLab usage & limitations' },
    { property: 'og:description', content: 'Human review, responsible use and prototype limitations.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Terms,
});

function Terms() {
  return <div className="wrap"><Header /><main className="legal-page">
    <span className="kicker">Independent portfolio project / Updated 17 October 2026</span>
    <h1 className="display">Usage & limitations.</h1>
    <p className="lede">A prototype for human expert review. Not a forensic verdict.</p>
    <section><h2>Portfolio demonstration</h2><p>TraceLab is an unregistered personal portfolio project. It is not presented as a registered company, a certified forensic service or a production service with guaranteed availability. Features and external engine access may change or be unavailable.</p></section>
    <section><h2>Responsible uploads</h2><p>Only submit material you are authorised to use and process. Do not submit unlawful material or expose another person’s confidential information. While privacy disclosures remain incomplete, use synthetic examples or non-sensitive test pictures. Read the <Link to="/privacy">privacy & cookies notice</Link> before submitting files.</p></section>
    <section><h2>Review every result</h2><p>Measurements and AI interpretations can be incomplete or wrong. Check the cited evidence and originals yourself. TraceLab does not establish authenticity, identify people, determine intent, certify truth or establish court admissibility. Do not rely on a report alone for decisions affecting a person’s rights, reputation or safety.</p><p>SHA-256 establishes file fixity, not the truth of what a picture shows. A missing relationship or credential is not proof of manipulation.</p></section>
    <section><h2>Your files and third-party material</h2><p>Uploading does not transfer ownership of your pictures to this project. You remain responsible for the rights and permissions needed to submit them. Third-party software and assets remain subject to their own licences.</p></section>
    <section><h2>No blanket waiver</h2><p>These limitations explain the prototype’s purpose; they do not exclude rights or obligations that applicable law does not allow to be excluded. These notices are not a promise that the website meets every legal requirement.</p></section>
  </main><Footer /></div>;
}
import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer } from '@/components/site';

export const Route = createFileRoute('/privacy')({
  head: () => ({ meta: [
    { title: 'TraceLab privacy & cookies' },
    { name: 'description', content: 'How the TraceLab portfolio prototype handles pictures, measurements and browser information, and what remains unconfirmed.' },
    { property: 'og:title', content: 'TraceLab privacy & cookies' },
    { property: 'og:description', content: 'Picture processing and privacy information for the TraceLab portfolio project.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Privacy,
});

function Privacy() {
  return <div className="wrap"><Header /><main className="legal-page">
    <span className="kicker">Independent portfolio project / Updated 17 October 2026</span>
    <h1 className="display">Privacy & cookies.</h1>
    <p className="lede">TraceLab is a personal portfolio prototype, not a registered company.</p>
    <section><h2>Before uploading</h2><p>This is an interim processing notice, not a completed privacy policy. The operator’s public contact details, applicable jurisdiction, lawful basis, engine retention and deletion practices, provider locations and transfer safeguards have not yet been confirmed. Until those details are published, use the synthetic examples or non-sensitive test pictures. Do not upload confidential files or pictures containing personal information.</p></section>
    <section><h2>Pictures and measurements</h2><p>When you run triage, selected pictures and any claims you enter are sent to the configured TraceLab engine. This is not on-device-only processing. The engine produces measurements, evidence, reports and comparison images for human review.</p><p>The intended design sends measurement JSON to Claude, not the original pictures. The website does not independently verify the external engine’s handling, storage or AI-provider retention. “Private” describes the closed-folder workflow; it is not a guarantee of confidentiality or immediate deletion.</p></section>
    <section><h2>Storage and deletion</h2><p>Selected-file previews use temporary browser object URLs. The application does not intentionally persist selected files in browser local storage. Engine-side case files, generated reports and logs may outlive the browser session; their retention period and deletion process are unconfirmed. Closing the page does not establish that server copies have been deleted.</p></section>
    <section><h2>Cookies, fonts and technical information</h2><p>No advertising or analytics cookie features are intentionally added in the application code. That is not a complete audit of a hosted deployment. Hosting services may process request information such as IP addresses and technical logs. The site loads its font from Google Fonts, which creates requests to Google. The development preview also includes error-reporting hooks.</p><p>A production cookie and storage audit is still required. If non-essential storage or tracking requiring consent is introduced, it must be assessed and, where required, held until consent, with a way to withdraw that choice. No cookie-consent banner has been added simply for appearances.</p></section>
    <section><h2>Privacy rights and contact</h2><p>Depending on applicable law, you may have rights to access, correct, delete or restrict personal data, object to processing, and complain to your data protection regulator. A public operator contact and request process still need to be provided before accepting personal uploads. This notice does not replace those obligations.</p><p>UK guidance: <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/" target="_blank" rel="noreferrer">ICO privacy information</a> and <a href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/" target="_blank" rel="noreferrer">cookies and similar technologies</a>. Which rules apply depends on the operator’s location and actual processing.</p></section>
  </main><Footer /></div>;
}
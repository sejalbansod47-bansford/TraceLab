import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer } from '@/components/site';
import { TriageIntake } from '@/components/triage-intake';

export const Route = createFileRoute('/app')({
  validateSearch: (s: Record<string, unknown>): { demo?: boolean } => (s['demo'] === true || s['demo'] === 'true' ? { demo: true } : {}),
  head: () => ({ meta: [
    { title: 'trace app — run a synthetic triage' },
    { name: 'description', content: 'Drop PNG, JPG or WebP copies, or use synthetic A–E, and run a first-pass triage.' },
    { property: 'og:title', content: 'trace app' },
    { property: 'og:description', content: 'Lineage, changes, and what the sceptic rejected. Synthetic demo.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AppPage,
});

function AppPage() {
  const { demo } = Route.useSearch();
  return <div className="wrap">
    <Header />
    <main className="page"><TriageIntake startLoaded={!!demo} /></main>
    <Footer />
  </div>;
}

import { createFileRoute } from '@tanstack/react-router';
import { Header, Footer } from '@/components/site';
import { TriageIntake } from '@/components/triage-intake';

export const Route = createFileRoute('/app')({
  validateSearch: (s: Record<string, unknown>): { demo?: boolean; replay?: string } => ({
    ...(s['demo'] === true || s['demo'] === 'true' ? { demo: true } : {}),
    ...(typeof s['replay'] === 'string' && /^[a-z0-9-]{3,40}$/.test(s['replay']) ? { replay: s['replay'] } : {}),
  }),
  head: () => ({ meta: [
    { title: 'TraceLab app — run a triage' },
    { name: 'description', content: 'Drop PNG, JPG or WebP copies, or use synthetic A–E, and run a first-pass triage.' },
    { property: 'og:title', content: 'TraceLab app' },
    { property: 'og:description', content: 'Lineage, changes, and what the sceptic rejected.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AppPage,
});

function AppPage() {
  const { demo, replay } = Route.useSearch();
  return <div className="wrap">
    <Header />
    <main className="page"><TriageIntake startLoaded={!!demo} replayCase={replay} /></main>
    <Footer />
  </div>;
}

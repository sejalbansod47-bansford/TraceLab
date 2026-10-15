import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import original from '@/assets/synthetic-courtyard.jpg';
import crop from '@/assets/synthetic-crop.jpg';
import tone from '@/assets/synthetic-tone.jpg';

export function ScanMark({ size = 30 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="8" fill="currentColor" /><g fill="none" stroke="var(--background)" strokeWidth="2.2" strokeLinecap="round"><path d="M9 13v-2.5A1.5 1.5 0 0 1 10.5 9H13M19 9h2.5A1.5 1.5 0 0 1 23 10.5V13M23 19v2.5a1.5 1.5 0 0 1-1.5 1.5H19M13 23h-2.5A1.5 1.5 0 0 1 9 21.5V19" /><line x1="8" y1="16" x2="24" y2="16" /></g></svg>;
}
export function Header() {
  return <header className="header"><Link to="/" className="logo" aria-label="TraceLab home"><ScanMark />TraceLab</Link><nav className="nav" aria-label="Main"><Link to="/how" activeProps={{ className: 'active' }}>How it works</Link><Link to="/why" activeProps={{ className: 'active' }}>Why TraceLab</Link><Button asChild variant="trace" className="nav-app"><Link to="/app">Open app <ArrowUpRight size={16} /></Link></Button></nav></header>;
}
export function Footer() {
  return <footer className="footer"><p>TraceLab · triage for a human expert, not a verdict.</p><p>SHA-256 is fixity, not truth. <span className="footer-mark">© TraceLab</span></p></footer>;
}
export function PictureStrip() {
  return <div className="picture-strip" aria-label="Synthetic reference and two edited copies">{[['A', original, 'Reference'], ['C', crop, 'Framing'], ['D', tone, 'Tone']].map(([id, src, label]) => <figure key={id}><img src={src} alt={`Synthetic courtyard — ${label}`} width={1536} height={1024} /><figcaption><b>{id}</b><span>{label}</span></figcaption></figure>)}</div>;
}
export function AppLink({ demo = false }: { demo?: boolean }) {
  return <Button asChild variant={demo ? 'traceOutline' : 'trace'}><Link to="/app" search={demo ? { demo: true } : {}}>{demo ? 'Use synthetic A–E' : 'Try it with your pictures'}<ArrowRight size={18} /></Link></Button>;
}

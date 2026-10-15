import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import original from '@/assets/synthetic-courtyard.jpg';
import crop from '@/assets/synthetic-crop.jpg';
import noStairs from '@/assets/synthetic-nostairs.jpg';

export function LensMark({ size = 28 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" /><circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="2" /><circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" /></svg>;
}
export function Header() {
  return <header className="header"><Link to="/" className="logo" aria-label="trace home"><LensMark />trace<span className="logo-dot">.</span></Link><nav className="nav" aria-label="Main"><Link to="/how" activeProps={{ className: 'active' }}>How it works</Link><Link to="/why" activeProps={{ className: 'active' }}>Why trace</Link><Button asChild variant="trace" className="nav-app"><Link to="/app">Open app <ArrowUpRight size={16} /></Link></Button></nav></header>;
}
export function Footer() {
  return <footer className="footer"><p>TraceLens · triage for a human expert, not a verdict.</p><p>SHA-256 is fixity, not truth. <span className="footer-mark">© TraceLens</span></p></footer>;
}
export function PictureStrip() {
  return <div className="picture-strip" aria-label="Synthetic reference and two edited copies">{[['A', original, 'Reference'], ['C', crop, 'Framing'], ['D', noStairs, 'No staircase']].map(([id, src, label]) => <figure key={id}><img src={src} alt={`Synthetic courtyard — ${label}`} width={1536} height={1024} /><figcaption><b>{id}</b><span>{label}</span></figcaption></figure>)}</div>;
}
export function AppLink({ demo = false }: { demo?: boolean }) {
  return <Button asChild variant={demo ? 'traceOutline' : 'trace'}><Link to="/app" search={demo ? { demo: true } : {}}>{demo ? 'Use synthetic A–E' : 'Try it with your pictures'}<ArrowRight size={18} /></Link></Button>;
}

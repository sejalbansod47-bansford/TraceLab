import { Link } from '@tanstack/react-router';

export function LensMark({ size = 28 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" /><circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="2" /><circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" /></svg>;
}

export function Header() {
  return <header className="header">
    <Link to="/" className="logo" aria-label="trace home"><LensMark />trace</Link>
    <nav className="nav" aria-label="Main">
      <Link to="/how" activeProps={{ className: 'active' }}>how</Link>
      <Link to="/why" activeProps={{ className: 'active' }}>why</Link>
      <Link to="/app" className="nav-app" activeProps={{ className: 'nav-app active' }}>app</Link>
    </nav>
  </header>;
}

export function Footer() {
  return <footer className="footer"><p>TraceLens · triage for a human expert, not a verdict.</p><p>SHA-256 is fixity, not truth.</p></footer>;
}

export function Banner() {
  return <div className="banner" role="status">SYNTHETIC DEMO DATA ONLY — no real media</div>;
}

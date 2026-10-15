# Trace Sight Lens

Build a marketing + product site for TraceLens.

TraceLens is a first pass on a private folder of pictures. It shows which copies belong together and what actually changed. Code measures the files. Specialists interpret. A separate sceptic throws out anything it cannot cite. Triage for human expert review — not a certified forensic verdict.

Audience: newsrooms, platform trust teams, investigators who already hold the files.

Pages/sections on one screen:

1. What it is, in plain English, with a primary CTA “Try it with your pictures”

2. How it works in 4 steps: drop copies → code measures → specialists in parallel → sceptic can say no

3. Why it’s efficient, ethical, and checkable (no face matching, no public web search, every sentence has an evidence id)

4. Indirect positioning without naming competitors: not a reverse-image search, not a fakeness score, not a courtroom stamp

5. A working-looking intake: drop zone for PNG/JPG/WebP, “Use synthetic A–E”, Run triage. I’ll wire the real API later.

Always-visible banner: SYNTHETIC DEMO DATA ONLY — no real media

Footer: triage for human expert review; SHA-256 is fixity not truth.

Do not: neon, glow, face ID, reverse image search, naming an editor, claiming court admissibility.

Keep it looking like a real company product, not a hackathon dashboard.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://trace-sight-lens.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/37f78117-b8f0-4575-8eb2-382128178e7a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

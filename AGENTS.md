<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Each marketing section is its own route (/, /how, /why, /app) sharing Header/Footer from src/components/site.tsx; the synthetic banner lives in __root so it is always visible.
- Keep demo fixtures and validation in a browser-safe module separate from intake presentation, so synthetic evidence is testable without a real API.
- Demo file selections inspect metadata only and never read or upload user media; only bundled synthetic fixtures can run triage.

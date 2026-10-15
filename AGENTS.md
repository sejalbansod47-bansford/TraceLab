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
- The /app page is a real client of the TraceLab engine (Python pipeline + Claude Agent SDK) via src/lib/tracelab-api.ts; base URL from VITE_TRACELAB_API. Never fake results in the UI.
- Uploaded pictures go only to the TraceLab engine; Claude receives measurement JSON, never pictures. Show the synthetic/private mode banner on /app.
- Each marketing section is its own route (/, /how, /why, /app) sharing Header/Footer from src/components/site.tsx.
- Use shared site controls and global semantic CSS tokens for the editorial layouts; marketing pages pair an unframed introduction with two stacked content sections to keep presentation consistent.
- Adapt Uiverse interaction patterns within existing shared controls and semantic CSS tokens rather than loading external scripts; retain source notices to keep the site cohesive and self-contained.

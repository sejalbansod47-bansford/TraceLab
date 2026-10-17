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
- Load public trial pictures through the ordered asset manifest in src/lib/trial-data.ts and submit them through the ordinary file intake, so examples use the same engine as visitor uploads.
- Uploaded pictures go only to the TraceLab engine; Claude receives measurement JSON, never pictures. Show the synthetic/private mode banner on /app.
- Each marketing section is its own route (/, /how, /why, /app) sharing Header/Footer from src/components/site.tsx.
- Use shared site controls and global semantic CSS tokens for the editorial layouts; marketing pages pair an unframed introduction with two stacked content sections to keep presentation consistent.
- Adapt Uiverse interaction patterns within existing shared controls and semantic CSS tokens rather than loading external scripts; retain source notices to keep the site cohesive and self-contained.
- Render live orchestration through a dedicated agent-flow component driven by engine event trails, with raw logs collapsed by default to preserve the minimal results layout.
- Keep app result visuals before the final brief, with family and comparison sections side by side on desktop and wrapping lineage captions to preserve letter alignment.
- Use the shared ScrollingPanels component for Why-page horizontal rows; native scrolling pauses for hover, focus, touch, expanded details and reduced motion so explanations stay accessible.
- Keep interacting scrolling panels within padded rail edges on pointer, focus and flip events; generous vertical rail space prevents perspective rotation from clipping faces.
- Keep Why tool comparisons in ComparisonGrid as content-sized bordered folds with manual navigation and directly visible explanations; only the future-scope row auto-scrolls, avoiding repeated animation.
- Use FutureFlipCard for Why future-scope explanations with accessible plus/back controls; ScrollingPanels observes flipped state to pause motion while reading.
- Keep How-page science explanations in ScienceFlipCard with a persistent accessible toggle and scrollable reverse face; scoped bento styles avoid changing other pages.
- Express shared site dimensions in rem through the global root scale, keeping the fixed-format pitch canvas independent so its screen-fitting layout stays stable.
- Apply flip-card shadows to the rotating faces, not their perspective wrappers, so no empty shadow frame remains during rotation.
- Keep privacy and usage disclosures on dedicated public routes sharing Header/Footer; state unverified processing details explicitly rather than inventing legal or provider guarantees.

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

- Keep the imported TRUST frontend on TanStack file routes; navigation compatibility helpers use TanStack APIs, not a second router.
- Preserve original TRUST assets, CSS selectors, and page structure during import repairs to maintain source fidelity.
- TRUST's Django API is an external dependency configured with VITE_API_URL; never simulate successful authentication or payments when it is absent.
- Coordinate interface motion through PageMotion and global CSS tokens; keep fixed navigation unaffected and honor reduced-motion preferences.
- The homepage uses scoped home tokens and client-effect GSAP choreography; keep animation cleanup and reduced-motion support to avoid affecting other TRUST pages.
- Refresh imported page presentation through scoped semantic compatibility styles and shared UI; keep API calls, role gates and transaction state untouched.
- Reuse TrustLoader for startup, router-pending and protected/checkout loading states; the bounded startup animation must never wait on external services.

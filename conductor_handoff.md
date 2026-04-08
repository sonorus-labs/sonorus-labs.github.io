# Context Handoff — Sonorus MVP

Generated: 2026-04-01

## Your Role

You are the **conductor** — PM, senior architect, and Codex orchestrator for Sonorus MVP. Sid (solo founder) drives product decisions; you guide implementation.

**How to work:**
- **Larger phases** (4+ files, engine + API + UI): Generate a lean Codex prompt via the `codex-prompt` skill. Let Codex implement. Review the diff via `review-diff` after.
- **Small/targeted work** (2-3 files, well-understood): Implement directly.
- **Always invoke skills** — even if you know the template. User wants consistency.
- **Never run `git commit`** unless the user explicitly asks you to commit. "Give me a commit message" = text only.

## Where to Find Project Context

- `AGENTS.md` — project rules, conventions, and workflow (shared across all agents)
- `CLAUDE.md` — Claude Code specific rules and skill usage
- `docs/PROJECT_STATE.md` — feature status, priorities, pre-deploy checklist (see section 8)
- `docs/ARCHITECTURE.md` — system architecture and data flow
- `docs/db.md` — Supabase schema and RLS policies
- `docs/v2_archive/pre_deploy_plan.md` — completed pre-deploy phases 8–12

## Current State

- **Branch:** `v2`, up to date with `origin/v2`
- **Latest commit:** `c9410af` — security hardening (state_json allowlist, input validation, auth scrub)
- **Uncommitted:** only the JSONL chat export (not to be committed)
- All pre-deploy feature phases (8–12) are complete. Canvas redesign ("Studio Warm") shipped. Security hardening is done.

## What Just Happened

Completed the **security hardening pass** — the final pre-deploy blocker:

1. **state_json allowlist** — `api/v2/sections.py` now allowlists 14 keys on create/update to prevent arbitrary key injection. Keys include display metadata (`romans`, `functions`, `cadence`, `matched_tags`) and `midi_url` for duplicate playback.
2. **Input validation** — tonic param validated against chromatic note names, max_length enforced.
3. **Error sanitization** — engine ValueError messages sanitized to generic 422 detail.
4. **Auth token scrub** — browser URL cleared of auth tokens/codes after callback exchange.
5. **Export tempo clamp** — clamped to 60-180 matching songs.py.
6. **LLM explanation cap** — 1000 char limit.
7. **Permissions-Policy header** — camera, mic, geolocation denied.
8. **select=\* removal** — explicit column list in export queries.

All changes committed and pushed to `origin/v2`.

## Next Steps

**User wants to deploy.** The v2 branch is ready for merge to main and production deploy.

1. **Create PR** for v2 → main merge
2. **Merge and deploy** — Railway hosts both frontend (Next.js) and backend (FastAPI) on `main` branch, domain is `demo.sonorus-labs.com`. Main branch already has most env vars configured; only `GROQ_API_KEY` and `LLM_MODEL` may need adding for AI edit feature.
3. Post-deploy smoke test

## Gotchas

- **Canvas redesign already shipped** — don't re-implement. Check commits `b8041d9` and `e949b0d`.
- **Duplicate fix already done** — `state_json` is now copied during duplicate/move operations.
- **`api/v1/` is frozen** — V2 work only.
- **Allowlist has 14 keys, not 9** — this is intentional per session discussion (4 display keys + `midi_url` added after initial Codex implementation).
- **MIDI cache versioning:** Bump `CACHE_VERSION` in `generator.py` when chord realization changes.
- **`reference.md`** is Sid's personal notepad — agents should ignore it.

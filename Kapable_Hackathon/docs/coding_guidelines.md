# Coding guidelines

> Claude-selected defaults (user opted for recommended defaults). Follow consistently; change only with approval.

## Naming conventions
- Files and folders: kebab-case (`score-recording.ts`). React component files: PascalCase (`ProgressChart.tsx`).
- Variables/functions: camelCase. Types/interfaces: PascalCase. Constants: UPPER_SNAKE_CASE.
- Database tables and columns: snake_case, plural table names (`recordings`, `competency_scores`).
- Vercel function files in `api/` follow Vercel's file-based routing names.

## Folder structure
Convention only; the real layout is decided in Phase 3.
```
src/
  pages/        # React screens (routed with React Router)
  components/   # reusable UI pieces
  lib/          # helpers shared by front end: supabase client, types
  types/        # shared TypeScript types
api/            # Vercel serverless functions (groq client, scoring logic; server-side only)
supabase/       # SQL migrations and seed data (incl. seeded demo history)
tests/
docs/
```

## Testing approach
- Framework: Vitest for logic, Playwright for a few end-to-end flows.
- What to test: scoring-output parsing and validation, the "Not assessed" rule, retry/status transitions, access rules (learner cannot see another learner's recording), and one end-to-end path: record, process, see feedback.
- AI calls are mocked in tests; real-audio accuracy is checked manually (see PRD open flags).

## Patterns to follow
- TypeScript strict mode. Validate all external input and all LLM output with a schema (Zod); reject malformed scores.
- Keep API keys server-side only, in environment variables; never in client code or the repo. Commit a `.env.example`.
- Keep scoring prompts and rubric text in one place (`lib/`), separate from route code.
- Save the recording before any AI call; make processing steps idempotent so retries are safe.
- Label approximate measures (filler words, modulation) as approximate in the UI.
- Small functions, one job each; comments explain why, not what.

## Patterns to avoid
- No AI-generated numbers shown without validation (scores must be integers 1-4 or "Not assessed").
- Never treat missing evidence as a low score.
- No weighted grades or pass marks (rubric rule).
- No secrets in code, logs, or commits.
- No raw SQL string-building from user input; use the Supabase client or parameterised queries.
- No class components; no inline styles; no `any` types without a comment.

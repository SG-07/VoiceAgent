# Project state: Speech Coach LMS (working title)

## Start here (for the developer)
1. Read in order: Step0/Deliverables/PRD.md, docs/architecture.md, docs/coding_guidelines.md, docs/api_contracts.md, docs/design_system.md, docs/epics.md.
2. Read the approved design: docs/design-accounts-and-access.md.
3. Work through tasks/accounts-and-access.md from Task 1, in dependency order. One task at a time; check its acceptance criteria before the next.
4. Do not start other epics until Feature 1 is done. Update the feature loop table below as you go.

## User profile
- Technical depth: somewhat technical to non-technical
- Working preferences: plain language, recommend defaults, ask only about decisions affecting cost, login or learner experience. Hands specs to a developer who works with AI help.

## Stack (from Phase 1 decisions; details set in Phase 2)
- Frontend: React (Vite) + TypeScript, phone and laptop, no native app
- Backend: Vercel serverless functions (api/ folder)
- Database: Supabase Postgres (also auth + audio storage)
- Auth: email and password only
- Hosting: Vercel free tier
- Other: Groq API free tier (Whisper speech-to-text + LLM scoring); in-app toast notifications, no email

## Phase progress
- Phase 1 — PRD & vision: done 2026-10-18
- Phase 2 — context docs: done 2026-10-18 (docs/architecture.md, coding_guidelines.md, api_contracts.md, design_system.md)
- Phase 4 — epics: done 2026-10-18, approved (docs/epics.md)

## Feature loop status
| Feature | UX (P3.2) | Design (P3) | Tasks (P5) | Built (P6) | Reviewed (P7) | Tested (P8) | Docs (P10) | Committed (P11) |
|---------|-----------|-------------|------------|------------|----------------|-------------|-------------|------------------|
| 1. Accounts and Access | skipped | approved 2026-10-18 (docs/design-accounts-and-access.md) | approved 2026-10-18 (tasks/accounts-and-access.md) | in progress: Task 1 code done, accounts pending | - | - | - | - |
| 2. Record and Submit | - | - | - | - | - | - | - | - |
| 3. AI Feedback | - | - | - | - | - | - | - | - |
| 4. Learner Progress Dashboard | - | - | - | - | - | - | - | - |
| 5. Instructor Review | - | - | - | - | - | - | - | - |
| 6. Course Content | - | - | - | - | - | - | - | - |
| 7. Privacy and Deletion | - | - | - | - | - | - | - | - |
| (Deferred) Batch Analytics | - | - | - | - | - | - | - | - |

## UX design (set by Phase 3.2)
- Design tool: not asked yet
- Chosen direction: not run yet
- Brand assets: none yet

## Task sizing
- Under 1 hour per task (default, not yet questioned by user).

## Git conventions (set once by Phase 11, then reused)
- Base branch: / Branch naming: / Commit style:

## Notion sync
- Docs section page: not connected (no page-creation tool available)
- Pages: not synced
- Last synced: never

## Jira sync
- Project key: declined 2026-10-18 (do not re-ask)

## Source documents
- Epics: docs/epics.md (7 epics + deferred Batch Analytics)
- Phase 1 deliverables: Step0/Deliverables/ (PRD.md, vision.md, users.md, roadmap.md)
- Rubric: Step0/communication_course_competency_rubric.md

## Decisions log
- 2026-10-18: Build order is demo-first; Batch Analytics (PRD req 12) deferred out of v1; Jira tracking declined.
- 2026-10-18: Phase 2 approved. Frontend is React (Vite), not Next.js; backend is Vercel serverless functions; Supabase for DB/auth/storage.
- 2026-10-18: Hybrid product. AI gives instant feedback, instructors add coaching alongside it.
- 2026-10-18: Rubric is the training company's six-competency, four-level scale.
- 2026-10-18: v1 AI scores four competencies from solo audio; interpersonal and judgement are instructor-only.
- 2026-10-18: Admin self-service out of v1; clients set up manually.
- 2026-10-18: Demo is a thin slice (record, transcribe, score, progress page with seeded history).
- 2026-10-18: Groq API free tier; email/password auth; toast notifications only.
- 2026-10-18: No data-region requirement; top priority is a runnable demo.

## Open flags
- Competitors not researched; scan before roadmap is final.
- No named training-company contact yet.
- Filler-word and modulation accuracy needs testing on real audio.
- AI-vs-instructor score agreement unmeasured.
- Review data location and privacy terms before any real pilot.
- Product name is a placeholder.

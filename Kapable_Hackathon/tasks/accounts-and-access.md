# Tasks: Accounts and Access (Epic 1)

> Draft 2026-10-18. Source: `docs/design-accounts-and-access.md` (approved). Task size: under 1 hour each (default; change if needed). Each task lists a technical check and what a person would see.

## Task 1: Create the external accounts and project skeleton
- Description: Create the Supabase project (disable email signups in Auth settings) and the Vercel project. Scaffold the Vite + React + TypeScript app (strict mode) with React Router, Vitest and the folder layout from the design. Add `.env.example` listing variable names only (Supabase URL, anon key, service key, seed demo passwords).
- Acceptance criteria: `npm run dev` serves a blank page; `npm test` runs with zero tests passing cleanly; `.env.example` exists; no real keys in the repo; Supabase signups are shown as disabled.
- Seen by a person: the app opens in the browser and the Supabase dashboard shows an empty project.
- Dependencies: none
- Estimated size: <1hr

## Task 2: Database migration for profiles and batches
- Description: Write `supabase/migrations/0001_accounts.sql` creating `batches` and `profiles` exactly as in the design (role check constraint, foreign keys).
- Acceptance criteria: migration applies cleanly to an empty database; inserting a profile with role `admin` is rejected; deleting an auth user is handled by the foreign key as designed.
- Seen by a person: two new tables appear in the Supabase table editor.
- Dependencies: Task 1
- Estimated size: <1hr

## Task 3: Row-level security policies and helper functions
- Description: In the same or a second migration, enable RLS on both tables. Add helpers `current_role()` and `instructor_of(learner_id)`. Policies: own profile readable; own profile name updatable but not role or batch; instructor reads learners in their batches; learner reads own batch, instructor reads batches they own; no insert or delete for normal users.
- Acceptance criteria: with RLS on, an unauthenticated query returns no rows; a user cannot update their own `role` or `batch_id`; a user cannot insert a profile.
- Seen by a person: nothing yet (protection is in place for later screens).
- Dependencies: Task 2
- Estimated size: <1hr

## Task 4: Seed script for demo accounts
- Description: `supabase/seed/seed-users.ts` uses the service key to create 1 batch, 1 instructor and 3 learners (auth users, profiles, batch link). Passwords come from env vars. Safe to re-run.
- Acceptance criteria: running it twice leaves exactly 5 profiles and 1 batch; every learner has the batch id; the instructor owns the batch; the script refuses to run if the service key is missing.
- Seen by a person: five demo people exist and can be found in the Supabase Auth users list.
- Dependencies: Task 3
- Estimated size: <1hr

## Task 5: Access-rules tests (written before UI)
- Description: `tests/access-rules.test.ts` signs in as seeded users and checks the RLS rules, covering each rule in Task 3.
- Acceptance criteria: tests pass: learner A cannot read learner B's profile; learner cannot change own role; instructor reads own batch's learners; a second instructor (created in the test) cannot read them; anonymous sees nothing.
- Seen by a person: a passing test report proves learners cannot see each other's data.
- Dependencies: Task 4
- Estimated size: <1hr

## Task 6: Supabase client and auth context
- Description: `src/lib/supabase-client.ts` (anon key only) and `src/lib/auth-context.tsx` exposing session, profile (name, role, batch) and `signIn` / `signOut`. `src/types/profile.ts` for the shared type.
- Acceptance criteria: unit test with a mocked client: signing in loads the profile; signing out clears it; a signed-in user with no profile gets an explicit "no profile" state, not a crash.
- Seen by a person: nothing yet.
- Dependencies: Task 4
- Estimated size: <1hr

## Task 7: Login page
- Description: `LoginPage.tsx` and `LoginForm.tsx` with email and password, a submit button, loading state, and one generic failure message ("Email or password is wrong"). Works on phone width. Follows `docs/design_system.md`.
- Acceptance criteria: wrong password and unknown email show the identical message; empty fields are blocked before submit; button is disabled while submitting; layout has no horizontal scroll at 375px width.
- Seen by a person: they can type seeded credentials and get signed in or a clear error.
- Dependencies: Task 6
- Estimated size: <1hr

## Task 8: Route guard and role-based routing with placeholder homes
- Description: `ProtectedRoute.tsx`, routes for `/login`, `/learner`, `/instructor`. After login, learners go to `/learner` and instructors to `/instructor`. A learner opening `/instructor` (or the reverse) is sent to their own home. Placeholder pages show the user's name and role, plus a Log out button.
- Acceptance criteria: logged-out user visiting any page lands on `/login`; learner login ends at `/learner`; instructor login ends at `/instructor`; cross-role URL redirects; Log out returns to `/login` and back-button does not reveal the page.
- Seen by a person: the full login-to-home-to-logout journey works for both roles.
- Dependencies: Task 7
- Estimated size: <1hr

## Task 9: Server-side user check and GET /api/me
- Description: `api/_lib/require-user.ts` verifies the Supabase JWT and loads the profile and role; `api/me.ts` returns it in the standard `{ data, error }` format.
- Acceptance criteria: no token returns 401 `NOT_LOGGED_IN`; garbage token returns 401; valid token without a profile row returns 403 `NO_PROFILE`; valid learner/instructor returns 200 with `id, email, fullName, role, batchId`; response shape follows `docs/api_contracts.md`. Covered by Vitest with mocked Supabase.
- Seen by a person: nothing directly; later features rely on it.
- Dependencies: Task 4
- Estimated size: <1hr

## Task 10: Deploy and end-to-end check
- Description: Deploy to Vercel with env vars set; run the seed against the hosted Supabase; add one Playwright flow: learner logs in, sees learner home, logs out; instructor logs in, sees instructor home.
- Acceptance criteria: the live URL loads; Playwright flow passes against the deployed (or local) app; `/api/me` works on the live URL with a real token; no secret appears in the repo or client bundle (search the build output for the service key).
- Seen by a person: they can open the live link on a phone and log in as a demo learner and as the demo instructor.
- Dependencies: Tasks 5, 8, 9
- Estimated size: <1hr

## Dependency order
1. Task 1
2. Task 2 (needs 1)
3. Task 3 (needs 2)
4. Task 4 (needs 3)
5. Task 5 (needs 4), Task 6 (needs 4), Task 9 (needs 4) — can run in parallel
6. Task 7 (needs 6)
7. Task 8 (needs 7)
8. Task 10 (needs 5, 8, 9)

## Coverage check
- Design elements not yet covered by any task: none. Mapping: `profiles`/`batches` tables → 2; RLS and helpers → 3 and 5; seed data → 4; `GET /api/me` and the shared check → 9; login, route guard, placeholder homes → 7, 8; security items (role tampering → 3/5, service key exposure → 1/10, open signup → 1, generic login message → 7, rate limits → Supabase default, no task needed).
- Flags: password reset and admin role are intentionally out (approved). `docs/design_system.md` is Task 7's only style source since the UX direction step was skipped, so the login page may be restyled later.

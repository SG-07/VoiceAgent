# Design: Accounts and Access (Epic 1)

> Status: PROPOSED 2026-10-18. UX direction skipped by user, so screens use plain, unstyled-but-usable defaults and follow `docs/design_system.md`.

## Summary
Learners and instructors log in with email and password and see only what their role allows (PRD req 1 and 9; privacy rule: a recording is visible only to its learner and their instructor). Accounts are created by the team, not by users. Kept deliberately thin to unblock Epics 2-4.

## Architecture
- The React app calls Supabase Auth directly (`signInWithPassword`, `signOut`). No custom login endpoint is needed, because Supabase issues and refreshes the session (JWT).
- After login, the app reads the user's profile (name, role, batch) and routes: learners to the learner home, instructors to the instructor home. Both homes are placeholders until Epics 4 and 5.
- Every serverless function in `api/` uses one shared helper that checks the JWT and returns the user and role. Later epics reuse it.
- Real protection lives in the database: row-level security (RLS) policies decide which rows each user can read. The front-end route guard is only for convenience.
- Signup is disabled in Supabase. Accounts are created by a seed script run by the team using the Supabase service key (never shipped to the browser).

## Folder structure
```
src/
  pages/         LoginPage.tsx, LearnerHomePage.tsx, InstructorHomePage.tsx
  components/    ProtectedRoute.tsx, LoginForm.tsx
  lib/           supabase-client.ts, auth-context.tsx
  types/         profile.ts
api/
  me.ts                      # GET /api/me
  _lib/require-user.ts       # verify JWT, load role; reused by every function
supabase/
  migrations/0001_accounts.sql   # tables, RLS policies, helper functions
  seed/seed-users.ts             # creates demo auth users + profiles + batch
tests/
  access-rules.test.ts           # learner A cannot read learner B's data, etc.
.env.example
```

## APIs
### GET /api/me
- Request: none (Supabase JWT in `Authorization` header)
- Response (success): `{ data: { id, email, fullName, role: "learner" | "instructor", batchId } , error: null }`
- Response (error): 401 `NOT_LOGGED_IN` if the token is missing or invalid; 403 `NO_PROFILE` if the user has no profile row
- Auth required: yes

Login and logout use Supabase Auth directly, so they are not our endpoints. Failed login shows one generic message ("Email or password is wrong") that does not reveal whether the email exists.

## Database schema
```
profiles
  id          uuid primary key references auth.users(id)
  full_name   text not null
  role        text not null check (role in ('learner','instructor'))
  batch_id    uuid null references batches(id)   -- learners only
  created_at  timestamptz default now()

batches
  id            uuid primary key
  name          text not null
  instructor_id uuid not null references profiles(id)
  created_at    timestamptz default now()
```
Rules (RLS):
- A user can read and update only their own profile (name only; role and batch cannot be changed by the user).
- An instructor can read profiles of learners in batches they own.
- A learner can read their own batch; an instructor can read batches they own.
- Helper SQL functions `current_role()` and `instructor_of(learner_id)` are reused by later epics to write the "own recording or my learner's recording" rule.
- No insert or delete policies for normal users; only the seed script (service key) creates accounts.

## Security concerns
- Role tampering: role lives in `profiles`, which users cannot write to; checked server-side and in RLS, never trusted from the browser.
- Cross-learner data access: RLS plus an automated test that logs in as learner A and tries to read learner B.
- Service key exposure: used only by the seed script and server functions, kept in environment variables, listed in `.env.example` as a name only, never in client code.
- Password storage: handled by Supabase Auth (hashed). We never see or store passwords.
- Brute force: Supabase Auth's built-in rate limits; generic failure message.
- Open signup: disabled so strangers cannot create accounts.
- Demo credentials: the seed script reads demo passwords from env vars (not committed); share them with testers privately.
- Session: Supabase default (token auto-refresh, stored in browser local storage). Acceptable for the demo.

## Seed data (demo)
1 batch, 1 instructor, 3 learners (one gets Epic 4's seeded progress history later). Created by `seed-users.ts`; safe to re-run (idempotent).

## Open questions (with my recommendation)
1. **Password reset.** Supabase's reset flow sends an email, but the product has no email. Recommend: no self-service reset in v1; the team resets passwords manually. Okay?
2. **Roles.** Only learner and instructor. No admin role (admin self-service is out of v1). Okay?
3. **One instructor per batch, one batch per learner.** Simple and enough for the demo. Okay?
4. **Logout and session length.** Use Supabase defaults (stay logged in on that device until logout). Okay?

## What to reply
Reply **"approved"** to accept all four recommendations, or name the numbers you want changed (for example, "1: add email reset"). Nothing is built until you then move to task breakdown (Phase 5).

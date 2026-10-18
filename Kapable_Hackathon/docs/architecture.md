# Architecture

> Approved by user 2026-10-18 with one change: React for the frontend (instead of Next.js).

## Stack
- Frontend: React (Vite) single-page app with TypeScript, mobile-first. Browser `MediaRecorder` for in-browser audio recording; file upload as fallback.
- Backend: Vercel serverless functions (TypeScript) in an `api/` folder of the same repo. They hold the Groq key and run transcription/scoring. No separate server to host.
- Database: PostgreSQL via Supabase (free tier). Relational: learners, instructors, batches, assignments, recordings, scores, comments.
- Authentication: Supabase Auth, email and password only.
- File storage: Supabase Storage (private bucket) for audio recordings.
- AI: Groq API free tier. Whisper for speech-to-text (with timestamps), an LLM for rubric scoring.
- Notifications: in-app toasts only (polling or Supabase Realtime). No email/SMS.
- Payments: none.
- Deployment: Vercel (free Hobby tier) for the app; Supabase free tier for data, auth, files.

## Notes
- One vendor-light stack chosen so a single developer with AI help can run the whole demo end to end for free. Only two accounts needed: Vercel and Supabase (plus a Groq API key).
- Privacy: access rules are enforced in the database (Supabase row-level security) so a recording is visible only to its learner and that learner's instructor.
- Reliability: save the recording first, then process. Each submission has a status (`uploaded`, `transcribing`, `scoring`, `done`, `failed`). Failed runs retry automatically on the saved file. Because free serverless functions have short time limits, processing runs as short steps driven by status, not one long request.
- Free-tier caveats: Supabase pauses inactive free projects (wake it before a demo); Groq has rate limits, so deadline-day spikes need a queue and retry; Vercel Hobby is non-commercial use only, so a real pilot needs a paid plan.
- Lock-in: Supabase is standard Postgres, so data can be exported and moved. Data region is unconstrained for the demo; revisit before a real pilot (see PRD open flags).
- The rubric (`Step0/communication_course_competency_rubric.md`) is the scoring source of truth. AI scores four competencies; the other two are instructor-only and shown as "Not assessed" by AI.

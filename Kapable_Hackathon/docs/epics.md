# Epics: Speech Coach LMS (working title)

> Approved 2026-10-18. Requirement numbers refer to the Functional requirements list in `Step0/Deliverables/PRD.md`.

## Epic 1: Accounts and Access
- Maps to PRD requirements: 1 (learner login), 9 (instructor login); privacy rule in Non-functional requirements (a recording is visible only to its learner and their instructor)
- Summary: Learners and instructors log in with email and password and see only what they are allowed to. Includes learner/instructor roles, batches, and seeded demo accounts.
- Dependencies: none

## Epic 2: Record and Submit
- Maps to PRD requirements: 3 (record in browser or upload), 13 (save every recording before processing)
- Summary: A learner records on phone or laptop, or uploads a file, for an assignment. The recording is safely saved before anything else happens.
- Dependencies: Epic 1

## Epic 3: AI Feedback
- Maps to PRD requirements: 4 (score 1-4, explanation, suggestion per competency), 8 (toast when ready), 13 (automatic retry on saved copy), 14 ("Not assessed" for competencies AI cannot judge)
- Summary: After submission the app transcribes the recording, scores the four AI-assessable competencies against the rubric, and shows the feedback, with approximate measures labelled as such. Failures retry automatically.
- Dependencies: Epic 2

## Epic 4: Learner Progress Dashboard
- Maps to PRD requirements: 5 (progress over time, badges/streaks); Tier 1 demo metric (progress page with seeded history)
- Summary: A learner sees scores across baseline, mid-course and final assignments, plus badges or streaks. Demo data is seeded.
- Dependencies: Epic 3 (needs scores to show; can start on seeded data)

## Epic 5: Instructor Review
- Maps to PRD requirements: 9 (see batch submissions), 10 (play recording next to AI analysis), 11 (add or edit feedback), 6 (learner sees instructor comments next to AI feedback)
- Summary: An instructor opens a submission, listens, sees the AI analysis alongside, and adds coaching feedback, including scores for the two instructor-only competencies. The learner sees both together.
- Dependencies: Epics 1 and 3

## Epic 6: Course Content
- Maps to PRD requirements: 2 (view course modules and materials)
- Summary: A learner browses course modules and materials and starts an assignment from them. Content is loaded manually by the team (no admin tools in v1).
- Dependencies: Epic 1

## Epic 7: Privacy and Deletion
- Maps to PRD requirements: 7 (request deletion of own recordings); Security/privacy in Non-functional requirements
- Summary: A learner can request deletion of their recordings, and the data is actually removed.
- Dependencies: Epic 2

## Deferred (not in v1 build plan)
- **Batch Analytics** — PRD requirement 12 and the instructor user story "see how my whole batch is doing". Deferred at your request. The PRD still lists it, so it is not deleted, only parked after Epic 7.

## Build order
Priority chosen: demo-first thin slice (record, transcribe, score, progress page with seeded history).
1. Accounts and Access — everything else needs a logged-in user; kept deliberately thin (seeded users, email/password) to unblock the rest.
2. Record and Submit — first half of the demo path; also makes sure no recording is ever lost.
3. AI Feedback — the riskiest and most valuable epic, and the core of the demo. Placed directly after recording so the end-to-end slice (record, transcribe, score) works early.
4. Learner Progress Dashboard — completes the demo slice. Can start on seeded data, so it is not blocked if scoring is late.
-- Demo milestone reached here --
5. Instructor Review — makes the product hybrid (AI plus coaching); essential for a pilot, not for the Tier 1 demo.
6. Course Content — nice context for the learner but not needed to show the core value; manual loading keeps it small.
7. Privacy and Deletion — required before any real pilot, not for the demo.
8. Batch Analytics (deferred) — only if time allows after the above.

## Coverage check
- PRD requirements not yet covered by any epic: none. Req 12 is covered only by the deferred Batch Analytics item.
- Epics not traceable to a PRD requirement (possible scope creep): none.
- Notes: Req 13 is shared between Epics 2 (save first) and 3 (retry). Req 9 is shared between Epics 1 (login) and 5 (batch submissions list).

## Flag before design starts
Epics 1-6 have visible screens and no product-wide visual direction exists yet. Phase 3.2's one-time direction run should happen before any epic's design pass.

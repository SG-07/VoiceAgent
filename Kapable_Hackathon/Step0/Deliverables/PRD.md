# PRD: Speech Coach LMS (working title)

> DRAFT: awaiting approval. Product name is a placeholder.

## Problem
Communication courses that collect spoken assignments as audio depend on an instructor listening to every recording one-on-one. Feedback typically takes 1-2 weeks. By then the learner has recorded further assignments with the same speaking habits, so the delay reinforces the mistakes it should correct. Learners also have no view of their progress over time, because the course has no analytics.

Training companies that run these courses often have the course content but no platform of their own to deliver it. Existing LMS tools host content but do not assess spoken work against a communication rubric. We have not yet researched competitors, so the gap is an assumption to validate (see Open flags).

## Target users
- **Customer (buyer):** a training company that runs multiple batches of about 100-150 learners and has built a communication course but has no LMS.
- **Learners:** working professionals improving presentation and communication skills, many aiming for senior management roles.
- **Instructors:** trainers at the training company who review learner recordings.

## User stories
- As a learner, I want to record or upload a spoken assignment and get feedback within minutes, so I can fix my habits before the next assignment.
- As a learner, I want a dashboard showing my progress across assignments, so I can see whether I am improving.
- As a learner, I want badges, streaks or scores, so the journey stays motivating.
- As an instructor, I want to see the AI's analysis of each recording before I review it, so I spend my time coaching instead of doing first-pass listening.
- As an instructor, I want to see how my whole batch is doing, so I can spot who is struggling.

(Out of scope for v1: admin self-service for uploading courses and managing batches. Client setup is done manually by the team.)

## Functional requirements
**Learner**
1. Log in with email and password.
2. View course modules and materials.
3. Record audio in the browser (laptop or phone) or upload an audio file for an assignment.
4. Receive AI feedback after submission: a score from 1 to 4 per competency, a short explanation, and one suggestion each.
5. View a progress dashboard of scores over time (baseline, mid-course, final) with badges or streaks.
6. See the instructor's comments once the instructor has added them, shown alongside the AI feedback.
7. Request deletion of own recordings.
8. See in-app toast messages when feedback is ready.

**Instructor**
9. Log in and see their batch's submissions.
10. Play a recording with the AI analysis shown next to it.
11. Add or edit feedback that appears next to the AI feedback for the learner.
12. View batch-level analytics showing who is progressing and who is struggling.

**System**
13. Save every recording before any AI processing. If AI processing fails, automatically re-run it on the saved copy so the learner never has to re-record.
14. Score only against the competencies that a solo audio recording can evidence (see Scoring rubric). Mark other competencies "Not assessed".

## Scoring rubric (the benchmark)
Source: the training company's Communication Course Competency Rubric (`Step0/communication_course_competency_rubric.md`). Four-level scale: 1 Needs significant development, 2 Developing, 3 Competent, 4 Highly effective, with written behaviour descriptions for each level.

| Competency | v1 AI scoring |
|---|---|
| Thought structuring and logical reasoning | Yes, from the transcript |
| Verbal and non-verbal delivery | Voice only: fluency, pace, fillers, articulation, modulation. Body language is not assessed. |
| Storytelling, persuasion and audience impact | Yes, from the transcript |
| Spontaneous thinking and adaptability | Yes, for impromptu or timed recordings |
| Interpersonal communication and influence | Not assessed by AI (live two-person activities). Instructor only. |
| Professional judgement, self-awareness, application | Not assessed by AI. Instructor only. |

Rules carried over from the rubric: missing evidence is "Not assessed", never a low score; no weighted grades or pass marks until the course designer agrees; baseline, mid-course and final assessments use comparable tasks.

## Non-functional requirements
- **Performance:** feedback within about 10 minutes of submission. Speed is not a hard constraint for the demo.
- **Security/privacy:** a recording is visible only to the learner who made it and their instructor. Learners can request deletion.
- **Scale:** one training company, a few hundred learners, batches of 100-150, with possible deadline-day spikes.
- **Devices:** works in a mobile browser and on a laptop, including audio recording.
- **Reliability:** recordings are saved first, and failed AI runs are retried automatically on the saved copy.
- **Data region:** no region requirement for now. The priority is a runnable demo on free-tier services. Revisit data location before any real pilot.
- **Accuracy caveat:** filler-word counts and vocal modulation will be approximate in v1, because transcription services often drop "um" and "uh". Pace is measured reliably from timestamps. The UI should label approximate measures as such.

## Success metrics
**Tier 1: hackathon demo**
- Score one recording, or a short live speech, on the four AI-assessable competencies and return feedback in under 10 minutes.
- Show an analytics page with one learner's progress across several past recordings (history seeded with sample data).

**Tier 2: pilot with real learners**
| Metric | Target |
|---|---|
| Time from submission to AI feedback | Under 10 minutes (today: 1-2 weeks) |
| Learners submitting at least one assignment per week | 70% |
| Average score gain, baseline to final | +0.5 levels on the 4-point scale |
| AI score within one level of the instructor's score | 80% of cases |
| Instructor review time per submission | 30% lower than today |
| Training company wants to continue | Yes |

## Tech constraints
- Frontend: web app that works on phone and laptop, no separate mobile app. Framework to be recommended in Phase 2.
- Backend: to be recommended in Phase 2. Maintained by a developer with AI help.
- Database: relational (learners, assignments, recordings, scores). To be confirmed in Phase 2.
- Auth: email and password only.
- LLM/AI: Groq API free tier, covering Whisper speech-to-text and a language model for rubric scoring.
- Payments: none.
- Notifications: in-app toast messages only. No email or SMS.
- Hosting: free tier (demo). Provider to be recommended in Phase 2.
- Budget: free tier only for the demo.
- Region and compliance: no constraint for the demo. The top priority is that the app is runnable end to end.

## Open flags
- Competitors not researched. Run a quick scan before the roadmap is final.
- No named contact at a training company yet. Needed to validate the buyer side.
- Data location is unconstrained for now. Revisit before a real pilot with learners' recordings.
- Filler-word and modulation accuracy needs testing against real recordings.
- AI-vs-instructor score agreement is unmeasured. Calibrate on a sample before trusting scores.

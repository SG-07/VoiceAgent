# API contracts

> Conventions only. Real endpoints are added after Phase 3 (feature design).

## Response format
All JSON responses use `{ "data": ..., "error": null }` on success and `{ "data": null, "error": { "code": "...", "message": "..." } }` on failure.

## Error handling
- Standard HTTP status codes: 400 invalid input, 401 not logged in, 403 not allowed, 404 not found, 429 rate limited, 500 server error.
- `error.code` is a stable machine-readable string (e.g. `RECORDING_NOT_FOUND`); `error.message` is plain language safe to show a user.
- AI-provider failures (including Groq rate limits) never lose the recording: the submission is marked `failed`, retried automatically, and the learner sees "still processing", not an error.

## Versioning
Not versioned for now (single consumer, the web app). Revisit if a second client appears.

## Auth
Supabase session (JWT) sent with each request; serverless functions verify it. Role (`learner` or `instructor`) is checked server-side in every function, backed by database row-level security.

## Endpoints
Pending Phase 3.

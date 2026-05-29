# PROJECT STATUS REPORT

## 1. Current Architecture

- Folder structure:

```text
AI_Internship_Finder/
├─ frontend/
│  ├─ src/app/
│  ├─ src/components/
│  ├─ src/lib/
│  ├─ src/types/
│  ├─ package.json
│  └─ next.config.js
├─ backend/
│  ├─ src/agents/
│  ├─ src/apis/
│  ├─ src/configs/
│  ├─ src/routes/
│  ├─ src/scrapers/
│  ├─ src/services/
│  ├─ src/utils/
│  └─ package.json
├─ docs/
│  ├─ PROJECT_STATUS_REPORT.md
│  ├─ QUICKSTART.md
│  └─ WALKTHROUGH.md
├─ scripts/
│  └─ validate.py
├─ docker-compose.yml
├─ package.json
└─ README.md
```

- Main technologies used:
  - Next.js 15.5.18
  - React 19
  - TypeScript
  - Tailwind CSS
  - Zustand
  - Express 5
  - Multer
  - Node Cron
  - Axios

- Frontend stack:
  - Next.js App Router
  - Client-side Zustand store
  - Tailwind-based custom design system
  - Axios API wrapper with fallback behavior

- Backend stack:
  - Express API
  - In-memory state service
  - Route/service split
  - Mock scraper plus cron scheduler

- Cleanup actions completed:
  - Moved all frontend code and config into `frontend/`
  - Replaced the empty backend stub with a structured backend under `backend/src/`
  - Removed the browser worker experiment: `frontend/public/agent-worker.js`
  - Removed the dead hook: `frontend/src/hooks/useJobAgent.js`
  - Removed the unused component: `frontend/src/components/AgentStatus.jsx`
  - Removed stale root build artifacts and duplicate install directories
  - Removed unused frontend dependencies: `lucide-react`, `date-fns`, `recharts`

- Preserved intentionally:
  - `frontend/src/lib/recommendations.ts` was kept because the current discovery UI still depends on it
  - `docs/QUICKSTART.md` and `docs/WALKTHROUGH.md` were not deleted; they were rewritten to match the new structure

## 2. Features Currently Working

- Resume upload UI works and routes to discovery after upload.
- Frontend build is clean.
- Frontend lint is clean.
- Backend starts successfully on port `8000`.
- Frontend starts successfully on port `3000`.
- Backend health endpoint works: `/api/health`.
- Backend agent status endpoint works: `/api/agents/status`.
- Backend resume upload endpoint works with multipart form data.
- Discovery page renders personalized cards from the local recommendation engine.
- Save and dislike actions update local UI state.
- Chat panel sends messages and receives deterministic backend or fallback responses.
- Agent monitor page now reads live backend agent status instead of page-local duplicate mock state.
- Profile page saves preferences to the backend mock API.
- Validation script works against the restructured layout.

## 3. Broken / Incomplete Features

- Bugs:
  - Dark mode toggle is persisted in state but does not actually switch the app theme.
  - Profile memory cards still use hardcoded display data instead of backend-backed memory.
  - Many internship application URLs are placeholder `#` links.
  - Resume selector only switches frontend state; it does not synchronize active resume with the backend.

- Unfinished modules:
  - Resume parsing is fake. The backend derives profile data from filename patterns, not actual document parsing.
  - Chat is not RAG. It is rule-based text generation with no retrieval layer.
  - Agent system is not autonomous. It is a scheduled mock refresh over static seed data.
  - Scrapers are not real source connectors. `backend/src/scrapers/mock.scraper.js` is synthetic.
  - Saved “Applied” tab is a placeholder with no application tracking model.
  - “Clear All Memory” in profile is UI-only and has no implementation.

- Failing APIs:
  - No websocket chat implementation exists, despite the old project shape implying it previously might.
  - No persistence-backed APIs exist for users, jobs, sessions, or preferences.

- Unstable logic:
  - Discovery recommendations are client-side and deterministic, so backend changes will not drive ranking yet.
  - Backend state resets on every restart because everything is in memory.
  - `npm audit` on the frontend still reports 2 moderate vulnerabilities in the current Next.js dependency chain.

## 4. Backend Analysis

- Current backend quality:
  - Better structured than before.
  - Runnable and understandable.
  - Still a scaffold, not a real production backend.

- Scalability issues:
  - In-memory state means zero horizontal scalability.
  - No database, queue, cache, or object storage.
  - No separation between API surface and job execution state.
  - `node-cron` inside the web process is fragile for multi-instance deployment.

- Security concerns:
  - No authentication or authorization anywhere.
  - No rate limiting.
  - No request validation layer.
  - File upload exists without content inspection, malware scanning, or storage controls.
  - CORS is open to configured origins but there is no auth boundary to protect.

- CORS issues:
  - Current CORS setup is simple and acceptable for local dev.
  - It is not enough for multi-environment deployments with preview URLs, staging domains, or credentialed auth flows.

- Deployment readiness:
  - The backend can be deployed as a demo service.
  - It is not production ready for real users, real traffic, or real scraping.

## 5. Frontend Analysis

- UI structure:
  - Clean App Router split across onboarding, discovery, saved, agents, and profile routes.
  - Component structure is simple and understandable.

- State management:
  - Zustand is used correctly for lightweight app state.
  - State boundaries are still blurry because recommendation logic, preference memory, and API fallback behavior are mixed in the frontend.

- Component organization:
  - Better after cleanup.
  - Still very page-heavy. Some cards, filter panels, and profile sections should be split into reusable components.

- Performance issues:
  - Heavy client-side rendering for most screens.
  - Static mock recommendation computation happens in the browser.
  - Many remote images are raw `<img>` tags and not optimized through `next/image`.
  - No data caching layer like React Query or SWR.
  - Dependency health is improved, but the frontend still has a moderate advisory chain through Next.js and bundled PostCSS.

## 6. AI/Agent System Analysis

- Whether the project is truly agentic:
  - No. It currently presents an agentic interface, but the runtime is not genuinely agentic.

- What AI workflows currently exist:
  - Deterministic resume upload fallback.
  - Client-side recommendation scoring from static internship data.
  - Deterministic chat replies based on keyword matching.
  - Mock backend “agent” refresh loop over seed data.

- What is missing for real agentic architecture:
  - Real planner-executor loops
  - Tool-enabled task decomposition
  - Durable memory
  - Background job orchestration
  - Event-driven triggers
  - Retry policies
  - Human review checkpoints
  - Persistent embeddings and retrieval
  - Evaluation and observability

## 7. Recommended Architecture

- Agentic AI workflows:
  - API layer: Fastify or NestJS if you want stronger module boundaries, or keep Express only if you stay thin
  - Worker layer: separate worker service using BullMQ or Temporal
  - Agent runtime: orchestrator service for planning, tool calls, retries, and checkpoints
  - Storage: Postgres for source of truth, Redis for queues and ephemeral state

- RAG pipelines:
  - Ingestion workers normalize job posts, company data, and resumes
  - Embedding pipeline writes to vector store asynchronously
  - Retrieval service handles hybrid search, reranking, and source attribution
  - Chat service consumes retrieval outputs and stores traces

- Vector database integration:
  - Best fit here is Postgres plus `pgvector` if you want one operational system
  - Use a separate vector DB only if retrieval scale or latency demands it

- Continuous backend agents:
  - Replace `node-cron` in the API process with queue-driven workers
  - Give each source scraper its own worker type and rate-limit policy
  - Add job-level deduplication and circuit breakers per source

- Monitoring/logging:
  - Structured JSON logs
  - OpenTelemetry tracing
  - Sentry for app and worker exceptions
  - Prometheus plus Grafana if self-hosting

- Guardrails:
  - Schema validation on all LLM outputs
  - Source allowlists for scraping and retrieval
  - Prompt injection filtering on scraped text
  - Human approval for irreversible user actions

- Evaluation systems:
  - Offline ranking evaluation for recommendation quality
  - Retrieval precision and citation correctness checks
  - Hallucination checks on chat responses
  - Regression suites for agent workflows

## 8. Recommended Tech Stack

- Best free hosting:
  - Frontend: Vercel
  - Backend: Render or Railway
  - Workers: Railway or Fly.io

- Database:
  - Postgres on Neon or Supabase

- Vector DB:
  - `pgvector` on the same Postgres instance first
  - Pinecone only if you outgrow that

- Backend framework:
  - Fastify for performance and clean plugin boundaries
  - NestJS if you want strong enterprise structure
  - Express is okay only as a temporary scaffold

- Monitoring tools:
  - Sentry
  - Better Stack or Grafana Cloud
  - OpenTelemetry

## 9. Immediate Next Steps

1. Replace in-memory backend state with Postgres models for resumes, internships, sessions, and preferences.
2. Move recommendation ranking out of `frontend/src/lib/recommendations.ts` into backend services.
3. Add request validation with Zod or Joi on every backend route.
4. Add authentication before any real user data work continues.
5. Replace the mock scraper with one real source connector plus deduplication.
6. Implement real resume parsing and structured extraction.
7. Add a vector-backed retrieval service and remove deterministic chat fallbacks.
8. Split agent execution into a worker process with a queue.
9. Replace placeholder profile memory UI with backend-backed preference and feedback history.
10. Add integration tests for the API and end-to-end tests for resume upload to discovery.

## 10. Important Problems Blocking Scalability

- The project still has no persistent data layer.
- The “AI” behavior is mostly presentation-layer simulation.
- The recommendation engine lives in the frontend, which is the wrong place for production ranking logic.
- The agent monitor is monitoring a fake agent system, not durable background execution.
- There is no auth, no tenancy model, and no security boundary.
- There is no queue, so long-running or retryable work has nowhere safe to run.
- There is no observability stack, so failures would be invisible in production.
- The current backend is demo-deployable, not investor-demo-to-real-product scalable.

# AI Internship Finder

Restructured into a production-oriented split:

- `frontend/`: Next.js 15 app for resume upload, discovery, saved jobs, agent monitor, and profile flows
- `backend/`: Express API with structured routes, services, agents, scrapers, configs, and utils
- `docs/`: project documentation and the full status report
- `scripts/`: validation helpers

## Local Development

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```

Or from the repo root:

```bash
npm run dev:backend
npm run dev:frontend
```

## Verification

```bash
cd frontend && npm run lint && npm run build
cd ../backend && npm run build
python ../scripts/validate.py
```

## Notes

- The frontend is working and buildable.
- The backend is now structured and runnable, but it is still a mock/in-memory service, not a real production data platform yet.
- The full technical assessment is in [docs/PROJECT_STATUS_REPORT.md](docs/PROJECT_STATUS_REPORT.md).

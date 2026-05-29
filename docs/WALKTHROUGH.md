# Walkthrough

## Frontend

- `/`: resume upload and onboarding
- `/discovery`: client-side recommendation feed with filters and save/rate actions
- `/saved`: saved and rejected internship lists
- `/agents`: backend agent status view
- `/profile`: preference controls and resume list

## Backend

- `src/routes/`: HTTP entrypoints
- `src/services/`: domain logic
- `src/agents/`: scheduled worker orchestration
- `src/scrapers/`: mock data collection layer
- `src/apis/`: external client boundary
- `src/configs/`: environment and CORS setup
- `src/utils/`: shared helpers

## Current Reality

- The frontend is polished enough for demos and local iteration.
- The backend is structured correctly but still uses mock data and in-memory state.
- There is no persistent database, queue, vector store, or real agent runtime yet.

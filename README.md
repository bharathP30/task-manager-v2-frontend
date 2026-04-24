# Task Manager Frontend (React + Vite)

Lightweight React client built with Vite.

## Requirements

- Node.js 18+ or similar

## Setup

1. `cd frontend`
2. `npm install` to install dependencies
3. create a `.env` file (or set environment vars) with:
   ```
   VITE_API_URL=http://localhost:5000   # or wherever the backend runs
   ```

## Running

- `npm run dev` starts the Vite development server
- `npm run build` creates a production bundle

The UI requires a valid JWT to operate; login/signup flows are available.

## Notes

- The app passes `api` and `token` props from `main.jsx` into pages.
- Adjust `VITE_API_URL` if the backend address changes.

# VoiceAgent
Project aim to use voice agents to talk to human for specific tasks.

## Project structure

- `frontend` - React application created with Vite.
- `backend` - Node.js backend initialized with Express.
- Supabase client support is installed in both applications.

## Local setup

Install dependencies from each application directory:

```powershell
cd frontend
npm install

cd ..\backend
npm install
```

Start the frontend development server:

```powershell
cd frontend
npm run dev
```

Start the backend in development mode with automatic server restarts:

```powershell
cd backend
npm run dev
```

Run the backend without the file watcher:

```powershell
cd backend
npm start
```

Supabase credentials should be supplied through environment variables when the database integration is wired in. Do not commit `.env` files.

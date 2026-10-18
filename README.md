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

For frontend Supabase Auth, copy `frontend/.env.example` to `frontend/.env.local` and set:

```text
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

The frontend signup and login pages use Supabase email/password authentication. Configure email confirmation in the Supabase dashboard according to the desired signup flow.

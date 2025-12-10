This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Backend Integration Setup

To connect this frontend to your FastAPI backend, configure the following in `.env.local` and restart the dev server:

- `BACKEND_URL` → Your FastAPI base URL (server-side usage)
- `NEXT_PUBLIC_BACKEND_URL` → Same base URL exposed to the client (used only to decide whether to call live APIs)

Example `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-strong-random-string
BACKEND_URL=https://api.example.com
NEXT_PUBLIC_BACKEND_URL=https://api.example.com
```

Then restart the dev server:

```bash
npm run dev
```

Login at `/auth/login` to obtain a session. The proxy API routes under `app/api/proxy/*` will securely forward your request to the backend with the `Authorization: Bearer <accessToken>` from the NextAuth session.

Demo QR scan route (after login): `/scan?pid=P-3001`

Behavior:

- Pages fetch live data from FastAPI via proxy routes when authenticated.

Affected routes when backend is configured:

- `/doctor` → GET `/patients`
- `/doctor/[id]` → GET `/patients/{id}` and `/patients/{id}/visits`
- `/pharmacist` and `/pharmacist/scan?pid=...` → GET `/patients/{id}/prescriptions`; PUT `/prescriptions/{id}` to issue
- `/patient` → GET `/patients/{id}` and `/patients/{id}/visits` (uses logged-in user id)
- `/scan?pid=...` → GET `/scan/{pid}`; backend may return a direct redirect or role/target id

## Setup

- **Install dependencies**

  ```bash
  npm install
  ```

- **Environment variables**

  Copy `env.example` to `.env.local` and edit values as needed:

  ```bash
  cp env.example .env.local
  ```

  Required values:

  - `NEXTAUTH_URL=http://localhost:3000`
  - `NEXTAUTH_SECRET=<strong-random-string>`
  - `BACKEND_URL` and `NEXT_PUBLIC_BACKEND_URL`

- **Run the dev server**

  ```bash
  npm run dev
  ```

- **Login**

  Navigate to `/auth/login` and sign in using your backend credentials.

## QR Scan

Visit `/scan?pid=<PATIENT_ID>` while logged in to validate and redirect based on your role.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

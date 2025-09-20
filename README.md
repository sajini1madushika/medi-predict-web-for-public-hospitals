# MediPredict-SL (Prototype)

Bilingual (Sinhala + English) chronic disease health management prototype built with Next.js App Router, Tailwind CSS, and TypeScript. Uses mock data only.

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Open routes:

- http://localhost:3000/doctor
- http://localhost:3000/doctor/P-1001
- http://localhost:3000/pharmacist
- http://localhost:3000/practice
- http://localhost:3000/patient

## Structure

- `app/` – App Router pages and layout
- `components/` – UI components
- `lib/` – types and mock data

## Notes

- Charts: `recharts`
- No backend; all data from `lib/mock.ts`
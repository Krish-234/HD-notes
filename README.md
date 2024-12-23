Notes App
A Note-Taking App built with modern web technologies that allows users to manage their notes securely. The application supports signup/login using email and OTP, JWT-based authentication, and CRUD operations on user-specific notes.

Tech Stack
Frontend
Next.js 15: A React framework for building fast and scalable web applications.
TypeScript: Enhances the codebase with type safety and better developer tooling.
TailwindCSS: Utility-first CSS framework for rapid UI development.
shadcn/ui: Pre-configured Tailwind-based components for faster UI implementation.
Backend
Bun: A modern JavaScript runtime that is faster and provides integrated tooling.
Prisma ORM: Used for database schema management, migrations, and type-safe data operations.
PostgreSQL: A relational database deployed using Vercel Postgres.

Features
User Authentication:
Signup/Login using email and OTP.
JWT-based authentication for secured routes.
Notes Management:
Create, Read, and Delete notes.
Each user has access to their own notes only.
Mobile-Friendly:
Responsive design using TailwindCSS.
Deployment:
Hosted on Vercel with Vercel Postgres as the database.

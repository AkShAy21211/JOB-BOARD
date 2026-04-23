# JOB-BOARD PLATFORM

A full-stack job board application built with a polyglot database architecture.

## 🚀 Features
- **Recruiter**: Post jobs, view applicants, update application status.
- **Job Seeker**: Browse jobs, apply with cover notes, track status.
- **Polyglot DB**: 
  - **PostgreSQL** for relational data (Users, Jobs, Applications).
  - **MongoDB** for flexible data (Job Descriptions, Activity Logs).
- **Security**: JWT Authentication + RBAC (Role Based Access Control).

## 🛠 Tech Stack
- **Backend**: Node.js, Express, PostgreSQL (`pg`), MongoDB (`mongoose`).
- **Frontend**: React (Vite), Tailwind CSS, React Query.
- **Deployment**: Railway (Backend), Vercel (Frontend).

## 📂 Structure
- `backend/`: Express API with raw SQL queries.
- `frontend/`: React SPA with Tailwind styling.

## 🚦 Getting Started
1. Clone the repo.
2. Install dependencies: `npm install` in both `backend/` and `frontend/`.
3. Set up environment variables in `backend/.env`.
4. Run migrations for PostgreSQL.
5. `npm run dev` in both directories.

# VibeHire - Detailed Development Plan

This document outlines the end-to-end engineering roadmap for the Job Board Platform, emphasizing the polyglot database strategy and raw SQL discipline.

---

## 🛠 Phase 1: Technical Foundation (Complete)
- **Scaffold Project**: Dual monorepo-style structure (`backend/` & `frontend/`).
- **Database Connectivity**: 
  - **PostgreSQL**: Configured with `pg` pool for relational consistency.
  - **MongoDB**: Configured with `mongoose` for flexible document storage.
- **Middleware Infrastructure**: 
  - Centralized Error Handler (standardized JSON error responses).
  - CORS and JSON parsing enabled.
- **Frontend Core**: Vite + React + Tailwind CSS v3 + React Query.
- **Auth Context**: Global state management for JWT and user profiles.

---

## 🏗 Phase 2: Schema Design & Database Implementation
**Goal**: Establish the "Source of Truth" for relational data.

### 2.1 PostgreSQL Migrations (`001_initial_schema.sql`)
- **Users**: Auth-critical data (id, name, email, password, role).
- **Companies**: Relational link to users (owner_id).
- **Jobs**: The core entity (title, location, salary, company_id, mongo_desc_id).
- **Applications**: Join table between Users and Jobs (user_id, job_id, status).

### 2.2 MongoDB Modeling
- **JobDescriptions**: Schema for flexible fields (responsibilities, requirements, benefits).
- **ActivityLogs**: Append-only log for tracking user actions.

---

## 🔐 Phase 3: Authentication & Security
**Goal**: Secure the platform using industry-standard JWT.

- **Endpoints**:
  - `POST /api/auth/register`: Password hashing with `bcryptjs`.
  - `POST /api/auth/login`: JWT generation.
  - `GET /api/auth/me`: Profile retrieval via token.
- **Middleware**:
  - `protect`: Verify JWT and attach user to `req.user`.
  - `requireRole('recruiter' | 'seeker')`: RBAC (Role Based Access Control).
- **Validation**:
  - Implement **Joi** schemas for every input to prevent SQL injection and malformed data.

---

## 💼 Phase 4: Job Management (The Polyglot Bridge)
**Goal**: Master data distribution across two databases.

- **Create Job flow**:
  1. Save rich description to **MongoDB**.
  2. Take the returned `_id` and save the relational core to **PostgreSQL** as `mongo_desc_id`.
- **Read Job flow**:
  1. Fetch core data from **Postgres**.
  2. Fetch description from **Mongo** using `mongo_desc_id`.
  3. Merge and return as a single JSON object.
- **Pagination**: Implement `LIMIT` and `OFFSET` in raw SQL for the jobs list.

---

## 📄 Phase 5: Application Tracking
**Goal**: Handle complex relational updates and status flows.

- **Job Seeker Workflow**:
  - Browse jobs -> View detail -> Apply (POST to `applications` table).
  - Prevent duplicate applications using `UNIQUE(job_id, user_id)`.
- **Recruiter Workflow**:
  - View dashboard -> See applicants per job.
  - Patch application status (Applied -> Reviewing -> Hired/Rejected).

---

## 🎨 Phase 6: Frontend Development (Premium UX)
**Goal**: Create a high-authority, professional interface.

- **Design System**: 
  - Custom Tailwind theme (Primary Sky/Slate palette).
  - Glassmorphism UI components (`glass` class).
  - Inter font for readability.
- **State Management**:
  - **React Query**: For server-side state (caching, loading states, auto-refetch).
  - **Context API**: For client-side state (Auth).
- **Key Pages**:
  - **Jobs Feed**: Paginated list with filtering.
  - **Recruiter Dashboard**: Analytics-style overview of job performance.
  - **Job Detail**: Immersive view merging data from both DBs.

---

## 🚀 Phase 7: Deployment & Hardening
- **Backend**: Deploy to **Railway** with Postgres and Mongo Atlas plugins.
- **Frontend**: Deploy to **Vercel** pointing to the Railway API.
- **Hardening**: 
  - Add request logging.
  - Sanitize all error messages for production.
  - Audit all raw SQL queries for potential injection points.

---

## 📜 Key Engineering Principles
1. **Raw SQL Only**: No ORM for Postgres. Use `pool.query('SELECT ...')`.
2. **Stateless Auth**: Everything happens via JWT; no server-side sessions.
3. **Data Integrity**: Use Postgres constraints (CHECK, FOREIGN KEY, UNIQUE) as the first line of defense.
4. **UX First**: Loading skeletons, smooth transitions, and helpful error toasts.

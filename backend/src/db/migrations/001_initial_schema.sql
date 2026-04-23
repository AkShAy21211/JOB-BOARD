-- 001_initial_schema.sql

-- Users Table (Auth Critical)
CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(20)  NOT NULL CHECK (role IN ('recruiter', 'seeker')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Companies Table (Linked to Recruiter)
CREATE TABLE IF NOT EXISTS companies (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  website    VARCHAR(255),
  owner_id   INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Jobs Table (Relational Core)
CREATE TABLE IF NOT EXISTS jobs (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(200) NOT NULL,
  location      VARCHAR(150),
  salary_min    INTEGER,
  salary_max    INTEGER,
  job_type      VARCHAR(30) CHECK (job_type IN ('full-time','part-time','contract','internship')),
  company_id    INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  mongo_desc_id VARCHAR(50), -- Reference to MongoDB Document ID
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- Applications Table (Join Table)
CREATE TABLE IF NOT EXISTS applications (
  id         SERIAL PRIMARY KEY,
  job_id     INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status     VARCHAR(30) DEFAULT 'applied'
             CHECK (status IN ('applied','reviewing','shortlisted','rejected','hired')),
  cover_note TEXT,
  applied_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (job_id, user_id) -- Prevent duplicate applications
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id  ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_jobs_company_id      ON jobs(company_id);

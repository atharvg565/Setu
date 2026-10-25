# Setu

**Bridging academia and industry through explainable skill matching.**

Smart India Hackathon 2026 | Problem Statement ID: 26044 | Team ZENITH
Theme: Academia-Industry Collaboration | Category: Software

---

## About

*Setu* means "bridge" in Hindi, which is exactly what this platform does.

Students often don't know which skills industry actually wants, and companies struggle to find candidates who fit their requirements. There is no single platform connecting skill development to internships and placements.

Setu turns a student's self-assessed skills into a measurable skill profile, ranks every open internship against that profile, and gives companies a ranked list of applicants for each posting. Every ranking can be explained in plain language, because the scoring is a transparent weighted formula rather than a black box.

## How It Works

1. A **student** signs up and rates their technical and soft skills.
2. Setu builds their skill profile and shows how well they fit each open posting.
3. An **industry** account posts an internship with required skills and an importance level (low, medium, or high) for each.
4. The matching engine scores every student against every posting.
5. The student sees ranked matches, applies, and the company sees applicants ranked by match score.
6. The company shortlists, rejects, or selects, and the student tracks the status.

## Matching Algorithm

Matching uses weighted skill-vector scoring. Weights map as `low = 1`, `medium = 2`, `high = 3`.

```
match_score    = Σ(wᵢ × sᵢ) / Σ(wᵢ)
coverage_ratio = skills the student has ÷ skills the posting requires
final_score    = match_score × coverage_ratio
```

- `sᵢ` is the student's proficiency (0-100) in required skill *i*
- `wᵢ` is the importance weight of that skill in the posting
- The coverage ratio penalises students who are missing required skills entirely, so someone strong in only a couple of skills cannot outrank someone who covers them all

**Example:** for a posting requiring React (high), Node.js (medium) and Communication (low), a student with 95 / 90 / 80 scores 90.83, while a student with 85 in React and 60 in Communication but no Node.js scores 35.

The engine lives in `backend/utils/matchingEngine.js` and is tested standalone in `backend/utils/testMatchingEngine.js`.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB (Atlas) with Mongoose |
| Auth | JWT, bcryptjs |

## Project Structure

```
setu/
├── backend/
│   ├── controllers/     # Route logic (auth, assessment, postings, applications)
│   ├── data/            # skills.json - fixed skill taxonomy
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express route definitions
│   ├── utils/           # Matching engine + tests
│   └── server.js        # App entry point
└── frontend/            # React app
```

## Getting Started

### Prerequisites

- Node.js (LTS) and npm
- Git
- A MongoDB Atlas cluster (free tier works)

### Backend setup

```bash
git clone https://github.com/atharvg565/Setu.git
cd Setu/setu/backend
npm install
```

Create a `.env` file inside `backend/`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
PORT=5000
```

Start the dev server:

```bash
npm run dev
```

You should see `Server running on port 5000` and `MongoDB connected`.

> Never commit your `.env` file. It is already listed in `.gitignore`.

### Run the matching engine test

```bash
node utils/testMatchingEngine.js
```

## API Overview

Base URL (local): `http://localhost:5000/api`. Protected routes need the header `Authorization: Bearer <token>`.

| Method | Endpoint | Role | Description |
|---|---|---|---|
| POST | `/auth/signup` | Public | Create an account (student or industry) |
| POST | `/auth/login` | Public | Log in and receive a JWT |
| POST | `/assessment/submit` | Student | Submit or update skill ratings |
| GET | `/assessment/me` | Student | Get own skill profile |
| POST | `/postings/create` | Industry | Create a posting with weighted skills |
| GET | `/postings/all` | Any | List all open postings |
| GET | `/postings/mine` | Industry | List own postings |
| GET | `/postings/matches` | Student | Ranked matches for the logged-in student |
| POST | `/applications/apply` | Student | Apply to a posting |
| GET | `/applications/mine` | Student | List own applications and statuses |
| GET | `/applications/posting/:posting_id` | Industry | Ranked applicants for a posting |
| PATCH | `/applications/:application_id/status` | Industry | Update status (applied, shortlisted, rejected, selected) |

Full request and response examples are in [`API.md`](./API.md).

## Roadmap

**MVP (built):** student assessment and skill profile, weighted postings, matching engine, application and status tracking, role-based auth for Student and Industry.

**Phase 2 (planned):**
- Academician and FDP portal
- Blockchain-verified credentials
- NLP-driven dynamic skill taxonomy
- Institution analytics dashboards
- Certification provider integrations
- Scalable infrastructure (microservices, auto-scaling)

## Team ZENITH

Built for Smart India Hackathon 2026.

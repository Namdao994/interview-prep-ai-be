# Interview Prep AI — Backend

Backend RESTful API for **Interview Prep AI** — an AI-powered interview practice platform. Users can create interview sessions, receive auto-generated questions, get detailed explanations, and discuss each question in real time via Server-Sent Events (SSE).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)

---

## Features

- **Authentication** — Register / Login with email & password, email verification via OTP, change password.
- **OAuth 2.0** — Sign in with Google, GitHub, and Discord.
- **Interview Session Management** — Create, update, delete, archive, and unarchive interview sessions.
- **AI Integration** — Auto-generate interview questions, explain answers, and create follow-up discussion questions powered by the Poe API (OpenAI-compatible).
- **Real-time Streaming** — Questions are streamed to the client in real time via Server-Sent Events (SSE).
- **User Management** — Update profile, change avatar (Cloudinary), delete account.
- **Pin Questions** — Toggle pin/unpin individual questions within a session.
- **Security** — JWT (Access/Refresh Token), CSRF Token, Rate Limiting, Helmet, CORS.
- **Email** — Send OTP verification emails via Nodemailer with Google App Password.

---

## Tech Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Runtime    | Node.js + TypeScript                              |
| Framework  | Express.js                                        |
| Database   | MongoDB (Mongoose)                                |
| AI         | Poe API (OpenAI-compatible)                       |
| Auth       | JWT, Passport.js (Google, GitHub, Discord OAuth2) |
| Storage    | Cloudinary                                        |
| Email      | Nodemailer                                        |
| Validation | Joi                                               |
| Streaming  | better-sse (Server-Sent Events)                   |
| Dev Tools  | ts-node, nodemon, ESLint, Prettier                |

---

## Project Structure

```
src/
├── @types/          # Extended types for Express and session
├── configs/         # MongoDB, CORS, Passport, and env configuration
├── constants/       # Error codes and session constants
├── controllers/     # Request/response handlers (auth, user, session, ai)
├── interfaces/      # TypeScript interfaces
├── middlewares/     # authenticate, authorize, csrf, rate-limit, upload
├── models/          # Mongoose models (User, Session, Question, Role, Permission)
├── providers/       # Cloudinary and Nodemailer providers
├── routes/v1/       # API route definitions
├── services/        # Business logic (auth, user, session, question, ai)
├── utils/           # Helpers, error handler, AI prompt builder
├── validations/     # Joi schema validations
└── server.ts        # Entry point
```

---

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary** account (image storage)
- **Poe API** account (AI question generation)
- **Google App Password** (OTP email delivery)
- OAuth App credentials for Google / GitHub / Discord

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/interview-prep-ai-be.git
cd interview-prep-ai-be

# 2. Install dependencies
npm install

# 3. Copy the environment config file
cp .env.example .env
```

---

## Environment Variables

Edit the `.env` file with your own credentials:

```env
# Application
APP_NAME=interview-prep-ai
WEBSITE_DOMAIN_DEVELOPMENT=http://localhost:5173
WEBSITE_DOMAIN_PRODUCTION=https://your-production-domain.com

# Database
DATABASE_NAME=interview-prep-ai
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interview-prep-ai

# JWT
JWT_SECRET=your_jwt_secret_here
ACCESS_TOKEN_LIFETIME=30m
REFRESH_TOKEN_LIFETIME=7d
CSRF_TOKEN_LIFETIME=30m

# Pagination defaults
DEFAULT_LIMIT_QUERY=5
DEFAULT_PAGE_QUERY=1

# Email (Google App Password)
GOOGLE_APP_PASSWORD=your_google_app_password_here

# OAuth2 — Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://your-backend-domain.com/api/v1/auth/oauth2/redirect/google

# OAuth2 — GitHub
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=https://your-backend-domain.com/api/v1/auth/oauth2/redirect/github

# OAuth2 — Discord
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=https://your-backend-domain.com/api/v1/auth/oauth2/redirect/discord

# AI (Poe API)
POE_API_KEY=your_poe_api_key
DEFAULT_NUMBER_QUESTIONS_GENERATION=5

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Running the App

```bash
# Development — hot reload with nodemon
npm run server

# Build TypeScript
npm run build

# Production
npm run start:prod
```

---

## API Endpoints

Base URL: `/api/v1`

### Auth — `/api/v1/auth`

| Method   | Endpoint                   | Description                                     |
| -------- | -------------------------- | ----------------------------------------------- |
| `POST`   | `/register`                | Register a new account (supports avatar upload) |
| `POST`   | `/login`                   | Login with email and password                   |
| `DELETE` | `/logout`                  | Logout (requires authentication)                |
| `POST`   | `/refresh-token`           | Refresh the access token                        |
| `POST`   | `/rotate-csrf`             | Rotate the CSRF token                           |
| `POST`   | `/verify-email-otp`        | Verify email address with OTP                   |
| `PATCH`  | `/change-password`         | Change password (requires authentication)       |
| `GET`    | `/login/google`            | Initiate Google OAuth2 login                    |
| `GET`    | `/oauth2/redirect/google`  | Google OAuth2 callback                          |
| `GET`    | `/login/github`            | Initiate GitHub OAuth2 login                    |
| `GET`    | `/oauth2/redirect/github`  | GitHub OAuth2 callback                          |
| `GET`    | `/login/discord`           | Initiate Discord OAuth2 login                   |
| `GET`    | `/oauth2/redirect/discord` | Discord OAuth2 callback                         |

### User — `/api/v1/user`

| Method   | Endpoint         | Description                           |
| -------- | ---------------- | ------------------------------------- |
| `GET`    | `/`              | Get all users                         |
| `GET`    | `/my-profile`    | Get the current user's profile        |
| `PATCH`  | `/update`        | Update personal information           |
| `PATCH`  | `/change-avatar` | Change avatar (uploads to Cloudinary) |
| `DELETE` | `/delete-avatar` | Delete avatar                         |
| `DELETE` | `/delete`        | Delete the current user's own account |
| `DELETE` | `/:id/delete`    | Delete a user by ID (admin)           |

### Session — `/api/v1/session`

| Method   | Endpoint                                      | Description                                |
| -------- | --------------------------------------------- | ------------------------------------------ |
| `GET`    | `/get-all-session`                            | Get all interview sessions                 |
| `GET`    | `/my-sessions`                                | Get sessions belonging to the current user |
| `GET`    | `/search-sessions-suggestions`                | Get recent session search suggestions      |
| `GET`    | `/my-session/:id`                             | Get a session by ID                        |
| `POST`   | `/create-session`                             | Create a new interview session             |
| `PATCH`  | `/my-session/:id`                             | Update a session                           |
| `PATCH`  | `/my-session/:id/archive`                     | Archive a session                          |
| `PATCH`  | `/my-session/:id/unarchive`                   | Unarchive a session                        |
| `PATCH`  | `/:sessionId/question/:questionId/toggle-pin` | Pin or unpin a question                    |
| `DELETE` | `/my-session/:id`                             | Delete a session                           |
| `DELETE` | `/:sessionId/question/:questionId`            | Remove a question from a session           |

### AI — `/api/v1/ai`

| Method | Endpoint                                                              | Description                                     |
| ------ | --------------------------------------------------------------------- | ----------------------------------------------- |
| `GET`  | `/generate-questions/:sessionId`                                      | Stream AI-generated interview questions via SSE |
| `POST` | `/generate-explanation/:sessionId/question/:questionId`               | Generate an explanation for a question's answer |
| `POST` | `/generate-answer-follow-up-question/:sessionId/question/:questionId` | Generate a follow-up discussion question        |

---

## Scripts

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `npm run server`     | Start the server in development mode with nodemon |
| `npm run build`      | Compile TypeScript to JavaScript                  |
| `npm run start:prod` | Run the compiled build in production mode         |
| `npm run lint`       | Check for ESLint errors                           |
| `npm run lint:fix`   | Auto-fix ESLint errors                            |

---

## License

MIT

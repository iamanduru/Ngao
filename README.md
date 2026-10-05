# Ngao — Digital Scam & Phishing Reporting Portal

Ngao is a web-based digital safety platform that allows users to report suspicious digital activity, track submitted reports, and learn how to recognise common scam and phishing warning signs.

The platform also provides a separate **Safety Analyst Portal** where authorised analysts can review submitted reports and update their assessment status.

Ngao was developed as a software engineering and cybersecurity project with a strong focus on secure authentication, role-based access control, server-side validation, user data isolation, and practical security testing.

> **Note:** Ngao is currently an educational prototype. Report classifications made within the platform are not official cybercrime or cybersecurity determinations.

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Project Objectives](#project-objectives)
- [User Roles](#user-roles)
- [Core Features](#core-features)
- [Application Workflow](#application-workflow)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Authentication and Authorization](#authentication-and-authorization)
- [Security Design](#security-design)
- [Security Testing](#security-testing)
- [API Overview](#api-overview)
- [Forms and Validation](#forms-and-validation)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)
- [Current Data Storage](#current-data-storage)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Current Limitations](#current-limitations)
- [Future Improvements](#future-improvements)
- [Development Approach](#development-approach)
- [Project Status](#project-status)
- [Disclaimer](#disclaimer)
- [Author](#author)

---

# Overview

Digital scams and phishing attacks commonly reach users through platforms such as:

- SMS
- WhatsApp
- Email
- Facebook
- Instagram
- Websites
- Fake job advertisements
- Investment schemes
- Prize and giveaway scams
- Mobile-money fraud
- Impersonation attempts

A suspicious message may contain several warning signs, but users may not always know how to recognise them or where to document the incident.

Ngao provides a simple reporting workflow through which a user can:

1. Create an account.
2. Sign in securely.
3. Submit suspicious digital activity.
4. Identify observed warning signs.
5. Track the submitted report.
6. View the assessment status once an analyst reviews it.

A separate analyst interface allows authorised safety analysts to review reports without giving normal users access to privileged functions.

---

# Problem Statement

Scams, phishing attempts, impersonation attacks, fraudulent job offers, and similar digital threats increasingly reach users through everyday communication platforms.

Although many people recognise that a message or link may appear suspicious, several challenges remain:

- users may not know which warning signs indicate a scam;
- suspicious incidents may not be documented consistently;
- users may accidentally expose sensitive credentials while reporting incidents;
- malicious links may be handled unsafely;
- ordinary users should not have access to administrative or analyst functions;
- users need a simple way to track whether a submitted report has been reviewed.

Ngao explores how a secure web application can provide a structured reporting and review workflow while incorporating secure software engineering principles from the beginning of development.

---

# Project Objectives

The main objectives of Ngao are to:

1. Provide a simple interface for reporting suspicious digital activity.
2. Help users identify common scam and phishing warning signs.
3. Allow registered users to track their own reports.
4. Provide a separate workspace for authorised safety analysts.
5. Apply secure authentication and authorization.
6. Prevent users from accessing reports belonging to other users.
7. Prevent privileged analyst actions from being performed by normal users.
8. Validate submitted information on both the frontend and backend.
9. Reduce accidental submission of passwords, PINs, OTPs, and security codes.
10. Demonstrate practical cybersecurity and secure software engineering principles.

---

# User Roles

Ngao currently supports two primary user roles.

## Reporter

A Reporter is a normal registered user.

A Reporter can:

- create an account;
- log in;
- submit suspicious digital activity;
- identify warning signs;
- view their own reports;
- track report statuses;
- refresh report statuses;
- access safety information;
- use the Contact / Help page;
- log out securely.

A Reporter cannot:

- view reports belonging to other users;
- view all reports in the system;
- access the analyst dashboard;
- change report statuses;
- create analyst accounts;
- perform analyst-only API operations.

---

## Safety Analyst

A Safety Analyst is a privileged user responsible for reviewing submitted reports.

Analyst accounts are **not publicly registered**.

Instead, the analyst account is provisioned by the backend using environment configuration.

A Safety Analyst can:

- sign in through the Analyst Portal;
- view all submitted reports;
- filter reports by status;
- inspect report details;
- inspect warning signs;
- safely view suspicious URLs as text;
- update report statuses;
- view report review information;
- log out securely.

A Safety Analyst cannot:

- register through the public registration form;
- submit reports using the Reporter-only API endpoint.

This separation reduces the risk of unauthorised users creating privileged accounts.

---

# Core Features

## Public Pages

Ngao currently includes:

- Home page
- About page
- Contact / Help page
- Reporter Login
- Reporter Registration
- Analyst Login
- Custom 404 page

---

## Reporter Features

Authenticated users can:

- submit scam and phishing reports;
- select scam categories;
- identify the communication platform used;
- provide sender or source information;
- provide suspicious URLs;
- describe the incident;
- select observed warning signs;
- view submitted reports;
- filter reports by status;
- refresh status information;
- view analyst review information.

---

## Analyst Features

Authorised analysts can:

- access a protected analyst dashboard;
- view submitted reports;
- filter reports;
- expand individual report details;
- inspect sender information;
- inspect reported warning signs;
- inspect suspicious URLs safely;
- update report status;
- view review timestamps;
- view reviewer information.

---

## Contact and Help

Ngao includes a Contact / Help form for:

- general questions;
- technical support;
- account-access questions;
- safety guidance;
- other enquiries.

The Contact / Help form is intentionally separate from the scam-reporting workflow.

---

# Application Workflow

## Reporter Workflow

```text
Register
   ↓
Login
   ↓
Reporter Dashboard
   ↓
Submit Suspicious Activity
   ↓
Backend Validation
   ↓
Report Created as "Pending"
   ↓
Reporter Tracks Status
   ↓
Analyst Reviews Report
   ↓
Status Updated
   ↓
Reporter Refreshes Dashboard
```

---

## Analyst Workflow

```text
Analyst Account Provisioned by Server
   ↓
Analyst Login
   ↓
Role Verification
   ↓
Analyst Dashboard
   ↓
View Submitted Reports
   ↓
Inspect Report Details
   ↓
Change Status
   ↓
Reporter Sees Updated Status
```

---

# Report Categories

Ngao currently supports the following report categories:

- Phishing
- Fake Job Offer
- Impersonation
- Payment Scam
- Prize / Giveaway Scam
- Investment Scam
- Other

---

# Supported Platforms

Reports may identify suspicious activity received through:

- WhatsApp
- Email
- SMS
- Facebook
- Instagram
- Website
- Other

---

# Warning Signs

Users can identify common warning signs such as:

- Requested credentials
- Requested payment
- Urgent language
- Suspicious link
- Impersonation

These warning signs help structure the report and encourage users to think critically about suspicious digital activity.

---

# Report Statuses

Ngao currently supports three report statuses.

## Pending

The report has been submitted and is waiting for analyst review.

## Reviewed

A Safety Analyst has completed the review.

## Suspicious

The analyst identified characteristics associated with suspicious digital activity within the Ngao prototype.

> These statuses are educational classifications and should not be considered official cybersecurity or law-enforcement determinations.

---

# Technology Stack

## Frontend

The frontend is built using:

- React
- Vite
- React Router
- React Hook Form
- Zod
- `@hookform/resolvers`
- JavaScript
- CSS
- Exo 2 typography

---

## Backend

The backend is built using:

- Node.js
- Express
- Zod
- bcryptjs
- express-session
- express-rate-limit
- Helmet
- CORS
- cookie-parser
- dotenv

---

# System Architecture

Ngao follows a client-server architecture.

```text
┌───────────────────────────────┐
│        React Frontend         │
│                               │
│ Pages                         │
│ Forms                         │
│ Client Validation             │
│ Routing                       │
│ UI State                      │
└───────────────┬───────────────┘
                │
                │ HTTP / JSON
                │
                ▼
┌───────────────────────────────┐
│       Node / Express API      │
│                               │
│ Authentication                │
│ Authorization                 │
│ Validation                    │
│ Rate Limiting                 │
│ Security Headers              │
│ Session Management            │
│ Report Management             │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       In-Memory Stores        │
│                               │
│ Users                         │
│ Reports                       │
│ Support Requests              │
└───────────────────────────────┘
```

The React application handles the user interface and user experience.

The Express backend is responsible for security-sensitive decisions such as:

- authentication;
- authorization;
- session management;
- role verification;
- user identity;
- validation;
- report ownership.

The frontend is **not treated as the security boundary**.

---

# Project Structure

A simplified representation of the project structure is shown below.

```text
Ngao/
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Navbar.css
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Footer.css
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── FormField.jsx
│   │   │       ├── FormField.css
│   │   │       ├── InfoCard.jsx
│   │   │       ├── PageLoader.jsx
│   │   │       ├── PageLoader.css
│   │   │       ├── StatusBadge.jsx
│   │   │       └── StatusBadge.css
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── AuthProvider.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── UserRegister.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   ├── ReportScam.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── AnalystLogin.jsx
│   │   │   ├── AnalystDashboard.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── schemas/
│   │   │   ├── authSchemas.js
│   │   │   ├── reportSchema.js
│   │   │   └── contactSchema.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── styles/
│   │   │   ├── variables.css
│   │   │   ├── globals.css
│   │   │   └── animations.css
│   │   │
│   │   ├── utils/
│   │   │   └── formatDate.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── server/
│   │
│   ├── src/
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── health.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── report.routes.js
│   │   │   └── support.routes.js
│   │   │
│   │   ├── schemas/
│   │   │   ├── auth.schema.js
│   │   │   ├── report.schema.js
│   │   │   └── support.schema.js
│   │   │
│   │   ├── store/
│   │   │   ├── user.store.js
│   │   │   ├── report.store.js
│   │   │   └── support.store.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

# Authentication and Authorization

Authentication answers:

> Who is the user?

Authorization answers:

> What is this user allowed to do?

Ngao treats these as separate concerns.

---

## Registration

Normal users can create Reporter accounts.

Passwords are validated before being accepted.

Analysts cannot register through the public registration endpoint.

---

## Login

Both Reporter and Analyst accounts authenticate through the backend.

After successful authentication, the backend stores safe user information in the session.

The browser does not receive or store password hashes.

---

## Session Management

Ngao uses server-managed sessions with an HttpOnly cookie.

The session cookie is configured with:

```text
HttpOnly
SameSite=Lax
```

During local development:

```text
Secure=false
```

because the application is running over local HTTP.

For production HTTPS deployment, secure cookies should be enabled.

---

## Role-Based Access Control

The backend checks user roles before allowing privileged actions.

Example:

```text
Reporter
│
├── Submit reports                  ✓
├── View own reports                ✓
├── View all reports                ✗
└── Change report status            ✗


Safety Analyst
│
├── View all reports                ✓
├── Review reports                  ✓
├── Change report status            ✓
└── Submit Reporter-only reports    ✗
```

React protected routes improve navigation and user experience, but backend middleware performs the actual authorization checks.

---

# Security Design

Security was included during system design rather than added only after development.

---

## Password Hashing

Passwords are never stored as plain text.

Ngao uses bcrypt to hash passwords before they are placed in the in-memory user store.

A bcrypt work factor is used to make password hashing intentionally expensive.

---

## Generic Login Errors

Invalid login attempts return a generic message:

```text
Invalid email or password.
```

The system does not reveal whether:

- the email exists;
- the password was incorrect.

This reduces account-enumeration information.

---

## Session Fixation Protection

After successful authentication, Ngao regenerates the session before attaching the authenticated user.

This helps protect against session fixation attacks.

---

## HttpOnly Cookies

Authentication sessions use an HttpOnly cookie.

This prevents ordinary frontend JavaScript from directly reading the session identifier.

---

## Server-Side Authorization

Sensitive endpoints are protected on the server.

For example:

```http
GET /api/reports
```

requires the Analyst role.

A normal user cannot gain access simply by navigating directly to the URL or manually calling the API.

---

## User Report Isolation

Normal users retrieve reports through:

```http
GET /api/reports/mine
```

The backend identifies the user through the authenticated session.

The client does not send an arbitrary user ID to choose whose reports should be returned.

---

## Identity Spoofing Protection

When a report is created, the backend determines the report owner from:

```text
req.session.user
```

rather than trusting identity data supplied by the client.

For example, a malicious client may attempt to submit:

```json
{
  "userId": "ANL-001",
  "submittedBy": {
    "name": "Fake Administrator",
    "email": "admin@example.com"
  }
}
```

Ngao ignores the supplied identity information.

The report is still associated with the actual authenticated user.

---

## Client and Server Validation

Ngao performs validation twice.

### Client Validation

Used for:

- immediate feedback;
- form usability;
- reducing obvious invalid submissions.

### Server Validation

Used as the actual security boundary.

The server validates incoming data regardless of whether the frontend has already validated it.

---

## Sensitive Credential Protection

Users are warned not to submit:

- passwords;
- PINs;
- OTPs;
- security codes.

The backend also detects common credential patterns.

For example:

```text
My OTP is 483921
```

is rejected.

However:

```text
The scammer asked me to provide an OTP,
but I did not share it.
```

is permitted.

This distinction allows users to describe a phishing attempt without storing the actual credential.

---

## Suspicious URL Validation

Ngao only accepts reported URLs that use:

```text
http:
https:
```

Dangerous or inappropriate schemes such as:

```text
javascript:
```

are rejected.

---

## Safe URL Display

Reported suspicious URLs are intentionally displayed as plain text.

For example:

```jsx
<code>
    {report.suspiciousLink}
</code>
```

They are not automatically rendered as clickable links.

This reduces the chance that a user or analyst accidentally opens a potentially malicious page while reviewing a report.

---

## Security Headers

Ngao uses Helmet to apply HTTP security headers.

Headers confirmed during testing included:

```text
Content-Security-Policy
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
Origin-Agent-Cluster
Referrer-Policy
Strict-Transport-Security
X-Content-Type-Options
X-DNS-Prefetch-Control
X-Download-Options
X-Frame-Options
X-Permitted-Cross-Domain-Policies
```

---

## CORS

The backend restricts browser requests to the configured frontend origin.

Example development configuration:

```env
CLIENT_ORIGIN=http://localhost:5173
```

Credentials are enabled because the application uses session cookies.

---

## Authentication Rate Limiting

Authentication endpoints are rate limited.

Repeated login attempts eventually return:

```http
429 Too Many Requests
```

This provides a basic defence against automated repeated login attempts.

---

## General API Rate Limiting

The API also applies a broader request limit to reduce request abuse.

---

## Contact Form Rate Limiting

Support requests have their own stricter rate limit to reduce form spam.

---

## Request Body Limits

JSON request bodies are limited to:

```text
100 KB
```

Requests larger than this return:

```http
413 Payload Too Large
```

rather than being processed normally.

---

## Error Handling

Ngao returns meaningful HTTP status codes.

Examples:

| Status | Meaning |
|---|---|
| `400` | Invalid request |
| `401` | Authentication required |
| `403` | Authenticated but not permitted |
| `404` | Resource or endpoint not found |
| `413` | Request payload too large |
| `429` | Too many requests |
| `500` | Unexpected server error |

Internal error details are not returned directly to the client.

---

# Security Testing

Ngao's security controls were manually tested directly against the backend API.

The tests were performed independently of the React interface to verify that frontend restrictions were not the only protection.

---

## Authentication Test

Request:

```http
GET /api/auth/me
```

with a valid user session.

Result:

```text
Allowed
```

---

## Unauthenticated Report Access

Request:

```http
GET /api/reports
```

without authentication.

Result:

```http
401 Unauthorized
```

**Passed**

---

## Normal User Attempts Analyst Access

A normal Reporter attempted:

```http
GET /api/reports
```

Result:

```http
403 Forbidden
```

**Passed**

---

## Normal User Accesses Own Reports

Request:

```http
GET /api/reports/mine
```

Result:

```text
Allowed
```

Only the authenticated user's reports were returned.

**Passed**

---

## Normal User Attempts Status Change

A Reporter attempted:

```http
PATCH /api/reports/RPT-1001/status
```

Result:

```http
403 Forbidden
```

**Passed**

---

## Unauthenticated Report Submission

An unauthenticated request attempted:

```http
POST /api/reports
```

Result:

```http
401 Unauthorized
```

**Passed**

---

## Authenticated Report Submission

An authenticated Reporter submitted a valid report.

Result:

```text
Report submitted successfully.
```

**Passed**

---

## Identity Spoofing Test

A Reporter attempted to submit:

```json
{
  "userId": "ANL-001",
  "submittedBy": {
    "name": "Fake Administrator",
    "email": "admin@example.com"
  }
}
```

The stored report instead contained the actual authenticated user:

```text
userId:
USR-...

submittedBy:
Mitchelle Anduru
mitchelle@example.com
```

The server ignored the spoofed identity.

**Passed**

---

## Cross-User Isolation Test

Two normal user accounts were created.

User A submitted reports.

User B requested:

```http
GET /api/reports/mine
```

User B received only User B's reports.

User A's reports did not appear.

User B then submitted a report.

User A's `/reports/mine` response did not contain User B's report.

**Passed**

---

## Unsafe URL Test

A report attempted to submit:

```text
javascript:alert('test')
```

as a suspicious URL.

Result:

```http
400 Bad Request
```

Response indicated that an HTTP or HTTPS URL was required.

**Passed**

---

## Sensitive OTP Test

A report description included:

```text
My OTP is 483921.
```

Result:

```http
400 Bad Request
```

The backend requested removal of passwords, PINs, OTPs, or security codes.

**Passed**

---

## Legitimate OTP Discussion Test

A report contained:

```text
The message asked me to provide an OTP,
but I did not share any security code.
```

The request was accepted because an actual OTP value was not included.

**Passed**

---

## Analyst Authentication Test

The provisioned analyst successfully authenticated.

The authenticated session returned:

```text
role = analyst
```

**Passed**

---

## Analyst Report Access

The analyst requested:

```http
GET /api/reports
```

and received seeded and newly submitted reports.

**Passed**

---

## Analyst Attempts Reporter-Only Submission

The analyst attempted:

```http
POST /api/reports
```

Result:

```http
403 Forbidden
```

**Passed**

---

## Invalid Status Test

The analyst attempted:

```json
{
  "status": "Approved"
}
```

Result:

```http
400 Bad Request
```

Only these statuses are accepted:

```text
Pending
Reviewed
Suspicious
```

**Passed**

---

## Valid Status Update

The analyst changed a report from:

```text
Pending
```

to:

```text
Reviewed
```

The Reporter later retrieved the report and saw:

```text
status: Reviewed
reviewedBy: Ngao Safety Analyst
```

**Passed**

---

## Oversized Request Test

A request body larger than the configured 100 KB limit was submitted.

Result:

```http
413 Payload Too Large
```

Response:

```json
{
  "success": false,
  "message": "Request payload is too large."
}
```

**Passed**

---

## Rate Limit Test

Repeated invalid login attempts were sent to the authentication endpoint.

Initial requests returned:

```text
Invalid email or password.
```

After the configured limit was reached, requests returned:

```text
Too many authentication attempts. Please try again later.
```

with:

```http
429 Too Many Requests
```

**Passed**

---

## Security Header Test

The health endpoint was inspected directly.

Security headers provided by Helmet were confirmed to be present.

**Passed**

---

# Security Test Summary

| Security Test | Expected Behaviour | Result |
|---|---|---|
| Unauthenticated report access | `401` | Passed |
| Normal user views all reports | `403` | Passed |
| User views own reports | Allowed | Passed |
| Normal user changes status | `403` | Passed |
| Unauthenticated report submission | `401` | Passed |
| Authenticated report submission | Allowed | Passed |
| Identity spoofing | Ignored | Passed |
| User A accesses User B reports | Prevented | Passed |
| `javascript:` URL | `400` | Passed |
| Actual OTP submitted | `400` | Passed |
| Legitimate mention of OTP | Allowed | Passed |
| Analyst views reports | Allowed | Passed |
| Analyst uses Reporter-only endpoint | `403` | Passed |
| Invalid status | `400` | Passed |
| Valid status update | Allowed | Passed |
| Oversized request | `413` | Passed |
| Repeated authentication attempts | `429` | Passed |
| Helmet security headers | Present | Passed |

---

# API Overview

The backend API is available under:

```text
/api
```

---

## Health

### Health Check

```http
GET /api/health
```

Used to verify that the backend is running.

---

# Authentication API

## Register Reporter

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "SecurePassword1"
}
```

---

## Login

```http
POST /api/auth/login
```

Example:

```json
{
  "email": "user@example.com",
  "password": "SecurePassword1"
}
```

---

## Current Session

```http
GET /api/auth/me
```

Returns the authenticated user's safe session information.

---

## Logout

```http
POST /api/auth/logout
```

Destroys the current session.

---

# Reports API

## Submit Report

Reporter only.

```http
POST /api/reports
```

Example request:

```json
{
  "title": "Suspicious account verification message",
  "category": "Phishing",
  "platform": "SMS",
  "sender": "Unknown number",
  "suspiciousLink": "",
  "description": "I received an unexpected message asking me to verify my account.",
  "warningSigns": [
    "Urgent language",
    "Requested credentials"
  ]
}
```

---

## View Own Reports

Reporter only.

```http
GET /api/reports/mine
```

---

## View All Reports

Analyst only.

```http
GET /api/reports
```

---

## View One Report

Analyst only.

```http
GET /api/reports/:reportId
```

Example:

```http
GET /api/reports/RPT-1001
```

---

## Update Report Status

Analyst only.

```http
PATCH /api/reports/:reportId/status
```

Example:

```json
{
  "status": "Reviewed"
}
```

Allowed values:

```text
Pending
Reviewed
Suspicious
```

---

# Support API

## Submit Support Request

```http
POST /api/support
```

Example:

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "subject": "Technical Support",
  "message": "I am having difficulty understanding the status of my report."
}
```

---

# Forms and Validation

Ngao contains multiple validated forms.

## User Registration Form

Includes validation for:

- name;
- email;
- password;
- password confirmation;
- agreement confirmation.

---

## User Login Form

Includes:

- email;
- password.

---

## Analyst Login Form

Uses the same secure authentication backend but verifies that the authenticated account has the Analyst role.

---

## Scam Reporting Form

Includes fields for:

- title;
- category;
- platform;
- sender or source;
- suspicious URL;
- description;
- warning signs.

---

## Contact / Help Form

Includes:

- name;
- email;
- support subject;
- support message.

---

# Validation Strategy

Ngao uses two layers of validation.

```text
User Input
   ↓
React / Zod Validation
   ↓
HTTP Request
   ↓
Express / Zod Validation
   ↓
Application Logic
```

Frontend validation improves the user experience.

Backend validation protects the system even if frontend validation is bypassed.

---

# Accessibility

Ngao includes several accessibility considerations.

These include:

- semantic HTML;
- labelled form fields;
- keyboard navigation;
- visible keyboard focus;
- accessible validation feedback;
- `aria-invalid`;
- `role="alert"` for errors;
- `role="status"` for dynamic status updates;
- `aria-live` where appropriate;
- accessible expandable analyst report details;
- a skip-to-content link;
- reduced-motion support;
- responsive layouts.

---

## Skip Navigation

Keyboard users can access:

```text
Skip to main content
```

to bypass repeated navigation elements.

---

## Reduced Motion

Ngao respects:

```css
@media (prefers-reduced-motion: reduce)
```

to reduce animations for users who request less motion through their operating-system settings.

---

# Responsive Design

Ngao is designed to adapt to multiple screen sizes.

The application should remain usable on:

- desktop computers;
- laptops;
- tablets;
- mobile devices.

Responsive layouts are implemented using CSS media queries.

Key components tested responsively include:

- navigation;
- hero sections;
- forms;
- dashboards;
- report cards;
- analyst report details;
- Contact / Help page;
- 404 page.

---

# Current Data Storage

Ngao currently uses **in-memory storage**.

There is intentionally no database in the current project phase.

The backend stores:

- registered users;
- submitted reports;
- support requests;

inside JavaScript arrays while the server is running.

---

## Important Behaviour

```text
Server starts
    ↓
Seed reports are created
    ↓
Analyst account is created from environment variables
    ↓
Normal users register
    ↓
Reports are submitted
    ↓
Data exists in memory
```

When the backend restarts:

```text
Server restarts
    ↓
Normal registered users are removed
    ↓
New reports are removed
    ↓
Support requests are removed
    ↓
Seed reports are recreated
    ↓
Analyst account is recreated
```

This behaviour is intentional for the current development stage.

Persistent storage will require a database in a later version.

---

# Getting Started

## Requirements

Before running Ngao, install:

- Node.js
- npm
- Git

A modern web browser is also recommended.

---

# Clone the Repository

```bash
git clone <YOUR-REPOSITORY-URL>
```

Move into the project directory:

```bash
cd Ngao
```

---

# Backend Setup

Move into the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```text
server/.env
```

Add:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
SESSION_SECRET=replace-with-a-long-random-secret
ANALYST_EMAIL=analyst@example.local
ANALYST_PASSWORD=replace-with-a-development-password
ANALYST_NAME=Ngao Safety Analyst
```

> Never commit real `.env` secrets to the repository.

Start the backend:

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:5000
```

You can test it using:

```text
http://localhost:5000/api/health
```

---

# Frontend Setup

Open a second terminal.

From the Ngao root directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Vite should normally start the application at:

```text
http://localhost:5173
```

---

# Running the Project

Two terminals are required during development.

## Terminal 1 — Backend

```bash
cd server
npm run dev
```

## Terminal 2 — Frontend

```bash
cd client
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# Environment Variables

## Server Environment

The backend expects:

```env
PORT=
CLIENT_ORIGIN=
SESSION_SECRET=
ANALYST_EMAIL=
ANALYST_PASSWORD=
ANALYST_NAME=
```

### `PORT`

Defines the backend port.

Example:

```env
PORT=5000
```

### `CLIENT_ORIGIN`

Defines which frontend origin may make browser requests to the backend.

Example:

```env
CLIENT_ORIGIN=http://localhost:5173
```

### `SESSION_SECRET`

Used to sign session identifiers.

This should be a long, randomly generated secret.

### `ANALYST_EMAIL`

Defines the development Analyst email.

### `ANALYST_PASSWORD`

Defines the development Analyst password.

The password is hashed before being stored by the application.

### `ANALYST_NAME`

Defines the display name of the provisioned Analyst.

---

## Client Environment

The frontend expects:

```env
VITE_API_URL=
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Environment Security

Do not commit:

```text
.env
```

files to source control.

The project `.gitignore` files should exclude environment files.

A future repository may include:

```text
.env.example
```

files containing only placeholder values.

---

# Seed Reports

The backend contains fictional seed reports to make the Analyst Dashboard useful during development.

Seed reports represent examples such as:

- phishing;
- fake job offers;
- impersonation;
- mobile-money scams;
- fake investment opportunities;
- suspicious login warnings.

Suspicious example URLs use reserved or fictional domains where appropriate.

Seed reports are recreated whenever the backend starts.

---

# Current Limitations

Ngao is still a prototype and has several intentional limitations.

---

## No Database

The most important limitation is that there is currently no persistent database.

Data disappears after a backend restart.

---

## Development Session Store

The current `express-session` MemoryStore is suitable for development but is not appropriate for a production deployment.

A production system should use an external session store.

---

## No Password Recovery

Forgot-password and account-recovery workflows are not yet implemented.

---

## No Email Verification

Reporter email addresses are not currently verified.

---

## No Analyst Management Interface

Analyst accounts are provisioned through environment configuration.

There is not yet an administrator interface for creating or managing analysts.

---

## No Evidence File Uploads

Users currently submit textual information only.

The application does not yet accept:

- screenshots;
- email files;
- attachments;
- documents.

Secure evidence upload would require additional file validation, malware scanning, storage controls, and access restrictions.

---

## No Automated Threat Intelligence

Ngao does not currently query:

- domain reputation services;
- threat-intelligence feeds;
- malware databases;
- phishing databases.

Report classifications are currently analyst-driven.

---

## No Automated Classification

Ngao does not currently use machine learning or artificial intelligence to automatically determine whether a report is malicious.

---

## No Notifications

Users must currently refresh their dashboard to see updated report statuses.

There are no:

- email notifications;
- push notifications;
- SMS notifications.

---

## No Audit Trail

A detailed immutable audit history of analyst actions has not yet been implemented.

This may be added in a future production-oriented version.

---

# Future Improvements

Potential improvements include:

- PostgreSQL database integration;
- Prisma ORM;
- persistent user accounts;
- persistent reports;
- persistent support messages;
- production session storage;
- password reset;
- email verification;
- account lockout policies;
- multi-factor authentication for analysts;
- analyst account management;
- analyst notes;
- detailed audit trails;
- report search;
- pagination;
- report sorting;
- attachment uploads;
- secure screenshot evidence handling;
- malware-safe file processing;
- notifications;
- report-status email alerts;
- analytics dashboards;
- threat-intelligence integration;
- suspicious-domain reputation checks;
- URL scanning integrations;
- multilingual support;
- enhanced accessibility testing;
- automated testing;
- integration tests;
- end-to-end tests;
- containerisation;
- CI/CD;
- HTTPS deployment;
- production monitoring;
- secure logging;
- CSRF protection where required by the final deployment architecture.

---

# Possible Database Evolution

A future version of Ngao may introduce PostgreSQL.

The potential data model could include:

```text
User
├── id
├── name
├── email
├── passwordHash
├── role
└── createdAt


Report
├── id
├── userId
├── title
├── category
├── platform
├── sender
├── suspiciousLink
├── description
├── status
├── submittedAt
├── reviewedAt
└── reviewedBy


WarningSign
├── id
├── reportId
└── type


SupportRequest
├── id
├── name
├── email
├── subject
├── message
└── submittedAt
```

This database has intentionally not yet been introduced because the current development stage focuses on understanding the application architecture before adding persistent storage.

---

# Development Approach

Ngao was developed incrementally.

The goal was not simply to copy a tutorial or generate an application all at once.

Each development stage focused on understanding a specific concept.

The development process included:

```text
Problem Definition
        ↓
Static Prototype
        ↓
React Migration
        ↓
Routing
        ↓
Reusable Components
        ↓
Form Validation
        ↓
Backend API
        ↓
Authentication
        ↓
Sessions
        ↓
Role-Based Authorization
        ↓
Report Workflow
        ↓
Analyst Workflow
        ↓
Security Controls
        ↓
Security Testing
        ↓
Accessibility
        ↓
Code Refactoring
        ↓
Documentation
```

---

# Software Engineering Concepts Practised

The project provides practical experience with:

- component-based frontend architecture;
- reusable React components;
- application routing;
- state management;
- asynchronous API communication;
- form validation;
- REST-style API design;
- HTTP status codes;
- authentication;
- authorization;
- password hashing;
- session management;
- role-based access control;
- separation of concerns;
- input validation;
- error handling;
- reusable utilities;
- responsive design;
- accessibility;
- environment configuration;
- secure coding practices.

---

# Cybersecurity Concepts Practised

Ngao also provides practical experience with:

- authentication security;
- password hashing;
- session security;
- session fixation prevention;
- authorization;
- least privilege;
- role separation;
- IDOR prevention;
- user data isolation;
- identity spoofing prevention;
- malicious URL handling;
- sensitive-data protection;
- rate limiting;
- CORS;
- HTTP security headers;
- request-body limits;
- secure error handling;
- manual API security testing.

---

# Why Backend Authorization Matters

A frontend application may hide analyst controls from normal users.

However, hiding a button is not a security control.

A malicious user can manually call API endpoints without using the React interface.

For this reason Ngao performs authorization on the backend.

For example:

```text
React:
"This user should not see the analyst button."

Express:
"This user is not an analyst,
therefore the request is rejected."
```

The Express check is the real security boundary.

---

# Why Report Identity Comes From the Session

A client should not be trusted to say:

```text
I am user X.
```

Instead Ngao uses the authenticated session.

When a report is created:

```text
Browser
   ↓
Report information
   ↓
Express
   ↓
Authenticated session
   ↓
Actual user identity attached
```

This prevents a Reporter from assigning a report to another user or pretending to be an analyst.

---

# Why Suspicious URLs Are Not Clickable

A phishing-reporting platform naturally receives potentially dangerous URLs.

Automatically turning those URLs into hyperlinks would create unnecessary risk.

Ngao therefore displays suspicious URLs as plain text.

Example:

```text
https://suspicious-example.example
```

rather than automatically providing a clickable link.

---

# HTTP Status Codes Used

Ngao uses HTTP status codes to communicate API outcomes clearly.

| Code | Usage |
|---|---|
| `200` | Successful request |
| `201` | Resource successfully created |
| `400` | Invalid input |
| `401` | Authentication required |
| `403` | Authenticated but insufficient permission |
| `404` | Resource or endpoint not found |
| `409` | Conflict such as duplicate registration |
| `413` | Request payload too large |
| `429` | Too many requests |
| `500` | Unexpected backend error |

---

# Project Status

Current project status:

| Area | Status |
|---|---|
| Static prototype | Complete |
| React frontend | Complete |
| Responsive UI | Complete |
| React routing | Complete |
| Reporter registration | Complete |
| Reporter login | Complete |
| Analyst login | Complete |
| Sessions | Complete |
| Password hashing | Complete |
| Protected routes | Complete |
| Role-based authorization | Complete |
| Scam reporting | Complete |
| Reporter dashboard | Complete |
| Analyst dashboard | Complete |
| Status updates | Complete |
| Contact / Help form | Complete |
| Frontend validation | Complete |
| Backend validation | Complete |
| Rate limiting | Complete |
| Security headers | Complete |
| Request-size protection | Complete |
| Security testing | Complete |
| Accessibility improvements | Complete |
| Database | Not implemented yet |
| Production deployment | Not implemented yet |

---

# Learning Outcome

Ngao demonstrates how a relatively simple reporting application becomes a broader software-engineering problem once real security requirements are considered.

The project required decisions around:

- who should be allowed to register;
- who should be allowed to review reports;
- where identity should come from;
- what information the client can be trusted with;
- how passwords should be stored;
- how sessions should work;
- how reports belonging to different users should be isolated;
- how suspicious URLs should be handled;
- how sensitive credentials should be prevented from entering the system;
- how API abuse should be reduced;
- how security controls should be tested rather than simply assumed.

The project therefore combines frontend development, backend engineering, system design, and cybersecurity principles.

---

# Disclaimer

Ngao is an educational software prototype.

It does not replace:

- law-enforcement agencies;
- national cybersecurity authorities;
- Computer Security Incident Response Teams;
- banks and financial institutions;
- telecommunications providers;
- official cybercrime reporting channels;
- professional incident-response services.

Users experiencing active account compromise, identity theft, financial loss, or other serious cybercrime should contact the appropriate official authorities and service providers.

Report statuses within Ngao should not be treated as formal cybersecurity findings.

---

# Author

**Mitchelle Anduru**

Software Engineering | Cybersecurity | Digital Inclusion

Ngao was developed as a practical software engineering project exploring secure web application development, digital safety, phishing awareness, authentication, authorization, and role-based system design.

---

# License

This project is currently intended for educational and academic use.

A formal open-source license may be added if the project is released publicly.

---

# Acknowledgement

Ngao was developed as a learning-focused project with emphasis on understanding each component of the system rather than treating the application as a collection of copied code.

The project continues to evolve as additional software engineering, security, database, testing, and deployment concepts are introduced.
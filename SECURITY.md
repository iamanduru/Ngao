# Security Policy — Ngao

## Overview

Ngao is a digital scam and phishing reporting prototype developed with secure software engineering principles in mind.

The application handles authentication, user-submitted scam reports, potentially suspicious URLs, role-based access, and analyst review functionality.

Because these features involve security-sensitive operations, the project treats the backend as the primary security boundary.

> Ngao is currently an educational prototype and is not intended to operate as a production cybercrime reporting platform.

---

# Security Objectives

The security design of Ngao aims to:

- protect user credentials;
- prevent unauthorised access;
- separate Reporter and Safety Analyst privileges;
- prevent users from accessing other users' reports;
- prevent clients from spoofing their identity;
- validate all security-sensitive input on the server;
- reduce accidental submission of passwords, OTPs, PINs, and security codes;
- handle suspicious URLs safely;
- limit repeated authentication attempts;
- restrict oversized requests;
- provide appropriate security headers;
- avoid exposing sensitive internal application information.

---

# Security Architecture

Ngao follows the principle that:

```text
Frontend controls user experience.

Backend controls security.
```

The React application provides:

- navigation;
- protected-page behaviour;
- client-side validation;
- user feedback.

The Express backend performs:

- authentication;
- authorization;
- session management;
- role verification;
- report ownership enforcement;
- server-side validation;
- password hashing;
- rate limiting;
- security-header configuration.

Frontend route protection is therefore not considered sufficient on its own.

---

# Authentication

Ngao uses email and password authentication.

Passwords are not stored in plain text.

They are hashed using:

```text
bcrypt
```

before being stored by the application.

Passwords and password hashes are not returned in normal API responses.

---

# Login Error Handling

Invalid login attempts use a generic error message:

```text
Invalid email or password.
```

The system intentionally does not reveal whether:

- an email address exists;
- the password alone was incorrect.

This reduces account-enumeration information.

---

# Session Management

Ngao uses:

```text
express-session
```

for server-managed authentication sessions.

The browser receives a session cookie rather than storing authentication credentials directly.

The session cookie is configured using:

```text
HttpOnly
SameSite=Lax
```

For local development:

```text
Secure=false
```

because the project currently runs using local HTTP.

A production deployment using HTTPS should enable:

```text
Secure=true
```

---

# Session Fixation Protection

After successful authentication, Ngao regenerates the session before storing authenticated user information.

This helps reduce session fixation risks.

---

# Role-Based Access Control

Ngao currently has two roles:

```text
Reporter
Safety Analyst
```

The backend enforces what each role can do.

## Reporter

A Reporter may:

- submit reports;
- view their own reports;
- access their own dashboard.

A Reporter may not:

- retrieve all reports;
- review reports;
- update report statuses;
- access analyst-only API operations.

---

## Safety Analyst

A Safety Analyst may:

- retrieve all reports;
- review report information;
- update report statuses.

A Safety Analyst may not:

- register using the public Reporter registration process;
- submit reports through Reporter-only endpoints.

---

# Analyst Account Provisioning

Safety Analyst accounts are not publicly created through the frontend.

The development analyst is provisioned using server environment variables.

Example:

```env
ANALYST_EMAIL=
ANALYST_PASSWORD=
ANALYST_NAME=
```

The analyst password is hashed before storage.

Real secrets must never be committed to Git.

---

# Report Ownership

Normal users retrieve their reports using:

```http
GET /api/reports/mine
```

The backend determines the current user's identity from the authenticated session.

It does not trust a client-supplied user ID when deciding report ownership.

This reduces the risk of insecure direct object reference behaviour.

---

# Identity Spoofing Protection

When a Reporter submits a report, identity information is generated from:

```text
req.session.user
```

rather than the browser request body.

For example, a malicious user may attempt to send:

```json
{
  "userId": "ANL-001",
  "submittedBy": {
    "name": "Fake Administrator",
    "email": "admin@example.com"
  }
}
```

Ngao does not trust these fields.

The report remains associated with the authenticated session user.

---

# Input Validation

Ngao performs input validation at two levels.

## Client-Side Validation

The frontend uses:

```text
Zod
React Hook Form
```

to provide immediate validation feedback.

This improves usability but is not considered a security boundary.

---

## Server-Side Validation

The backend validates submitted data independently using Zod.

This remains necessary because a malicious user may bypass the React frontend and communicate with the API directly.

---

# Sensitive Credential Protection

Ngao attempts to prevent users from submitting sensitive credentials such as:

- passwords;
- PINs;
- OTPs;
- security codes.

For example:

```text
My OTP is 483921.
```

is rejected.

A descriptive statement such as:

```text
The attacker asked me to provide an OTP,
but I did not share it.
```

is accepted.

This helps users describe an incident without storing the actual credential.

---

# Suspicious URL Handling

Ngao accepts suspicious URLs only when they use:

```text
http:
https:
```

Unsafe schemes such as:

```text
javascript:
```

are rejected by server-side validation.

---

# Safe URL Display

Reported suspicious URLs are displayed as plain text rather than automatically rendered as clickable hyperlinks.

For example:

```jsx
<code>
    {report.suspiciousLink}
</code>
```

This reduces the risk of a user or analyst accidentally opening a potentially malicious link during review.

---

# Security Headers

Ngao uses:

```text
Helmet
```

to provide HTTP security headers.

Security testing confirmed headers including:

```text
Content-Security-Policy
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
Referrer-Policy
Strict-Transport-Security
X-Content-Type-Options
X-Frame-Options
```

The exact headers may depend on the installed Helmet version and configuration.

---

# Cross-Origin Resource Sharing

CORS is configured so that browser requests are accepted from the configured frontend origin.

Development example:

```env
CLIENT_ORIGIN=http://localhost:5173
```

Session credentials are enabled because Ngao uses cookies for authentication.

---

# Rate Limiting

Ngao applies rate limiting to reduce abuse.

## Authentication

Repeated authentication requests are limited.

When the limit is reached, the API returns:

```http
429 Too Many Requests
```

---

## General API

A broader API rate limit is also applied.

---

## Support Requests

The Contact / Help endpoint has its own stricter rate limit to reduce spam.

---

# Request Size Limiting

JSON request bodies are limited to:

```text
100 KB
```

Oversized requests are rejected with:

```http
413 Payload Too Large
```

This helps reduce unnecessary memory consumption from unusually large request bodies.

---

# Error Handling

Ngao attempts to return meaningful HTTP status codes without exposing unnecessary internal information.

| Status | Meaning |
|---|---|
| `400` | Invalid request data |
| `401` | Authentication required |
| `403` | Authenticated but not authorised |
| `404` | Resource or endpoint not found |
| `413` | Request payload too large |
| `429` | Too many requests |
| `500` | Unexpected server error |

Unexpected internal errors are not returned to users with stack traces or sensitive implementation details.

---

# Security Testing Performed

The following controls were manually tested against the backend API.

## Authentication

Unauthenticated requests to protected endpoints were rejected.

Result:

```http
401 Unauthorized
```

**Passed**

---

## Reporter Access to Analyst Endpoint

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

## Reporter Access to Own Reports

A logged-in Reporter requested:

```http
GET /api/reports/mine
```

Only that user's reports were returned.

**Passed**

---

## Reporter Attempts Status Update

A normal Reporter attempted:

```http
PATCH /api/reports/:reportId/status
```

Result:

```http
403 Forbidden
```

**Passed**

---

## Unauthenticated Report Submission

A request attempted:

```http
POST /api/reports
```

without authentication.

Result:

```http
401 Unauthorized
```

**Passed**

---

## Authenticated Report Submission

A valid Reporter successfully submitted a report.

**Passed**

---

## Identity Spoofing Test

A Reporter attempted to submit another user's identity and the analyst user ID.

The backend ignored the supplied identity information and associated the report with the authenticated session user.

**Passed**

---

## Cross-User Isolation Test

Two Reporter accounts were created.

User A could not see User B's reports.

User B could not see User A's reports.

**Passed**

---

## Unsafe URL Test

The following URL was submitted:

```text
javascript:alert('test')
```

Result:

```http
400 Bad Request
```

**Passed**

---

## Sensitive OTP Test

A report included:

```text
My OTP is 483921.
```

Result:

```http
400 Bad Request
```

**Passed**

---

## Legitimate OTP Description Test

A report stated:

```text
The scammer asked me for an OTP,
but I did not share one.
```

The report was accepted.

**Passed**

---

## Analyst Authentication

The server-provisioned analyst successfully authenticated and received:

```text
role = analyst
```

**Passed**

---

## Analyst Report Access

The analyst successfully requested:

```http
GET /api/reports
```

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

## Invalid Status Manipulation

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

Only the following values are permitted:

```text
Pending
Reviewed
Suspicious
```

**Passed**

---

## Valid Status Update

The analyst successfully changed a report status.

The Reporter later retrieved the same report and observed the updated status.

**Passed**

---

## Oversized Request Test

A request body exceeding 100 KB was submitted.

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

## Authentication Rate-Limit Test

Repeated invalid login requests were submitted.

After the configured threshold was reached, the API returned:

```http
429 Too Many Requests
```

**Passed**

---

## Security Header Test

The backend response headers were inspected manually.

Helmet security headers were present.

**Passed**

---

# Security Test Summary

| Test | Expected | Result |
|---|---|---|
| Unauthenticated protected request | `401` | Passed |
| Reporter accesses analyst API | `403` | Passed |
| Reporter retrieves own reports | Allowed | Passed |
| Reporter modifies report status | `403` | Passed |
| Unauthenticated report submission | `401` | Passed |
| Valid Reporter submission | Allowed | Passed |
| Identity spoofing | Ignored | Passed |
| Cross-user report access | Prevented | Passed |
| `javascript:` URL | `400` | Passed |
| Actual OTP value | `400` | Passed |
| Safe OTP description | Allowed | Passed |
| Analyst report access | Allowed | Passed |
| Analyst uses Reporter endpoint | `403` | Passed |
| Invalid report status | `400` | Passed |
| Valid report status | Allowed | Passed |
| Oversized JSON request | `413` | Passed |
| Authentication abuse | `429` | Passed |
| Security headers | Present | Passed |

---

# Known Security Limitations

Ngao is not yet production-ready.

The following security limitations remain.

## In-Memory Data Storage

Ngao currently stores data in memory.

This means data is not persistent and disappears after a server restart.

---

## Development Session Store

The default `express-session` MemoryStore is currently used.

This is appropriate for development but should not be used for production.

A production deployment should use a dedicated session store.

---

## No Multi-Factor Authentication

Analyst accounts currently authenticate using email and password only.

A production system should consider multi-factor authentication for privileged accounts.

---

## No Password Recovery

Password-reset and account-recovery workflows have not yet been implemented.

---

## No Email Verification

Reporter email ownership is not currently verified.

---

## No File Uploads

Evidence attachments are not supported.

Supporting files would require additional controls such as:

- file-type validation;
- size limits;
- malware scanning;
- isolated storage;
- access control;
- safe download handling.

---

## No Persistent Audit Trail

Ngao currently records basic review information but does not maintain a full immutable history of analyst activity.

A production version may introduce an audit log.

---

## Limited Credential Detection

Credential protection currently relies on pattern matching.

It is intended as a protective measure, not a complete data-loss-prevention system.

---

## No Automated Threat Intelligence

Ngao does not currently integrate with external threat-intelligence or URL-reputation services.

---

## Development HTTP

Local development currently runs using HTTP.

Production deployment should use HTTPS.

---

# Production Security Considerations

Before production deployment, the following should be reviewed:

- HTTPS everywhere;
- secure session cookies;
- persistent database storage;
- production session store;
- secrets-management service;
- database least-privilege credentials;
- CSRF risk assessment and protection where required;
- multi-factor authentication for analysts;
- password-reset security;
- verified email addresses;
- stronger account-abuse controls;
- secure application logging;
- monitoring and alerting;
- vulnerability scanning;
- dependency monitoring;
- automated security testing;
- secure backups;
- database encryption where appropriate;
- privacy and data-retention policies;
- incident-response procedures.

---

# Secrets Management

Secrets must never be committed into Git.

Examples include:

```text
SESSION_SECRET
ANALYST_PASSWORD
database passwords
API keys
private tokens
```

Local secrets should remain inside:

```text
.env
```

files excluded by `.gitignore`.

Repositories should provide placeholder files such as:

```text
.env.example
```

instead of real credentials.

---

# Reporting a Security Issue

Ngao is currently an educational project.

If the repository is made public and a security issue is discovered, avoid publishing exploitable details publicly before the issue can be reviewed.

A future production or public release should provide a dedicated security contact address here.

Example:

```text
security@example.com
```

Do not send:

- passwords;
- authentication cookies;
- private tokens;
- OTPs;
- personal financial information;
- real victim data

when reporting a security issue.

---

# Responsible Testing

Security testing should only be performed:

- against systems you own;
- against environments where you have explicit permission;
- using dummy or fictional data.

The security tests documented in this project were performed against the local Ngao development environment.

---

# Security Philosophy

Ngao follows a simple principle:

```text
Never trust the client.
```

The browser may help users interact with the system, but security-sensitive decisions belong on the server.

For example:

```text
Frontend:
Hide analyst functionality from Reporters.

Backend:
Reject Reporter requests to analyst endpoints.
```

Similarly:

```text
Frontend:
Collect report details.

Backend:
Determine the authenticated user's identity.
```

The goal is not only to build features that work under normal conditions, but also to consider how those features behave when a user attempts to bypass the intended interface.

---

# Current Security Status

```text
Password hashing                 Implemented
Server-side sessions             Implemented
HttpOnly cookies                 Implemented
Session regeneration             Implemented
Role-based authorization         Implemented
User report isolation            Implemented
Identity spoofing prevention     Implemented
Server-side validation           Implemented
Sensitive-data checks            Implemented
Suspicious URL validation        Implemented
Safe suspicious URL display      Implemented
Helmet security headers          Implemented
CORS restrictions                Implemented
Authentication rate limiting     Implemented
General API rate limiting        Implemented
Request-size limiting            Implemented
Manual security testing          Completed

Database security                Future phase
Production session storage       Future phase
MFA                              Future phase
Audit trail                      Future phase
Production HTTPS deployment      Future phase
```

---

# Disclaimer

This document describes security controls implemented in the current Ngao educational prototype.

It does not claim that the application is free from vulnerabilities or suitable for production use without further security review, testing, deployment hardening, and infrastructure controls.
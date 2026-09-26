# SecureDoc React Frontend

Frontend-only React/Vite implementation inspired by the supplied SecureDoc UI reference.

## Included
- Registration + Login
- Dashboard
- Upload Evidence
- Evidence List with localStorage demo persistence
- AI Powered Search UI
- Chain of Custody
- Audit Logs
- Digital Signature demo using browser SHA-256 Web Crypto API
- QR Tracking page + QR generation using `qrcode.react`
- Settings
- Responsive layout

## Run
```bash
npm install
npm run dev
```

Open the Vite URL in the browser. Login accepts any valid email/password in this frontend demo.

## Important
This is a frontend prototype. Authentication, RBAC enforcement, real PKI certificates, server-side signatures, secure file storage, database persistence, and audit-log integrity must be implemented in the backend before production use.

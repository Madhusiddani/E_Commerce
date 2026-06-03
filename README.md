# Amazon E-commerce Full Stack Project

A full-stack e-commerce starter inspired by Amazon.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt

## Features

- Product listing and detail pages
- Search, category filter, and price sorting
- Cart with quantity updates
- User registration and login
- Checkout and order placement
- Order history
- Admin product create, update, and delete
- Seed data for quick testing

## Setup

```bash
npm run install:all
```

Create `backend/.env` from `backend/.env.example`.

```bash
npm run seed
npm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:5000

## Demo Users

Admin:

```text
email: admin@example.com
password: admin123
```

Customer:

```text
email: user@example.com
password: user123
```

# WorkTrackr 🚀

## Full-Stack Task Management System

WorkTrackr is a full-stack task management application built using **Node.js, TypeScript, Next.js, Prisma, and PostgreSQL**.

It provides secure authentication and a smooth, responsive task management experience with real-time UI updates.

---

## 🔥 Features

### 🔐 Authentication
- User Registration & Login
- Password hashing with bcrypt
- JWT-based authentication
- Automatic logout on invalid/expired token

---

### 📋 Task Management
- Create, Read, Update, Delete tasks
- Toggle task completion
- Inline task editing (blur / Enter support)
- Delete tasks instantly

---

### ⚡ UX & Frontend Enhancements
- Optimistic UI updates (instant feedback)
- Keyboard support (Enter to add/edit, Escape to cancel)
- Scrollable task list with custom scrollbar
- Inline error handling (no alerts)
- Stable layout (no UI shifts)
- Clickable task rows + checkbox support

---

### 🛡 Security
- Protected routes via middleware
- User-specific task isolation
- No cross-user data access
- Token validation on every request

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Frontend
- Next.js (App Router)
- React (Hooks)
- TypeScript
- Tailwind CSS

---

## 📂 Project Structure

```
WorkTrackr/
 ├── server/   # Backend API
 └── client/   # Frontend (Next.js)
```

---

## ⚙️ Setup Instructions

### 1. Clone repo
```
git clone <your-repo-url>
cd WorkTrackr
```

---

### 2. Backend Setup
```
cd server
npm install
```

Create `.env`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/taskdb"
JWT_SECRET="your_secret"
```

Run migrations:
```
npx prisma migrate dev --name init
```

Start server:
```
npm run dev
```

---

### 3. Frontend Setup
```
cd client
npm install
npm run dev
```

---

## 🔑 API Endpoints

### Auth
- POST /auth/register
- POST /auth/login

### Tasks
- POST /tasks
- GET /tasks
- GET /tasks/:id
- PATCH /tasks/:id
- DELETE /tasks/:id
- PATCH /tasks/:id/toggle

---

## 🧪 Testing Checklist

- Register/Login flow
- Invalid token → auto logout
- Task CRUD operations
- Keyboard interactions (Enter / Escape)
- Edge cases (empty input, rapid clicks, offline behavior)

---

## 📌 Status

✅ Backend Complete  
✅ Frontend Complete  
✅ Fully Functional  

---

## 💡 Notes

- Tokens are stored in localStorage
- API responses follow a consistent structure (status, message, data)
- Designed with clean UX and predictable behavior in mind

---

## 👩‍💻 Author

Built by Harshita 💪  
Focused on becoming a strong full-stack (MERN) developer

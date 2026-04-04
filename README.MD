# WorkTrackr 🚀

## Full-Stack Task Management System

WorkTrackr is a production-ready full-stack task management application built using **Node.js, TypeScript, Next.js, Prisma, and PostgreSQL**. It enables secure user authentication and complete task management with advanced features.

---

## 🔥 Features

### 🔐 Authentication
- User Registration & Login
- Password hashing with bcrypt
- JWT-based authentication (Access + Refresh Tokens)

### 📋 Task Management
- Create, Read, Update, Delete tasks
- Toggle task completion
- User-specific task isolation

### ⚡ Advanced Features
- Pagination
- Filtering (by completion status)
- Search (by title)

### 🛡 Security
- Protected routes via middleware
- No cross-user data access

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
- POST `/auth/register`
- POST `/auth/login`

### Tasks
- POST `/tasks`
- GET `/tasks`
- GET `/tasks/:id`
- PATCH `/tasks/:id`
- DELETE `/tasks/:id`
- PATCH `/tasks/:id/toggle`

---

## 🧪 Testing

Use Thunder Client / Postman.

Add header:
```
Authorization: Bearer <access_token>
```

---

## 📌 Status

✅ Backend Complete  
🚧 Frontend in Progress  

---

## 💡 Notes

- Each user can access only their own tasks
- Clean and consistent API responses
- Built with scalability and clarity in mind

---

## 👩‍💻 Author

Built by Harshita 💪 (future MERN dev getting hired soon)

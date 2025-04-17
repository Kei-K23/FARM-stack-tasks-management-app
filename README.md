# 📝 Tasks Management App (FARM Stack)

A full-stack Tasks Management web application built with **FastAPI**, **React**, and **MongoDB** — the FARM Stack 🚜. This app allows users to register, log in, create, update, and delete task lists (individual tasks), with a sleek UI and secure backend.

---

## 🧱 Tech Stack

- **Frontend**: React (Vite), TailwindCSS
- **Backend**: FastAPI
- **Database**: MongoDB (with Motor async driver)
- **Auth**: JWT-based authentication
- **Validation**: Pydantic v2
- **Environment Management**: `pydantic-settings`, `.env` support

---

## 🚀 Features

### ✅ User

- Register / Login / Logout
- JWT Access Token Authentication
- Secure password hashing (using `passlib`)

### 📋 Task lists that organize for each individual tasks

- CRUD operations: Create, Read, Update, Delete
- Assign deadlines and statuses
- Search & filter functionality

### 🌐 API

- FastAPI-powered RESTful API
- Async MongoDB connection (Motor)
- Clean schema validation with Pydantic v2
- CORS enabled for frontend/backend communication

---

## 📁 Project Structure

```

FARM-stack-tasks-management-app/
│
├── backend/ # FastAPI backend
│ ├── main.py # Entry point
│ ├── db/ # MongoDB config
│ ├── models/ # MongoDB models
│ ├── schemas/ # Pydantic schemas
│ ├── services/ # Business logic
│ ├── routes/ # API routes
│ └── core/ # Config, security, etc.
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page-level views
│ │ ├── services/ # API calls
│ │ └── App.tsx
│
├── .env # Environment variables
├── requirements.txt # Python packages
└── README.md

```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/FARM-stack-tasks-management-app.git
cd FARM-stack-tasks-management-app
```

---

### 2. Backend Setup (FastAPI + MongoDB)

#### 🔹 Create a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

#### 🔹 Install dependencies

```bash
pip install -r requirements.txt
```

#### 🔹 Environment Variables (`.env`)

```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB=taskdb
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

#### 🔹 Run the server

```bash
fastapi dev backend/main.py
```

---

### 3. Frontend Setup (React)

```bash
cd frontend
pnpm install    # or npm / yarn
pnpm dev        # or npm run dev
```

---

## 🧪 API Documentation

FastAPI provides interactive docs:

- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛡 Security

- Passwords are hashed with **bcrypt**
- JWT access tokens with expiry
- Secure input validation via **Pydantic v2**
- CORS enabled for frontend/backend communication

---

## 🧰 Tools

- **MongoDB Compass** – GUI for managing your MongoDB collections
- **Thunder Client / Postman** – API testing
- **Docker** – For containerized setup

---

## 📦 Future Improvements

- Add task categories/labels
- Drag and Drop for task-list UI
- Role-based user permissions (admin, user)
- User invitations for task list
- Email reminder for overdue tasks
- Docker support for full-stack deployment

---

## 🤝 Contribution

PRs and issues are welcome! If you'd like to add a feature or fix a bug, feel free to fork and submit a pull request.

---

## 📄 License

[MIT License](LICENSE)

---

## 👨‍💻 Author

**Kei-K23** – Software Developer

> Built with ❤️ using FARM stack 🚜

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

## 📁 Project Screenshots

![img1](/docs/img1.png)
![img2](/docs/img2.png)
![img3](/docs/img3.png)
![img4](/docs/img4.png)

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

## 📁 System Design Overview

![class_diagram](/docs/class_diagram.png)

[Class Diagram Draw.io](/docs/Task_Management_Service.drawio)

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
mongo_uri=mongodb://mongo:mongo@localhost:27017/tasks_management_db?authSource=admin
mongo_db=tasks_management_db
secret_key=881d54fb021110ba68d1eaaab1dd2df4901b58ee329b065844bfc1c6d014f3b0
algorithm=HS256
access_token_expire_minutes=3600
VITE_BACKEND_APP_API_URL=http://localhost:8000
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

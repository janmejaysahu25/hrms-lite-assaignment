
# HRMS Lite – Full Stack Coding Assignment

## 📌 Project Overview

**HRMS Lite** is a lightweight Human Resource Management System built as part of a full-stack coding assignment.  
The application simulates a basic internal HR tool that allows an admin to manage employee records and track daily attendance.

The goal of this project is to demonstrate:
- End-to-end full-stack development
- Clean and professional frontend UI
- RESTful backend APIs with validations
- Database persistence
- Production-ready deployment

The scope is intentionally kept minimal to focus on stability, usability, and clean implementation rather than over-engineering.

---

## 🚀 Live Application Links

- **Frontend (Live URL):** 
- **Backend API (Live URL):** 
- **GitHub Repository:** 

> ⚠️ Both frontend and backend are publicly accessible and connected to each other.

---

## 🛠 Tech Stack Used

### Frontend
- React (Vite)
- JavaScript
- CSS (Responsive – Grid & Flexbox)
- Axios (API communication)

### Backend
- Python
- FastAPI
- Uvicorn

### Database
- MongoDB 

### Deployment
- Frontend: Vercel 
- Backend: Render 

---

## ✨ Features

### 1️⃣ Employee Management
- Add a new employee with the following details:
  - Employee ID (unique)
  - Full Name
  - Email Address
  - Department
- View a list of all employees
- Delete an employee
- Display total number of employees

### 2️⃣ Attendance Management
- Mark daily attendance for an employee:
  - Date
  - Status (Present / Absent)
- View attendance records per employee
- Display total present days for a selected employee

---

## 🎯 Bonus Features Implemented
- Dashboard summary cards
- Total present days per employee
- Responsive UI for desktop, tablet, and mobile devices

---

## 🎨 UI & UX Highlights
- Clean, card-based layout
- Proper spacing and consistent typography
- Intuitive sidebar navigation
- Reusable UI components
- Meaningful UI states:
  - Loading indicators
  - Empty state messages
  - Error and success messages
- Mobile-friendly and responsive design

---

## ⚙️ Backend & API Details
- RESTful APIs built using FastAPI
- Data persisted in a database
- Server-side validations implemented:
  - Required fields validation
  - Valid email format check
  - Duplicate employee handling
- Proper HTTP status codes
- Meaningful error messages returned to the frontend

---

## ▶️ Steps to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd hrms-lite

2️⃣ Backend Setup (FastAPI)
...........................

cd backend
python -m venv venv
source venv/bin/activate        
pip install -r requirements.txt
uvicorn main:app --reload


3️⃣ Frontend Setup
......................
cd frontend
npm install
npm run dev



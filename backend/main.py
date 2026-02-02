from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.employees import router as employee_router
from routes.attendance import router as attendance_router

app = FastAPI(title="HRMS Lite API")

# ✅ CORS CONFIG (FIXES FRONTEND ERROR)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    employee_router,
    prefix="/api/employees",
    tags=["Employees"]
)

app.include_router(
    attendance_router,
    prefix="/api/attendance",
    tags=["Attendance"]
)

@app.get("/")
def health_check():
    return {"message": "HRMS Lite Backend running 🚀"}

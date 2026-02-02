from pydantic import BaseModel, EmailStr
from datetime import date

# -------- Employee --------
class EmployeeCreate(BaseModel):
    employeeId: str
    fullName: str
    email: EmailStr
    department: str


# -------- Attendance --------
class AttendanceCreate(BaseModel):
    employeeId: str
    date: date
    status: str  # PRESENT / ABSENT

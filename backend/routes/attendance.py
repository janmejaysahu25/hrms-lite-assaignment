from fastapi import APIRouter
from schemas import AttendanceCreate
from controllers.attendance_controller import (
    mark_attendance,
    get_attendance_by_employee
)

router = APIRouter()

@router.post("/")
def add_attendance(attendance: AttendanceCreate):
    return mark_attendance(attendance)

@router.get("/{employeeId}")
def get_attendance(employeeId: str):
    return get_attendance_by_employee(employeeId)

from controllers.attendance_controller import get_total_present_days

@router.get("/present-count/{employeeId}")
def total_present_days(employeeId: str):
    return get_total_present_days(employeeId)


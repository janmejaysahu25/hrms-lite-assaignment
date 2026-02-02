from database import attendance_collection, employee_collection
from fastapi import HTTPException, status
from datetime import datetime, date


def mark_attendance(attendance):
    # 1️⃣ Check employee exists
    employee = employee_collection.find_one(
        {"employeeId": attendance.employeeId}
    )
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    # 2️⃣ Prevent future dates
    today = date.today()
    attendance_date = attendance.date

    if attendance_date > today:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Future dates are not allowed for attendance"
        )

    # 3️⃣ Prevent duplicate attendance for same date
    existing = attendance_collection.find_one({
        "employeeId": attendance.employeeId,
        "date": attendance_date.isoformat()
    })

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Attendance already marked for this date"
        )

    # 4️⃣ Insert attendance
    attendance_collection.insert_one({
        "employeeId": attendance.employeeId,
        "date": attendance_date.isoformat(),
        "status": attendance.status
    })

    return {"message": "Attendance marked successfully"}


def get_attendance_by_employee(employeeId: str):
    records = []
    for record in attendance_collection.find({"employeeId": employeeId}):
        record["_id"] = str(record["_id"])
        records.append(record)
    return records


def get_total_present_days(employeeId: str):
    # Check employee exists
    employee = employee_collection.find_one(
        {"employeeId": employeeId}
    )
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    count = attendance_collection.count_documents({
        "employeeId": employeeId,
        "status": "PRESENT"
    })

    return {
        "employeeId": employeeId,
        "totalPresentDays": count
    }

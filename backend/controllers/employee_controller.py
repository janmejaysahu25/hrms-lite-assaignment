from database import employee_collection
from fastapi import HTTPException, status
from bson import ObjectId

def create_employee(employee):
    existing = employee_collection.find_one({
        "$or": [
            {"employeeId": employee.employeeId},
            {"email": employee.email}
        ]
    })

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee with same ID or email already exists"
        )

    employee_collection.insert_one(employee.dict())
    return {"message": "Employee added successfully"}


def get_all_employees():
    employees = []
    for emp in employee_collection.find():
        emp["_id"] = str(emp["_id"])
        employees.append(emp)
    return employees


def delete_employee(employee_id: str):
    result = employee_collection.delete_one({"_id": ObjectId(employee_id)})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    return {"message": "Employee deleted successfully"}

from fastapi import APIRouter
from schemas import EmployeeCreate
from controllers.employee_controller import (
    create_employee,
    get_all_employees,
    delete_employee
)

router = APIRouter()

@router.post("/")
def add_employee(employee: EmployeeCreate):
    return create_employee(employee)

@router.get("/")
def list_employees():
    return get_all_employees()

@router.delete("/{employee_id}")
def remove_employee(employee_id: str):
    return delete_employee(employee_id)

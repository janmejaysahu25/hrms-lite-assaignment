import api from "../api/api";

function EmployeeList({ employees, refresh }) {
  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/employees/${id}`);
      alert("Employee deleted successfully");
      refresh();
    } catch {
      alert("Failed to delete employee");
    }
  };

  if (employees.length === 0) {
    return (
      <p style={{ color: "#6b7280", textAlign: "center" }}>
        No employees found.
      </p>
    );
  }

  return (
    <div>

      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.employeeId}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="danger"
                  onClick={() => deleteEmployee(emp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;

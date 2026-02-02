import { useEffect, useState } from "react";
import api from "../api/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      {/* Page Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ marginBottom: "6px" }}>Employee Management</h1>
        <p style={{ color: "#6b7280" }}>
          Add, view, and manage employees in your organization.
        </p>
      </div>

      {/* Stats Section */}
      <div className="stats" style={{ marginBottom: "24px" }}>
        <div className="stat-box">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>
      </div>

      {/* Add Employee */}
      <div className="card">
        <h3 style={{ marginBottom: "12px" }}>Add Employee</h3>
        <EmployeeForm onSuccess={fetchEmployees} />
      </div>

      {/* Employee List */}
      <div className="card">
        <h3 style={{ marginBottom: "12px" }}>Employee List</h3>

        {loading && <p>Loading employees...</p>}

        {error && <p style={{ color: "#dc2626" }}>{error}</p>}

        {!loading && !error && employees.length === 0 && (
          <p style={{ color: "#6b7280" }}>
            No employees added yet.
          </p>
        )}

        {!loading && employees.length > 0 && (
          <EmployeeList
            employees={employees}
            refresh={fetchEmployees}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;

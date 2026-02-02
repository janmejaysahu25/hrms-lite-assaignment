import { useState } from "react";
import api from "../api/api";

function EmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/employees", form);

      setSuccess("Employee added successfully.");

      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
      });

      onSuccess?.();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
          alignItems: "end",
          opacity: loading ? 0.7 : 1,
        }}
      >
        <div>
          <label>Employee ID</label>
          <input
            name="employeeId"
            placeholder="e.g. 1"
            value={form.employeeId}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label>Full Name</label>
          <input
            name="fullName"
            placeholder="e.g. John Doe"
            value={form.fullName}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="e.g. john@company.com"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label>Department</label>
          <input
            name="department"
            placeholder="e.g. Engineering"
            value={form.department}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          className="primary"
          disabled={loading}
          style={{ height: "42px" }}
        >
          {loading ? "Adding employee..." : "Add Employee"}
        </button>
      </form>

      {/* Error State */}
      {error && (
        <p
          style={{
            color: "#dc2626",
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          {error}
        </p>
      )}

      {/* Success State */}
      {success && (
        <p
          style={{
            color: "#16a34a",
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          {success}
        </p>
      )}
    </div>
  );
}

export default EmployeeForm;

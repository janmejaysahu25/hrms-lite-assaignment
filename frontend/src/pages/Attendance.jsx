import { useEffect, useState } from "react";
import api from "../api/api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("PRESENT");
  const [records, setRecords] = useState([]);
  const [presentCount, setPresentCount] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load employees
  useEffect(() => {
    api
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => setError("Failed to load employees"));
  }, []);

  const fetchAttendance = async (empId) => {
    if (!empId) return;

    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/attendance/${empId}`);
      setRecords(res.data);

      const countRes = await api.get(
        `/attendance/present-count/${empId}`
      );
      setPresentCount(countRes.data.totalPresentDays);
    } catch {
      setError("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async () => {
    setError("");
    setSuccess("");

    if (!employeeId || !date) {
      setError("Please select employee and date");
      return;
    }

    try {
      await api.post("/attendance", {
        employeeId,
        date,
        status,
      });

      setSuccess("Attendance marked successfully ✅");
      fetchAttendance(employeeId);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to mark attendance"
      );
    }
  };

  return (
    <>
      {/* Page Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ marginBottom: "6px" }}>
          Attendance Management
        </h1>
        <p style={{ color: "#6b7280" }}>
          Mark and track employee attendance.
        </p>
      </div>

      {/* Summary */}
      {presentCount !== null && (
        <div className="stats" style={{ marginBottom: "24px" }}>
          <div className="stat-box">
            <h3>Total Present Days</h3>
            <p>{presentCount}</p>
          </div>
        </div>
      )}

      {/* Mark Attendance */}
      <div className="card">
        <h3 style={{ marginBottom: "12px" }}>Mark Attendance</h3>

        <div className="form-grid">
          <select
            value={employeeId}
            onChange={(e) => {
              setEmployeeId(e.target.value);
              fetchAttendance(e.target.value);
            }}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option
                key={emp._id}
                value={emp.employeeId}
              >
                {emp.fullName}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>

          <button
            className="primary"
            onClick={markAttendance}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>

        {error && (
          <p
            style={{
              color: "#dc2626",
              marginTop: "10px",
            }}
          >
            ❌ {error}
          </p>
        )}

        {success && (
          <p
            style={{
              color: "#16a34a",
              marginTop: "10px",
            }}
          >
            {success}
          </p>
        )}
      </div>

      {/* Attendance Records */}
      <div className="card">
        <h3 style={{ marginBottom: "12px" }}>
          Attendance Records
        </h3>

        {loading && <p>Loading attendance...</p>}

        {!loading && records.length === 0 && (
          <p style={{ color: "#6b7280" }}>
            No attendance records found.
          </p>
        )}

        {!loading && records.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td>
                    <span
                      style={{
                        color:
                          r.status === "PRESENT"
                            ? "#16a34a"
                            : "#dc2626",
                        fontWeight: 600,
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Attendance;

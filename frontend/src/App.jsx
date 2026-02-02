import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">HRMS Lite</h2>
        <button
          className={activeTab === "employees" ? "nav active" : "nav"}
          onClick={() => setActiveTab("employees")}
        >
          Employees
        </button>
        <button
          className={activeTab === "attendance" ? "nav active" : "nav"}
          onClick={() => setActiveTab("attendance")}
        >
          Attendance
        </button>
      </aside>

      {/* Main */}
      <div className="main">
        <header className="topbar">Admin</header>

        <div className="content">
          {activeTab === "employees" && <Dashboard />}
          {activeTab === "attendance" && <Attendance />}
        </div>
      </div>
    </div>
  );
}

export default App;

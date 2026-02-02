function Layout({ children }) {
  return (
    <div className="app">
      <header className="topbar">
        <h1>HRMS Lite</h1>
        <span>Admin</span>
      </header>

      <div className="body">
        <aside className="sidebar">
          <button>Dashboard</button>
          <button>Employees</button>
          <button>Attendance</button>
        </aside>

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

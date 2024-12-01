import { Outlet } from "react-router-dom";

const DashboardLayout = ({ title }) => {
  return (
    <div>
      <header>
        <h1>{title || "Dashboard"}</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

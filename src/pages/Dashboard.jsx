import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const [e,p,t] = await Promise.all([
        API.get("/employees"),
        API.get("/projects"),
        API.get("/tasks")
      ]);

      setStats({
        emp: e.data.length,
        proj: p.data.length,
        task: t.data.length
      });
    };
    fetch();
  }, []);

  return (
    <div className="layout">
      <Sidebar/>
      <div className="main">
        <Navbar/>
        <h2>Dashboard</h2>
        <div className="cards">
          <div className="card">Employees: {stats.emp}</div>
          <div className="card">Projects: {stats.proj}</div>
          <div className="card">Tasks: {stats.task}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
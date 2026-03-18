import React, { useEffect, useState } from "react";
import API from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: ""
  });

  // ✅ FIXED useEffect
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/employees");
        setEmployees(res.data); // safe inside async
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  // Add employee
  const addEmployee = async () => {
    try {
      await API.post("/employees", form);
      setForm({ name: "", email: "", role: "" });

      // refresh list
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Employees</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Role"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />

      <button onClick={addEmployee}>Add</button>

      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} - {emp.email} - {emp.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;
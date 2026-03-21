import React, { useEffect, useState } from "react";
import API from "../services/api";

import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  // ✅ FIXED useEffect (NO WARNING)
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await API.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getEmployees();
  }, []);

  // ✅ Add Employee
  const handleAdd = async () => {
    if (!form.name || !form.email || !form.role) return;

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

  // ✅ Delete Employee
  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);

      // refresh list
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh" }}>
      
      {/* 🔷 Title */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Employee Management
      </Typography>

      {/* 🔷 Add Employee */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Add New Employee
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Role"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<PersonAddIcon />}
                sx={{
                  height: "56px",
                  background:
                    "linear-gradient(45deg, #1976d2, #42a5f5)",
                }}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 🔷 Employee Table */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Employee List
          </Typography>

          <Paper sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#1976d2" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Role
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employees.map((emp) => (
                  <TableRow
                    key={emp._id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#f1f1f1" },
                    }}
                  >
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.role}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(emp._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Employees;
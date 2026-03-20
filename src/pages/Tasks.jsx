
import React, { useEffect, useState } from "react";
import axios from "axios";

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
  Select,
  MenuItem,
  CircularProgress,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../components/Sidebar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const token = localStorage.getItem("token");

  // ✅ Fetch Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/tasks",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  // ✅ Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add Task
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // instant UI update
      setTasks((prev) => [...prev, res.data]);

      setFormData({
        title: "",
        description: "",
        status: "Pending",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Task
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Update Status
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🎨 Status Color UI
  const getStatusColor = (status) => {
    if (status === "Completed") return "success";
    if (status === "In Progress") return "warning";
    return "default";
  };

  return (
    <Box sx={{ p: 3 }} ml="200px">
      <Sidebar/>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Task Management
      </Typography>

      {/* ✅ Add Task Form */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Select
                  fullWidth
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">
                    In Progress
                  </MenuItem>
                  <MenuItem value="Completed">
                    Completed
                  </MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ height: "56px" }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* ✅ Task Table */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          {loading ? (
            <Box textAlign="center" py={3}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Description</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>

                    <TableCell>
                      <Select
                        value={task.status}
                        size="small"
                        onChange={(e) =>
                          handleStatusChange(
                            task._id,
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">
                          In Progress
                        </MenuItem>
                        <MenuItem value="Completed">
                          Completed
                        </MenuItem>
                      </Select>

                      <Chip
                        label={task.status}
                        color={getStatusColor(task.status)}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDelete(task._id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {tasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No Tasks Available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
    
  );
};

export default Tasks;

import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Add Project
  const addProject = async () => {
    if (!form.title) return alert("Enter project title");

    try {
      const res = await API.post("/projects", form);
      setProjects((prev) => [...prev, res.data]);
      setForm({ title: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Project
  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Project Management
      </Typography>

      {/* Add Project */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography mb={2}>Add New Project</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Project Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={addProject}
                sx={{ height: "56px" }}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Project List */}
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography mb={2}>Project List</Typography>

          {loading ? (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "#fff" }}>Title</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {projects.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>
                      {p.description || "-"}
                    </TableCell>
                    <TableCell>{p.status}</TableCell>

                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => deleteProject(p._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {projects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      No Projects Found
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
}
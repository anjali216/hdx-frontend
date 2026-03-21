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
  IconButton,
  CircularProgress,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "", // ✅ FIXED (was name)
  });

  // ✅ Fetch Projects
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

  // ✅ Add Project
  const addProject = async () => {
    if (!form.title) {
      alert("Enter project name");
      return;
    }

    try {
      const res = await API.post("/projects", form);

      setProjects((prev) => [...prev, res.data]);

      setForm({ title: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Project
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
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Projects
      </Typography>

      {/* Add Project */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                label="Project Name"
                value={form.title}
                onChange={(e) =>
                  setForm({ title: e.target.value })
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
                Add Project
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Project List */}
      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {p.title} {/* ✅ FIXED */}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {p.description || "No description"}
                  </Typography>

                  <Chip
                    label={p.status}
                    color={p.status === "active" ? "success" : "default"}
                    size="small"
                    sx={{ mb: 1 }}
                  />

                  <Box display="flex" justifyContent="flex-end">
                    <IconButton
                      color="error"
                      onClick={() => deleteProject(p._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {projects.length === 0 && (
            <Typography sx={{ ml: 2 }}>
              No Projects Found
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
}
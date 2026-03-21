


import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import axios from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalProjects: 0,
    totalTasks: 0,
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/dashboard"); // your backend API
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ✅ Dynamic Card Data
  const data = [
    { title: "Employees", value: stats.totalEmployees },
    { title: "Projects", value: stats.totalProjects },
    { title: "Tasks", value: stats.totalTasks },
  ];

  return (
    <>
      <Sidebar />

      <Box sx={{ p: 3 }} ml="200px">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h4" fontWeight="bold">
            Dashboard
          </Typography>

          <Button variant="contained" color="error">
            Logout
          </Button>
        </Box>

        {/* ✅ Loading */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Cards */}
            <Grid container spacing={3}>
              {data.map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 4,
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {item.title}
                      </Typography>

                      <Typography variant="h4" fontWeight="bold">
                        {item.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default Dashboard;

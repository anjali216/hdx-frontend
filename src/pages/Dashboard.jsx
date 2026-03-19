import React from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import axios from "../services/api";

const Dashboard = () => {
  axios.get("/projects/")
  const data = [
    { title: "Employees", value: 9 },
    { title: "Projects", value: 7 },
    { title: "Tasks", value: 10 },
  ];

  return (
    <>
      <Sidebar/>
    <Box sx={{ p: 3 }} ml="200px">
      {/* Header */}
      <Box display="flex" justifyContent="space-between"   mb={2}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <Button variant="contained" color="error">
          Logout
        </Button>
      </Box>

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
    </Box>
    </>
  );
  
};

export default Dashboard;
import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        "& .MuiDrawer-paper": {
          width: 220,
          background: "#111827",
          color: "#fff",
        },
      }}
    >
      <List>
        <ListItem button onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Dashboard"/>
        </ListItem>

        <ListItem button onClick={() => navigate("/employees")}>
          <ListItemText primary="Employees" />
        </ListItem>

        <ListItem button onClick={() => navigate("/projects")}>
          <ListItemText primary="Projects" />
        </ListItem>

        <ListItem button onClick={() => navigate("/tasks")}>
          <ListItemText primary="Tasks" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
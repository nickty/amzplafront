import React, { useEffect, useState } from "react";
import { usePermissions } from "react-admin";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { permissions } = usePermissions();

  useEffect(() => {
    if (permissions) {
      setIsAdmin(permissions === "admin");
    }
  }, [permissions]);

  return (
    <Box sx={{ mt: 5, mx: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={isAdmin ? 6 : 12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Products
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Total number of products: 100{" "}
                {/* Dynamically replace with actual count */}
              </Typography>
              <MuiLink component={Link} to="/products" underline="hover">
                View Products
              </MuiLink>
            </CardContent>
          </Card>
        </Grid>
        {isAdmin && (
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Users
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Total number of users: 50{" "}
                  {/* Dynamically replace with actual count */}
                </Typography>
                <MuiLink component={Link} to="/users" underline="hover">
                  View Users
                </MuiLink>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;

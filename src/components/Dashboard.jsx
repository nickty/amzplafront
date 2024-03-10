import { useEffect, useMemo, useState } from "react";
import { usePermissions } from "react-admin";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Link as MuiLink,
  CircularProgress, // Import CircularProgress for loading icon
} from "@mui/material";
import { Link } from "react-router-dom";
import useClient from "../utils/useClientUtilsFunc";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { permissions } = usePermissions();

  useEffect(() => {
    if (permissions) {
      setIsAdmin(permissions === "admin");
    }
  }, [permissions]);

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        // Any headers you want to be stable across renders
      },
    }),
    []
  );

  const {
    data: productCount,
    loading: productLoading,
    // error: productError,
  } = useClient(
    `${process.env.REACT_APP_API_BASE_URL}/products/countTotalProduct`,
    options
  );
  const {
    data: userCount,
    loading: userLoading,
    // error: userError,
  } = useClient(
    `${process.env.REACT_APP_API_BASE_URL}/users/countTotalUser`,
    options
  );

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
                {productLoading ? (
                  <CircularProgress size={12} /> // Show loading icon while product count is loading
                ) : (
                  `Total Products: ${productCount?.count}`
                )}
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
                  {userLoading ? (
                    <CircularProgress size={12} /> // Show loading icon while user count is loading
                  ) : (
                    `Total Users: ${userCount?.count}`
                  )}
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

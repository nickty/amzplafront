import { Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="h2">
        Welcome to the Dashboard
      </Typography>
      <Typography color="textSecondary">
        This is a sample dashboard with some sample items.
      </Typography>
    </CardContent>
  </Card>
);

export default Dashboard;

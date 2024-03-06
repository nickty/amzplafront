import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%", // Ensure the card fills the height of its container
    textAlign: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.5rem", // Adjust font size as needed
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    fontSize: "1.5rem", // Adjust font size as needed
  },
}));

const ComingSoon = ({ service }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {service} Coming Soon
        </Typography>
        <Typography color="textSecondary" className={classes.subtitle}>
          We are working hard to bring this service to you. Stay tuned!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ComingSoon;

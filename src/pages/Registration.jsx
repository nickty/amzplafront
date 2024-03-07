import React, { useState } from "react";
import { useNotify } from "react-admin";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom"; // Make sure Link is imported

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  card: {
    minWidth: 400,
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: theme.palette.primary.main,
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  loginLink: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
}));

const Registration = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = useNotify();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = new Request("http://localhost:4000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        const error = await response.json();
        throw new Error(error.message);
      }
      notify("User registered successfully", "info");
      navigate("/login");
    } catch (error) {
      notify(error.message, "warning");
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submitButton}
            >
              Register
            </Button>
            <Typography className={classes.loginLink}>
              Already have an account? <Link to="/login">Login here</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;

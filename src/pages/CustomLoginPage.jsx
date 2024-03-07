import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import { useLogin, useNotify } from "react-admin";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  card: {
    width: 400,
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const CustomLoginPage = () => {
  const classes = useStyles();
  const login = useLogin();
  const notify = useNotify();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username: email, password }).catch(() =>
      notify("Invalid email or password")
    );
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </form>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link to="/register" className={classes.link}>
              Register here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomLoginPage;

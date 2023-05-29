import React from "react";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { AccountBoxOutlined, PasswordOutlined } from "@mui/icons-material";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
    msg: "One or more fields empty!",
  });
  const { vertical, horizontal, openSnack, msg } = state;

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, msg: "One or more fields empty!", openSnack: false });
  };
  const [user, setUser] = React.useState({
    user: "",
    pass: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (user.user === "" || user.pass === "") {
      setState({ ...state, msg: "One or more fields empty!", openSnack: true });
    } else {
      try {
        const req = await axios.post("http://localhost:8800/users", user);
        console.log(req.data);
        if (req.data === "Login Success!") {
          navigate("/dashboard");
        } else {
          setState({
            ...state,
            msg: "Credentials Incorrect!",
            openSnack: true,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Box bgcolor={"background.default"} height={"89.8vh"}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <Box p={2} bgcolor={"background.default"}></Box>
      <Paper
        variant="outlined"
        bgcolor={"background.default"}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          inset: "0",
          margin: "auto",
          width: "clamp(320px, 70vw,450px)",
          height: "380px",
          top: "10vh",
          borderRadius: "4px",
          bgcolor: "background.paper",
          boxShadow: 3,
          overflowY: "overlay",
          pb: 3,
        }}
      >
        <FormControl
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            color={"text.primary"}
            textAlign={"center"}
          >
            Login
          </Typography>
          <Box p={1.2} />
          <TextField
            name="user"
            label="User Id"
            fullWidth
            id="user"
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountBoxOutlined />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="pass"
            label="Password"
            fullWidth
            id="pass"
            onChange={handleChange}
            variant="outlined"
            type="password"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ marginRight: "-0.5rem" }}
                    aria-label=""
                    onClick={() => {}}
                  >
                    <PasswordOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" onClick={handleClick}>
            Login
          </Button>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Login;

import React, { useState, useEffect } from "react";

//redux imports
import { useDispatch } from "react-redux";
import { auth } from "../../store/actions/";
import { connect } from "react-redux";

// Themes import
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../pages/theme";

// Icons imports
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Design Components imports
import { Button } from "@mui/material";

// Components import
import useKey, { test } from "../services/KeyEvent";
import { toast } from "react-toastify";

const LoginForm = ({ message }) => {
  // THEME
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // VARIABLES FOR POST
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // REDUX
  const dispatch = useDispatch(auth(email, password));

  // HELPERS
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const submitHandler = () => {
    dispatch(auth(email, password));
  };

  return (
    <div className="mt-4">
      <Typography
        variant="h5"
        color={colors.primary[200]}
        className="ms-2 mb-1"
        style={{ fontWeight: "400" }}
      >
        Email/Phone
      </Typography>
      <input
        type="email"
        className="form-control mb-3 mt-2"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Typography
        variant="h5"
        color={colors.primary[200]}
        className="ms-2 mb-1"
        style={{ fontWeight: "400" }}
      >
        Password
      </Typography>
      <div className="input-group mb-4 mt-2">
        <input
          type={passwordType}
          className="form-control"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="input-group-text" onClick={togglePassword}>
          {passwordType === "password" ? (
            <VisibilityIcon cursor="pointer" />
          ) : (
            <VisibilityOffIcon cursor="pointer" />
          )}
        </span>
      </div>
      {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="check"
          />
        </div> */}
      {/* <button onClick={login} className="btn btn-success mb-3"> */}
      <Button
        onClick={submitHandler}
        variant="contained"
        className="float-end"
        style={{ backgroundColor: "#255288" }}
      >
        Login
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.authMsg.message,
  };
};

export default connect(mapStateToProps)(LoginForm);

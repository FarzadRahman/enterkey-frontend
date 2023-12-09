import React, { useState, useEffect } from "react";
import Router from "next/router";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../../theme";
import {
  Typography,
  useTheme,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";
import EmployeeForm from "../../../components/forms/EmployeeForm";
import Link from "next/link";

// Icon import
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import LeaveEditForm from "../../../components/forms/LeaveEditForm";

const ApplicationDetails = ({ query, token }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const id = +query.id;
    const [errors, setErrors] = useState("");
    const [loader, setLoader] = useState(true);
    const [details, setDetails] = useState({});
    const [comments, setComments] = useState([]);


  // FETCH USER DETAILS
  useEffect(() => {
    
    const apiUrl = BASE_URL + "leave/details/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // console.log(res);
        if (res.data) {
          setLoader(false);
          setDetails(res.data)
         

        } else {
          setErrors(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loader ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
            <Typography
                variant="h2"
                className="mb-4"
                color={colors.greenAccent[300]}
            >
                Employee Leave Details
            </Typography>
          <LeaveEditForm leaveDetails={details} />

      
    
        </>
      )}
    </>
  );
};

ApplicationDetails.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(ApplicationDetails);

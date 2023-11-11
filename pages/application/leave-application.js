import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";

//theme
import { tokens } from "../theme";
import { TextField, Button, Typography, useTheme, MenuItem } from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

const createBranch = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [application_Reason, setApplicationReason] = useState("");
  const [leaveTypes, setLeaveType] = useState([]);
  const [leave_type_id, setLeaveType_id] = useState("");
  const [stayLocation, setStayLocation] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);

  function setLeaveStartDateOnChange(value){
    setLeaveStartDate(value);

    if(value && leaveEndDate){

        datediff(value,leaveStartDate);
    }

  }

  function setLeaveEndDateOnChange(value){
    setLeaveEndDate(value);


    if(leaveStartDate && value){
        datediff(leaveStartDate,value);
    }


  }

  function datediff (date_one, date_two) {

    const currentDate = new Date(date_one);
    const examDate = new Date(date_two); // Replace with your desired exam date
    if(examDate<currentDate){
        alert('End Date Can not be less than Start Date');
        return false;
    }
    const timeDifference = Math.abs(examDate - currentDate);
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setNumberOfDays(daysRemaining+1);
  
 }


  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const branch = {
  //     name,
  //     code,
  //     contact_address,
  //     order_prefix,
  //     contact_person,
  //     contact_email,
  //     contact_mobile,
  //     formErrors,
  //   };
  //   const apiBranch = BASE_URL + "api/v1/branches/create";
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   console.log(branch);
  //   axios.post(apiBranch, branch, config).then((response) => {
  //     console.log(response.data);
  //     if (response.data.status) {
  //       alert("Branch Information Created!");
  //       Router.push({
  //         pathname: "/branch/branchList",
  //       });
  //     } else {
  //       setFormErrors(Object.values(response.data.errors));
  //     }
  //   });
  // };

  useEffect(() => {
    const calculateDaysRemaining = () => {
        const currentDate = new Date();
        const examDate = new Date('2023-11-12'); // Replace with your desired exam date
        const timeDifference = Math.abs(examDate - currentDate);
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        console.log(daysRemaining);
    };

    // calculateDaysRemaining();
}, []);


  useEffect(() => {
    const apiGrade =
      BASE_URL +
      "leave-type";

    axios
      .get(apiGrade, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // console.log(res.data.data);
        if (res.data) {
          setLeaveType(res.data.data);
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const onSubmit = (e) => {
    e.preventDefault();
    const application = {
      application_Reason,
      leave_type_id,
      leaveStartDate,
      leaveEndDate,
      stayLocation
    };

    // console.log(application);
    const apiLeaveApplication = BASE_URL + "leave/create";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(apiLeaveApplication, application, config).then((response) => {
      console.log(response.data);
    //   if (response.data) {
    //     console.log(response.data.data);
    //     alert("Branch Information Created!");
    //     Router.push({
    //       pathname: "/branch/branchList",
    //     });
    //   } else {
    //     setFormErrors(Object.values(response.data));
    //   }
    });
  };

  // RETURN TO LIST
  const goBack = () => {
    Router.push({
      pathname: "/branch/branchList",
    });
  };

  return (
    <div className="mt-2">
      <div className="row">
        <div className="col-10">
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Create Leave Application
          </Typography>
        </div>
       
      </div>

      
      <p>Number of Days: {numberOfDays}</p>
        
      <div className="row">
        <div className="col-md-4 mt-4">
          <TextField
            label="Reason"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setApplicationReason(e.target.value)}
            className="shadow-input"
          />
        </div>

        <div className="col-md-4 mt-4">
          <TextField
            onChange={(e) => {
              setLeaveType_id(+e.target.value);
            }}
            select
            label="Leave Type"
            size="small"
            fullWidth
            value={leave_type_id || ""}

            className="shadow-input"
          >
            {leaveTypes?.map((option, index) => (
              <MenuItem key={index} value={option.l_type_id}>
                {option.leave_type_name} 
              </MenuItem>
            ))}
          </TextField>
        </div>
        
        <div className="col-md-4 mt-4">
          <TextField
            label="Start Date"
            variant="outlined"
            size="small"
            type="date"
            fullWidth
            onChange={(e) => setLeaveStartDateOnChange(e.target.value)}
            className="shadow-input"
          />
        </div>
        
        <div className="col-md-4 mt-4">
          <TextField
            label="End Date"
            variant="outlined"
            size="small"
            type="date"
            fullWidth
            onChange={(e) => setLeaveEndDateOnChange(e.target.value)}
            className="shadow-input"
          />
        </div>

        <div className="col-md-4 mt-4">
          <TextField
            label="Stay Locaton"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setStayLocation(e.target.value)}
            className="shadow-input"
          />
        </div>


  
 
      </div>

     
      <div className="row mt-4">
        <div className="col-md-12">
          <Button
            variant="contained"
            color="success"
            className="float-end"
            onClick={onSubmit}
          >
            Create
          </Button>
          <Button variant="contained" color="error" onClick={goBack}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(createBranch);

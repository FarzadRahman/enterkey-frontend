import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";

//theme
import { tokens } from "../../theme";
import { TextField, Button, Typography, useTheme, MenuItem, DateField, CircularProgress } from "@mui/material";
// import { DateField } from '@mui/x-date-pickers/DateField';
// import { DateField } from '@mui/x-date-pickers';
// import { DateField } from '@mui/x-date-pickers-pro';
import AntdMomentWebpackPlugin from '@ant-design/moment-webpack-plugin';
// Date
import { DatePicker, Space  } from "antd";
import dayjs from "dayjs";
// import { DatePicker } from '@mui/x-date-pickers-pro';
// import { DatePicker } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers-pro';
// Datatable

//Alert
import { toast } from "react-toastify";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";
//import MyDataTable from "../../components/data-table/MyDataTable";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const editLeaveApplication = ({ token, query, roles }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [approvalName,setApprovalName]=useState([]);
  const [approval_id,setApproval_id]=useState("");

  const [recorderName,setRecorderName]=useState([]);
  const [recorder_id,setRecorder_id]=useState("");

  const [application_Reason, setApplicationReason] = useState("");
  const [leaveTypes, setLeaveType] = useState([]);
  const [leave_type_id, setLeaveType_id] = useState("");
  const [stayLocation, setStayLocation] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [approvedLeave, setApprovedLeave] = useState(0);
  const { RangePicker } = DatePicker;
  const id = query.id;
  const dateFormat = 'YYYY/MM/DD';
  const [loader, setLoader] = useState(true);


  function onChange(date, dateString) {

    datediff(dateString[0],dateString[1]);
    dateString?.map((date, index) => {
      if (index == 0) { 
        setLeaveStartDate(date);
      }
      else{
        setLeaveEndDate(date);
      } 
    });
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current == dayjs().endOf("day");
  };

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

  useEffect(() => {  
  const apiGrade =
    BASE_URL + "leave/details/" + id;
  axios
    .get(apiGrade, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      if (res?.status === 200) {
        setApproval_id(res?.data?.application?.approval_id);
        setRecorder_id(res?.data?.application?.reviewer_id);
        setApplicationReason(res?.data?.application?.reason);
        setLeaveType_id(res?.data?.application?.leave_type?.l_type_id)
        setStayLocation(res?.data?.application?.stay_location);
        setLeaveStartDate(res?.data?.application?.start_date);
        setLeaveEndDate(res?.data?.application?.end_date);
        setApprovedLeave(res?.data?.totalApprovedDays);
        setNumberOfDays(res?.data?.application?.applied_total_days);
        if(approvedLeave || numberOfDays || leaveEndDate || leaveStartDate || stayLocation || application_Reason || leaveTypes || recorder_id || approval_id){
          setLoader(false)
        }
        // setTimeout(
        //   () => setLoader(false), 
        //   500
        // );
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [id]);

 useEffect(() => {
  // Approved Leave
  const apiGrade =
    BASE_URL +
    "leave/approve-count";
  axios
    .get(apiGrade, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      if (res.data) {
        setApprovedLeave(res.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const calculateDaysRemaining = () => {
        const currentDate = new Date();
        const examDate = new Date('2023-11-12'); // Replace with your desired exam date
        const timeDifference = Math.abs(examDate - currentDate);
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      
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
        if (res.data) {
          // console.log(res.data);
          setLeaveType(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const apiGrade =
      BASE_URL +
      "leave/employee-list";
    axios
      .get(apiGrade, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // console.log(res.data.data);
        if (res.data) {
         // console.log(res.data.data);
          setApprovalName(res.data);
          // console.log("res.data");
          // console.log(res.data);
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const apiGrade =
      BASE_URL +
      "leave/recorder-list";
    axios
      .get(apiGrade, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // console.log('data');
        // console.log(res);
        if (res.data) {
         // console.log(res.data.data);
          setRecorderName(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const apiBranch = BASE_URL + "branch/update/" + id;
  //   const branch = {
  //     branch_name,
  //     company_id,
  //   };

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };

  //   axios.post(apiBranch, branch, config).then((response) => {
  //     if (response.data) {
  //       toast(`${response?.data?.message} - ${response?.data?.data?.branch_name}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
  //       Router.push({
  //         pathname: "/branch/branchList",
  //       });
  //     } else {
  //       setFormErrors(Object.values(response.data.errors));
  //     }
  //   });
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    const application = {
      'approval_id':approval_id,
      'reason':application_Reason,
      'leave_type_id':leave_type_id,
      'start':leaveStartDate,
      'end':leaveEndDate,
      'stay_location':stayLocation,
      'reviewer_id':recorder_id,
    };

    // console.log(application);
    const apiLeaveApplication = BASE_URL + "leave/edit-application/" + id;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(apiLeaveApplication, application, config).then((response) => {
      if (response?.status === 201) {
        // alert('test')
        toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
          if(response?.data?.status === 1){
            Router.push({
              pathname: "/application/edit/" + id,
            });
          }
          else{
            Router.push({
              pathname: "/application/applied-list",
            });
          }
      } else {
        setFormErrors(Object.values(response.data.errors));
      }
      // console.log(response);
      // alert(response.data.message);
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
      pathname: "/application/applied-list",
    });
  };

  return (
    <>
      {loader ? (
        <CircularProgress />
      ) : (
        (roles != 1) &&
        <>
          <div className="mt-2">
            <div className="row">
              <div className="col-10">
                <Typography
                  variant="h2"
                  className="mb-4"
                  color={colors.greenAccent[300]}
                >
                  Update Leave Application
                </Typography>
              </div>
            
            </div>

            <div className="row">
            <p className="col-md-4">Number of Days: {numberOfDays}</p>
            <p className="col-md-4">Approved Leave: {approvedLeave}</p>
            </div>
            
          
              
            <div className="row">
              
            <div className="col-md-4 mt-4">
                <TextField
                  onChange={(e) => {
                    setApproval_id(+e.target.value);
                  }}
                  select
                  label="Approval Name"
                  size="small"
                  fullWidth
                  value={approval_id || ""}

                  className="shadow-input"
                >
                  {approvalName?.map((option, index) => (
                    <MenuItem key={index} value={option.emp_id}>
                      {option.full_name} 
                    </MenuItem>
                  ))}
                </TextField>
              </div>


              <div className="col-md-4 mt-4">
                <TextField
                  onChange={(e) => {
                    setRecorder_id(+e.target.value);
                  }}
                  select
                  label="Select Recorder"
                  size="small"
                  fullWidth
                  value={recorder_id || ""}

                  className="shadow-input"
                >
                  {recorderName?.map((option, index) => (
                    <MenuItem key={index} value={option.emp_id}>
                      {option.full_name} 
                    </MenuItem>
                  ))}
                </TextField>
              </div>



              <div className="col-md-4 mt-4">
                <TextField
                  label="Reason"
                  variant="outlined"
                  size="small"
                  type="text"
                  fullWidth
                  value={application_Reason}
                  onChange={(e) => setApplicationReason(e.target.value)}
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
                  value={stayLocation}
                  onChange={(e) => setStayLocation(e.target.value)}
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
                <RangePicker
                  label="Date"
                  variant="outlined"
                  fullWidth
                  value={[dayjs(leaveStartDate), dayjs(leaveEndDate)]}
                  format={dateFormat}
                  onChange={onChange}
                  size="large"
                  style={{ width: "100%"}}
                  className="shadow-input"
                  // disabledDate={disabledDate}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateRangePicker']}>
                      <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
                    </DemoContainer>
                  </LocalizationProvider> */}
                {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
                {/* <DatePicker
                  label="Controlled picker"
                  // value={value}
                  onChange={(e) => setLeaveStartDateOnChange(e.target.value)}
                /> */}
                {/* <DatePicker
                  onChange={(e) => setLeaveStartDateOnChange(e.target.value)}
                  size="large"
                  // picker="month"
                  style={{ width: "100%" }}
                  className="shadow-input"
                  // disabledDate={disabledDate}
                  fullWidth
                /> */}
                {/* <TextField
                  label="Start Date"
                  variant="outlined"
                  size="small"
                  type="date"
                  fullWidth
                  onChange={(e) => setLeaveStartDateOnChange(e.target.value)}
                  className="shadow-input"
                /> */}
                {/* <DatePicker
                  label="Start Date"
                  views={"Start Date"}
                  variant="outlined"
                  size="large"
                  style={{ width: "100%" }}
                  fullWidth
                  // value={leaveStartDate}
                  onChange={(e) => setLeaveStartDateOnChange(e.target.value)}
                  className="shadow-input"
                  defaultValue={"Start"}
                /> */}
                
              </div>
              
              {/* <div className="col-md-4 mt-4">
                <DatePicker
                  label="End Date"
                  variant="outlined"
                  size="large"
                  // type="text"
                  style={{ width: "100%" }}
                  fullWidth
                  onChange={(e) => setLeaveEndDateOnChange(e.target.value)}
                  className="shadow-input"
                />
              </div> */}

              
        
            </div>


            {/* <MyDataTable></MyDataTable> */}
          

            <div className="row mt-4">
              <div className="col-md-12">
                <Button
                  variant="contained"
                  color="success"
                  className="float-end"
                  onClick={onSubmit}
                >
                  Update
                </Button>
                <Button variant="contained" color="error" onClick={goBack}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </> 
  );
};

editLeaveApplication.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    roles: state.auth.roles,
  };
};

export default connect(mapStateToProps)(editLeaveApplication);

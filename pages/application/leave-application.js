import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";

//theme
import { tokens } from "../theme";
import { TextField, Button, Typography, useTheme, MenuItem, DateField } from "@mui/material";
// import { DateField } from '@mui/x-date-pickers/DateField';
// import { DateField } from '@mui/x-date-pickers';
// import { DateField } from '@mui/x-date-pickers-pro';
import AntdMomentWebpackPlugin from '@ant-design/moment-webpack-plugin';

//Alert
import { toast } from "react-toastify";

// Date
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// import { DatePicker } from '@mui/x-date-pickers-pro';
// import { DatePicker } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers-pro';
// Datatable
//axios
import axios from "axios";
import { BASE_URL } from "../../base";
//import MyDataTable from "../../components/data-table/MyDataTable";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const leaveApplication = ({ token, roles }) => {
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

  const [openModal, setOpenModal] = useState(false);
  const [selectedApprovalName, setSelectedApprovalName] = useState("");
  const [selectedRecorderName, setSelectedRecorderName] = useState("");
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");


  function onChange(date, dateString) {
    // console.log("date");
    // console.log(date);
    // console.log("dateString");

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
    // console.log("current");
    // console.log(current);
    // Can not select days before today and today
    return current == dayjs().endOf("day");
  };

  function setLeaveStartDateOnChange(value){
    // console.log("value");
    // console.log(value);
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
  // Approved Leave

  const apiGrade =
    BASE_URL +
    "leave/approve-count";

  axios
    .get(apiGrade, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      // console.log(res);
     
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
        console.log(res);
       
        if (res.data) {
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
        if (res?.status === 200) {
         // console.log(res.data.data);
          setApprovalName(res.data);
        
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

  const handleOpenModal = () => {
    setSelectedApprovalName(approvalName.find((option) => option.emp_id === +approval_id)?.full_name || "");
    setSelectedRecorderName(recorderName.find((option) => option.emp_id === +recorder_id)?.full_name || "");
    setSelectedLeaveType(leaveTypes.find((option) => option.l_type_id === +leave_type_id)?.leave_type_name || "");
    setSelectedStartDate(leaveStartDate);
    setSelectedEndDate(leaveEndDate);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = [];

    // Check each required field and update validationErrors array
    if (!approval_id) {
      validationErrors.push("Please select an Approver Name");
    }
  
    if (!recorder_id) {
      validationErrors.push("Please select a Recorder Name");
    }
  
    if (!application_Reason) {
      validationErrors.push("Please enter a Reason");
    }
  
    if (!leave_type_id) {
      validationErrors.push("Please select a Leave Type");
    }
  
    if (!leaveStartDate) {
      validationErrors.push("Please select a Start Date");
    }
  
    if (!leaveEndDate) {
      validationErrors.push("Please select an End Date");
    }
  
    if (!stayLocation) {
      validationErrors.push("Please enter a Stay Location");
    }
  
    // Check if there are any validation errors
    if (validationErrors.length > 0) {
      // Display the first validation error
      toast(validationErrors[0], { type: 'error' });
      return;
    }
  
    // Open the confirmation modal
    handleOpenModal();
  };

  const handleSubmitConfirmation = () => {
    // Perform the actual submission logic here
    const application = {
      approval_id: approval_id,
      reason: application_Reason,
      leave_type_id: leave_type_id,
      start: leaveStartDate,
      end: leaveEndDate,
      stay_location: stayLocation,
      reviewer_id: recorder_id,
    };
    const apiLeaveApplication = BASE_URL + "leave/create";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(apiLeaveApplication, application, config).then((response) => {
      if (response?.status === 201) {
        toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
        if (response?.data?.status === 1) {
          Router.push({
            pathname: "/application/leave-application",
          });
        } else {
          Router.push({
            pathname: "/application/applied-list",
          });
        }
      } else {
        setFormErrors(Object.values(response.data.errors));
      }
    });

    // Close the modal after submission
    handleCloseModal();
  };
  // RETURN TO LIST
  const goBack = () => {
    Router.push({
      pathname: "/",
    });
  };

  return (
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
              Create Leave Application
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
              label="Approver Name"
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
              showTime
              format="YYYY/MM/DD"
              label="Date"
              variant="outlined"
              fullWidth
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
              Create
            </Button>
            <Button variant="contained" color="error" onClick={goBack}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%', // Adjusted width for small screens
          maxWidth: 600, // Maximum width for larger screens
          bgcolor: 'white',
          boxShadow: 6,
          p: 4,
          borderRadius: 12,
          textAlign: 'center', // Center text for small screens
          '@media (min-width: 600px)': {
            width: 600,
            textAlign: 'left', // Align text to the left for larger screens
          },
        }}
      >
        <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
          Are you sure to submit the application?
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Approver Name:</strong> {selectedApprovalName}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Recorder Name:</strong> {selectedRecorderName}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Leave Type:</strong> {selectedLeaveType}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Start Date:</strong> {selectedStartDate}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>End Date:</strong> {selectedEndDate}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Reason:</strong> {application_Reason}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Stay Location:</strong> {stayLocation}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Number of Days:</strong> {numberOfDays}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitConfirmation}
          sx={{ mt: 2, mr: 2 }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseModal}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
    
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    roles: state.auth.roles,
  };
};

export default connect(mapStateToProps)(leaveApplication);

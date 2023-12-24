import React, { useState, useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import {
  Typography,
  useTheme,
  Box,
  Paper,
  Grid,
  Avatar,
  TextField,
  RangePicker,
  Pagination,
  MenuItem,
} from "@mui/material"; 

import { tokens } from "../../theme";
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../base";
import { Padding } from "@mui/icons-material";

const UserDetails = ({ query, token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  const [employeeDetails, setEmployeeDetails] = useState(null);
  const id = +query.id;
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [leaveType, setLeaveType] = useState();
  const [leaveTypeList,setleaveTypeList]=useState([]);
  const [employeeList,setemployeeList]=useState([]);
  const [selectedEmp, setSelectedEmp] = useState();
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [dateRange,setDateRange] = useState([]);
  const [leaves,setLeaves]=useState([]);
  function formatDate(dateString){
    const options = { year: "numeric", month: "long", day: "numeric"};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  useEffect(() => {
    
    const apiUsers =
    BASE_URL +
    "leave/individual-report/"+id+"?page=" +
    page;
    const param={leaveType:leaveType,
      selectedEmp:selectedEmp,leaveStartDate:leaveStartDate,
      leaveEndDate:leaveEndDate};
    // axios.post(apiBranch, branch, config).then((response) 
    // console.log(param);
    axios
      .post(apiUsers, param,{
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.data);
          setUsers(res.data);
          setLastPage(res.data.last_page);
          setTotalData(res.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page,leaveType,selectedEmp,leaveStartDate,
    leaveEndDate]);

  // Pagination 
  const handleChange = (e, page) => {
    setPage(page);
  };

  const changeLeaveType = (value) => {
    // const { name, value } = e.target;
    setLeaveType(value);
    // console.log(value);
  };

  const changeSelectedEmp = (value) => {
    // const { name, value } = e.target;
    setSelectedEmp(value);
    // console.log(value);
  };
  function onDateChange(date, dateString) {
    // console.log("date");
    // console.log(date);
    // console.log("dateString");
    setDateRange(date);
  
    dateString?.map((date, index) => {
      if (index == 0) {
        setLeaveStartDate(date);
      }
      else{
        setLeaveEndDate(date);
      } 
    });
  }

  function resetFilter(){
    setSelectedEmp("");
    setLeaveType("");
    setLeaveStartDate("");
    setLeaveEndDate("");
    setDateRange("");
  }
  useEffect(() => {
    const apiUsers =
    BASE_URL +
    "employees?isPaginate=false";
   
    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          // console.log(res);
          setemployeeList(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  useEffect(() => {
    const apiUsers =
    BASE_URL +
    "leave-type";
   
    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
       
        if (res.status === 200) {
          // console.log(res);
          setleaveTypeList(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  useEffect(() => {
    const apiUrl = BASE_URL + "employee/details/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        setEmployeeDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const apiUsers =
    BASE_URL +
    "employee/total-casual-leave/"+id;
   
    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
       
           console.log(res);
          setLeaves(res.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  return (
    <>
    <Box p={3}>
      <Typography variant="h2" mb={4} color={colors.greenAccent[300]}>
        User Details
      </Typography>
      {employeeDetails && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <img height={250} alt="User Profile" src={IMAGE_URL + employeeDetails.user.profile_picture} />
            </Grid>
            <Grid item xs={12} sm={3} sx={{ textAlign: "left" }}>
              <Typography variant="h4" color={colors.greenAccent[300]}>Employee ID: {employeeDetails?.emp_id}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Full Name: {employeeDetails?.full_name}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Gender: {employeeDetails?.gender}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Phone number: {employeeDetails?.phone_number}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Email: {employeeDetails?.email_address}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Office ID: {employeeDetails?.office_id}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Branch: {employeeDetails?.branch?.branch_name}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Designation Name: {employeeDetails?.designation?.desg_nm}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Department Name: {employeeDetails?.department?.department_name}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Company Name: {employeeDetails?.branch?.company?.company_name}</Typography>
              
              {/* Add more details as needed */}
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
    <Box p={3} display="flex" justifyContent="space-between">
      <Typography variant="h4" color={colors.greenAccent[300]}>Total Casual leave : {leaves.totalApprovedLeave}</Typography>
      <Typography variant="h4" color={colors.greenAccent[300]}>Remaining leave : {leaves.remainingLeave}</Typography>
    </Box>
    <Box p={3}>  
    <div className="table-responsive">
    <table className="table table-hover table-striped">
      <thead>
        <tr className="table-success">
          <th>#</th>
          <th>Picture</th>
          <th>Name</th>
          <th>Leave Type</th>
          <th>Duration</th>
          <th>Approved Leave</th>
          <th>Leave Location</th>
          <th>Application Date</th>
          <th>Approver Name</th>
          <th>Leave Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.data?.map((user, index) => ( 
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td><img height={50} src={IMAGE_URL+user.sender.user.profile_picture}/></td>
            <td><b>{user.sender.full_name}</b> <br></br>({user.sender.designation.desg_nm})</td>
            <td>{user.leave_type.leave_type_name}</td>
            <td>{user.start_date} <br></br> {user.end_date} &nbsp; ({user.applied_total_days})</td>
            <td>{user.approved_start_date} <br></br> {user.approved_end_date} &nbsp; ({user.approved_total_days})</td>
            <td>{user.stay_location}</td>
            <td>{formatDate(user.created_at)}</td>
            <td>{user.approver.full_name}</td>
            <td>{user.leave_status.leave_status_name}</td>
            <td>
            </td>

            {/* <td>
              <Link href={`/users/updateUser/${user.id}`} className="anchor">
                <button className="btn btn-light btn-sm me-1">
                  <EditIcon cursor="pointer" />
                </button>
              </Link>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

      <div className="row justify-content-center">
        <div className="col-md-12 d-flex justify-content-center">
          <Pagination
            count={lastPage}
            page={page}
            color="secondary"
            size="large"
            onChange={handleChange}
          />
        {page === lastPage ? (
          <span className="ms-3 mt-2">
            Showing {1 + (page - 1) * 10} - {totalData} out of {totalData}
          </span>
        ) : (
          <>
          {totalData === 0 ? (
            <span className="ms-3 mt-2">Showing 0 out of 0</span>
          ) : (
            <span className="ms-3 mt-2">
              Showing {1 + (page - 1) * 10} - {10 + (page - 1) * 10} out
              of {totalData}
            </span>
          )}
          </>
        )}
        </div>
      </div>
    </Box>
    </>
  );
};

UserDetails.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(UserDetails);

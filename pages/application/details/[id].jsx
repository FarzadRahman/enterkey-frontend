import React, { useState, useEffect } from "react";
import Router from "next/router";
//redux imports
import { connect } from "react-redux";
import { useRouter } from 'next/router'
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
import { toast } from "react-toastify";

import { DatePicker } from "antd";
// Icon import
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import ForwardIcon from '@mui/icons-material/Forward';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import HeightIcon from '@mui/icons-material/Height';
import moment from 'moment';

const ApplicationDetails = ({ query, token }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // DATA FOR POST
    //   const [name, setName] = useState("");
    //   const [email, setEmail] = useState("");
    //   const [phone, setPhone] = useState("");
    //   const [status, setStatus] = useState(null);
    //   const [company_id, setCompanyId] = useState(0);
    //   const [roles, setRoles] = useState([]);
    //   const [permissions, setPermissions] = useState([]);

    // HELPER VARIABLES
    //   const [allRoles, setAllRoles] = useState([]);
    //   const [role_id, setRoleId] = useState(null);
    //   const [allPermissions, setAllPermissions] = useState([]);
    //   const [allCompanies, setAllCompanies] = useState([]);
    const id = +query.id;
    const [errors, setErrors] = useState("");
    const [loader, setLoader] = useState(true);
    const [details, setDetails] = useState({});
    const [trees, setTrees] = useState([]);
    const [comments, setComments] = useState("");
    const [leaveStartDate, setLeaveStartDate] = useState("");
    const [leaveEndDate, setLeaveEndDate] = useState("");
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [approvedLeave, setApprovedLeave] = useState(0);
    const { RangePicker } = DatePicker;

    const router = useRouter();
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
         
    function handleForward(id){
        // console.log(id);
        // console.log(comments);

        const apiUrl = BASE_URL + "leave/application-pass/" + id;
        const empData = {
            'comments':comments,
            'start':leaveStartDate,
            'end' : leaveEndDate,
            'approved_total_days':numberOfDays
        };
        const config = {
        headers: { Authorization: `Bearer ${token}` },
        };
   
        axios.post(apiUrl, empData, config).then((response) => {
          console.log(response);
          toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
          setTimeout(() => {
            router.back();
        }, 5000);
            });
    }


    function handleBackword(id){
        const apiUrl = BASE_URL + "leave/application-return/" + id;
        const empData = {
            comments
        };
        const config = {
        headers: { Authorization: `Bearer ${token}` },
        };
        axios.post(apiUrl, empData, config).then((response) => {
            console.log(response);
            toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
            setTimeout(() => {
                router.back();
            }, 5000);
              });

    }
    const handleApproved=(id)=>{
        const apiUrl = BASE_URL + "leave/application-approved/" + id;
        const empData = {
            'comments':comments,
            'start':leaveStartDate,
            'end' : leaveEndDate,
            'approved_total_days':numberOfDays
        };
        const config = {
        headers: { Authorization: `Bearer ${token}` },
        };
        axios.post(apiUrl, empData, config).then((response) => {
            console.log(response);
            toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
            setTimeout(() => {
                router.back();
            }, 5000);
              });
        // history.goBack();
    }
    const handleDelete=(id)=>{
        const apiUrl = BASE_URL + "leave/application-reject/" + id;
        const empData = {
            comments
        };
        const config = {
        headers: { Authorization: `Bearer ${token}` },
        };
        axios.post(apiUrl, empData, config).then((response) => {
            console.log(response);
            toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
            setTimeout(() => {
                router.back();
            }, 5000);
              });
        // history.goBack();
    }
  // FETCH USER DETAILS
  useEffect(() => {
    
    const apiUrl = BASE_URL + "leave/details/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
       
        if (res.data) {
          console.log(res.data);
          setLoader(false);
          setDetails(res.data)
        //   setName(res.data.data.full_name);
        //   setEmail(res.data.data.email_address);
        //   setPhone(res.data.data.phone_number);
        //   setCompanyId(res.data.data.company_id);
        //   setStatus(+res.data.data.status);
          

        //   setRoles([]);
        //   setPermissions([]);

          // res.data.data.roles?.map((role) => {
          //   setRoles((roles) => [...roles, role.id]);
          //   setRoleId(+role.id);
          // });
          // res.data.data.permissions?.map((permission) =>
          //   setPermissions((permissions) => [...permissions, permission.id])
          // );
        } else {
          setErrors(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

   // FETCH USER DETAILS
   useEffect(() => {

    const apiUrl = BASE_URL + "leave/application-history/" + id;

    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log("res");
        console.log(res.data);
       
        if (res.data) {
          console.log(res.data[0]);
          setLoader(false);
          setTrees(res.data)
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
            <h5>
                <p>Total leave: {details?.totalApprovedDays === 1 ? '1 day' : `${details?.totalApprovedDays} days`}</p>
                <p>Number of days:{numberOfDays}</p>
            </h5>

        <div>
                    
            <div className="row">
                <div className="col-12 text-center">
                    <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                        Company: <strong>{details?.application?.sender?.branch?.company?.company_name}</strong>
                    </small>
                    </div>
                    <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                        Company Bin: <strong>{details?.application?.sender?.branch?.company?.company_bin}</strong>
                    </small>
                    </div>
                    <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                        Company Tin: <strong>{details?.application?.sender?.branch?.company?.company_tin}</strong>
                    </small>
                    </div>
                    <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                        Company Contact Gmail: <strong>{details?.application?.sender?.branch?.company?.contact_email}</strong>
                    </small>
                    </div>
                    <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                        Company Contact Number: <strong>{details?.application?.approver?.branch?.company?.contact_number}</strong>
                    </small>
                    </div>
                    <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                        Company Contact Person: <strong>{details?.application?.approver?.branch?.company?.contact_person}</strong>
                    </small>
                    </div>
                    <div className="row">
                    <small style={{ color: "darkviolet" }}>
                        Company Contact Address: <strong>{details?.application?.sender?.branch?.company?.contact_address}</strong>
                    </small>
                    </div>
                    <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                        [www.ntrca.gov.bd]
                    </small>
                    </div>
                </div>
            </div>
        </div>
          <div className="table-responsive mt-2">
            <table className="table table-hover table-striped">
                <thead>
                    <tr className="table-success">
                    <th>Leave Details</th>
                    <th>Sender Details</th>
                    <th>Reviewer Details</th>
                    <th>Approver Details</th>
                    <th>Comment</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <p style={{color:"blue"}}>Leave Type: <strong>{details?.application?.leave_type?.leave_type_name}</strong></p>
                                <p style={{color:"blue"}}>Stay Location: <strong>{details?.application?.stay_location}</strong></p>
                                <p style={{color:"blue"}}>Reason: <strong>{details?.application?.reason}</strong></p>
                                <p>Start Date: <strong>{details?.application?.start_date}</strong></p>
                                <p>End Date: <strong>{details?.application?.end_date}</strong></p>
                                <p style={{color:"red"}}>Applied Total Days: <strong>{details?.application?.applied_total_days}</strong></p>
                                <p>Comment: <strong>{details?.application?.comment}</strong></p>
                                <p>Reviewer Start Date: <strong>{details?.application?.reviewer_start_date}</strong></p>
                                <p>Reviewer End Date: <strong>{details?.application?.reviewer_end_date}</strong></p>
                                <p style={{color:"red"}}>Review Total Days: <strong>{details?.application?.review_total_days}</strong></p>
                                <p>Approved Start Date: <strong>{details?.application?.approved_start_date}</strong></p>
                                <p>Approved End Date: <strong>{details?.application?.approved_end_date}</strong></p>
                                <p style={{color:"green"}}>Approved Total Days: <strong>{details?.application?.approved_total_days}</strong></p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>Full Name: <strong>{details?.application?.sender?.full_name}</strong></p>
                                <p>Email Address: <strong>{details?.application?.sender?.email_address}</strong></p>
                                <p>Phone Number: <strong>{details?.application?.sender?.phone_number}</strong></p>
                                <p>Gender: <strong>{details?.application?.sender?.gender}</strong></p>
                                <p>Department: <strong>{details?.application?.sender?.department?.department_name}</strong></p>
                                <p>Branch: <strong>{details?.application?.sender?.branch?.branch_name}</strong></p>
                                <p>Designation: <strong>{details?.application?.sender?.designation?.desg_nm}</strong></p>
                                <p>Grade: <strong>{details?.application?.sender?.designation?.grade?.grade_name}</strong></p>
                                <p style={{color:"green"}}>Office ID: <strong>{details?.application?.sender?.office_id}</strong></p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>Full Name: <strong>{details?.application?.reviewer?.full_name}</strong></p>
                                <p>Email Address: <strong>{details?.application?.reviewer?.email_address}</strong></p>
                                <p>Phone Number: <strong>{details?.application?.reviewer?.phone_number}</strong></p>
                                <p>Gender: <strong>{details?.application?.reviewer?.gender}</strong></p>
                                <p>Department: <strong>{details?.application?.reviewer?.department?.department_name}</strong></p>
                                <p>Branch: <strong>{details?.application?.reviewer?.branch?.branch_name}</strong></p>
                                <p>Designation: <strong>{details?.application?.reviewer?.designation?.desg_nm}</strong></p>
                                <p>Grade: <strong>{details?.application?.reviewer?.designation?.grade?.grade_name}</strong></p>
                                <p style={{color:"green"}}>Office ID: <strong>{details?.application?.reviewer?.office_id}</strong></p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>Full Name: <strong>{details?.application?.approver?.full_name}</strong></p>
                                <p>Email Address: <strong>{details?.application?.approver?.email_address}</strong></p>
                                <p>Phone Number: <strong>{details?.application?.approver?.phone_number}</strong></p>
                                <p>Gender: <strong>{details?.application?.approver?.gender}</strong></p>
                                <p>department_name: <strong>{details?.application?.approver?.department?.department_name}</strong></p>
                                <p>branch: <strong>{details?.application?.approver?.branch?.branch_name}</strong></p>
                                <p>designation: <strong>{details?.application?.approver?.designation?.desg_nm}</strong></p>
                                <p>grade: <strong>{details?.application?.approver?.designation?.grade?.grade_name}</strong></p>
                                <p style={{color:"green"}}>Office ID: <strong>{details?.application?.approver?.office_id}</strong></p>
                            </div>
                        </td>
                        <td>
                            <TextField
                                // label="Comment"
                                variant="outlined"
                                size="small"
                                type="text"
                                fullWidth
                                onChange={(e) => setComments(e.target.value)}
                                value={comments || ""}
                                className="shadow-input"
                                placeholder="Input comment here..."
                            />
                            <br></br>
                            <br></br>
                            <RangePicker
                            label="Date"
                            variant="outlined"
                            fullWidth
                            onChange={onChange}
                            size="large"
                            style={{ width: "100%"}}
                            className="shadow-input"
                            // disabledDate={disabledDate}
                            />
                        </td>
                        <td>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleForward(details?.application?.id)}
                            >
                            <ArrowForwardIcon cursor="pointer" />
                        </button>
                        <button
                            className="btn btn-danger btn-sm ms-1"
                            onClick={() => handleBackword(details?.application?.id)}
                            >
                            <ArrowBackIcon cursor="pointer" />
                        </button>
                        <button
                            className="btn btn-danger btn-sm ms-1"
                            onClick={() => handleApproved(details?.application?.id)}
                            >
                            <DoneIcon cursor="pointer" />
                        </button>
                        <button
                            className="btn btn-danger btn-sm ms-1"
                            // onClick={() => handleDelete(details?.id)}
                            >
                            <EditIcon cursor="pointer" />
                        </button>
                        <button
                            className="btn btn-danger btn-sm ms-1"
                            onClick={() => handleDelete(details?.application?.id)}
                            >
                            <DeleteIcon cursor="pointer" />
                        </button>
                        {/* <Link href={`/employees/updateEmployee/${details?.id}`} className="anchor">
                            <button className="btn btn-light btn-sm me-1">
                            <EditIcon cursor="pointer" />
                            </button>
                        </Link>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(details?.id)}
                            >
                            <DeleteIcon cursor="pointer" />
                        </button> */}
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div className="table-responsive mt-2">
            <table className="table table-hover table-striped">
              <thead>
                <tr className="table-success">
                  <th>SL</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Comment</th>
                  <th>Date Time</th>
                </tr>
              </thead>
              <tbody>
                { trees?.map((tree, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <p>{tree?.sender?.full_name} ({tree?.sender?.office_id})</p>
                      <p>{tree?.sender?.designation_id}</p>
                    </td>
                    <td>
                      <p>{tree?.receiver?.full_name} ({tree?.receiver?.office_id})</p>
                      <p>{tree?.receiver?.designation_id}</p>
                    </td>
                    <td>{tree?.comments}</td>
                    <td>{moment(tree?.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>  
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

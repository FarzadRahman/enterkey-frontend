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
    const [comments, setComments] = useState([]);

  // FETCH USER DETAILS
  useEffect(() => {
    
    const apiUrl = BASE_URL + "leave/details/" + 735;
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
          <div className="table-responsive">
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
                                <p style={{color:"blue"}}>Leave Type: <strong>{details?.leave_type?.leave_type_name}</strong></p>
                                <p style={{color:"blue"}}>Stay Location: <strong>{details?.stay_location}</strong></p>
                                <p style={{color:"blue"}}>Reason: <strong>{details?.reason}</strong></p>
                                <p>Start Date: <strong>{details?.start_date}</strong></p>
                                <p>End Date: <strong>{details?.end_date}</strong></p>
                                <p style={{color:"red"}}>Applied Total Days: <strong>{details?.applied_total_days}</strong></p>
                                <p>Comment: <strong>{details?.comment}</strong></p>
                                <p>Reviewer Start Date: <strong>{details?.reviewer_start_date}</strong></p>
                                <p>Reviewer End Date: <strong>{details?.reviewer_end_date}</strong></p>
                                <p style={{color:"red"}}>Review Total Days: <strong>{details?.review_total_days}</strong></p>
                                <p>Approved Start Date: <strong>{details?.approved_start_date}</strong></p>
                                <p>Approved End Date: <strong>{details?.approved_end_date}</strong></p>
                                <p style={{color:"green"}}>Approved Total Days: <strong>{details?.approved_total_days}</strong></p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>Full Name: <strong>{details?.sender?.full_name}</strong></p>
                                <p>Email Address: <strong>{details?.sender?.email_address}</strong></p>
                                <p>Office ID: <strong>{details?.sender?.office_id}</strong></p>
                                <p>Phone Number: <strong>{details?.sender?.phone_number}</strong></p>
                                <p>Gender: <strong>{details?.sender?.gender}</strong></p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>Full Name: <strong>{details?.reviewer?.full_name}</strong></p>
                                <p>Email Address: <strong>{details?.reviewer?.email_address}</strong></p>
                                <p>Office ID: <strong>{details?.reviewer?.office_id}</strong></p>
                                <p>Phone Number: <strong>{details?.reviewer?.phone_number}</strong></p>
                                <p>Gender: <strong>{details?.reviewer?.gender}</strong></p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>Full Name: <strong>{details?.approver?.full_name}</strong></p>
                                <p>Email Address: <strong>{details?.approver?.email_address}</strong></p>
                                <p>Office ID: <strong>{details?.approver?.office_id}</strong></p>
                                <p>Phone Number: <strong>{details?.approver?.phone_number}</strong></p>
                                <p>Gender: <strong>{details?.approver?.gender}</strong></p>
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
                        </td>
                        <td>
                        <button
                            className="btn btn-danger btn-sm"
                            // onClick={() => handleDelete(details?.id)}
                            >
                            <ArrowForwardIcon cursor="pointer" />
                        </button>
                        <button
                            className="btn btn-danger btn-sm ms-1"
                            // onClick={() => handleDelete(details?.id)}
                            >
                            <ArrowBackIcon cursor="pointer" />
                        </button>
                        <button
                            className="btn btn-danger btn-sm ms-1"
                            // onClick={() => handleDelete(details?.id)}
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
                            // onClick={() => handleDelete(details?.id)}
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

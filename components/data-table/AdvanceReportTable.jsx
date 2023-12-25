import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from 'date-fns';
//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../../pages/theme";
import { Typography, useTheme } from "@mui/material";
import {   MenuItem, DateField } from "@mui/material";
//axios
import axios from "axios";
import { BASE_URL } from "../../base";
import { IMAGE_URL } from "../../base";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
// Icon import
import EditIcon from "@mui/icons-material/Edit";

import {
  Button,
  CircularProgress,
  Pagination,
  TextField,
} from "@mui/material";

const AdvanceReportTable = ({ token,leaveType,selectedEmp,leaveStartDate,
    leaveEndDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  console.log(selectedEmp);




  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);


  function formatDate(dateString){
    const options = { year: "numeric", month: "long", day: "numeric"};
    return new Date(dateString).toLocaleDateString(undefined, options);
  } 



  useEffect(() => {
    
    
    const apiUsers =
    BASE_URL +
    "leave/advance-report?page=" +
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
          // console.log(res.data.data);
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


  return (
    <>
      
  
   
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
                  <Link href={`/users/updateUser/${user.employee_id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <EditIcon cursor="pointer" />
                    </button>
                  </Link>
                  <Link href={`/application/${user.id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <EditIcon cursor="pointer" />
                      
                    </button>
                  </Link>
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(AdvanceReportTable);

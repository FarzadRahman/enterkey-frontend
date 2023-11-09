import React, { useEffect, useState } from "react";
import Link from "next/link";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import { Typography, useTheme } from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// Icon import
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Button,
  CircularProgress,
  TextField,
  Pagination,
} from "@mui/material";

const employeeList = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employees, setEmployees] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    
    const apiUsers =
    BASE_URL +
    "employees?page=" +
    page;

    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.status === 200) {
          setEmployees(res.data);
          setLastPage(res.data.last_page);
          setTotalData(res.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // DeleteHandle
  const handleDelete = (employeeId) => {
    const apiUrl = BASE_URL + `employees/${employeeId}`;
    axios
    .post(apiUrl, {
    headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
    if (res.status === 200) {
      setEmployees(employees.filter((employee) => employee.emp_id !== employeeId));
    }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);
  };

  return (
    <>
      <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
      Employee List
      </Typography>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead>
            <tr className="table-success">
              <th>#</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Office ID</th>
              <th>Branch</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{employee.full_name}</td>
                <td>{employee.phone_number}</td>
                <td>{employee.email_address}</td>
                <td>{employee.office_id}</td>
                <td>{employee?.branch?.branch_name}</td>
                <td>{employee?.designation?.desg_nm}</td>
                <td>{employee?.department?.department_name}</td>
                <td>
                  <Link href={`/employees/updateEmployee/${employee.emp_id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <EditIcon cursor="pointer" />
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(employee.emp_id)}
                    >
                      <DeleteIcon cursor="pointer" />
                  </button>
                </td>
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

export default connect(mapStateToProps)(employeeList);

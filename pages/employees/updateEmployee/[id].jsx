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

const EmployeeDetails = ({ query, token }) => {
  console.log("query");
  console.log(query);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // DATA FOR POST
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [company_id, setCompanyId] = useState(0);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const id = +query.id;

  // HELPER VARIABLES
  const [allRoles, setAllRoles] = useState([]);
  const [role_id, setRoleId] = useState(null);
  const [allPermissions, setAllPermissions] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(true);

  // FETCH USER DETAILS
  useEffect(() => {
    const apiUrl = BASE_URL + "employees";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data) {
          setLoader(false);
          setName(res.data.data.name);
          setEmail(res.data.data.email);
          setPhone(res.data.data.phone);
          setCompanyId(res.data.data.company_id);
          setStatus(+res.data.data.status);

          setRoles([]);
          setPermissions([]);

          res.data.data.roles?.map((role) => {
            setRoles((roles) => [...roles, role.id]);
            setRoleId(+role.id);
          });
          res.data.data.permissions?.map((permission) =>
            setPermissions((permissions) => [...permissions, permission.id])
          );
        } else {
          setErrors(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // FETCH ALL ROLES
  // useEffect(() => {
  //   const apiRoles = BASE_URL + "api/v1/roles";
  //   axios
  //     .get(apiRoles, {
  //       headers: { Authorization: "Bearer " + token },
  //     })
  //     .then((res) => {
  //       if (res.data.status) {
  //         setAllRoles(res.data.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // SELECTED ROLES
  // const rolesAdd = (e) => {
  //   setRoleId(+e.target.value);
  //   setRoles([]);
  //   setRoles((roles) => [...roles, +e.target.value]);
  // };

  // FETCH ALL PERMISSIONS
  // useEffect(() => {
  //   const apiPermissions = BASE_URL + "api/v1/permissions";
  //   axios
  //     .get(apiPermissions, {
  //       headers: { Authorization: "Bearer " + token },
  //     })
  //     .then((res) => {
  //       if (res.data.status == true) {
  //         res.data.data.map((permission) => {
  //           permission.selected = false;
  //         });

  //         res.data.data.map((permission) => {
  //           permissions.map((perm) => {
  //             if (perm == permission.id) {
  //               permission.selected = true;
  //             }
  //           });
  //         });

  //         setAllPermissions(res.data.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [permissions]);

  // FETCH ALL COMPANIES
  // useEffect(() => {
  //   const apiCompanies = BASE_URL + "api/v1/companies";
  //   axios
  //     .get(apiCompanies, {
  //       headers: { Authorization: "Bearer " + token },
  //     })
  //     .then((res) => {
  //       if (res.data.status == true) {
  //         setAllCompanies(res.data.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // HANDLE PERMISSIONS
  // const handlePermissions = (e, id) => {
  //   const newState = allPermissions.map((perm) => {
  //     if (perm.id === id) {
  //       return { ...perm, selected: e.target.checked };
  //     }
  //     return perm;
  //   });
  //   setAllPermissions(newState);
  // };

  // POST UPDATE DATA
  // const update = () => {
  //   let temp = [];

  //   allPermissions.map((pm) => {
  //     if (pm.selected) {
  //       temp.push(pm.id);
  //     }
  //   });

  //   const updatedValues = {
  //     email,
  //     name,
  //     phone,
  //     roles,
  //     permissions: temp,
  //     id,
  //     status,
  //     company_id,
  //   };
  //   const apiUpdate = BASE_URL + "api/v1/admins/update";
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   console.log(updatedValues);
  //   axios.post(apiUpdate, updatedValues, config).then((response) => {
  //     if (response.data.status) {
  //       alert("Information Updated!");
  //       Router.push({
  //         pathname: "/users/userList",
  //       });
  //     } else {
  //       setErrors(Object.values(response.data.errors));
  //     }
  //   });
  // };

  // console.log(allPermissions);

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
            Update Employee
          </Typography>
          {<EmployeeForm id={id} />}
        </>
      )}
    </>
  );
};

EmployeeDetails.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(EmployeeDetails);

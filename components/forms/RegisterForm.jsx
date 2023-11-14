import React, { useState, useEffect } from "react";
import Router from "next/router";

//theme
import { TextField, MenuItem, Button } from "@mui/material";

//redux imports
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
// import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

const RegisterForm = ({ token }) => {


  const [selectedCountry, setSelectedCountry] = useState(null);
    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    {/* <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} /> */}
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                {/* <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} /> */}
                <div>{option.name}</div>
            </div>
        );
    };

  // Variables for POST
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [company_id, setCompanyId] = useState(null);
  const [branch_id, setBranchId] = useState(null);
  const [admin_roles, setSelectedRole] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(null);

  // Helper Variables
  const [roles, setRoles] = useState([]);
  const [role_id, setRoleId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [is, setIs] = useState(false);
  const [isGradeEnabled, setIsGradeEnabled] = useState(false);
  const [isGradeEnabled1, setIsGradeEnabled1] = useState(false);

  const role = [
    {
        "id": 1,
        "name": "Admin",
    },
    {
      "id": 2,
      "name": "User",
    },
  ];

  // FETCH BRANCHES
  // useEffect(() => {
  //   const apiBranches = BASE_URL + "api/v1/branches?company_id=" + company_id;

  //   if (company_id) {
  //     axios
  //       .get(apiBranches, {
  //         headers: { Authorization: "Bearer " + token },
  //       })
  //       .then((res) => {
  //         if (res.data.status) {
  //           setBranches(res.data.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [company_id]);

  // Fetch Roles
  // useEffect(() => {
  //   const apiRoles = BASE_URL + "api/v1/roles";
  //   axios
  //     .get(apiRoles, {
  //       headers: { Authorization: "Bearer " + token },
  //     })
  //     .then((res) => {
  //       if (res.data.status == true) {
  //         setRoles(res.data.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const rolesAdd = (e) => {
    setRoleId(e.target.value);
    setSelectedRole([]);
    setSelectedRole((admin_roles) => [...admin_roles, Number(e.target.value)]);
  };

  // Fetch Company
  useEffect(() => {
    const apiCompanies = BASE_URL + "companies";
    axios
      .get(apiCompanies, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data) {
          setCompanies(res.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    // Fetch Role
    useEffect(() => {
      const apiRoles = BASE_URL + "role";
      axios
        .get(apiRoles, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          if (res.data) {
            setRoles(res.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    useEffect(()=>{
      filterOption();
    },[1]);

    const handleProductChange = (event) => {
      setSelectedProduct(event.value);
      // console.log(event);
      setIs(true);
    };

    const filterOption = () => {
      const newState = companies?.filter((product) => {
        return product?.comp_id === product?.comp_id;
        // return product?.company_name === category?.type && product?.grade === grade?.grade;
      });
      setFilteredOptions(newState);
    };

  async function register(e) {
    e.preventDefault();
    const apiUrl = BASE_URL + "register";
    const regData = {
      email,
      password,
      name,
      phone,
      role_id,
      company_id,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiUrl, regData, config).then((response) => {
      // console.log(response);
      // return false;
      if (response.data) {
        Router.push({
          pathname: "/users/userList",
        });
      } else {
        console.log(response.data);
      }
    });
  }

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-6 mt-4">
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              className="shadow-input"
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-input"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-4">
            <TextField
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-input"
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              label="Phone"
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
              className="shadow-input"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-4">
            <TextField
              onChange={rolesAdd}
              select
              label="Role"
              size="small"
              fullWidth
              value={role_id || ""}
              className="shadow-input"
            >
              {roles?.map((option, index) => (
                <MenuItem key={index} value={option.role_id}>
                  {option.role_name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {/* <div className="col-md-6 mt-4"> */}
          <div className="col-md-6 mt-4 card flex justify-content-center">
            <Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name" placeholder="Select a Country" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}  style={{ width: "100%" }} size="small"/>
          </div>
            {/* <Dropdown
              value={selectedProduct}
              options={companies}
              optionLabel="company_name"
              // options={productsi}
              onChange={(e) => {
                handleProductChange(e);
              }}
              filter
              showClear
              filterPlaceholder="Search"
              placeholder="Select Product"
              // disabled={!isGradeEnabled1}
              style={{ width: "100%" }}
            /> */}
            {/* <TextField
              onChange={(e) => {
                setCompanyId(+e.target.value);
              }}
              select
              label="Company"
              size="small"
              fullWidth
              value={company_id || ""}

              className="shadow-input"
            >
              {companies?.map((option, index) => (
                <MenuItem key={index} value={option.comp_id}>
                  {option.company_name} 
                </MenuItem>
              ))}
            </TextField> */}
          </div>
        {/* </div> */}
        {/* {branches.length != 0 && (
          <div className="row">
            <div className="col-md-6 mt-4">
              <TextField
                onChange={(e) => {
                  setBranchId(+e.target.value);
                }}
                select
                label="Branch"
                size="small"
                fullWidth
                value={branch_id || ""}
                className="shadow-input"
              >
                {branches?.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        )} */}
        <div className="row">
          <div className="col-md-12">
            <Button
              onClick={register}
              variant="contained"
              className="float-end mt-4"
            >
              Create User
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(RegisterForm);

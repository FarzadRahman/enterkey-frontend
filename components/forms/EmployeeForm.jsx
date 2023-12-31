import React, { useState, useEffect } from "react";
import Router from "next/router";

//theme
import { TextField, MenuItem, Button } from "@mui/material";

//redux imports
import { connect } from "react-redux";

import { toast } from "react-toastify";
//axios
import axios from "axios";
import { BASE_URL } from "../../base";

const EmployeeForm = ({ token, id,roles }) => {
    const [full_name, setFull_name] = useState("");
    const [gender, setGender] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [email_address, setEmail_address] = useState("");
    const [office_id, setOffice_id] = useState("");
    const [branch_id, setBranch_id] = useState("");
    const [designation_id, setDesignation_id] = useState("");
    const [department_id, setDepartment_id] = useState("");
    const [password, setPassword] = useState("");
    const [user_id, setUser_id] = useState("");
    const [branches, setBranches] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isRecorrder, setRecorderChecked] = useState(false); 
    const [isApprover, setApproverChecked] = useState(false); 
    const genders = [
        {
            "gender": "Male",
        },
        {
            "gender": "Female",
        },
        {
            "gender": "Others",
        },
    ];
    // Fetch Employees
    useEffect(() => {
        const apiBranches = BASE_URL + "employees";
        axios
        .get(apiBranches, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            if (res.data) {
                if(id){
                    res.data?.data.map((data)=>{
                        if (data.emp_id == id) {
                            console.log(data);
                            setDepartment_id(data.department_id);
                            setDesignation_id(data.designation_id);
                            setBranch_id(data.branch_id);
                            setOffice_id(data.office_id);
                            setEmail_address(data.email_address);
                            setPhone_number(data.phone_number);
                            setGender(data.gender);
                            setFull_name(data.full_name);
                            setUser_id(data.user_id);
                            setApproverChecked(data.isApprover);
                            setRecorderChecked(data.isRecorder);
                        }
                    })
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    // Fetch Branches
    useEffect(() => {
        const apiBranches = BASE_URL + "branches";
        axios
        .get(apiBranches, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            if (res.data) {
                setBranches(res.data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    // Fetch Designations
    useEffect(() => {
        const apiBranches = BASE_URL + "designations";
        axios
        .get(apiBranches, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
      
            if (res.data) {
               
                setDesignations(res.data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    // Fetch Departments
    useEffect(() => {
        const apiDepartments = BASE_URL + "departments";
        axios
        .get(apiDepartments, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            if (res.data) {
                setDepartments(res.data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    function handleRecorderChange(e) {
        setRecorderChecked(e.target.checked);
 
        // setRecorderChecked((state) => ({recorderChecked: !state.recorderChecked}));
     }

     function handleApproverChange(e) {
       
        setApproverChecked(e.target.checked);
 
        // setRecorderChecked((state) => ({recorderChecked: !state.recorderChecked}));
     }
    async function register(e) {
        e.preventDefault();
        
        if(id){
            const apiUrl = BASE_URL + "employees/update/" + id;
            const empData = {
                full_name,
                gender,
                phone_number,
                email_address,
                office_id,
                branch_id,
                designation_id,
                department_id,
                isApprover,
                isRecorrder
            };
            const config = {
            headers: { Authorization: `Bearer ${token}` },
            };
            
            axios.post(apiUrl, empData, config).then((response) => {
                 
            if (response.data) {
                // console.log(data);
                toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
                Router.push({
                   
                pathname: "/employees/employeeList",
                });
            } else {
                console.log(response.data);
            }
            });
        }else{
            const apiUrl = BASE_URL + "employees/create";
            const empData = {
                full_name,
                gender,
                phone_number,
                email_address,
                office_id,
                branch_id,
                designation_id,
                department_id,
                password,
                isApprover,
                isRecorrder
            };
            const config = {
            headers: { Authorization: `Bearer ${token}` },
            };
        
           
            axios.post(apiUrl, empData, config).then((response) => {
          
            if (response.data) {
                toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
                Router.push({
                pathname: "/employees/employeeList",
                });
            } else {
                console.log(response.data);
            }
            });
        }
    }
    if(token){
        return (
           <>
            {
                (roles!=3) ?
                <>
                <div>
                <form>
                    <div className="row">
                    <div className="col-md-4 mt-4">
                        <TextField
                        label="Full Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        value={full_name || ""}
                        onChange={(e) => setFull_name(e.target.value)}
                        className="shadow-input"
                        />
                    </div>
                    <div className="col-md-4 mt-4">
                        <TextField
                        onChange={(e) => {
                            setGender(e.target.value);
                        }}
                        select
                        label="Gender"
                        size="small"
                        fullWidth
                        value={gender || ""}
                        className="shadow-input"
                        >
                        {genders?.map((option, index) => (
                            <MenuItem key={index} value={option.gender}>
                            {option.gender} 
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>
                    <div className="col-md-4 mt-4">
                        <TextField
                        label="Phone Number (01XXXXXXXXX)"
                        variant="outlined"
                        size="small"
                        type="number"
                        fullWidth
                        value={phone_number || ""}
                        onChange={(e) => setPhone_number(e.target.value)}
                        className="shadow-input"
                        />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-4 mt-4">
                        <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        type="email"
                        fullWidth
                        value={email_address || ""}
                        onChange={(e) => setEmail_address(e.target.value)}
                        className="shadow-input"
                        />
                    </div>
                    <div className="col-md-4 mt-4">
                        <TextField
                        label="Office ID"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        value={office_id || ""}
                        onChange={(e) => setOffice_id(e.target.value)}
                        className="shadow-input"
                        />
                    </div>
                    <div className="col-md-4 mt-4">
                        <TextField
                        onChange={(e) => {
                            setBranch_id(+e.target.value);
                        }}
                        select
                        label="Branch"
                        size="small"
                        fullWidth
                        value={branch_id || ""}
        
                        className="shadow-input"
                        >
                        {branches?.map((option, index) => (
                            <MenuItem key={index} value={option.bran_id}>
                            {option.branch_name}
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mt-4">
                            <TextField
                            onChange={(e) => {
                                setDesignation_id(+e.target.value);
                            }}
                            select
                            label="Designation"
                            size="small"
                            fullWidth
                            value={designation_id || ""}
        
                            className="shadow-input"
                            >
                            {designations?.map((option, index) => (
                                <MenuItem key={index} value={option.desg_id}>
                                {option.desg_nm}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                        <div className="col-md-4 mt-4">
                            <TextField
                            onChange={(e) => {
                                setDepartment_id(+e.target.value);
                            }}
                            select
                            label="Department"
                            size="small"
                            fullWidth
                            value={department_id || ""}
                            className="shadow-input"
                            >
                            {departments?.map((option, index) => (
                                <MenuItem key={index} value={option.dept_id}>
                                {option.department_name}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                        {!id && 
                            <div className="col-md-4 mt-4">
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
                        }
                        {id && 
                            <div className="col-md-4 mt-4">
                                <TextField
                                label="User ID"
                                variant="outlined"
                                size="small"
                                type="text"
                                fullWidth
                                // onChange={(e) => setPassword(e.target.value)}
                                value={user_id || ""}
                                className="shadow-input"
                                readOnly
                                />
                            </div>
                        }
                    <div className="col-md-4 mt-4">
                        <input value="test" type="checkbox" checked={isRecorrder} defaultChecked={isRecorrder}  onChange = {handleRecorderChange} />   
                    
                        {isRecorrder ? (
                            <div> Recorder is checked. </div>
                        ) : (
                            <div> Recorder is not checked. </div>
                        )}  
                    </div>
    
                    <div className="col-md-4 mt-4">
                        <input value="approver" checked={isApprover} type="checkbox"  onChange = {handleApproverChange} />   
                    
                        {isApprover ? (
                            <div> Approver is checked. </div>
                        ) : (
                            <div> Approver is not checked. </div>
                        )}  
                    </div>
                   
                    </div>
                    
                    <div className="row">
                    <div className="col-md-12">
                        <Button
                        onClick={register}
                        variant="contained"
                        className="float-end mt-4"
                        >
                            {id ?  ("Update Employee") : ("Create Employee")
                        }
                        </Button>
                    </div>
                    </div>
                </form>
                </div>
                </>:
                <>
                
                    <h2
                        style={{
                            color:"red"
                        }}
                    >
                    Access Denied
                    </h2>
                </>
            }
           </>
        );
    }else{
        console.log("Token Empty");
    }
};
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        roles: state.auth.roles,
    };
};
export default connect(mapStateToProps)(EmployeeForm);

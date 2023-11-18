import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";

// bootstarp
import { 
  Typography, 
  useTheme, 
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem, } from "@mui/material";

// axios
import axios from "axios";

//Base url
import { BASE_URL } from "../../base";

const userProfile = ({ user }) => {
  console.log("user");
  console.log(user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [photo, setPhoto] = useState("");
  const [photoSign, setPhotoSign] = useState("");
  const [check, setCheck] = useState(0);
  const [checkSign, setCheckSign] = useState(0);
  // useEffect(() => {
  //   console.log("jwtDecode(user.token)");
  //   console.log(jwtDecode(user.token));
  //   console.log("JSON.parse(atob(user.token.split('.')[1]))");
  //   console.log(JSON.parse(atob(user.token.split('.')[1])));
  //   const current_user = jwtDecode(user.token, { header: true });
  //   console.log("current_user");
  //   console.log(current_user);
  // }, []);

  const submit = () => {
    const profileData = {
      photo
    };
    // console.log("profileData");
    // console.log(profileData);
    const apiProfile = BASE_URL + "upload/image";
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    if (photo == "") {
      alert("Please select an Image!");
    } else {
      axios
        .post(apiProfile, profileData, config)
        .then((response) => {
          console.log(response);
          if (response.data.status == 200) {
            alert("Profile Photo Uploaded!");
            setCheck(3)
          } else {
            setFormErrors(Object.values(response.data.errors));
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          setCheck(3);
        });
    }
  };

  // PHOTO Profile
  const onChange = async (e) => {
    let files = e.target.files || e.dataTransfer.files;
    // console.log(files);
    if (files.length > 0) {
      uploadDocuments(e, files[0]);
    }
  };

  const uploadDocuments = async (event, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = submitFile(reader.result, file.name);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const submitSign = () => {
    const profileData = {
      photo
    };
    // console.log("profileData");
    // console.log(profileData);
    const apiProfile = BASE_URL + "upload/sign";
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    if (photoSign == "") {
      alert("Please select an Image!");
    } else {
      axios
        .post(apiProfile, profileData, config)
        .then((response) => {
          console.log(response);
          if (response.data.status == 200) {
            alert("Profile Sign Uploaded!");
            setCheckSign(3)
          } else {
            setFormErrors(Object.values(response.data.errors));
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          setCheckSign(3);
        });
    }
  };

  // PHOTO Signature
  const onChangeSign = async (e) => {
    let files = e.target.files || e.dataTransfer.files;
    // console.log(files);
    if (files.length > 0) {
      uploadSignDocuments(e, files[0]);
    }
  };

  const uploadSignDocuments = async (event, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = submitSignFile(reader.result, file.name);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const submitSignFile = (result, name) => {
    // console.log(result, name);
    console.log("result");
    console.log(result);
    setPhotoSign(result);
    setCheckSign(1)
  };

  return (
    <div className="row">
      <div className="col-md-4 text-center">
        <img
          alt="profile-user"
          width={200}
          height={200}
          src={photo || `../../assets/images/user.png`}
          // src={`../../assets/images/user.png`}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
        <Typography
          variant="h4"
          className="mt-3"
          color={colors.blueAccent[300]}
        >
          {user?.name}
        </Typography>
        <Typography
          variant="h5"
          className="mt-3"
          color={colors.grey[300]}
        >
        {!(check == 1) && <Button
          variant="contained"
          component="label"
          color="secondary"
          fullWidth
        >
          <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={onChange}
          />
          Change Profile Picture
        </Button>
        }
        {!(check == 0 || check == 3) && <Button
          variant="contained"
          component="label"
          color="secondary"
          fullWidth
          onClick={submit}
        >
          Confirm Change Profile Picture
        </Button>
        }
          
          {/* {user?.roles[0]?.name} */}
        </Typography>
        <div className="mt-4">
          <img
            alt="profile-user-signature"
            width={200}
            height={200}
            src={photoSign || `../../assets/images/govt.png`}
            // src={`../../assets/images/user.png`}
            style={{ cursor: "pointer" }}
          />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.grey[300]}
          >
            {!(checkSign == 1) && <Button
              variant="contained"
              component="label"
              color="secondary"
              fullWidth
            >
              <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onChangeSign}
              />
              Change Signature
            </Button>
            }
            {!(checkSign == 0 || checkSign == 3) && <Button
              variant="contained"
              component="label"
              color="secondary"
              fullWidth
              onClick={submitSign}
            >
              Confirm Change Signature
            </Button>
            }
          </Typography>
        </div>
        
      </div>
      <div className="col-md-2 text-center"></div>
      <div className="col-md-6">
        <div className="mt-5">
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            User Profile
          </Typography>
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Email
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.email || "Not Set Yet"} disabled />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Phone
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.phone || "Not Set Yet"} disabled />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Role
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.roles || "Not Set Yet"} disabled />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Company
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.company || "Not Set Yet"} disabled />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Name
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.name || "Not Set Yet"} disabled />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(userProfile);

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
  // console.log("user");
  // console.log(user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [photo, setPhoto] = useState("");
  const [check, setCheck] = useState(0);
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
    console.log("profileData");
    console.log(profileData);
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

  // PHOTO
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

  const submitFile = (result, name) => {
    // console.log(result, name);
    console.log("result");
    console.log(result);
    setPhoto(result);
    setCheck(1)
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
      </div>
      <div className="col-md-6">
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
        <input type="text" className="form-control mt-2" value={user?.email} disabled />
        <Typography
          variant="h5"
          className="mt-3"
          color={colors.primary[300]}
        >
          Phone
        </Typography>
        <input type="text" className="form-control mt-2" value={user?.phone} disabled />
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

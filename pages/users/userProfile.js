import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import { Typography, useTheme } from "@mui/material";

const userProfile = ({ user }) => {
  // console.log("user");
  // console.log(user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // useEffect(() => {
  //   console.log("jwtDecode(user.token)");
  //   console.log(jwtDecode(user.token));
  //   console.log("JSON.parse(atob(user.token.split('.')[1]))");
  //   console.log(JSON.parse(atob(user.token.split('.')[1])));
  //   const current_user = jwtDecode(user.token, { header: true });
  //   console.log("current_user");
  //   console.log(current_user);
  // }, []);

  return (
    <div className="row">
      <div className="col-md-4 text-center">
        <img
          alt="profile-user"
          width={200}
          height={200}
          src={`../../assets/images/user.png`}
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

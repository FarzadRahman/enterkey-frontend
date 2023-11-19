import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";

//theme
import { tokens } from "../theme";
import { TextField, Button, Typography, useTheme, MenuItem } from "@mui/material";

// Datatable



 
//axios
import axios from "axios";
import { BASE_URL } from "../../base";
import ApproverTable from "../../components/data-table/ApproverTable";

const createBranch = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);







  // RETURN TO LIST
  const goBack = () => {
    Router.push({
      pathname: "/branch/branchList",
    });
  };

  return (
    <div className="mt-2">
      <div className="row">
        <div className="col-10">
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
           Pending List For Approver
          </Typography>
        </div>
       
      </div>

      
      
        <ApproverTable></ApproverTable>

     


      
     

    </div>

    
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(createBranch);

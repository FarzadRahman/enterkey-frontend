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
import MyDataTable from "../../components/data-table/MyDataTable";

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
            My Leave Application
          </Typography>
        </div>
       
      </div>

      
      
        <MyDataTable></MyDataTable>

     


      
     

    </div>

    
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(createBranch);

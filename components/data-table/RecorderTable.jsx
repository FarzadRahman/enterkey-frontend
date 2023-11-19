import React, { Component,useState,useEffect } from 'react';
// import React, { useState, useEffect } from "react";
import 'datatables.net';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { BASE_URL } from "../../base";
//redux imports
import { connect } from "react-redux";


const RecorderTable = ({user})=> {


// var datatable;
const [Datatable, setDatatable] = useState();


let reloadTable=()=> {
  Datatable.ajax.reload();
}

useEffect(() => {

    //  Check if DataTable has already been initialized
     if (!$.fn.DataTable.isDataTable('#myTable')) {
      // Initialize DataTable with Bootstrap styling
    let  datatable= $('#myTable').DataTable({
        // DataTable options and configurations
        // For example:
        paging: true,
        searching: true,
        ordering: true,
        responsive: true,
        processing: true,
        serverSide: true,
        Filter: true,
        stateSave: true,
        type: "POST",
        "ajax": {
            "url": BASE_URL+'leave/application/for-recorder',
            "type": "POST",
              data: function (d) {
                d.token= user;
            
            },
        },
        columns: [
          {data: 'sender_name', name: 'sender_name'},
          {data: 'full_name', name: 'full_name'},
          {data: 'start_date', name: 'start_date'},
          {data: 'end_date', name: 'end_date'},
          {data: 'reason', name: 'reason'},
          {data: 'applied_total_days', name: 'applied_total_days'},
        ]
        // Add more options based on your requirements
      });
      setDatatable(datatable);
  }

 
}, []);


    return (
      <div>
      {/* <button onClick={reloadTable}>reload table</button> */}
     
        <table id="myTable"  className="display" >
        <thead>
              <tr>
                  <th>Sender</th>
                  <th>Approver Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reasonn</th>
                  <th>No of Days</th>
              
                
              </tr>
          </thead>
          <tbody>
          
          </tbody>
      
        </table>
        </div>
     
    );
    
  
  }


const mapStateToProps = (state) => {
  return {
    user: state.auth.token
  };
};


export default connect(mapStateToProps)(RecorderTable);
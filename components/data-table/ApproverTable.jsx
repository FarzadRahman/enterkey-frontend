import React, { Component,useState,useEffect } from 'react';
// import React, { useState, useEffect } from "react";
import 'datatables.net';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { BASE_URL } from "../../base";
//redux imports
import { connect } from "react-redux";


const ApproverTable = ({user})=> {


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
            "url": BASE_URL+'leave/application/for-approver',
            "type": "POST",
              data: function (d) {
                d.token= user;
            
            },
        },
        columns: [
          {data: 'full_name', name: 'full_name'},
          {data: 'recorder_name', name: 'recorder_name'},
          {data: 'start_date', name: 'start_date'},
          {data: 'end_date', name: 'end_date'},
          {data: 'reason', name: 'reason'},
          {data: 'applied_total_days', name: 'applied_total_days'},
          { "data": function(data){
            return ' <a href="/application/details/'+data.id+'">Show</a> ';
        },
        "orderable": false, "searchable":false, "name":"selected_rows" },
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
                  <th>Sender Name</th>
                  <th>Recorder Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reasonn</th>
                  <th>No of Days</th>
                  <th>Action</th>
              
                
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


export default connect(mapStateToProps)(ApproverTable);
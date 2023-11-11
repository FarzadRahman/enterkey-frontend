import React, { Component } from 'react';
import 'datatables.net';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';


class MyDataTable extends Component {
Datatable="";
  componentDidMount() {
     // Check if DataTable has already been initialized
     if (!$.fn.DataTable.isDataTable(this.refs.myTable)) {
    // Initialize DataTable with Bootstrap styling
    this.Datatable= $(this.refs.myTable).DataTable({
      // DataTable options and configurations
      // For example:
      paging: true,
      searching: true,
      ordering: true,
      // Add more options based on your requirements
    });
}
  }

  render() {
    return (
     
        <table ref="myTable"  className="display">
        <thead>
              <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start date</th>
                  <th>Salary</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>
                  <td>61</td>
                  <td>2011-04-25</td>
                  <td>$320,800</td>
              </tr>
              <tr>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>63</td>
                  <td>2011-07-25</td>
                  <td>$170,750</td>
              </tr>
              </tbody>
      
        </table>
     
    );
  }
}

export default MyDataTable;
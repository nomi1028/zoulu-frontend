import React from "react";
import SidebarWrapper from "./SideBarWrapper";
import { Table } from "reactstrap";
const AdminBooking = () => {
  return (
    <SidebarWrapper>
      <div className="container-fluid margin-sidebar">
        <body>
          <table>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </table>
          <table class="gfg">
            <tr style={{ background: "#FDFAF4" }}>
              <td class="geeks">10001</td>
              <td>Thomas</td>
              <td>M</td>
              <td>32</td>
            </tr>
            <tr style={{ background: "blue" }}>
              <td class="geeks">10002</td>
              <td>Sally</td>
              <td>F</td>
              <td>28</td>
            </tr>
            <tr style={{ background: "black" }}>
              <td class="geeks">10003</td>
              <td>Anthony</td>
              <td>M</td>
              <td>24</td>
            </tr>
          </table>
        </body>
      </div>
    </SidebarWrapper>
  );
};

export default AdminBooking;

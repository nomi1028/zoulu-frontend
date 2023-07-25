import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import SideBarWrapper from "./SideBarWrapper";
import { Api } from "../../utils/Api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loader from "../../Components/Loader";
import Pagination from "../../Components/Pagination";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import Styles from "../../styles/admindashbaord.module.css";
import AuthProtected from "../../utils/AuthProtected";
import CustomDeleteModal from "./Models/CustomDeleteModal";
const Index = () => {
  const today = new Date();
  const weekdays = [];
  const months = [];
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const days = [];
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [chart, setChart] = useState({
    series: [{ name: "Revenue", data: [9500, 40, 28, 8500, 42, 109, 12400] }],
    options: {
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      xaxis: { type: "category", categories: weekdays },
      chart: { toolbar: { show: false } },
      yaxis: {
        labels: {
          formatter: function (val) {
            if (val >= 1000) {
              return "€ " + (val / 1000).toFixed(2) + "k";
            } else {
              return "€ " + val.toFixed(2);
            }
          },
        },
      },
    },
  });
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const getAllCustomers = async (page) => {
    setLoading(true);
    const response = await Api("get", `api/admin/customer?page=${page}&limit=20`);
    if (response.status === 200) {
      if (pages.length === 0) {
        for (let i = 1; i <= response.data.pagination.pages; i++) {
          pages.push(i);
        }
        setPages(pages);
      }
      setCustomers(response.data.data);
      setLoading(false);
    } else {
      toast.error(response.data.msg);
      setLoading(false);
    }
    console.log("response=>", response);
  };
  const blockCutomer = async (unblock = true) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", currentCustomer?._id);
    formData.append("block", !currentCustomer?.block);
    const response = await Api("POST", `api/admin/changestatus`, formData);
    if (response.status === 200 || response.status === 201) {
      setLoading(false);
      setShowDeleteModal(false);
      let found = customers.find((e) => e._id === currentCustomer?._id);
      if (found) found.block = !currentCustomer?.block;
      setCustomers([...customers]);
      setCurrentCustomer(null);
    }
  };
  useEffect(() => {
    getAllCustomers(currentPage);
  }, [currentPage]);
  //* For Weeks
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    weekdays.push(weekday);
  }
  // * For Months
  for (let i = 0; i < 12; i++) {
    const month = new Date(today.getFullYear(), i, 1).toLocaleDateString("default", { month: "short" });
    months.push(month);
  }
  // * For days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <SideBarWrapper>
        <div className={`containerFluidAdmin mt-5 pt-4`}>
          <Grid container sapcing={1} className="mt-3">
            <Grid item lg={12} md={12} sm={12} style={{ overflow: "auto" }}>
              <Card style={{ boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)", border: "none", borderRadius: "10px" }} className="p-3">
                <div className={Styles.CustomerTable}>
                  <span>
                    <h5 className="m-0">All Customers</h5>
                  </span>
                </div>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Phone Number</TableCell>
                        <TableCell align="left">Gender</TableCell>
                        <TableCell align="left">Verified</TableCell>
                        <TableCell align="left">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers?.map((customer, index) => (
                        <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell className="text-capitalize" align="left">
                            {customer?.name || "-"}
                          </TableCell>
                          <TableCell align="left" className="text-capitalize">
                            {customer?.email || "-"}
                          </TableCell>
                          <TableCell align="left" className="text-capitalize">
                            {customer?.phone_number || "----"}
                          </TableCell>
                          <TableCell align="left" className="text-capitalize">
                            {customer?.gender || "-"}
                          </TableCell>
                          <TableCell align="left" className="text-capitalize">
                            {customer?.verified ? "Yes" : "No"}
                          </TableCell>
                          <TableCell align="left" className="text-capitalize d-flex">
                            {customer.block ? (
                              <div
                                className="btn-unblock-customer"
                                onClick={() => {
                                  setCurrentCustomer(customer);
                                  setShowDeleteModal(true);
                                }}
                              >
                                Unblock
                              </div>
                            ) : (
                              <div
                                className="btn-block-customer"
                                onClick={() => {
                                  setCurrentCustomer(customer);
                                  setShowDeleteModal(true);
                                }}
                              >
                                Block
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {customers?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
              </Card>
            </Grid>
          </Grid>
        </div>
        {loading ? <Loader /> : null}
      </SideBarWrapper>
      {showDeleteModal && (
        <CustomDeleteModal
          showModal={showDeleteModal}
          hideModal={() => setShowDeleteModal(false)}
          title="Confirmation"
          subTitle="Are you sure you want to Block this Customer ?"
          callback={() => blockCutomer()}
          setLoading={setLoading}
          btnTitle={currentCustomer?.block ? "Unblock" : "Block"}
        />
      )}
    </Fragment>
  );
};
export default AuthProtected(Index);

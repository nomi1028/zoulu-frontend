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
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Fragment } from "react";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import Pagination from "../../Components/Pagination";
import AuthProtected from "../../utils/AuthProtected";
const Index = () => {
  const [bookings, setBookings] = useState([]);
  const [row, setRow] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const getAllBookings = async (page) => {
    setLoading(true);
    const response = await Api("get", `api/admin/booking?limit=20&page=${page}`);
    if (response.status === 200) {
      if (pages.length === 0) {
        for (let i = 1; i <= response.data.pagination.pages; i++) {
          pages.push(i);
        }
        setPages(pages);
      }
      setBookings(response.data.data);
      setLoading(false);
    } else toast.error(response.data.msg);
  };
  useEffect(() => {
    getAllBookings(currentPage);
  }, [currentPage]);
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <SideBarWrapper>
        <div className={`containerFluidAdmin mt-5 pt-2`}>
          <Grid container sapcing={1} className="mt-5">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">Service Name</TableCell>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="left">Total Charges</TableCell>
                    <TableCell align="left">Created at</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {bookings?.map((row, index) =>
                    row?.products?.map((product, i) => (
                      <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }} onClick={() => setRow(row)}>
                        <TableCell className="text-capitalize" align="left"></TableCell>
                        <TableCell className="text-capitalize" align="left">
                          {product?.service_id?.name}
                        </TableCell>

                        <TableCell align="left" className="text-capitalize">
                          {row?.address ? row?.address?.slice(0, 40) : "N/A"}
                        </TableCell>
                        <TableCell align="left">€ {product?.charges?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                        <TableCell align="left" className="text-capitalize">
                          {moment(row?.created_at).format("lll")}
                        </TableCell>
                        <TableCell align="left" className="text-capitalize">
                          <div style={product?.status === "pending" || product?.status === "completed" ? PendingBtn : product?.status === "confirmed" ? ApprovedBtn : CancelBtn}>{product?.status}</div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {bookings?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
          </Grid>
        </div>
      </SideBarWrapper>
    </Fragment>
  );
};

export default AuthProtected(Index);

export const ApprovedBtn = {
  color: "rgb(48, 213, 200)",
  background: "rgba(48, 213, 200,0.2)",
  padding: "2px 0",
  width: 110,
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "PlusJakartaSans-Medium",
  textAlign: "center",
};
export const PendingBtn = {
  color: "rgb(66,124,255)",
  background: "rgba(66,124,255,0.2)",
  padding: "2px 0",
  width: 110,
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "PlusJakartaSans-Medium",
  textAlign: "center",
};
export const CancelBtn = {
  color: "rgb(246, 0, 21)",
  background: "rgba(246, 0, 21,0.2)",
  padding: "2px 0",
  width: 110,
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "PlusJakartaSans-Medium",
  textAlign: "center",
};

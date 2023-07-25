import React, { Fragment, useEffect, useState } from "react";
import SideBarWrapper from "./SideBarWrapper";
import { Api } from "../../utils/Api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import ChangeExpertStatusModal from "./Models/ChangeExpertStatusModal";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import Pagination from "../../Components/Pagination";
import AuthProtected from "../../utils/AuthProtected";
const Index = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [query, setQuery] = useState("requests");
  const [experts, setExperts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const getAllExperts = async (page) => {
    if (query) {
      setLoading(true);
      const response = await Api("get", `api/admin/expert?limit=20&page=${page}&type=${query}`);
      if (response.status === 200) {
        setLoading(false);
        if (pages.length === 0) {
          for (let i = 1; i <= response.data.pagination.pages; i++) {
            pages.push(i);
          }
          setPages(pages);
        }
        setExperts(response.data.data);
      } else {
        setLoading(false);
        toast.error(response.data.msg);
      }
    }
  };
  useEffect(() => {
    getAllExperts(currentPage);
  }, [currentPage, query]);
  const changeStatus = async (status) => {
    setLoading(true);
    const response = await Api("get", `api/admin/expert/${row?.user_id?._id}`);
    if (response.status === 200) {
      setLoading(false);
      getAllExperts();
      setShowModal(false);
    } else {
      setLoading(false);
      toast.error(response.data.msg);
    }
  };
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <SideBarWrapper>
        <div className={`containerFluidAdmin mt-5 pt-4`}>
          <div>
            <div className="dahboard-tabs mt-3">
              {["requests", "updated service request"].map((item, i) => {
                return (
                  <div className="ml-2 mr-2">
                    <div className="settingtab-branch">
                      <div className="array-flex-show-branch">
                        <div
                          className={i > tabIndex ? "tab_textBox_style" : i === tabIndex ? "tab_textBox_style_last" : "tab_textBox_style_active"}
                          onClick={() => {
                            setTabIndex(i);
                            setQuery(item === "updated service request" ? "updated" : item);
                          }}
                        >
                          <div className="padsding-Branch-setting text-capitalize">{item}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Grid container sapcing={1} className="mt-5">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Phone Number</TableCell>
                    <TableCell align="left">Gender</TableCell>
                    <TableCell align="left">Location</TableCell>
                    <TableCell align="left">Radius</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {experts?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setRow(row);
                        setShowModal(true);
                      }}
                    >
                      <TableCell component="th" scope="row" className="text-capitalize">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-capitalize" align="left">
                        {row?.user_id?.name}
                      </TableCell>
                      <TableCell align="left">{row?.user_id?.email}</TableCell>
                      <TableCell align="left">{row?.user_id?.phone_number}</TableCell>
                      <TableCell align="left" className="text-capitalize">
                        {row?.user_id?.gender}
                      </TableCell>
                      <TableCell align="left" className="text-capitalize">
                        {/* {row?.questions?.find((e) => e?.question === "Location")?.answer?.slice(0, 40)} */}
                        {row?.user_id?.address}
                      </TableCell>
                      <TableCell align="left" className="text-capitalize">
                        {row?.radius} km
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {experts?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
          </Grid>
        </div>
      </SideBarWrapper>
      {showModal && <ChangeExpertStatusModal showModal={showModal} data={row} title={"Application Review"} hideModal={() => setShowModal(false)} callback={(status) => changeStatus(status)} />}
    </Fragment>
  );
};
export default AuthProtected(Index);

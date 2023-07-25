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
import CustomDeleteModal from "./Models/CustomDeleteModal";
const Index = () => {
  const [experts, setExperts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const getAllExperts = async (page) => {
    setLoading(true);
    const response = await Api("get", `api/admin/expert?limit=20&page=${page}&type=all`);
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
  };
  useEffect(() => {
    getAllExperts(currentPage);
  }, [currentPage]);
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
  const blockCutomer = async (unblock = true) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", row?.user_id?._id);
    formData.append("block", !row?.user_id?.block);
    const response = await Api("POST", `api/admin/changestatus`, formData);
    if (response.status === 200 || response.status === 201) {
      setLoading(false);
      setShowDeleteModal(false);
      getAllExperts();
      setRow(null);
    }
  };
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
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Phone Number</TableCell>
                    <TableCell align="left">Gender</TableCell>
                    <TableCell align="left">Location</TableCell>
                    <TableCell align="left">Radius</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {experts?.map((row, index) => (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="text-capitalize"
                        onClick={() => {
                          setRow(row);
                          setShowModal(true);
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        className="text-capitalize"
                        align="left"
                        onClick={() => {
                          setRow(row);
                          setShowModal(true);
                        }}
                      >
                        {row?.user_id?.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={() => {
                          setRow(row);
                          setShowModal(true);
                        }}
                      >
                        {row?.user_id?.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={() => {
                          setRow(row);
                          setShowModal(true);
                        }}
                      >
                        {row?.user_id?.phone_number}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="text-capitalize"
                        onClick={() => {
                          setRow(row);
                          setShowModal(true);
                        }}
                      >
                        {row?.user_id?.gender}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="text-capitalize"
                        onClick={() => {
                          setRow(row);
                          setShowModal(true);
                        }}
                      >
                        {row?.user_id?.address}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="text-capitalize"
                        onClick={() => {
                          setRow(row);
                          setShowModal(true);
                        }}
                      >
                        {row?.radius} km
                      </TableCell>
                      <TableCell align="left" className="text-capitalize d-flex">
                        {row?.user_id?.block ? (
                          <div
                            className="btn-unblock-customer"
                            onClick={() => {
                              setRow(row);
                              setShowDeleteModal(true);
                            }}
                          >
                            Unblock
                          </div>
                        ) : (
                          <div
                            className="btn-block-customer"
                            onClick={() => {
                              setRow(row);
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
            {experts?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
          </Grid>
        </div>
      </SideBarWrapper>
      {showModal && (
        <ChangeExpertStatusModal showModal={showModal} data={row} title={row?.user_id?.name} hideModal={() => setShowModal(false)} callback={(status) => changeStatus(status)} action={"view"} />
      )}
      {showDeleteModal && (
        <CustomDeleteModal
          showModal={showDeleteModal}
          hideModal={() => setShowDeleteModal(false)}
          title="Confirmation"
          subTitle={`Are you sure you want to ${row?.user_id?.block ? "Unblock" : "block"} this Customer ?`}
          callback={() => blockCutomer()}
          setLoading={setLoading}
          btnTitle={row?.user_id?.block ? "Unblock" : "Block"}
        />
      )}
    </Fragment>
  );
};
export default AuthProtected(Index);

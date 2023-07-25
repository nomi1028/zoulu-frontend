import React, { useState, useEffect, Fragment } from "react";
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
import AddServiceModal from "./Models/AddServiceModal";
import { FiEdit2 } from "react-icons/fi";
import { ImBin2 } from "react-icons/im";
import CustomDeleteModal from "./Models/CustomDeleteModal";
import { toast } from "react-toastify";
import Pagination from "../../Components/Pagination";
import Loader from "../../Components/Loader";
import { IoIosAdd } from "react-icons/io";
import AuthProtected from "../../utils/AuthProtected";
const Index = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionType, setActionType] = useState("add");
  const [service, setService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllServices = async (page) => {
    setLoading(true);
    const response = await Api("get", `api/admin/service?page=${page}&limit=20`);
    if (response.status === 200) {
      setLoading(false);
      setServices(response.data.data);
      if (pages.length === 0) {
        for (let i = 1; i <= response.data.pagination.pages; i++) {
          pages.push(i);
        }
        setPages(pages);
      }
    } else {
      setLoading(false);
      toast.warning(response.data.msg);
    }
  };
  useEffect(() => {
    getAllServices(currentPage);
  }, [currentPage]);
  const deleteService = async () => {
    setLoading(true);
    const response = await Api("DELETE", `api/admin/service/${service?._id}`);
    if (response.status === 200 || response.status === 201) {
      setLoading(false);
      setShowDeleteModal(false);
      setServices(services?.filter((e) => e._id !== service?._id));
    } else {
      setLoading(false);
      toast.warning(response.data.msg);
    }
  };
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <SideBarWrapper>
        <div className={`containerFluidAdmin mt-5 pt-4`}>
          <div className="row d-flex justify-content-end">
            <div className="col-lg-3 col-md-4 col-sm-4 col-6 d-flex justify-content-end">
              <div
                onClick={() => {
                  setActionType("add");
                  setShowModal(true);
                }}
                className="add-category-btn"
              >
                <IoIosAdd className="IoIosAdd-addCategory" />
                Add New
              </div>
            </div>
          </div>
          <Grid container sapcing={1} className="mt-3">
            <Grid item lg={12} md={12} sm={12} xs={12}></Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Subcategory</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map((row, index) => (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell className="text-capitalize" align="left">
                        {row?.name}
                      </TableCell>
                      <TableCell align="left" className="text-capitalize">
                        {row?.category_id?.name}
                      </TableCell>
                      <TableCell align="left">{row?.sub_category_id?.name || "N/A"}</TableCell>
                      <TableCell align="left" className="text-capitalize">
                        <span>
                          <FiEdit2
                            className="service-icons"
                            onClick={() => {
                              setService(row);
                              setActionType("edit");
                              setShowModal(true);
                            }}
                          />
                        </span>
                        <span>
                          <ImBin2
                            className="service-icons"
                            onClick={() => {
                              setService(row);
                              setShowDeleteModal(true);
                            }}
                          />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {services?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
          </Grid>
        </div>
      </SideBarWrapper>
      {showModal && (
        <AddServiceModal
          showModal={showModal}
          hideModal={(e) => setShowModal(e)}
          services={(data) => {
            services.unshift(data);
            setServices(services);
          }}
          actionType={actionType}
          data={service}
          callback={() => getAllServices()}
          setLoading={setLoading}
        />
      )}
      {showDeleteModal && (
        <CustomDeleteModal
          showModal={showDeleteModal}
          hideModal={() => setShowDeleteModal(false)}
          title="Confirmation"
          subTitle="Are you sure you want to delete this service ? This can't be undone."
          callback={() => deleteService()}
          setLoading={setLoading}
        />
      )}
    </Fragment>
  );
};

export default AuthProtected(Index);

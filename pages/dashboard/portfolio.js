import React, { useEffect } from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/customer.module.css";
import { useState } from "react";
import Loader from "../../Components/Loader";
import { IoIosAddCircle } from "react-icons/io";
import AuthProtected from "../../utils/AuthProtected";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
var jwt = require("jsonwebtoken");

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../../utils/Api";
import { BsTrash } from "react-icons/bs";
import CustomDeleteModal from "../adminDashboard/Models/CustomDeleteModal";
const Index = () => {
  const [confirmDelete, setConfirmDelete] = useState();
  const [values, setValues] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [uploadfile, setUploadFile] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValues(token?.data);
  }, []);
  const addAvailability = async (e) => {
    if (uploadfile.length > 0) {
      setLoading(true);
      const data = {
        long: values?.profile[0]?.location?.coordinates[0],
        lat: values?.profile[0]?.location?.coordinates[1],
      };
      const payload = new FormData();
      for (let i = 0; i < uploadfile.length; i++) {
        payload.append("portfolio", uploadfile[i]);
      }
      payload.append(
        "availability",
        JSON.stringify(values?.profile[0]?.availability)
      );
      payload.append(`expertId`, values?._id);
      payload.append(`coordinates`, JSON.stringify(data));
      payload.append(`name`, values?.name);
      payload.append(`address`, values?.address);
      payload.append(`radius`, values?.profile[0].radius);
      payload.append(`gender`, values?.gender);
      payload.append("addCertificates", false);
      const response = await Api("put", `api/profile/${values?._id}`, payload);
      if (response?.status === 200) {
        localStorage.setItem("zolu-auth-token", response?.data?.data);
        localStorage.setItem("zolu-auth-token-expert", response?.data?.data);
        setUploadFile([]);
        getUserData();
        setLoading(false);
        toast.success(response?.data?.msg);
      } else {
        setLoading(false);
        toast.error(response.data.msg);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [values]);
  const getUserData = async () => {
    setLoading(true);
    if (values) {
      const response = await Api("get", `api/profile/${values?._id}`);
      if (response?.status === 200) {
        console.log(response?.data?.data?.profile[0].portfolio);
        setPortfolio(response?.data?.data?.profile[0].portfolio);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  const filehandler = (event) => {
    console.log(event);
    var data = uploadfile;
    var event = event;
    var newData = [];
    for (const eventValue of event) {
      newData.push(eventValue);
    }
    setUploadFile([...uploadfile, ...newData]);
  };
  const removeHandler = async (id, data) => {
    setLoading(true);
    if (data == "database") {
      const data = {
        long: values?.profile[0]?.location?.coordinates[0],
        lat: values?.profile[0]?.location?.coordinates[1],
      };
      const payload = new FormData();
      payload.append("portfolioID", id);
      payload.append(
        "availability",
        JSON.stringify(values?.profile[0]?.availability)
      );
      payload.append(`expertId`, values?._id);
      payload.append(`coordinates`, JSON.stringify(data));
      payload.append(`name`, values?.name);
      payload.append(`address`, values?.address);
      payload.append(`radius`, values?.profile[0].radius);
      payload.append(`gender`, values?.gender);
      payload.append("addCertificates", false);
      const response = await Api("put", `api/profile/${values?._id}`, payload);
      if (response?.status === 200) {
        localStorage.setItem("zolu-auth-token", response?.data?.data);
        localStorage.setItem("zolu-auth-token-expert", response?.data?.data);
        setShowDeleteModal(false);
        setUploadFile([]);
        getUserData();
        setLoading(false);
        toast.success(response?.data?.msg);
      } else {
        setLoading(false);
        toast.error(response.data.msg);
      }
    } else if (data == "front") {
      var value = uploadfile?.filter((item, i) => {
        if (i !== id) {
          return item;
        }
      });
      setUploadFile(value);
      setLoading(false);
      setShowDeleteModal(false);
    }
  };
  return (
    <>
      {loading ? <Loader /> : null}
      <SidebarWrapper style={{ backgroundColor: "white" }}>
        <div className="container-fluid margin-sidebar">
          <div className="row pt-5 mt-5">
            {portfolio?.map((data, i) => {
              return (
                data?.filename?.split(".").pop() != "pdf" && (
                  <div className=" col-xl-3 col-lg-4 col-md-6 col-sm-7 col-xs-12 col-12 pad-small-zero mb-3">
                    <div className={styles.portfolioImageHeader}>
                      <img
                        src={data?.filename}
                        onClick={() => window.open(data?.filename, "_blank")}
                        width="100%"
                        height="320px"
                        style={{
                          borderTopLeftRadius: "9px",
                          borderTopRightRadius: "9px",
                          objectFit: "contain",
                        }}
                      ></img>
                      <div className={`${styles.CrossIconContainer}`}>
                        <BsTrash
                          className="positionIconCross"
                          onClick={() => {
                            setConfirmDelete({
                              id: data?._id,
                              check: "database",
                            });
                            setShowDeleteModal(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              );
            })}
            {portfolio?.map((data, i) => {
              return (
                data?.filename?.split(".").pop() == "pdf" && (
                  <div className=" col-xl-3 col-lg-4 col-md-6 col-sm-7 col-xs-12 col-12 pad-small-zero mb-3">
                    <div className={styles.portfolioImageHeader}>
                      {console.log(data?.filename)}
                      <iframe
                        src="http://res.cloudinary.com/dutqh6vja/image/upload/v1682679956/lokzmgwf9q0nz7ekkgge.pdf"
                        onClick={() => window.open(data?.filename, "_blank")}
                        type="application/pdf"
                        width="100%"
                        height="320px"
                        style={{
                          borderTopLeftRadius: "9px",
                          borderTopRightRadius: "9px",
                        }}
                      ></iframe>
                      <div className={`${styles.CrossIconContainer}`}>
                        <BsTrash
                          className="positionIconCross"
                          onClick={() => {
                            setConfirmDelete({
                              id: data?._id,
                              check: "database",
                            });
                            setShowDeleteModal(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              );
            })}
            {uploadfile?.map((data, i) => {
              return (
                <div className=" col-xl-3 col-lg-4 col-md-6 col-sm-7 col-xs-12 col-12 pad-small-zero mb-3">
                  <div className={styles.portfolioImageHeader}>
                    {data && (
                      <object
                        data={URL.createObjectURL(data)}
                        width="100%"
                        height="320px"
                        style={{
                          borderTopLeftRadius: "9px",
                          borderTopRightRadius: "9px",
                          objectFit: "cover",
                        }}
                        onClick={() =>
                          window.open(URL.createObjectURL(data), "_blank")
                        }
                      ></object>
                    )}
                    <div className={`${styles.CrossIconContainer}`}>
                      <BsTrash
                        className="positionIconCross"
                        onClick={() => {
                          setConfirmDelete({ id: i, check: "front" });
                          setShowDeleteModal(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="col-xl-1 col-lg-1 col-md-2 col-sm-3 col-xs-4 col-4 "
              style={{ display: "flex", alignItems: "center", height: "320px" }}
            >
              <input
                id="inputLabel"
                type={"file"}
                style={{ display: "none" }}
                multiple
                onChange={(e) => filehandler(e.target.files)}
              />
              <label for="inputLabel" className={`${styles.addIconContainer}`}>
                <IoIosAddCircle className={`${styles.IoIosAddCircleIcon}`} />
              </label>
            </div>
          </div>
          {/* <div className="heightWidthCard"></div> */}
          <div
            style={{
              marginLeft: "20px",
              marginTop: "40px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "flex-end",
              float: "right",
            }}
          >
            <ZouluButton
              title="Aktualisieren"
              className="updatePortfoliobuton"
              onClick={() => addAvailability()}
            />
          </div>
        </div>
        {showDeleteModal && (
          <CustomDeleteModal
            showModal={showDeleteModal}
            hideModal={() => setShowDeleteModal(false)}
            title="Bestätigen"
            subTitle="Sind Sie sicher, dass Sie die Buchung stornieren möchten ? Das kann nicht rückgängig gemacht werden"
            callback={() =>
              removeHandler(confirmDelete?.id, confirmDelete?.check)
            }
            setLoading={setLoading}
          />
        )}
      </SidebarWrapper>
    </>
  );
};

export default AuthProtected(Index);

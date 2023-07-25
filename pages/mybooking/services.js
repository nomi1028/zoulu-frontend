import React, { Fragment, useState } from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/treatment.module.css";
import style from "../../styles/services.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Api } from "../../utils/Api";
import { useEffect } from "react";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
var jwt = require("jsonwebtoken");
const Index = (props) => {
  const [booking, setBookings] = React.useState();
  const [loading, setLoading] = React.useState();
  const [categories, setCategories] = React.useState();
  const [services, setServices] = useState();
  const [uploadfile, setUploadFile] = useState([]);
  const [value, setValue] = useState();
  useEffect(() => {
    console.log("useEffect is running");
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    console.log(token, "token");
    setValue(token?.data?.expert?._id);
  }, [value]);
  useEffect(() => {
    if (value) getbooking();
    getCategory();
    getServices();
  }, [loading, value]);
  const getbooking = async () => {
    const response = await Api("get", `/api/customer/getexperts?_id=${value}`);
    if (response.status === 200) {
      setLoading(true);

      console.log(response?.data?.data?.experts?.treatments);
      setBookings(response?.data?.data?.experts?.treatments);
    }
  };
  const getServices = async () => {
    const response = await Api("get", `api/customer/getservices`);
    if (response.status === 200) {
      setServices(response?.data?.data?.services);
      console.log(response?.data?.data?.services, "response?.data?.data?.services");
    } else {
    }
  };
  const getCategory = async () => {
    const response = await Api("get", `api/customer/getcategory`);
    if (response.status === 200) {
      setCategories(response?.data?.data?.categories);
    } else {
    }
  };
  console.log(booking, "booking");
  console.log(services, "services");
  console.log(categories, "categories");
  const handleButton = (id) => {
    const find = booking?.find((element) => element === id);
    console.log(find, "find");
    return find;
  };
  const filehandler = (event) => {
    setUploadFile([...uploadfile, event.target.files[0]]);
  };
  const handlerUploadFile = () => {};
  return (
    <SidebarWrapper>
      <div className={`container-fluid  margin-sidebar`}>
        {categories?.map((data, index) => {
          return (
            <Fragment key={index}>
              <span className={styles.TreatmentHeading}>{data?.name}</span>
              <div className="row" style={{ paddingLeft: "10px" }}>
                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
                  {services?.map((service, index) => {
                    return (
                      <>
                        {service?.categoryId?._id === data?._id ? (
                          <div className={styles.Display} key={index}>
                            <div className={styles.AllDotsContainer}>
                              <div className={styles.TreatmentDotOne}></div>
                            </div>
                            <span className={styles.TreatmentText}>{service?.name}</span>
                          </div>
                        ) : null}
                      </>
                    );
                  })}
                </div>
                {handleButton(data?._id) === undefined && (
                  <div className={style.MarginTopClassForButton}>
                    <label for="upload" startIcon={<AiOutlineCloudUpload style={{ color: "white" }} />} className={style.IconButton} variant="contained">
                      Upload Certifcate
                    </label>
                    <input type="file" name="upload" id="upload" onChange={(e) => filehandler(e)} style={{ display: "none" }} />
                  </div>
                )}
              </div>
            </Fragment>
          );
        })}
        {uploadfile.length !== 0 && (
          <ZouluButton
            title="Upload "
            className={`${style.SignUpButtonn} mt-5 `}
            onClick={() => {
              handlerUploadFile();
            }}
          />
        )}
        <br />
      </div>
    </SidebarWrapper>
  );
};
export default Index;

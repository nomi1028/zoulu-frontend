import React, { useState } from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/treatment.module.css";
import style from "../../styles/services.module.css";
import { Api } from "../../utils/Api";
import { useEffect } from "react";
import { Row, Col, FormGroup, Label } from "reactstrap";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader";
import { IconButton } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import AuthProtected from "../../utils/AuthProtected";
import PriceModal from "./home/PriceModal";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
var jwt = require("jsonwebtoken");
const Index = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [booking, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState();
  const [packagesData, setpackagesData] = useState([]);
  const [packages, setpackage] = useState([]);
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [uploadfile, setUploadFile] = useState([{ name: "", desc: "", image: null }]);
  const [value, setValue] = useState();
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValue(token?.data);
    filterData(token?.data?._id);
    getCategory();
  }, []);
  const getCategory = async () => {
    setLoading(true);
    const response = await Api("get", `api/category`);
    if (response.status === 200) {
      setLoading(false);
      setCategories(response?.data?.data);
    } else {
      setLoading(false);
    }
  };
  const getUserData = async (id) => {
    setLoading(true);
    const response = await Api("get", `api/profile/${id}`);
    if (response.status === 200) {
      setLoading(false);
      const data = response.data.data;
      setTreatments(data?.profile[0]?.treatments);
    }
  };
  const getpakages = async (id) => {
    setLoading(true);
    const response = await Api("get", `api/expertPackage/${id}`);
    if (response.status === 200) {
      setpackage(response.data.data);
    }
    setLoading(false);
  };
  const handleButton = (id) => {
    const find = treatments?.find((element) => element?.category_id === id);
    return find;
  };
  const filehandler = (event, id) => {
    const Data = uploadfile.filter((item, index) => {
      if (item?.id !== id && item?.id !== undefined) {
        return item;
      }
    });
    const newData = [
      ...Data,
      {
        image: event.target.files[0],
        imageName: URL.createObjectURL(event.target.files[0]),
        id: id,
      },
    ];
    setBookings([...booking, id]);
    setUploadFile(newData);
  };
  const handlerUploadFile = async () => {
    if (booking?.length > 0) {
      setLoading(true);
      const letters = new Set(booking);
      const array = Array.from(letters);
      const data = {
        lat: value?.profile[0]?.location?.coordinates[1],
        long: value?.profile[0]?.location?.coordinates[0],
      };
      const payload = new FormData();
      payload.append("id", value?._id);
      payload.append("name", value?.name);
      payload.append("email", value?.email);
      payload.append("coordinates", JSON.stringify(data));
      payload.append("gender", value?.gender);
      payload.append("phone_number", value?.phone_number);
      payload.append("role", value?.role);
      payload.append("radius", value?.profile[0]?.radius);
      payload.append("availability", JSON.stringify(value?.profile[0]?.availability));
      for (let i = 0; i < uploadfile.length; i++) {
        payload.append("certificates", uploadfile[i].image);
      }
      payload.append("categories", JSON.stringify(array));
      payload.append("addCertificates", true);
      const response = await Api("put", `api/profile/${value?._id}`, payload);
      if (response.status === 200) {
        setLoading(false);
        toast.success(response?.data?.msg);
        getUserData(value?._id);
        setUploadFile([]);
      }
    } else {
      setLoading(false);
      toast.warning(response.data.msg);
    }
  };
  const findOtherServices = () => {
    if (loading === false && categories?.length > 0 && treatments?.length > 0) {
      let arr = [];
      let ids = treatments?.map((e) => e?.category_id?._id);
      for (const other of categories) {
        if (!ids.includes(other?._id)) {
          arr.push(other);
        }
      }
      console.log(arr);
      return arr;
    }
  };
  const priceHandler = (data) => {
    setCategory(data);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handlerInput = (e, packag, key, document_id, parentIndex) => {
    treatments[parentIndex].isEdited = true;
    packag[key].price = e?.target.value;
    packag[key].isEdited = true;
    packag[key].document_id = packag[key].expertpakageId;

    setpackagesData(packag);
    setTreatments([...treatments]);
  };
  const hanlderPrices = async () => {
    if (profile.availability.length === 0) {
      return toast.warning("Add your availability first");
    }
    if (profile.stripe_account_id === null) {
      return toast.warning("Add your stripe account id");
    }
    if (profile.radius === 0) {
      return toast.warning("Add your radius");
    }
    let find = treatments?.find((e) => e?.isEdited);
    let result = find?.category_id?.services.find((e) => e?.isEdited);
    console.log(result);
    let serviceData = {
      service_price: result?.price,
      service_id: result?._id,
      service_duration: result?.duration,
    };
    let packagelist = result?.packages?.filter((e) => e?.isEdited);
    const payload = new FormData();
    payload.append("array", JSON.stringify(packagelist));
    if (serviceData) {
      payload.append("serviceData", JSON.stringify(serviceData));
      payload.append("service_id", JSON.stringify(result?._id));
    }
    if (serviceData || result?.length > 0) {
      setLoading(true);
      const response = await Api("POST", `api/expertPackage/${value?._id}`, payload);
      if (response?.status === 200) {
        setLoading(false);
        toast.success(response?.data?.msg);
        filterData(value?._id);
      } else {
        setLoading(false);
        toast.warning(response.data.msg);
      }
    }
  };
  const filterData = async (id) => {
    const responsed = await Api("get", `api/profile/${id}`);
    let data;
    if (responsed.status === 200) {
      setProfile(responsed.data.data.profile[0]);
      data = responsed.data.data?.profile[0]?.treatments;
    }
    const response = await Api("get", `api/expertPackage/${id}`);
    let pkg;
    if (response.status === 200) {
      pkg = response.data.data;
    }
    for (const obj of pkg) {
      for (const treatment of data) {
        for (const service of treatment?.category_id?.services) {
          if (obj?.services?.service_id?._id === service?._id) {
            service.price = obj.services.price;
          }
          for (const packageData of service?.packages) {
            for (const expertpakage of obj?.services?.packages) {
              if (expertpakage.package_id._id === packageData._id) {
                packageData.price = expertpakage.price;
                packageData.pkgid = obj._id;
                packageData.expertpakageId = expertpakage.package_id._id;
              }
            }
          }
        }
      }
    }
    setTreatments(data);
    setpackage(pkg);
  };

  const dotColor = ["#30D5C8", "#F96E01", "#DCD6CD"];
  const packageHandler = (service) => {
    for (const optn of service?.options) {
      var status = service?.packages?.filter((data) => {
        if (data?.option_id == optn?._id && optn?.mandatory === true) {
          return data;
        }
      });
      if (status.length > 0) {
        // terminate the loop if status has at least one element
        return true;
      }
    }
    return false; // return false if none of the options had a package
  };
  return (
    <>
      {loading ? <Loader /> : null}
      <SidebarWrapper>
        <div className={`container-fluid  margin-sidebar`}>
          <div className={`${styles.backgroundCard}`}>
            <div className={`${styles.myServicesHeading} mt-5 pt-3`} style={{ fontFamily: "PlusJakartaSans-Regular" }} onClick={() => filterData()}>
              Meine Behandlungen
            </div>
            <div>
              <Row>
                {treatments?.map((data, index) =>
                  data?.approved ? (
                    <>
                      {console.log(treatments, "treatments")}
                      <span className={`${styles.TreatmentHeading} text-capitalize`}>{data?.category_id?.name}</span>
                      {data?.category_id?.services?.map((service, ind) => {
                        if (service?.deleted == false) {
                          return (
                            <>
                              <Col sm={6} md={6} lg={6} className="AccordionSummary-borderServices mb-2">
                                <Accordion expanded={expanded === service._id} onChange={handleChange(service._id)}>
                                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                    <Typography sx={{ width: "100%", flexShrink: 0 }} className="text-capitalize">
                                      {service?.name}
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <h6
                                      style={{
                                        fontFamily: "PlusJakartaSans-medium",
                                      }}
                                      className="mb-3"
                                    >
                                      Servicepreis hinzufügen <span style={{ marginLeft: "4px" }}>({service?.duration} Min)</span>
                                    </h6>
                                    <Row>
                                      <Col sm={12} md={12} lg={12} className="mb-3">
                                        <TextField
                                          disabled={packageHandler(service)}
                                          label="Preis"
                                          id="outlined-size-small"
                                          value={service?.price}
                                          defaultValue={service?.price}
                                          onChange={(e) => {
                                            data.category_id.services[ind].price = e.target.value;
                                            data.category_id.services[ind].isEdited = true;
                                            treatments[index].isEdited = true;
                                            setTreatments([...treatments]);
                                          }}
                                          size="small"
                                          fullWidth
                                        />
                                      </Col>
                                    </Row>
                                    <h6
                                      className="mb-3"
                                      style={{
                                        fontFamily: "PlusJakartaSans-medium",
                                        fontWeight: "600",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Optionen
                                    </h6>
                                    <Row className="d-flex flex-wrap mt-2">
                                      {service?.packages?.map((packaged, key) => {
                                        if (packaged.deleted !== true)
                                          return (
                                            <Col xs={12} sm={10} md={6} lg={6} key={key}>
                                              <FormGroup row>
                                                <div className="col-12 col-lg-12 label d-flex">
                                                  <Label htmlFor="address" className="service-label text-capitalize">
                                                    {packaged?.title}{" "}
                                                    <span
                                                      style={{
                                                        marginLeft: "4px",
                                                      }}
                                                    >
                                                      ({packaged?.duration} Min)
                                                    </span>
                                                  </Label>
                                                  <div className="steric-style ml-1">*</div>
                                                </div>
                                                <div className="col-12 col-lg-12">
                                                  <div className="form-group mt-1">
                                                    <TextField
                                                      label="Add Price"
                                                      id="outlined-size-small"
                                                      value={packaged?.price}
                                                      onChange={(e) => {
                                                        handlerInput(e, service?.packages, key, data?._id, index);
                                                        data.category_id.services[ind].isEdited = true;
                                                      }}
                                                      size="small"
                                                      fullWidth
                                                    />
                                                  </div>
                                                </div>
                                              </FormGroup>
                                            </Col>
                                          );
                                      })}
                                    </Row>
                                  </AccordionDetails>
                                  <ZouluButton title="Preis aktualisieren " className={`${style.updateServiceBtn} mt-5 `} onClick={() => hanlderPrices()} />
                                </Accordion>
                              </Col>
                            </>
                          );
                        }
                      })}
                    </>
                  ) : null
                )}
              </Row>
              {findOtherServices()?.length > 0 ? (
                <>
                  <hr style={{ height: 4 }} />
                  <div className={`${styles.myServicesHeading} mt-3`} style={{ fontFamily: "PlusJakartaSans-Regular" }}>
                    Weitere Behandlungen anbieten
                  </div>
                </>
              ) : null}
              {findOtherServices()?.map((data, index) => (
                <>
                  <div>
                    <Row className="mt-3">
                      <Col xs={7} sm={6} md={5} lg={2}>
                        <span className={`${styles.TreatmentHeadingOtherSerivces} text-capitalize`}>{data?.name}</span>
                      </Col>
                      <Col xs={5} sm={4} md={3} lg={2}>
                        {handleButton(data?._id) === undefined && (
                          <IconButton color="primary" aria-label={index} component="label" sx={{ marginLeft: "0.5rem" }}>
                            <input hidden accept="image/*" type="file" onChange={(e) => filehandler(e, data?._id)} id={index} />
                            <CloudUpload />
                          </IconButton>
                        )}
                        {uploadfile?.map((file, id) => {
                          if (file?.id === data?._id) {
                            return (
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textTransform: "capitalize",
                                  marginLeft: "0.5rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => window.open(file?.imageName, "blank")}
                              >
                                View
                              </span>
                            );
                          }
                        })}
                      </Col>
                    </Row>
                  </div>
                  <div className="row mb-2 mt-2">
                    {data?.services?.map((service, i) => (
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6">
                        <div className={`${styles.Display} mt-2 mb-2`} key={i}>
                          <div className={styles.AllDotsContainer}>
                            <div
                              key={i}
                              style={{
                                backgroundColor: dotColor[i % dotColor.length],
                              }}
                              className={styles.TreatmentDotColor}
                            ></div>
                          </div>
                          <span className={`${styles.TreatmentText} text-capitalize`}>{service?.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ))}
            </div>

            {booking?.length > 0 && <ZouluButton title="Update " className={`${style.updateServiceBtn} mt-5 `} onClick={() => handlerUploadFile()} />}
            <br />
            <PriceModal
              category={category}
              show={show}
              setShow={(e) => {
                setShow(e);
              }}
            />
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
};
export default AuthProtected(Index);

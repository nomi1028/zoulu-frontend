import { IconButton, Link, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Col, FormGroup, Label, Row } from "reactstrap";
import style from "../../../styles/treatment.module.css";
import ZouluInput from "../../../Components/_App/ZouluInput";
import CustomSelectComp from "../../Common/CustomDropDown";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import styles from "../../../styles/webversionmodals.module.css";
import treatmentStyles from "../../../styles/treatment.module.css";
import { toast } from "react-toastify";
import { Api } from "../../../utils/Api";
import { CloudUpload } from "@mui/icons-material";

const ChangeExpertStatusModal = (props) => {
  const { data } = props;
  const [actionType, setActionType] = useState("view");
  const [userData, setUserData] = useState(data);
  const [latLong, setLatLong] = useState(null);
  const [address, setAddress] = useState(null);
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    const response = await Api("get", `api/category?page=1&limit=10000`);
    if (response.status === 200) {
      const data = response.data.data;
      setCategories(data);
    } else {
      toast.error(response.data.msg);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const updateProfile = async () => {
    const findTreatmentChanged = userData?.treatments?.find((e) => e?.isEdited);
    const payload = new FormData();
    payload.append(`id`, userData?.user_id?._id);
    payload.append(`name`, userData?.user_id?.name);
    payload.append(`phone_number`, userData?.user_id?.phone_number);
    payload.append(`email`, userData?.user_id?.email);
    payload.append(`image`, null);
    payload.append(`radius`, userData?.radius);
    payload.append(`role`, "expert");
    payload.append("gender", userData?.user_id?.gender);
    payload.append(`coordinates`, latLong ? JSON.stringify(latLong) : JSON.stringify({ long: userData?.location?.coordinates[0], lat: userData?.location?.coordinates[1] }));
    payload.append(`address`, address ? address : userData?.user_id?.address);
    payload.append("availability", userData?.availabilty?.length > 0 ? JSON.stringify(userData?.availabilty) : JSON.stringify([]));
    if (findTreatmentChanged) {
      payload.append("categories", JSON.stringify(userData?.treatments?.filter((e) => e?.isEdited)?.map((e) => e?.category_id?._id)));
      for (const obj of userData?.treatments) {
        if (obj?.isEdited) {
          payload.append("certificates", obj?.certificate);
        }
      }
    }
    payload.append("addCertificates", false);

    const response = await Api("put", `api/profile/${userData?.user_id?._id}`, payload);
    if (response.status === 200) {
      setActionType("view");
    } else {
      toast.error(response.data.msg);
    }
  };

  const defaultModal = () => {
    return (
      <Modal show={props.showModal} onHide={props.hideModal} animation={false} size="md" centered>
        <Modal.Header closeButton className={style.ModalHeaderDiv}>
          <h4 className="text-capitalize">Confirmation</h4>
        </Modal.Header>
        <Modal.Body className={style.ModayBody}>
          <div className="">
            <div className="dashboard-modal-subtitle mt-4 text-center">
              Are you sure want to {actionType} this expert (<b className="text-capitalize">{userData?.user_id?.name}</b>). This can't be undone ?
            </div>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <div className={actionType === "approve" ? "approve-expert-btn text-capitalize" : "reject-expert-btn text-capitalize"} onClick={() => props.callback(actionType)}>
              Proceed
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}></Modal.Footer>
      </Modal>
    );
  };
  const viewModal = () => {
    return (
      <Modal show={props.showModal} onHide={props.hideModal} animation={false} size="lg" centered>
        <div className={style.ModalHeaderDivParent}>
          <Modal.Header closeButton className={style.ModalHeaderDiv}>
            <h4 className="text-capitalize">{props?.title}</h4>
          </Modal.Header>
        </div>
        <Modal.Body className={style.ModayBody}>
          {!props.action ? (
            <div>
              <b>Name: </b>
              {userData?.user_id?.name}
            </div>
          ) : null}
          <div className="mt-1">
            <b>Phone: </b>
            {userData?.user_id?.phone_number}
          </div>
          <div className="mt-1">
            <b>Email: </b>
            {userData?.user_id?.email}
          </div>
          <div className="mt-1">
            <b>Gender: </b>
            {userData?.user_id?.gender}
          </div>
          <div className="mt-1">
            <b>Location: </b>
            {userData?.user_id?.address || "N/A"}
          </div>
          <div className="mt-1">
            <b>Radius: </b>
            {userData?.radius} km
          </div>
          <h5 className="mt-4">Questions / Answers</h5>
          <div className="row d-flex flex-wrap">
            {userData?.questions
              ?.filter((e) => e?.question !== "Location" && e?.question !== "Radius" && e?.question !== "Gender")
              ?.map((ques, index) => (
                <div className="col-lg-6 d-flex flex-column my-2" key={index}>
                  <span className="text-capitalize">
                    <b>Q{index + 1}.</b> {ques?.question}
                  </span>
                  <span className="text-capitalize">
                    <b>Ans.</b> {ques?.answer}
                  </span>
                </div>
              ))}
          </div>

          <h5 className="mt-4">Treatments</h5>
          <div className="row d-flex flex column">
            {userData?.treatments?.map((e, index) => (
              <span key={index} className="my-1">
                <b className="text-capitalize">{e?.category_id?.name}</b>
                <span className="text-capitalize" style={{ marginLeft: "10px" }}>
                  (
                  <Link href={e?.isEdited ? e?.image : e?.certificate} target={"_blank"} underline="hover" key={index}>
                    view certificate
                  </Link>
                  )
                </span>
              </span>
            ))}
          </div>
          {userData?.treatments?.find((e) => !e?.approved) ? (
            <div className="d-flex justify-content-center mt-5">
              <div className="confirm-expert-btn" onClick={() => setActionType("update")}>
                Update
              </div>
              <div className="approve-expert-btn" onClick={() => setActionType("approve")}>
                Approve
              </div>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}></Modal.Footer>
      </Modal>
    );
  };
  const updateModal = () => {
    return (
      <Modal show={props.showModal} onHide={props.hideModal} animation={false} size="lg" centered>
        <div className={style.ModalHeaderDivParent}>
          <Modal.Header closeButton className={style.ModalHeaderDiv}>
            <h4 className="text-capitalize">Update Application</h4>
          </Modal.Header>
        </div>
        <Modal.Body className={style.ModayBody}>
          <Row className="d-flex justify-content-evenly mt-3">
            <Col xs={12} sm={10} md={6} lg={6}>
              <FormGroup row>
                <div className="col-12 col-lg-12 label d-flex">
                  <Label htmlFor="address" className="service-label">
                    Name
                  </Label>
                  <div className="steric-style ml-1">*</div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="form-group ">
                    <ZouluInput type="text" name="name" value={userData?.user_id?.name} onChange={(e) => setUserData({ ...userData, user_id: { ...userData?.user_id, name: e.target.value } })} />
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col xs={12} sm={10} md={6} lg={6}>
              <FormGroup row>
                <div className="col-12 col-lg-12 label d-flex">
                  <Label htmlFor="address" className="service-label">
                    Phone
                  </Label>
                  <div className="steric-style ml-1">*</div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="form-group ">
                    <ZouluInput type="text" name="name" value={userData?.user_id?.phone_number} readOnly />
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-evenly mt-1">
            <Col xs={12} sm={10} md={6} lg={6}>
              <FormGroup row>
                <div className="col-12 col-lg-12 label d-flex">
                  <Label htmlFor="address" className="service-label">
                    Email
                  </Label>
                  <div className="steric-style ml-1">*</div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="form-group ">
                    <ZouluInput type="text" name="name" value={userData?.user_id?.email} readOnly />
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col xs={12} sm={10} md={6} lg={6}>
              <FormGroup row>
                <div className="col-12 col-lg-12 label d-flex">
                  <Label htmlFor="address" className="service-label">
                    Gender
                  </Label>
                  <div className="steric-style ml-1">*</div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="form-group ">
                    <CustomSelectComp
                      options={["male", "female", "other"]?.map((e) => ({ label: e, value: e }))}
                      defaultValue={userData?.user_id?.gender}
                      setValue={(e) => setUserData({ ...userData, user_id: { ...userData?.user_id, gender: e?.toLowerCase() } })}
                    />
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-evenly mt-1">
            <Col xs={12} sm={10} md={6} lg={6}>
              <FormGroup row>
                <div className="col-12 col-lg-12 label d-flex">
                  <Label htmlFor="address" className="service-label">
                    Previous Location
                  </Label>
                  <div className="steric-style ml-1">*</div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="form-group ">
                    <ZouluInput type="text" name="name" value={userData?.user_id?.address} readOnly />
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col xs={12} sm={10} md={6} lg={6}>
              <FormGroup row>
                <div className="col-12 col-lg-12 label d-flex">
                  <Label htmlFor="address" className="service-label">
                    Radius
                  </Label>
                  <div className="steric-style ml-1">*</div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="form-group ">
                    <ZouluInput type="number" name="name" value={userData?.radius} onChange={(e) => setUserData({ ...userData, radius: e.target.value })} />
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-evenly mt-1">
            <Col xs={12} sm={10} md={12} lg={12}>
              <FormGroup row>
                <div className="col-12 col-lg-12 label d-flex">
                  <Label htmlFor="address" className="service-label">
                    Select Location
                  </Label>
                  <div className="steric-style ml-1">*</div>
                </div>
                <div className="col-12 col-lg-12">
                  <div className="form-group ">
                    <div className={styles.select2ndstepGoogleAutoComplete}>
                      <div className="GooglePlacesAutocomplete2ndStep">
                        <GooglePlacesAutocomplete
                          apiKey={`${process.env.NEXT_PUBLIC_REACT_APP_MAPS_API}`}
                          style={{ width: "10%" }}
                          selectProps={{
                            onChange: (e) => {
                              setAddress(e?.label);
                              geocodeByAddress(e.label)
                                .then((results) => getLatLng(results[0]))
                                .then(({ lat, lng }) => {
                                  setLatLong({ lat: lat, long: lng });
                                });
                            },
                            placeholder: "Gib deine Wunschadresse ein…",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Typography variant="h5" component={"h5"} className="mt-2">
            Treatments
          </Typography>
          {userData?.treatments?.map((ele, index) => (
            <div key={index}>
              <Row className="mt-3">
                <Col xs={7} sm={6} md={5} lg={2}>
                  <span className={`${treatmentStyles.TreatmentHeadingOtherSerivces} text-capitalize`}>{ele?.category_id?.name}</span>
                </Col>
                <Col xs={5} sm={4} md={3} lg={2}>
                  <IconButton color="primary" aria-label={index} component="label" sx={{ marginLeft: "0.5rem" }}>
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        userData.treatments[index].image = URL.createObjectURL(e.target.files[0]);
                        userData.treatments[index].certificate = e.target.files[0];
                        userData.treatments[index].isEdited = true;
                        setUserData({ ...userData });
                      }}
                      id={index}
                    />
                    <CloudUpload />
                  </IconButton>
                  <span
                    style={{ textDecoration: "underline", textTransform: "capitalize", marginLeft: "0.5rem", cursor: "pointer" }}
                    onClick={() => window.open(ele?.isEdited ? ele?.image : ele?.certificate, "blank")}
                  >
                    View
                  </span>
                </Col>
              </Row>
            </div>
          ))}
          <div className="d-flex justify-content-center mt-5">
            <div className="confirm-expert-btn" onClick={() => updateProfile()}>
              Update
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}></Modal.Footer>
      </Modal>
    );
  };
  return actionType === "approve" ? defaultModal() : actionType === "update" ? updateModal() : viewModal();
};

export default ChangeExpertStatusModal;

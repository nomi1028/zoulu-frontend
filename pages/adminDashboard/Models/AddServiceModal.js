import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import style from "../../../styles/treatment.module.css";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import ZouluInput from "../../../Components/_App/ZouluInput";
import CustomSelectComp from "../../Common/CustomDropDown";
import { Api } from "../../../utils/Api";
import { useState } from "react";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import AdjustableTextarea from "../../../Components/AdjustableTextArea";
import { BsTrash } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { Checkbox, FormControlLabel } from "@mui/material";
const AddServiceModal = (props) => {
  const { actionType, data, setLoading } = props;
  const handleClose = () => props.hideModal(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [values, setValues] = useState({ cat_id: null, duration: 0, subcat_id: null, isSub: false, name: "", desc: "", short_desc: "", pricePerMinute: 0, packages: [], steps: [], detailDesc: "", preparations: "" });
  const [inputValue, setInputValue] = useState("");
  const [inputPackageValue, setInputPackageValue] = useState(null);
  const [index, setIndex] = useState(null);
  const getAllCategory = async () => {
    const response = await Api("get", "api/category?limit=10000&page=1");
    if (response.status === 200) {
      const data = response.data.data;
      let arr = [];
      for (const obj of data) {
        arr.push({ label: obj?.name, value: obj?._id, array: obj?.sub_categories, isSub: obj?.sub_category });
      }
      setCategories(arr);
    }
  };
  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const handleKeyDown = (event) => {
    if (!inputValue) return;
    if (event.key === "Enter") {
      if (values.steps.includes(inputValue)) {
        alert("Error: step already exists");
        setInputValue("");
      } else {
        setValues({ ...values, steps: [...values.steps, inputValue] });
        setInputValue("");
      }
    }
  };
  const handleKeyPackageDown = (event) => {
    if (!inputPackageValue) return;
    if (event.key === "Enter") {
      const getPackages = values.packages?.map((e) => e?.title);
      if (getPackages.includes(inputPackageValue.toLowerCase())) {
        alert("Error: Option already exists");
        setInputPackageValue("");
      } else {
        if (actionType === "edit" && index !== null) {
          if (values.packages[index].new) {
            values.packages[index].title = inputPackageValue;
            setValues({ ...values });
            setInputPackageValue("");
            setIndex(null);
          } else {
            values.packages[index].title = inputPackageValue;
            values.packages[index].changed = true;
            setValues({ ...values });
            setInputPackageValue("");
            setIndex(null);
          }
        } else {
          if (index !== null) {
            values.packages[index].title = inputPackageValue;
            setInputPackageValue("");
            setValues({ ...values });
            setIndex(null);
          } else {
            setValues({ ...values, packages: [...values.packages, { title: inputPackageValue.toLowerCase(), mandatory: false, deleted: false, new: true, packages: [{ title: "", duration: 0, deleted: false }] }] });
            setInputPackageValue("");
          }
        }
      }
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  const addService = async () => {
    if (!values.name) return toast.warning("name is required");
    if (!values.desc) return toast.warning("description is required");
    if (!values.preparations) return toast.warning("preparations is required");
    if (!values.duration) return toast.warning("duration is required");
    if (!values.cat_id) return toast.warning("category is required");
    if (values.steps?.length < 0) return toast.warning("Minimum 1 step is required");
    if (values.packages?.length < 0) return toast.warning("Minimum 1 package is required");
    if (values.isSub && !values.subcat_id) return toast.warning("Sub category is required");
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.desc);
    formData.append("duration", values.duration);
    formData.append("short_description", values.short_desc);
    formData.append("preparations", values.preparations);
    formData.append("steps", JSON.stringify(values.steps));
    formData.append("options", JSON.stringify(values.packages));
    formData.append("categoryId", values.cat_id);
    if (values.isSub) {
      formData.append("sub_category_id", values.subcat_id);
    }
    const response = await Api("post", "api/admin/service", formData);
    if (response.status === 200 || response.status === 201) {
      props.services(response.data.data);
      handleClose();
      setLoading(false);
    } else {
      setLoading(false);
      toast.warning(response.data.msg);
    }
  };
  const handleRemoveSteps = (i) => setValues({ ...values, steps: [...values.steps.filter((e, j) => j !== i)] });
  const handleRemovePackages = (i) => {
    if (actionType === "edit") {
      if (values.packages[i].new) {
        values.packages[i].changed = true;
        values.packages[i].deleted = true;
        setValues({ ...values });
      } else {
        values.packages[i].changed = true;
        values.packages[i].deleted = true;
        setValues({ ...values });
        updateOption("DELETE");
      }
    } else {
      setValues({ ...values, packages: [...values.packages.filter((e, j) => j !== i)] });
    }
  };

  useEffect(() => {
    if (actionType === "edit") {
      for (const option of data?.options) {
        option.packages = [];
        for (const pkg of data?.packages) {
          if (pkg?.option_id === option?._id) {
            option.packages.push(pkg);
          }
        }
      }
      setValues({
        ...values,
        cat_id: data?.category_id?._id,
        name: data?.name,
        desc: data?.description,
        packages: data?.options,
        steps: data?.steps,
        preparations: data?.preparations,
        subcat_id: data?.sub_category_id?._id,
        isSub: data?.category_id?.sub_category,
        short_desc: data?.short_description,
        duration: data?.duration,
      });
      setSubCategories(data?.category_id?.sub_categories);
    }
  }, []);
  const updateService = async () => {
    if (!values.name) return toast.warning("name is required");
    if (!values.desc) return toast.warning("description is required");
    if (!values.preparations) return toast.warning("preparations is required");
    if (!values.duration) return toast.warning("duration is required");
    if (!values.cat_id) return toast.warning("category  is required");
    if (values.steps?.length < 0) return toast.warning("Minimum 1 step is required");
    if (values.packages?.length < 0) return toast.warning("Minimum 1 package is required");
    if (values.isSub && !values.subcat_id) return toast.warning("Sub category is required");
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.desc);
    formData.append("short_description", values.short_desc);
    formData.append("preparations", values.preparations);
    formData.append("duration", values.duration);
    formData.append("steps", JSON.stringify(values.steps));
    formData.append("categoryId", values.cat_id);
    formData.append("options", JSON.stringify(values.packages?.filter((e) => e.new)));
    if (values.isSub) {
      formData.append("sub_category_id", values.subcat_id);
    }
    const response = await Api("put", `api/admin/service/${data?._id}`, formData);
    if (response.status === 200 || response.status === 201) {
      handleClose();
      props.callback();
      setLoading(false);
    } else {
      setLoading(false);
      toast.warning(response.data.msg);
    }
  };
  const updateOption = async (method) => {
    setLoading(true);
    const filter = values.packages?.find((e) => e?.changed);
    const formData = new FormData();
    formData.append("option", JSON.stringify(filter));
    formData.append("serviceId", data?._id);
    const response = await Api(method ? method : "PUT", `api/admin/updateoption/${filter?._id}`, formData);
    if (response.status === 200) {
      const findIndex = values.packages.findIndex((e) => e?.changed);
      values.packages[findIndex].changed = false;
      setLoading(false);
    }
  };
  return (
    <Modal show={props.showModal} onHide={handleClose} animation={false} size="lg" centered>
      <div className={style.ModalHeaderDivParent}>
        <Modal.Header closeButton className={style.ModalHeaderDiv}>
          {actionType === "add" ? <h5>Add Service</h5> : <h5>Edit Service</h5>}
        </Modal.Header>
      </div>
      <Modal.Body className={style.ModayBody}>
        <Row className="d-flex justify-content-evenly mt-2">
          <Col xs={12} sm={10} md={12} lg={12}>
            <FormGroup row>
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Name
                </Label>
                <div className="steric-style ml-1">*</div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="form-group ">
                  <ZouluInput type="text" name="name" onChange={handleChange} value={values.name} />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row className="d-flex justify-content-evenly mt-2">
          <Col xs={12} sm={10} md={6} lg={6}>
            <FormGroup row className="dropdownMainClass">
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Category
                </Label>
                <div className="steric-style ml-1">*</div>
              </div>
              <div className="blueArrowDropdown col-12 col-lg-12">
                <div className="form-group ">
                  <CustomSelectComp
                    placeholder="Select Category"
                    obj={true}
                    defaultValue={values.cat_id}
                    options={categories}
                    setValue={(e) => {
                      setValues({ ...values, cat_id: e.value, subcat_id: null, isSub: e.isSub });
                      setSubCategories(e?.array);
                    }}
                  />
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col xs={12} sm={10} md={6} lg={6}>
            {values.isSub ? (
              <FormGroup row className="dropdownMainClass">
                <div className="col-12 col-lg-12 label d-flex">
                  <Label htmlFor="address" className="service-label">
                    Sub Category
                  </Label>
                  <div className="steric-style ml-1">*</div>
                </div>
                <div className="blueArrowDropdown col-12 col-lg-12">
                  <div className="form-group ">
                    <CustomSelectComp placeholder="Select Sub Category" defaultValue={values.subcat_id} options={subCategories?.map((e) => ({ label: e?.name, value: e?._id }))} setValue={(e) => setValues({ ...values, subcat_id: e })} />
                  </div>
                </div>
              </FormGroup>
            ) : null}
          </Col>
        </Row>
        <Row className="d-flex justify-content-evenly mt-2">
          <Col xs={12} sm={10} md={12} lg={12}>
            <FormGroup row>
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Duration
                </Label>
                <div className="steric-style ml-2">*</div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="form-group ">
                  <ZouluInput type="number" min={0} name="duration" onChange={handleChange} value={values.duration || ""} />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row className="d-flex justify-content-evenly mt-2">
          <Col xs={12} sm={10} md={12} lg={12}>
            <FormGroup row>
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Preparations
                </Label>
                <div className="steric-style ml-2">*</div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="form-group ">
                  <AdjustableTextarea className="textAreaHeightWidth" setValue={(e) => setValues({ ...values, preparations: e })} value={values.preparations} />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row className="d-flex justify-content-evenly mt-2">
          <Col xs={12} sm={10} md={12} lg={12}>
            <FormGroup row>
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Short Description
                </Label>
                <div className="steric-style ml-2">*</div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="form-group ">
                  <AdjustableTextarea className="textAreaHeightWidth" setValue={(e) => setValues({ ...values, short_desc: e })} value={values.short_desc} />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row className="d-flex justify-content-evenly mt-2">
          <Col xs={12} sm={10} md={12} lg={12}>
            <FormGroup row>
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Description
                </Label>
                <div className="steric-style ml-2">*</div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="form-group ">
                  <AdjustableTextarea className="textAreaHeightWidth" setValue={(e) => setValues({ ...values, desc: e })} value={values.desc} />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row className="d-flex justify-content-evenly mt-2">
          <Col xs={12} sm={10} md={12} lg={12}>
            <FormGroup row>
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Steps
                </Label>
                <div className="steric-style ml-1">*</div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="form-group ">
                  <ZouluInput placeholder="Press enter to add steps" onChange={(newValue) => setInputValue(newValue.target.value)} onKeyDown={handleKeyDown} value={inputValue || ""} />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Col sm={12} className="mt-2">
          <div className="d-flex flex-wrap mt-3" style={{ gap: 5 }}>
            {values.steps?.map((e, index) => (
              <div className="selected-data" key={index}>
                <div className="selected-text">{e}</div>
                <CloseIcon className="selected-cross" onClick={() => handleRemoveSteps(index)} />
              </div>
            ))}
          </div>
        </Col>
        <Row className="d-flex justify-content-evenly mt-2">
          <Col xs={12} sm={10} md={12} lg={12}>
            <FormGroup row>
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Options
                </Label>
                <div className="steric-style ml-1">*</div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="form-group ">
                  <ZouluInput placeholder="Press enter to add options" type="text" onChange={(newValue) => setInputPackageValue(newValue.target.value)} onKeyDown={handleKeyPackageDown} value={inputPackageValue || ""} />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Col sm={12} className="mt-2">
          {values.packages?.map((e, i) =>
            !e?.deleted ? (
              <Fragment>
                <Row className="d-flex " key={i}>
                  <Col xs={12} sm={10} md={3} lg={3} className="mt-2">
                    <Label htmlFor="address" className="text-capitalize" style={{ fontFamily: "PlusJakartaSans-Medium" }}>
                      {i + 1}- {e?.title}
                    </Label>
                  </Col>
                  <Col xs={12} sm={10} md={3} lg={3}>
                    <div className="form-group">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={e.mandatory}
                            onChange={(event) => {
                              if (actionType === "edit") {
                                if (e.new) {
                                  values.packages[i].mandatory = event.target.checked;
                                  setValues({ ...values });
                                } else {
                                  values.packages[i].changed = true;
                                  values.packages[i].mandatory = event.target.checked;
                                  setValues({ ...values });
                                }
                              } else {
                                values.packages[i].mandatory = event.target.checked;
                                values.packages[i].new = true;
                                setValues({ ...values });
                              }
                            }}
                          />
                        }
                        label="Mandatory"
                        style={{ fontFamily: "PlusJakartaSans-Medium" }}
                      />
                    </div>
                  </Col>
                  <Col xs={12} sm={10} md={4} lg={4}>
                    <div className="col-12 col-lg-12 pt-1 d-flex">
                      <div
                        className="form-group "
                        style={{ background: "rgba(255,0,0,0.3)", height: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", cursor: "pointer" }}
                        onClick={() => handleRemovePackages(i)}
                      >
                        <BsTrash style={{ color: "red", fontSize: 20 }} />
                      </div>
                      <div
                        className="form-group "
                        style={{ background: "rgba(63,122,338,0.3)", height: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", cursor: "pointer", marginLeft: 5 }}
                        onClick={() => {
                          setInputPackageValue(e?.title);
                          setIndex(i);
                        }}
                      >
                        <FiEdit2 style={{ color: "#F7AE4", fontSize: 20 }} />
                      </div>
                      {e?.changed ? (
                        <div className="service-create-btn" style={{ marginLeft: "10px" }} onClick={() => updateOption()}>
                          Update Option
                        </div>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                {e?.packages?.length > 0 ? (
                  <Row className="d-flex justify-content-evenly">
                    <p style={{ fontFamily: "PlusJakartaSans-bold" }}>Packages</p>
                  </Row>
                ) : null}
                {e?.packages?.map((ele, index) =>
                  !ele?.deleted ? (
                    <Row className="d-flex justify-content-evenly" key={index}>
                      <Col xs={12} sm={10} md={6} lg={6}>
                        <FormGroup row>
                          <div className="col-12 col-lg-12">
                            <div className="form-group ">
                              <ZouluInput
                                placeholder="Title"
                                type="text"
                                className="text-capitalize"
                                value={ele?.title}
                                onChange={(event) => {
                                  if (actionType === "edit") {
                                    if (e.new) {
                                      values.packages[i].packages[index].title = event.target.value;
                                      setValues({ ...values });
                                    } else {
                                      values.packages[i].changed = true;
                                      values.packages[i].packages[index].title = event.target.value;
                                      setValues({ ...values });
                                    }
                                  } else {
                                    values.packages[i].packages[index].title = event.target.value;
                                    setValues({ ...values });
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={10} md={3} lg={3}>
                        <FormGroup row>
                          <div className="col-12 col-lg-12">
                            <div className="form-group ">
                              <ZouluInput
                                placeholder="Duration:minutes"
                                type="number"
                                min={0}
                                className="text-capitalize"
                                value={ele?.duration || ""}
                                onChange={(event) => {
                                  if (actionType === "edit") {
                                    if (e.new) {
                                      values.packages[i].packages[index].duration = event.target.value;
                                      setValues({ ...values });
                                    } else {
                                      values.packages[i].packages[index].duration = event.target.value;
                                      values.packages[i].changed = true;
                                      setValues({ ...values });
                                    }
                                  } else {
                                    values.packages[i].packages[index].duration = event.target.value;
                                    setValues({ ...values });
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={10} md={3} lg={3}>
                        <FormGroup row>
                          <div className="col-12 col-lg-12 pt-1 d-flex">
                            {e?.packages?.length !== 1 && (
                              <div
                                className="form-group "
                                style={{ background: "rgba(255,0,0,0.3)", height: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", cursor: "pointer" }}
                                onClick={() => {
                                  if (actionType === "edit") {
                                    if (e.new) {
                                      e.packages?.splice(index, 1);
                                      setValues({ ...values });
                                    } else {
                                      values.packages[i].packages[index].deleted = true;
                                      values.packages[i].changed = true;
                                      setValues({ ...values });
                                    }
                                  } else {
                                    e.packages?.splice(index, 1);
                                    setValues({ ...values });
                                  }
                                }}
                              >
                                <BsTrash style={{ color: "red", fontSize: 20 }} />
                              </div>
                            )}
                            {index === e?.packages?.length - 1 ? (
                              <div
                                className="form-group "
                                style={{ background: "rgba(63,122,338,0.3)", height: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", cursor: "pointer", marginLeft: 5 }}
                                onClick={() => {
                                  if (values.packages[i]?.packages && values.packages[i]?.packages?.length > 0) {
                                    values.packages[i].packages.push({ title: "", duration: 0, deleted: false });
                                    setValues({ ...values });
                                  } else {
                                    values.packages[i].packages = [{ title: "", duration: 0, deleted: false }];
                                    setValues({ ...values });
                                  }
                                }}
                              >
                                <AiOutlinePlusCircle style={{ color: "#F7AE4", fontSize: 20 }} />
                              </div>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  ) : null
                )}
              </Fragment>
            ) : null
          )}
        </Col>

        <div className="d-flex justify-content-center mt-5">
          <div onClick={actionType === "add" ? addService : updateService} className="service-create-btn">
            {actionType === "add" ? "Add" : "Update"}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}></Modal.Footer>
    </Modal>
  );
};

export default AddServiceModal;

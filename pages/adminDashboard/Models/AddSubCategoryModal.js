import React from "react";
import { Modal } from "react-bootstrap";
import style from "../../../styles/treatment.module.css";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import ZouluInput from "../../../Components/_App/ZouluInput";
import { Api } from "../../../utils/Api";
import { useState } from "react";
import { useEffect } from "react";
import ZouluButton from "../../Common/ZouluButton/ZouluButton";
import jwt from "jsonwebtoken";
import { API_BASE_URL, API_Image_URL } from "../../../utils/Url";
import { toast } from "react-toastify";
import AdjustableTextarea from "../../../Components/AdjustableTextArea";
import { Checkbox, FormControlLabel } from "@mui/material";
import CustomSelectComp from "../../Common/CustomDropDown";
const AddSubCategoryModal = (props) => {
  const { actionType, data, setLoading } = props;
  const handleClose = () => props.hideModal(false);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({ name: "", desc: "", image: null, subCategory: false, cat_id: null });
  const [user, setUser] = useState(null);
  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const addSubCategory = async () => {
    if (!values.name) return toast.warning("Name is required");
    if (!values.image) return toast.warning("Image is required");
    if (!values.cat_id) return toast.warning("Category is required");
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);
    formData.append("category_id", values.cat_id);
    const response = await Api("post", "api/admin/subcategory", formData);
    if (response.status === 200 || response.status === 201) {
      props.category(response.data.data);
      handleClose();
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.data.msg);
    }
  };

  const updateSubCategory = async () => {
    if (!values.name) return toast.warning("Name is required");
    if (!values.cat_id) return toast.warning("Category is required");
    if (!values.image) return toast.warning("Image is required");
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", values.cat_id);
    formData.append("image", values.image);
    const response = await Api("put", `api/admin/subcategory/${data?._id}`, formData);
    if (response.status === 200 || response.status === 201) {
      handleClose();
      props.callback();
      setLoading(false);
    } else {
      toast.error(response.data.msg);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (actionType === "edit") {
      setValues({ ...values, name: data?.name, image: data?.image, imagePreview: data?.image, cat_id: data?.category_id?._id });
    }
  }, []);
  useEffect(() => {
    let user = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setUser(user?.data?.user);
  }, []);
  const getAllCategory = async () => {
    const response = await Api("get", "api/category?limit=10000&page=1");
    if (response.status === 200) {
      const data = response.data.data;
      let arr = [];
      for (const obj of data) {
        if (obj.sub_category) {
          arr.push({ label: obj?.name, value: obj?._id });
        }
      }
      setCategories(arr);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Modal show={props.showModal} onHide={handleClose} animation={false} size="md" centered>
      <Modal.Header closeButton className={style.ModalHeaderDiv}>
        {actionType === "add" ? <h5 className="pl-1">Add Subcategory</h5> : <h5 className="pl-1">Edit Subcategory</h5>}
      </Modal.Header>
      <Modal.Body className={style.ModayBody}>
        <Row className="d-flex justify-content-evenly mt-3">
          <Col xs={12} sm={10} md={10} lg={10}>
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
          <Col xs={12} sm={10} md={10} lg={10} className="d-flex align-items-center">
            <FormGroup row>
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Image
                </Label>
                <div className="steric-style ml-1">*</div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="form-group ">
                  <ZouluInput type="file" name="image" accept="image/*" onChange={(e) => setValues({ ...values, image: e.target.files[0], imagePreview: URL.createObjectURL(e.target.files[0]) })} />
                </div>
              </div>
            </FormGroup>
            {values.image && <img style={{ height: "50px", width: "50px", marginLeft: 10, cursor: "pointer" }} className="mt-3" src={values.imagePreview} onClick={() => window.open(values.imagePreview, "blank")} />}
          </Col>
        </Row>
        <Row className="d-flex justify-content-evenly mt-2">
          <Col xs={12} sm={10} md={10} lg={10}>
            <FormGroup row>
              <div className="col-12 col-lg-12 label d-flex">
                <Label htmlFor="address" className="service-label">
                  Category
                </Label>
                <div className="steric-style ml-2">*</div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="form-group ">
                  <CustomSelectComp placeholder="Select Category" defaultValue={values.cat_id} options={categories} setValue={(e) => setValues({ ...values, cat_id: e })} />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <div onClick={actionType === "add" ? addSubCategory : updateSubCategory} className="service-create-btn">
            {actionType === "add" ? "Add" : "Update"}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}></Modal.Footer>
    </Modal>
  );
};

export default AddSubCategoryModal;

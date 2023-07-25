import React, { useEffect, useState } from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/webversionmodals.module.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import style from "../../styles/dashboardProfile.module.css";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
var jwt = require("jsonwebtoken");
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { Api } from "../../utils/Api";
import Loader from "../../Components/Loader";
import Protected from "../../utils/ProtectedRoute";
import AuthProtected from "../../utils/AuthProtected";
import ChangePassword from "./ChangePassword";
import Cropper from "../dashboard/home/Cropper";
const CustomerProfile = (props) => {
  console.log(props?.data, "props?.data");
  const [values, setValues] = useState();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setSelectedFile] = useState(null);
  const [croppedImage, setCroppedimage] = useState({});
  const [address, setAddress] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [firstName, setfirstName] = useState();
  const [selectGender, setSelectGender] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState({ type: "Point" });
  const [img, setProfileImage] = useState({});
  const Gender = ["male", "female", "other"];
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setSelectGender(event.target.value);
  };
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValues(token?.data?._id);
    getUserData(token?.data?._id);
    console.log(token?.data, "token?.data?.expert");
  }, [values]);
  const getUserData = async (id) => {
    setLoading(true);
    const response = await Api("get", `api/profile/${id}`);
    if (response.status === 200) {
      const data = response.data.data;
      // setProfileImage(data?.image);
      setCroppedimage(data?.image);
      setfirstName(data?.name);
      setphoneNumber(data?.phone_number);
      setEmail(data?.email);
      setAddress(data?.address);
      setSelectGender(data?.gender);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const customerUpdate = async (e) => {
    setLoading(true);
    const payload = new FormData();
    payload.append(`address`, address);
    payload.append(`name`, firstName);
    payload.append(`gender`, selectGender);
    // payload.append(`image`, img?.image);
    payload.append(`image`, croppedImage?.image);
    payload.append(`location`, JSON.stringify(location));
    payload.append("addCertificates", false);
    const response = await Api("put", `api/profile/${values}`, payload);
    if (response?.status === 200 || response?.status === 201) {
      setLoading(false);
      localStorage.setItem("zolu-auth-token", response.data.data);
      toast.success(response.data.msg);
    } else {
      setLoading(false);
      toast.error(response.data.msg);
    }
  };
  return (
    <Protected role={"customer"}>
      <SidebarWrapper>
        {loading ? <Loader /> : null}
        <div className="container-fluid">
          <div className={`${style.profileCustomerContainer} `}>
            <div className="row">
              <div className="col-lg-12 pt-5  ">
                <div className={style.ContainerDiv}>
                  {/* <Badge onClick={img?.imagePreview ? () => window.open(img?.imagePreview, "Blank") : null} overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                    <Avatar alt="Travis Howard" style={{ width: "120px", height: "120px" }} src={img?.imagePreview ? img?.imagePreview : img ? img : "/Images/avatarIcon.png"}></Avatar>
                  </Badge>
                  <Avatar alt="Remy Sharp" style={{ marginTop: "80px", marginLeft: "-30px" }}>
                    <label for="upload">
                      <EditIcon />
                    </label>
                    <input
                      type="file"
                      name="upload"
                      id="upload"
                      onChange={(e) => setProfileImage({ ...img, image: e.target.files[0], imagePreview: URL.createObjectURL(e.target.files[0]) })}
                      style={{ display: "none" }}
                    />
                  </Avatar> */}
                  {file && (
                    <Cropper
                      imageToCrop={URL.createObjectURL(file)}
                      setCroppedImage={(value) => setCroppedimage(value)}
                      croppedImage={croppedImage}
                      open={open}
                      setOpen={(e) => setOpen(e)}
                    />
                  )}

                  <Badge
                    onClick={
                      img?.imagePreview
                        ? () => window.open(img?.imagePreview, "blank")
                        : null
                    }
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <Avatar alt="Remy Sharp">
                        <label for="upload">
                          <EditIcon />
                        </label>
                        <input
                          type="file"
                          name="upload"
                          id="upload"
                          onChange={(e) => {
                            setSelectedFile(e.target.files[0]);
                            setOpen(true);
                          }}
                          style={{ display: "none" }}
                        />
                      </Avatar>
                    }
                  >
                    <Avatar
                      alt="Travis Howard"
                      style={{ width: "120px", height: "120px" }}
                      src={
                        croppedImage?.imagePreview
                          ? croppedImage?.imagePreview
                          : croppedImage
                          ? croppedImage
                          : "/Images/avatarIcon.png"
                      }
                    ></Avatar>
                  </Badge>
                </div>
              </div>
            </div>
            <div className={style.EditContainer}>
              <div className="row">
                <div className=" col-lg-6 pt-5">
                  <TextField
                    label="Vor- und Nachname"
                    value={firstName ?? ""}
                    variant="outlined"
                    fullWidth
                    id="fullWidth"
                    className={`${style.EditInput} mb-4 text-capitalize`}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>
                <div className=" col-lg-6 pt-5">
                  <TextField
                    fullWidth
                    label="E-Mail"
                    value={email ?? ""}
                    disabled
                    id="fullWidth"
                    className={`${style.EditInput} mb-4`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className=" col-lg-6 pt-4 mt-1">
                  <FormControl className={`${style.EditInput} mb-4`}>
                    <InputLabel id="demo-simple-select-label">
                      Geschlecht
                    </InputLabel>
                    <Select
                      style={{ borderRadius: "10px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectGender ?? ""}
                      onChange={handleChange}
                      label={selectGender}
                    >
                      {Gender.map((name) => (
                        <MenuItem
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            textTransform: "capitalize",
                          }}
                          key={name}
                          value={name}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className=" col-lg-6 pt-4 mt-1">
                  <TextField
                    label="Handynummer"
                    fullWidth
                    id="fullWidth"
                    disabled
                    className={`${style.EditInput} mb-4`}
                    placeholder="444-555-666-76"
                    value={phoneNumber ?? ""}
                    onChange={(e) => setphoneNumber(e.target.value)}
                  />
                </div>
                <div className=" col-lg-6 pt-3 mt-3">
                  <TextField
                    fullWidth
                    id="fullWidth"
                    label="Aktuelle Adresse"
                    disabled
                    className={`${style.EditInput} mb-4`}
                    value={address ?? ""}
                    placeholder={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className=" col-lg-6 pt-0">
                  <div className={`${styles.InputLabel} pt-0`}>
                    Aktualisierte Adresse
                  </div>
                  <div
                    className={styles.select2ndstepGoogleAutoCompleteprofile}
                  >
                    <div className="GooglePlacesAutocomplete2ndStep">
                      <GooglePlacesAutocomplete
                        apiKey={`${process.env.NEXT_PUBLIC_REACT_APP_MAPS_API}`}
                        selectProps={{
                          onChange: (e) => {
                            console.log(e);
                            setAddress(e.label);
                            geocodeByAddress(e.label)
                              .then((results) => getLatLng(results[0]))
                              .then(({ lat, lng }) => {
                                console.log(
                                  "Successfully got latitude and longitude",
                                  {
                                    lat,
                                    lng,
                                  }
                                );
                                setLocation({
                                  ...location,
                                  lat: lat,
                                  lng: lng,
                                });
                              });
                          },
                          placeholder: "Gib deine Wunschadresse ein…",
                        }}
                      />
                    </div>
                  </div>
                  <br />
                </div>
                <div className="col-lg-12 mt-4">
                  <div className={style.DisplayContainer}>
                    <Button
                      className={style.SaveButtonCustomerProfile}
                      onClick={() => customerUpdate()}
                    >
                      Änderungen speichern
                    </Button>
                    <Button
                      className={style.SaveButtonCustomerProfile}
                      onClick={() => setShow(true)}
                    >
                      Passwort ändern
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {values && (
          <ChangePassword
            userId={values}
            show={show}
            setShow={(e) => setShow(e)}
          />
        )}
      </SidebarWrapper>
    </Protected>
  );
};
export default AuthProtected(CustomerProfile);

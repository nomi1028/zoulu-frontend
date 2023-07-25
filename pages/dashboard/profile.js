import React, { useEffect, useState, useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/webversionmodals.module.css";
import TextField from "@mui/material/TextField";
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
import AuthProtected from "../../utils/AuthProtected";
import ChangePassword from "../mybooking/ChangePassword";
import ProfileMap from "../../Components/GoogleMap";
import { MdOutlineVerified } from "react-icons/md";
import { display } from "@mui/system";
import Cropper from "./home/Cropper";
const Index = (props) => {
  const [values, setValues] = useState();
  const [map, setMap] = useState();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [firstName, setfirstName] = useState();
  const [email, setEmail] = useState();
  const [file, setSelectedFile] = useState(null);
  const [croppedImage, setCroppedimage] = useState({});
  const [location, setLocation] = useState({});
  const [img, setProfileImage] = useState({});
  const [radius, setRadius] = useState();
  const [stripeId, setStripeId] = useState(null);
  const [availabilty, setAvailabilty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValues(token?.data);
    getUserData(token?.data?._id);
  }, []);
  const getUserData = async (id) => {
    setLoading(true);
    const response = await Api("get", `api/profile/${id}`);
    console.log("response", response);
    if (response.status === 200) {
      const data = response.data.data;
      // setProfileImage(data?.image);
      setCroppedimage(data?.image);
      setAvailabilty(data?.profile[0].availability);
      setfirstName(data?.name);
      setphoneNumber(data?.phone_number);
      setEmail(data?.email);
      setAddress(data?.address);
      setRadius(data?.profile[0].radius);
      setStripeId(data?.profile[0]?.stripe_account_id);
      setLocation({
        long: data?.profile[0]?.location?.coordinates[0],
        lat: data?.profile[0]?.location?.coordinates[1],
      });
      setLoading(false);
    } else {
      toast.error(response.data.msg);
    }
  };
  const expertAdd = async (e) => {
    setShowMap(false);
    setLoading(true);
    const payload = new FormData();
    payload.append(`id`, values?._id);
    payload.append(`name`, firstName);
    payload.append(`phone_number`, phoneNumber);
    payload.append(`email`, email);
    // payload.append(`image`, img?.image);
    payload.append(`image`, croppedImage?.image);
    payload.append(`radius`, radius);
    // payload.append(`stripeAccountId`, stripeID);
    payload.append(`role`, "expert");
    payload.append("gender", "male");
    payload.append(`coordinates`, JSON.stringify(location));
    payload.append(`address`, address);
    payload.append("availability", JSON.stringify(availabilty));
    payload.append("addCertificates", false);
    const response = await Api("put", `api/profile/${values?._id}`, payload);
    if (response?.status === 200) {
      localStorage.setItem("zolu-auth-token", response?.data?.data);
      localStorage.setItem("zolu-auth-token-expert", response?.data?.data);
      setMap(response?.data?.data);
      setLoading(false);
      toast.success(response?.data?.msg);
    } else {
      setLoading(false);
      toast.warning(
        stripeId ? "please check your stripe account Id" : response?.data?.msg
      );
    }
  };
  const connectWithStripe = async () => {
    if (window) {
      const url = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
      window.document.location.href = url;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShowMap(true);
    }, 3000);
  }, [showMap]);
  console.log(croppedImage, "croppedImage");
  return (
    <SidebarWrapper>
      {loading ? <Loader /> : null}
      <div className="container-fluid margin-sidebar mt-5 pt-4 ">
        <div className="row">
          <div className={`${style.profileContainerMargin} col-lg-12 pt-3`}>
            <div className={style.profileCardContainer}>
              <div className={style.ContainerDiv}>
                {/* <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                /> */}
                {/*to display the cropped output */}
                {/* {croppedImage && <img src={croppedImage} alt="uploaded"></img>} */}
                {/* call the cropper */}
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
              <div> </div>
              <div className={style.EditContainer}>
                <div className="row">
                  <div className=" col-lg-6 mt-5">
                    <TextField
                      label="Vor- und Nachname"
                      value={firstName ?? ""}
                      fullWidth
                      id="fullWidth"
                      className={`${style.EditInput} text-capitalize mb-4`}
                      onChange={(e) => setfirstName(e.target.value)}
                    />
                  </div>
                  <div className=" col-lg-6  mt-5">
                    <TextField
                      fullWidth
                      label="E-Mail"
                      value={email ?? ""}
                      id="fullWidth"
                      disabled
                      className={`${style.EditInput} mb-4`}
                      placeholder="milan@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className=" col-lg-6 mt-4">
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
                </div>
                <div className={style.addressContainer}>
                  <div className={style.flexNotificationProfile}>
                    <div style={{ display: "flex" }}>
                      <div className={style.addressProfileTitle}>Adresse</div>
                      <img
                        src="/Images/Maskgroup.png"
                        className={style.MaskgroupIcon}
                      />
                    </div>
                    <div className={style.addressProfileText}>
                      Definiere hier In welchem Gebiet du deine Dienstleistungen
                      anbieten möchtest. Gib hierzu deine Adresse und den
                      gewünschten Umkreis an, in welchem du Für Kunden sichtbar
                      sein sollst.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className=" col-lg-6 mt-4">
                    <TextField
                      fullWidth
                      label="Aktuelle Adresse"
                      type={"text"}
                      value={address ?? ""}
                      placeholder={address}
                      disabled
                      className={`${style.EditInput} mb-4`}
                    />
                    <br />
                  </div>
                  <div className=" col-lg-6 mt-4">
                    <TextField
                      label="Radius(Km)"
                      fullWidth
                      type={"number"}
                      id="fullWidth"
                      className={`${style.EditInput} mb-4`}
                      value={radius ?? ""}
                      onChange={(e) => setRadius(e.target.value)}
                    />
                    <br />
                  </div>
                  <div className={`${styles.InputLabelProfile} pt-0`}>
                    Adresse aktualisieren
                  </div>
                  <div className=" col-lg-6 ">
                    <div
                      className={styles.select2ndstepGoogleAutoCompleteprofile}
                    >
                      <div className="GooglePlacesAutocomplete2ndStep">
                        <GooglePlacesAutocomplete
                          apiKey={`${process.env.NEXT_PUBLIC_REACT_APP_MAPS_API}`}
                          selectProps={{
                            onChange: (e) => {
                              setAddress(e.label);
                              setShowMap(false);
                              geocodeByAddress(e.label)
                                .then((results) => getLatLng(results[0]))
                                .then(({ lat, lng }) => {
                                  setLocation({ lat: lat, long: lng });
                                });
                            },
                            placeholder: "Gib deine Wunschadresse ein…",
                          }}
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                  <div
                    className={`${styles.InputLabelProfileStripeId} pt-0`}
                  ></div>
                  <div className=" col-lg-12 pt-1 d-flex align-items-center">
                    {stripeId ? (
                      <>
                        <p
                          className="mt-3"
                          style={{ fontFamily: "PlusJakartaSans-bold" }}
                        >
                          Stripe-Konto verbunden,
                        </p>
                        <MdOutlineVerified
                          style={{
                            fontSize: 30,
                            color: "green",
                            marginLeft: 5,
                          }}
                          className="mt-1"
                        />
                      </>
                    ) : (
                      <Button
                        className={style.ConnectStripBtn}
                        onClick={() => (stripeId ? null : connectWithStripe())}
                      >
                        Verbinden Sie sich mit Stripe
                      </Button>
                    )}
                    <br />
                  </div>
                  <div className="col-lg-12 mt-4">
                    <div className={style.DisplayContainer}>
                      <Button
                        className={style.SaveButtonExpertsProfile}
                        onClick={() => expertAdd()}
                      >
                        Änderungen Speichern
                      </Button>
                      <Button
                        className={style.SaveButtonCustomerProfile}
                        onClick={() => setShow(true)}
                      >
                        Passwort Ändern
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {showMap && (
                <center>
                  <div className="col-lg-12 mt-5 mb-5">
                    <div className={styles.mapGraph}>
                      <ProfileMap
                        location={location}
                        radius={radius}
                        // map={map}
                      />
                    </div>
                  </div>
                </center>
              )}
            </div>
          </div>
        </div>
      </div>
      {values && (
        <ChangePassword
          userId={values?._id}
          show={show}
          setShow={(e) => setShow(e)}
        />
      )}
    </SidebarWrapper>
  );
};
export default AuthProtected(Index);

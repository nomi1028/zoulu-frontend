import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../../Common/ZouluButton/ZouluButton";
import styles from "../../../styles/webversionmodals.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { auth, firebase } from "../../../phoneVerification";
import { Api } from "../../../utils/Api";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import style from "../../../styles/booknow.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DoneIcon from "@mui/icons-material/Done";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "@mui/material";
import jwt from "jsonwebtoken";
import { Fragment } from "react";
import Loader from "../../../Components/Loader";
const names = [
  { item: "+92", image: "/Images/pakistani.png" },
  { item: "+966", image: "/Images/saudiArabia.png" },
  { item: "+49", image: "/Images/FlagGerman.png" },
];
const defaultQuestions = [
  {
    question: "Ort (Setze später deinen Arbeitsradius fest)",
    answer: "",
    type: "map",
  },
  // { question: "In welchem Umkreis möchtest du arbeiten?", answer: "", type: "input" },
  {
    question: "Geschlecht",
    answer: "",
    type: "dropdownn",
    dropdownValue: ["Männlich", "Weiblich", "andere"],
  },
  {
    question:
      "Wie oft planst du wöchentlich Behandlungen über Zoulu.de durchzuführen?",
    answer: "",
    type: "dropdown",
    dropdownValue: [
      "weniger als 5 Mal",
      "größer als 5",
      "weniger als 10 Mal",
      "größer als 10",
    ],
  },
  {
    question: "Welche Option beschreibt Deine aktuelle Situation am besten?",
    answer: "",
    type: "dropdown",
    dropdownValue: [
      "Ich bin in einem Salon oder Spa angestellt",
      "Ich bin selbstständig ",
      "Ich bin freiberuflich tätig",
    ],
  },
  // {
  //   question: "Wie hast du von Zoulu gehört?",
  //   answer: "",
  //   type: "dropdown",
  //   dropdownValue: ["Freund", "Kollege"],
  // },
  // {
  //   question: "Names des Freundes",
  //   answer: "",
  //   type: "input",
  //   inputType: "text",
  //   dropdownValue: [" Freund oder Kollege", " Freund oder Kollege"],
  // },
  {
    question: "Berufserfahrung",
    answer: "",
    type: "dropdown",
    dropdownValue: [
      "Weniger als 1 Jahr",
      "1 Jahr",
      "1-2 Jahre",
      "2-3 Jahre",
      "Mehr als 3 Jahre ",
    ],
  },
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function YourApplication(props) {
  const { profileStatus, verifiedUser } = props;
  const theme = useTheme();
  const { verfiedUser, progress, setProgress } = props;
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmailAdress] = useState();
  const [user, setUser] = useState(null);
  const [number, setNumber] = useState();
  const [code, setCode] = useState();
  const [password, setPassword] = useState();
  const [serviceIds, setServiceIds] = useState([]);
  const [showOverview, setShowOverview] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [categories, setCategories] = useState([]);
  const [uploadfile, setUploadFile] = useState([]);
  const [values, setValues] = useState([{ name: "", desc: "", image: null }]);
  const [latLong, setLatLong] = useState(null);
  const [userData, setUserData] = useState(null);
  const [personName] = useState([]);
  let [questions, setQuestions] = useState(defaultQuestions);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUser(jwt.decode(window.localStorage.getItem("zolu-auth-token-expert")));
  }, []);
  const handleClose = () => {
    if (profileStatus?.profile) {
      if (profileStatus?.profile === true) {
        props.setShow(false);
      }
    } else {
      if (profileStatus?.profile === false) {
        props.setShow(true);
      } else {
        props.setShow(false);
      }
    }
  };
  const signinFirebase = () => {
    if (!firstName) {
      return toast.warn("please enter firstName");
    } else if (!lastName) {
      return toast.warn("please enter lastName");
    } else if (!email) {
      return toast.warn("please enter email");
    } else if (!password) {
      return toast.warn("please enter password");
    } else if (password.length < 8) {
      return toast.warn("pasword length must be greater than 8");
    } else if (!code) {
      return toast.warn("please enter mobile code");
    } else if (!number) {
      return toast.warn("please enter mobile number");
    } else {
      checkNumber();
    }
  };
  const checkNumber = async () => {
    const payload = new FormData();
    payload.append("phoneNumber", code + number);
    payload.append("name", firstName + "  " + lastName);
    payload.append("email", email);
    payload.append("password", password);
    payload.append("role", "expert");
    payload.append("type", "form");
    const response = await Api("post", `api/auth/signup`, payload);
    if (response.status === 200 || response.status === 201) {
      props?.setValued(response?.data?.token);
      let token = jwt.decode(response?.data?.token);
      localStorage.setItem("userData", JSON.stringify(token?.data?._id));
      props?.setPhoneNum(code + number);
      let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
      auth
        .signInWithPhoneNumber(code + number, verify)
        .then(async (result) => {
          props.setfinal(result);
          localStorage.setItem("recaptcha", JSON.stringify({ code: result }));
          if (result) {
            toast.success(response?.data?.msg);
            props.setShowVerification(true);
            props.setShow(false);
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      toast.warning(response?.data?.msg);
    }
  };
  function ProgressState() {
    if (progress === 25) {
      signinFirebase();
    } else if (progress === 50) {
      if (questions[0] === "asd") {
        return toast.warn("please fill the form");
      } else if (questions[0]?.answer?.length === 0) {
        return toast.warn("please select Location");
      } else if (questions[1]?.answer?.length === 0) {
        return toast.warn("please select gender");
      } else if (
        questions[2]?.answer?.length === 0 ||
        questions[3]?.answer?.length === 0 ||
        questions[4]?.answer?.length === 0 ||
        questions[5]?.answer?.length === 0
        // ||
        // questions[6]?.answer?.length === 0
      ) {
        return toast.warn("please fill all the fields");
      } else {
        props?.setquestions(questions);
        setProgress(progress + 25);
      }
    } else if (progress === 75) {
      if (serviceIds?.length < 0) {
        return toast.warn("Please Select Service");
      } else {
        props?.settreatments(serviceIds);
        setProgress(progress + 25);
      }
    } else if (progress < 100) {
      setProgress(progress + 25);
    } else if (progress === 100) {
      if (values.length === 0) {
        return toast.warn("Please Upload the File");
      } else {
        props?.setfile(values);
        setProgress(100);
        setShowOverview(true);
      }
    }
  }
  const FirstStep = () => {
    return (
      <>
        <div className={styles.ContactText}>Kontaktinformationen</div>
        <div className={`${styles.InputLabel} mt-1`}>Vorname</div>
        <input
          fullWidth
          id="fullWidth"
          className={styles.SimpleInputDesign}
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <div className={styles.InputLabel}>Nachname</div>
        <input
          fullWidth
          id="fullWidth"
          className={styles.SimpleInputDesign}
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <div className={styles.InputLabel}>E-Mail-Adresse</div>
        <input
          fullWidth
          id="fullWidth"
          className={styles.SimpleInputDesign}
          onChange={(e) => setEmailAdress(e.target.value)}
          value={email}
        />
        <div className={styles.InputLabel}>Passwort</div>
        <input
          fullWidth
          id="fullWidth"
          type="password"
          className={styles.SimpleInputDesign}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className={styles.InputLabel}>Handynummer</div>
        <div className={styles.WidthInputNumber}>
          <div className="d-flex ">
            <FormControl
              sx={{
                minWidth: 120,
                boxShadow: "1px 3px 17px 0px #b6b4cc",
                backgroundColor: "white",
                borderRadius: "10px",
                height: "44px",
              }}
            >
              <Select
                sx={{
                  "& .MuiSvgIcon-root": { color: "#30d5c8" },
                  height: "44px",
                }}
                value={code}
                onChange={(e) => setCode(e.target.value?.item)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <div className="d-flex">
                      <img
                        src={name.image}
                        alt="img Not found "
                        style={{
                          height: "20px",
                          width: "30px",
                          marginTop: "2px",
                          marginRight: "15px",
                        }}
                      />
                      <div>{name.item}</div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input
              fullWidth
              id="fullWidth"
              className={styles.PhoneNumberInput}
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </div>
        </div>
        <div
          id="recaptcha-container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "7rem",
          }}
        ></div>
      </>
    );
  };
  const SecondStep = () => {
    return (
      <div style={{ backgroundColor: "#ffffff" }}>
        <div className={styles.ContactText}>Über Sie</div>
        <div className="row">
          <div className=" col-lg-12">
            {questions?.map((data, index) => {
              return (
                <>
                  <div className={styles.InputLabelLocation}>
                    {data?.question}
                  </div>
                  {data?.type === "dropdown" ? (
                    <FormControl className={styles.select2ndstep}>
                      <Select
                        sx={{
                          "& .MuiSvgIcon-root": { color: "#30d5c8" },
                          borderRadius: "10px",
                        }}
                        name="cuurentSituation"
                        value={data?.answer}
                        onChange={(e) => handleChange(e, index)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {data?.dropdownValue.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : data?.type === "map" ? (
                    <div className={styles.select2ndstepGoogleAutoComplete}>
                      <div className="GooglePlacesAutocomplete2ndStep">
                        <GooglePlacesAutocomplete
                          apiKey={`${process.env.NEXT_PUBLIC_REACT_APP_MAPS_API}`}
                          style={{ width: "10%" }}
                          selectProps={{
                            onChange: (e) => {
                              handleChange(e, index, e.label);
                              geocodeByAddress(e.label)
                                .then((results) => getLatLng(results[0]))
                                .then(({ lat, lng }) => {
                                  setLatLong({ lat: lat, long: lng });
                                });
                            },
                            placeholder:
                              "Wo willst du deine Behandlungen anbieten?",
                          }}
                        />
                      </div>
                    </div>
                  ) : data?.question ===
                    "In welchem Umkreis möchtest du arbeiten?" ? (
                    <div className=" col-lg-12">
                      <div className="d-flex align-items-center">
                        <TextField
                          value={data?.answer}
                          type={"number"}
                          fullWidth
                          hiddenLabel
                          placeholder=""
                          className={`${styles.textfieldlocation}  no-spinners`}
                          id="filled-hidden-label-normal"
                          name="Location"
                          onChange={(e) => handleChange(e, index)}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            paddingLeft: "5px",
                            display: "flex",
                          }}
                        >
                          Kilometer{" "}
                          <span style={{ marginLeft: "5px" }}>(km)</span>
                        </span>
                      </div>
                    </div>
                  ) : data?.question === "Geschlecht" ? (
                    <div className=" col-lg-12">
                      <FormControl className={styles.select2ndstep}>
                        <Select
                          sx={{
                            "& .MuiSvgIcon-root": { color: "#30d5c8" },
                            borderRadius: "10px",
                          }}
                          name="cuurentSituation"
                          value={data?.answer}
                          onChange={(e) => handleChange(e, index)}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          {data?.dropdownValue.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, personName, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  ) : (
                    <TextField
                      value={data?.answer}
                      type={data?.inputType}
                      fullWidth
                      hiddenLabel
                      placeholder=""
                      className={styles.textfieldlocation}
                      id="filled-hidden-label-normal"
                      name="Location"
                      onChange={(e) => handleChange(e, index)}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  const ThirdStep = () => {
    return (
      <div className="pr-4">
        <div className={styles.ContactText}>Behandlungen</div>
        <div className={styles.CategoryText}>
          Wähle die Behandlungen, die du bei Zoulu anbieten möchtest.
        </div>
        <div className="row mt-4">
          <div className="col-lg-12">
            {categories?.map((data, key) => {
              return (
                <>
                  <div
                    className={`${styles.Selecteddiv} d-flex justify-space-between`}
                    key={key}
                  >
                    <div className={style.TimeText}>
                      <img src={data?.icon} className={styles.MessageIcon} />
                      <span className={`${styles.OptionText} ml-5`}>
                        {" "}
                        {data?.name}
                      </span>
                    </div>
                    <div className={styles.DownIcon}>
                      {data?.selectedService ? (
                        <DoneIcon
                          className={styles.TickIcon}
                          onClick={() => {
                            data.selectedService = null;
                            setCategories([...categories]);
                            setServiceIds(
                              serviceIds?.filter((e) => e !== data?._id)
                            );
                          }}
                        />
                      ) : (
                        <span
                          style={{ marginRight: "10px", cursor: "pointer" }}
                          onClick={() => {
                            data.selectedService = data?._id;
                            setCategories([...categories]);
                            setServiceIds([...serviceIds, data?._id]);
                          }}
                        >
                          Auswählen
                        </span>
                      )}
                      {/* {showDiv === data?._id ? (
                        <KeyboardArrowUpIcon onClick={() => handlerdropdown(data)} style={{ cursor: "pointer" }} />
                      ) : (
                        <KeyboardArrowDownIcon onClick={() => handlerdropdown(data)} style={{ cursor: "pointer" }} />
                      )} */}
                    </div>
                  </div>
                  {/* {showDiv === data?._id
                    ? data?.services?.map((service, index) => (
                        <div
                          className="row mt-3"
                          style={{
                            width: "100%",
                            marginLeft: "0.2%",
                            marginTop: "10px",
                          }}
                        >
                          <div
                            className={`${styles.HidenOptions} d-flex justify-space-between`}
                          >
                            <div className={style.TimeText}>
                              <span
                                className={`${styles.OptionText} ml-5 ${styles.TextSize}`}
                              >
                                {" "}
                                {service?.name}
                              </span>
                            </div>
                            {data?.selectedService ? (
                              <DoneIcon
                                className={styles.TickIcons}
                                onClick={() => {
                                  data.selectedService = null;
                                  setCategories([...categories]);
                                  setServiceIds(
                                    serviceIds?.filter((e) => e !== data?._id)
                                  );
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      ))
                    : null} */}
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  const findFileAgainstCertificate = (id) => {
    const find = values?.find((file) => file?.id === id);
    console.log(find);
    return find;
  };
  const FourthStep = () => {
    return (
      <div>
        <div className={styles.ContactText}>Qualifikationen</div>
        <div className={styles.CategoryText}>
          Bitte lade Zertifikatsnachweise für die angegebenen Behandlungen hoch{" "}
        </div>
        {categories?.map((data, index) => (
          <>
            {data?.selectedService ? (
              <div className="d-flex align-items-center mt-4 pt-3" key={data}>
                <div>
                  <Button
                    className={`${styles.UploadButtonDeep}`}
                    variant="contained"
                  >
                    {data?.name}
                  </Button>
                </div>
                <div>
                  <label
                    for={index}
                    startIcon={
                      <AiOutlineCloudUpload
                        className={styles.AiOutlineCloudUploadIcon}
                      />
                    }
                    className={styles.UploadButton}
                    style={{ cursor: "pointer" }}
                    variant="contained"
                  >
                    Zertifikat hochladen
                  </label>
                  <input
                    type="file"
                    name="upload"
                    id={index}
                    onChange={(e) => filehandler(e, data?._id)}
                    style={{ display: "none" }}
                  />
                </div>
                {findFileAgainstCertificate(data?._id) ? (
                  <span
                    style={{
                      textDecoration: "underline",
                      textTransform: "capitalize",
                      margin: "0 0 20px 20px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        findFileAgainstCertificate(data?._id)?.imageName,
                        "blank"
                      )
                    }
                  >
                    Zertifikat anzeigen
                  </span>
                ) : null}
              </div>
            ) : null}
          </>
        ))}
      </div>
    );
  };
  // * Second Step
  const handleChange = (event, index, label) => {
    if (label !== undefined && label !== null) {
      questions[index].answer = label;
    } else if (label === undefined) {
      questions[index].answer = event.target.value;
    }
    setQuestions([...questions]);
  };
  const getCategory = async () => {
    const response = await Api("get", `api/category?page=1&limit=10000`);
    if (response.status === 200) {
      const data = response.data.data;
      setCategories(data);
    } else {
      toast.error(response.data.msg);
    }
  };
  //* Third Step
  useEffect(() => {
    getCategory();
  }, []);

  const handlerdropdown = (data) => {
    if (showDiv === data?._id) {
      setShowDiv();
    } else {
      setShowDiv(data?._id);
    }
  };
  //* fourth step
  const filehandler = (event, id) => {
    const Data = values.filter((item, index) => {
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
    setValues(newData);
    setUploadFile([...uploadfile, event.target.files[0]]);
  };
  const Overview = () => {
    return (
      <div className={`${styles.AppplicationContainer} mt-5  m-0 p-0`}>
        <div className={styles.ContactText}>Übersicht</div>
        <div className={styles.CategoryText}>
          {/* Wählen Sie die Behandlungen, die Sie auf der Serect Spa-Plattform
          anbieten möchten */}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div
              className={`${styles.SelecteddivOverview} d-flex justify-space-between`}
            >
              <div className={style.TimeText}>
                <DoneIcon className={styles.OverviewDoneIcon} />
                <span className={`${styles.OptionText} ml-5`}>Über Dich</span>
              </div>
              <div className={styles.DownIcon}>
                <div
                  className={styles.EditText}
                  onClick={(e) => {
                    setProgress(50);
                    setShowOverview(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Bearbeiten
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div
              className={`${styles.SelecteddivOverview} d-flex justify-space-between`}
            >
              <div className={style.TimeText}>
                <DoneIcon className={styles.OverviewDoneIcon} />
                <span className={`${styles.OptionText} ml-5`}>
                  Behandlungen
                </span>
              </div>
              <div className={styles.DownIcon}>
                <div
                  className={styles.EditText}
                  onClick={(e) => {
                    setProgress(75);
                    setShowOverview(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Bearbeiten
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div
              className={`${styles.SelecteddivOverview} d-flex justify-space-between`}
            >
              <div className={style.TimeText}>
                <DoneIcon className={styles.OverviewDoneIcon} />
                <span className={`${styles.OptionText} ml-5`}>
                  {" "}
                  Qualifikationen
                </span>
              </div>
              <div className={styles.DownIcon}>
                <div
                  className={styles.EditText}
                  onClick={(e) => {
                    setProgress(100);
                    setShowOverview(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Bearbeiten
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const submitApplication = async () => {
    setLoading(true);
    const payload = new FormData();
    payload.append(
      "userId",
      JSON.parse(localStorage.getItem("userData")) || user?.data?._id
    );
    payload.append("gender", questions[1]?.answer);
    payload.append("address", questions[0]?.answer);
    payload.append("country", "germany");
    payload.append("questions", JSON.stringify(questions));
    payload.append(
      "categories",
      JSON.stringify(
        categories?.filter((e) => e?.selectedService)?.map((e) => e?._id)
      )
    );
    for (const obj of categories) {
      for (const file of values) {
        if (obj?.selectedService && obj?._id === file?.id) {
          payload.append("certificates", file.image);
        }
      }
    }
    payload.append("coordinates", JSON.stringify(latLong));
    // payload.append("radius", questions[1]?.answer);
    const response = await Api("post", "api/expert/send-application", payload);
    if (response.status === 200 || response.status === 201) {
      setLoading(false);
      props.setShow(false);
      localStorage.clear();
      toast.success(response.data?.msg);
    } else {
      setLoading(false);
      toast.error(response.data?.msg);
    }
  };
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Modal
        show={props.show}
        centered
        onHide={handleClose}
        animation={false}
        size="lg"
        className={`${
          props.showVerification || props.verifiedModal ? styles.blurrModal : ""
        }`}
      >
        <Modal.Header
          className={styles.ModalHeaderDiv}
          style={{ borderTopRightRadius: "17px", borderTopLeftRadius: "17px" }}
        >
          <div
            className={styles.leftApplicationHeader}
            style={{ width: "94%", margin: "auto" }}
          >
            <div className={styles.ModalHeaderText}> Ihre Bewerbung</div>
            <div className={styles.ModalHeaderLevel}>
              Schritt {progress === 25 ? "1/" : null}{" "}
              {progress === 50 ? "2/" : null}
              {progress === 75 ? "3/" : null} {progress === 100 ? "4/" : null}
              <span style={{ color: "rgb(233, 233, 233)" }}>4</span>
            </div>
            <div className={styles.ProgressContainer}>
              <LinearProgress
                variant="determinate"
                value={progress}
                className={styles.ProgressBarApplicatioons}
              />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body
          style={{ background: progress == 25 ? "#F9F9F9" : "white" }}
          className={`  ${styles.leftApplicationbody} ${styles.leftApplicationbodyHeight}`}
        >
          <div className={`${styles.AppplicationContainer}  mt-4  m-0 p-0`}>
            {showOverview ? (
              Overview()
            ) : (
              <>
                {progress === 25 ? FirstStep() : null}
                {progress === 50 ? SecondStep() : null}
                {progress === 75 ? ThirdStep() : null}
                {progress === 100 ? FourthStep() : null}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer
          className={styles.ModalFooter}
          style={{
            backgroundColor: progress == 25 ? "#F9F9F9" : "white",
            borderTop: "none",
            borderBottomRightRadius: "17px",
            borderBottomLeftRadius: "17px",
          }}
        >
          {showOverview ? (
            <ZouluButton
              title="Fortsetzen"
              className={styles.ApplicationButton}
              onClick={() => submitApplication()}
            />
          ) : (
            <ZouluButton
              title={process > 25 ? "Fortsetzen" : " Jetzt bewerben"}
              className={styles.ApplicationButton}
              onClick={() => ProgressState()}
            />
          )}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
export default YourApplication;

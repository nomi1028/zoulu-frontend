import React, { useState } from "react";
import styles from "../../../styles/webversionmodals.module.css";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
const defaultQuestions = [
  { question: "Location", answer: "", type: "map" },
  { question: "Gender", answer: "", type: "dropdown", dropdownValue: ["Male", "Female", "Other"] },
  { question: "How many bookings a week are you looking far from secrect spa?", answer: "", type: "dropdown", dropdownValue: ["less than 5", "greater than 5", "less than 10", "greater than 10"] },
  { question: "Which of these best describes your current situation?", answer: "", type: "dropdown", dropdownValue: [" I am employed at a salon or spa", " I am employed at a salon or spa"] },
  { question: "How Did You Hear About Us?", answer: "", type: "dropdown", dropdownValue: ["Friend", "Collegue"] },
  { question: "Name of friend or collegue", answer: "", type: "input", dropdownValue: [" Friend or Colleage", " friend or colleage"] },
  { question: "Professional Experience", answer: "", type: "dropdown", dropdownValue: ["Less than 1 year", "1 Year", "1-2 year", "2-3 year", "3 plus year"] },
];
function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
const SecondStep = (props) => {
  const theme = useTheme();
  const [personName] = useState([]);
  let [questions, setQuestions] = useState(defaultQuestions);
  const handleChange = (event, index, label) => {
    if (label !== undefined && label !== null) {
      questions[index].answer = label;
    } else if (label === undefined) {
      questions[index].answer = event.target.value;
    }
    setQuestions([...questions]);
    props?.setTreatment([...questions]);
  };
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <div className={styles.ContactText}>About You</div>
      <div className="row">
        <div className=" col-lg-12">
          {questions?.map((data, index) => {
            return (
              <>
                <div className={styles.InputLabelLocation}>{data?.question}</div>
                {data?.type === "dropdown" ? (
                  <FormControl className={styles.select2ndstep}>
                    <Select
                      sx={{ "& .MuiSvgIcon-root": { color: "#30d5c8" }, borderRadius: "10px" }}
                      name="cuurentSituation"
                      value={data?.answer}
                      onChange={(e) => handleChange(e, index)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {data?.dropdownValue.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
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
                          },
                          placeholder: "Gib deine Wunschadresse ein…",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <TextField
                    value={data?.answer}
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
export default SecondStep;

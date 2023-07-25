import React, { useEffect } from "react";
import SidebarWrapper from "../SideBarWrapper";
import { Table } from "reactstrap";
import Checkbox from "@mui/material/Checkbox";
import styles from "../../../styles/tableavailability.module.css";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
var jwt = require("jsonwebtoken");
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const time = [
  "00:01",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "24:00",
];
import { Api } from "../../../utils/Api";
import { useState } from "react";
import ZouluButton from "../../Common/ZouluButton/ZouluButton";
import Loader from "../../../Components/Loader";
import AuthProtected from "../../../utils/AuthProtected";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
function getStyles(name, timeset, theme) {
  return {
    fontWeight:
      timeset.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Index = () => {
  const [values, setValues] = useState();
  const [loading, setLoading] = useState();
  const theme = useTheme();
  const [days, setDays] = useState([
    { day: "Montag", available: false },
    { day: "Dienstag", available: false },
    { day: "Mittwoch", available: false },
    { day: "Donnerstag", available: false },
    { day: "Freitag", available: false },
    { day: "Samstag", available: false },
    { day: "Sonntag", available: false },
  ]);
  const [timeset, settimeset] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    settimeset(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValues(token?.data);
  }, []);
  const addAvailability = async (e) => {
    let error = false;
    let day = null;
    for (let i = 0; i < days.length; i++) {
      const obj = days[i];
      const start = obj.start_time;
      const end = obj.end_time;
      if (start && end) {
        if (start && end && start < end) {
        } else {
          error = true;
          day = obj.day;
          break;
        }
      }
    }
    if (error) return toast.warning(`${day} has invalid start and end times`);
    setLoading(true);
    const data = {
      long: values?.profile[0].location?.coordinates[0],
      lat: values?.profile[0].location?.coordinates[1],
    };
    const payload = new FormData();
    payload.append("availability", JSON.stringify(days));
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

      setLoading(false);
      toast.success(response?.data?.msg);
    } else {
      setLoading(false);
      toast.error(response.data.msg);
    }
  };
  useEffect(() => {
    getAvailability();
  }, [values]);
  const getAvailability = async () => {
    setLoading(true);
    if (values) {
      const response = await Api("get", `api/profile/${values?._id}`);
      if (response?.status === 200) {
        setLoading(false);
        if (response?.data?.data?.profile[0]?.availability.length > 1)
          setDays(response?.data?.data?.profile[0]?.availability);
      } else {
        setLoading(false);
      }
    }
  };
  console.log(days);
  return (
    <>
      {loading ? <Loader /> : null}
      <SidebarWrapper>
        <div className="container-fluid margin-sidebar pt-5">
          <div className="row mt-5 pt-1">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
              <div className={`${styles.tablestyle}`}>
                <Table size="lg" responsive className={`${styles.tablemargin}`}>
                  <thead>
                    <tr className={`${styles.tableheader}`}>
                      <th className={`${styles.headertitle1}`}>Tage</th>
                      <th className={`${styles.headertitle}`}>Verfügbar</th>
                      <th className={`${styles.headertitle}`}>Startzeit</th>
                      <th className={`${styles.headertitleRadius}`}>Endzeit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((item, index) => (
                      <tr key={index}>
                        <td className={`${styles.bodyweektitle}`}>
                          {item.day}
                        </td>
                        <td className={`${styles.bodyweekcheckbox}`}>
                          <div>
                            <Checkbox
                              {...label}
                              size="small"
                              key={item?.available}
                              checked={item?.available}
                              onChange={(event, newValue) => {
                                item.available = newValue;
                                setDays([...days]);
                              }}
                            />
                          </div>
                        </td>
                        <td className={`${styles.startTime}`}>
                          <FormControl sx={{ width: "14ch" }} key={index}>
                            <Select
                              style={{
                                fontFamily: "PlusJakartaSans-Medium",
                                fontStyle: "normal",
                                fontSize: "13px",
                                color: "#637381",
                              }}
                              value={item?.start_time}
                              key={item?.start_time}
                              onChange={(e) => {
                                item.start_time = e.target.value;
                                setDays([...days]);
                              }}
                              input={<OutlinedInput value={item?.start_time} />}
                              MenuProps={MenuProps}
                            >
                              {time.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, timeset, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </td>
                        <td className={`${styles.endTime}`}>
                          <FormControl sx={{ width: "14ch" }} key={index}>
                            <Select
                              style={{
                                fontFamily: "PlusJakartaSans-Medium",
                                fontStyle: "normal",
                                fontSize: "13px",
                                color: "#637381",
                              }}
                              value={item?.end_time}
                              key={item?.end_time}
                              onChange={(e) => {
                                item.end_time = e.target.value;
                                setDays([...days]);
                              }}
                              input={<OutlinedInput value={item?.end_time} />}
                              MenuProps={MenuProps}
                            >
                              {time.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, timeset, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div
                style={{
                  marginLeft: "20px",
                  marginTop: "28px",
                  display: "flex",
                  justifyContent: "flex-end",
                  float: "right",
                }}
              >
                <ZouluButton
                  title="Aktualisieren"
                  className={styles.updateAvailablebuton}
                  onClick={() => addAvailability()}
                />
              </div>
            </div>{" "}
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
};
export default AuthProtected(Index);

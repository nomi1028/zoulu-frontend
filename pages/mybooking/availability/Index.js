import React, { useEffect } from "react";
import SidebarWrapper from "../SideBarWrapper";
import { Table } from "reactstrap";
import Checkbox from "@mui/material/Checkbox";
import styles from "../../../styles/tableavailability.module.css";
import TextField from "@mui/material/TextField";
var jwt = require("jsonwebtoken");
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const time = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];
import Autocomplete from "@mui/material/Autocomplete";
import { Api } from "../../../utils/Api";
import { useState } from "react";
import ZouluButton from "../../Common/ZouluButton/ZouluButton";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Index = () => {
  const [days, setDays] = React.useState([{ day: "Saturday" }, { day: "Sunday" }, { day: "Monday" }, { day: "Tuesday" }, { day: "Wednesday" }, { day: "Thurdsay" }, { day: "Friday" }]);
  const [values, setValues] = useState();
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValues(token?.data?.expert?._id);
  }, [values]);
  const expertAdd = async (e) => {
    const payload = new FormData();
    days.map((data, key) => {
      return payload.append(`${data?.day}`, JSON.stringify(data));
    });
    payload.append(`expertId`, values);
    const response = await Api("post", `/api/expert/addAvailabilty`, payload);
    if (response?.status === 200) {
      toast.success(response?.data?.message);
    }
  };
  useEffect(() => {
    getCart();
  }, [values]);
  const getCart = async () => {
    if (values) {
      const response = await Api("get", `/api/expert/addAvailabilty?expertId=${values}`);
      if (response.status === 200) {
        console.log(response?.data?.data, "responceData");
        if (response?.data?.data.length !== 0) setDays(response?.data?.data);
      } else {
      }
    }
  };
  console.log(days);
  return (
    <>
      <SidebarWrapper>
        <div className="container-fluid margin-sidebar">
          <div className="row mt-3 pt-1">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
              <div className={`${styles.tablestyle}`}>
                <Table size="lg" responsive className={`${styles.tablemargin}`}>
                  <thead>
                    <tr className={`${styles.tableheader}`}>
                      <th className={`${styles.headertitle1}`}>Days</th>
                      <th className={`${styles.headertitle}`}>Available</th>
                      <th className={`${styles.headertitle}`}>Start Time</th>
                      <th className={`${styles.headertitle}`}>End Time</th>
                      <th className={`${styles.headertitle2}`}>Available Next Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((item, key) => {
                      return (
                        <>
                          <tr key={key}>
                            <td className={`${styles.bodyweektitle}`}>{item.day}</td>
                            <td className={`${styles.bodyweekcheckbox}`}>
                              <div>
                                <Checkbox
                                  {...label}
                                  defaultChecked
                                  size="small"
                                  onChange={(event, newValue) => {
                                    item.available = newValue;
                                    setDays([...days]);
                                  }}
                                />
                              </div>
                            </td>
                            <td className={`${styles.startTime}`}>
                              <div>
                                <Autocomplete
                                  key={key}
                                  value={item.value}
                                  onChange={(event, newValue) => {
                                    item.startTime = newValue;
                                    setDays([...days]);
                                  }}
                                  inputValue={item.value}
                                  onInputChange={(event, newInputValue) => {
                                    item.startTime = newInputValue;
                                    setDays([...days]);
                                  }}
                                  sx={{
                                    width: "14ch",
                                  }}
                                  disablePortal
                                  id="combo-box-demo"
                                  options={time}
                                  renderInput={(params) => <TextField {...params} placeholder={item?.startTime} />}
                                />
                              </div>
                            </td>
                            <td className={`${styles.endTime}`}>
                              <div>
                                <Autocomplete
                                  key={key}
                                  value={item.value}
                                  onChange={(event, newValue) => {
                                    item.endTime = newValue;
                                    setDays([...days]);
                                  }}
                                  inputValue={item.value}
                                  onInputChange={(event, newInputValue) => {
                                    item.endTime = newInputValue;
                                    setDays([...days]);
                                  }}
                                  sx={{
                                    width: "14ch",
                                  }}
                                  disablePortal
                                  id="combo-box-demo"
                                  options={time}
                                  renderInput={(params) => <TextField {...params} placeholder={item?.endTime} />}
                                />
                              </div>
                            </td>
                            <td className={`${styles.appointmentnext}`}>
                              <div className={`${styles.appointmentcheckbox}`}>
                                <Checkbox {...label} defaultChecked size="small" />
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <ZouluButton
                title="ADD"
                onClick={() => {
                  expertAdd();
                }}
              />
            </div>{" "}
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
};

export default Index;

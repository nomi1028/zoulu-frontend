import React, { useEffect, useState } from "react";
import RightTable from "./RightTable";
import { Api } from "../../../utils/Api";
import { toast } from "react-toastify";
var jwt = require("jsonwebtoken");
import Loader from "../../../Components/Loader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ZouluButton from "../../Common/ZouluButton/ZouluButton";
import Typography from "@mui/material/Typography";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ padding: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const LeftSide = () => {
  const [booking, setBookings] = useState([]);
  const [loading, setLoading] = useState();
  const [value, setValue] = React.useState("upcoming");

  useEffect(() => {
    getbooking();
  }, [value]);
  const getbooking = async () => {
    setLoading(true);

    const response = await Api("get", `api/customer/booking/${typeof window !== "undefined" && jwt.decode(localStorage.getItem("zolu-auth-token"))?.data?._id}?type=${value}&limit=10&page=1`);

    if (response.status === 200) {
      setLoading(false);
      setBookings(response?.data?.data);
      console.log(response?.data?.data);
    } else {
      setLoading(false);
      toast.error(response.data.msg);
    }
  };

  return (
    <>
      <div className="container-fluid m-0 p-0 mt-5 pt-2">
        <Box className="tabCustomerBookingZindex mainClasscontainer" sx={{ width: "100%", marginLeft: "-8px" }}>
          <Tabs value={value} onChange={(e, value) => setValue(value)} aria-label="lab API tabs example">
            <Tab label={`Anstehende Buchungen`} className={value === "upcoming" ? "activeLink-Booking" : "tab_1_style-Booking"} value={"upcoming"} style={{ marginRight: "18px" }} />
            <Tab label={`Letzte Buchungen`} className={value === "past" ? "activeLink-Booking" : "tab_1_style-Booking"} value={"past"} />
          </Tabs>
        </Box>
        {loading ? <Loader /> : ""}
        <div className="pr-0">
          <div className="row" style={{ marginTop: "22px" }}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="d-flex justify-content-between my-3">{value === "upcoming" ? <h4 style={style}>Anstehende Buchungen</h4> : <h4 style={style}>Letzte Buchungen</h4>}</div>
              <div>{booking.length !== 0 && <RightTable data={booking} callback={() => getbooking()} setLoading={setLoading} />}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LeftSide;
const style = {
  fontFamily: "PlusJakartaSans-Medium",
  fontSize: 20,
  color: "#06152D",
  textTransform: "capitalize",
};

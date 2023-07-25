import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "../../../styles/customer.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { LocalizationProvider } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Table } from "reactstrap";
import { useEffect } from "react";
import { Api } from "../../../utils/Api";
import { Avatar } from "@mui/material";
import Loader from "../../../Components/Loader";
import AuthProtected from "../../../utils/AuthProtected";
const jwt = require("jsonwebtoken");
const array = ["All Customer"];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabsTable = (props) => {
  const [booking, setBookings] = React.useState();

  const [loading, setLoading] = React.useState();

  const [values, setValues] = React.useState();
  const [value, setValue] = React.useState(0);
  const [rowID, setRowID] = React.useState();

  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValue(token?.data);
    getbooking(token?.data?._id);
  }, []);

  const getbooking = async (id) => {
    setLoading(true);
    const response = await Api("get", `api/expert/customer/${id}`);
    if (response) {
      setLoading(false);

      setBookings(response?.data?.data);
      props?.setProfile(response?.data?.data[0]);
      setRowID(0);
    }
  };
  const rowHandler = (data, index) => {
    props?.setProfile(data);
    setRowID(index);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {loading ? <Loader /> : null}

      <div className={`${styles.UnActiveHeading}  mb-2`}>Alle Kunden</div>
      <div className={`${styles.borderBottomDivider}  mt-2`}></div>
      <div className={`${styles.overflowTable}`}>
        <div className={`${styles.Xoverflowtable}`}>
          <Table className={`${styles.table}`}>
            <thead className={`${styles.HeadingBar}`}>
              <tr>
                <th className={` ${styles.TableHeadingName} ${styles.TableContentWidthborder1}`}>
                  <div className="ml-3 " style={{ marginLeft: "10px" }}>
                    Name
                  </div>
                </th>
                <th className={` ${styles.TableHeading} ${styles.TableContentWidth1}`}>
                  <div className="d-flex">
                    <div>Telefon</div>
                    <div className={` ${styles.number} `}>Nummer</div>
                  </div>
                </th>
                <th className={` ${styles.TableHeading} ${styles.TableContentWidth1}`}>E-Mail</th>
                <th className={` ${styles.TableHeading} ${styles.TableContentWidth1}`}>Adresse</th>
                <th className={` ${styles.TableHeadingGender} ${styles.TableContentWidthborder2}`}>Geschlecht</th>
              </tr>
            </thead>
            <tbody>
              {booking?.map((data, index) => {
                return (
                  <tr
                    className={`${styles.CustomerContainer} mt-3 pt-3`}
                    style={rowID === index ? { backgroundColor: "#e1e5e5", cursor: "pointer" } : { cursor: "pointer" }}
                    onClick={() => rowHandler(data, index)}
                    key={index}
                  >
                    <td className={`${styles.TableContentWidth} ${styles.CustomerDetailsborder} `}>
                      <div className="d-flex">
                        <Avatar src={data?.image !== null ? data?.image : "/Images/avatarIcon.png"} sx={{ width: 44, height: 44 }} />
                        <div className={`${styles.customerName} text-capitalize`}>{data?.name}</div>
                      </div>
                    </td>
                    <td className={`${styles.TableContentWidth} ${styles.CustomerDetail} `}>
                      <div className={`${styles.customedetails} `}>{data?.phone_number}</div>
                    </td>
                    <td className={`${styles.TableContentWidth} ${styles.CustomerEmailDetails}  `}>
                      <div className={`${styles.customedetails} `}>{data?.email}</div>
                    </td>
                    <td className={`${styles.TableContentWidth} ${styles.CustomerDetail}  `}>
                      <div className={`${styles.customedetails} `}>{data?.address?.slice(0, 20)}</div>
                    </td>
                    <td className={`${styles.TableContentWidth} ${styles.CustomerDetailsRightborder}  `}>
                      <div className="d-flex">
                        <div className={`${styles.customedetails} `}> {data?.gender}</div>
                        {/* <MoreHorizIcon className={`${styles.MoreHorizIcon} `} /> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default AuthProtected(TabsTable);

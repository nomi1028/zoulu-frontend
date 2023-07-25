import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "../../../styles/customer.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Table } from "reactstrap";
import { useEffect } from "react";
import { Api } from "../../../utils/Api";
const jwt = require("jsonwebtoken");
const array = ["All Customer", "Active", "Running", "Hold", "Reported"];
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
  React.useEffect(() => {
    console.log("useEffect is running");
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValues(token?.data?.expert?._id);
  }, [values]);
  useEffect(() => {
    if (values) getbooking();
    if (booking) {
    }
  }, [loading, values]);
  const getbooking = async () => {
    console.log(values, "values");
    const response = await Api("get", `api/expert/getRevenue?expertId=${values}`);
    if (response.status === 200) {
      console.log(response?.data?.data?.orderDetails);
      setLoading(true);
      setBookings(response?.data?.data?.orderDetails);
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons allowScrollButtonsMobile>
          {array?.map((data, index) => {
            return <Tab label={data} {...a11yProps(0)} className={value == index ? styles.ActiveHeading : styles.UnActiveHeading} key={index} />;
          })}
        </Tabs>
      </Box>
      <TabPanel value={value} index={value}>
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
                      <div>Phone</div>
                      <div className={` ${styles.number} `}>Number</div>
                    </div>
                  </th>
                  <th className={` ${styles.TableHeading} ${styles.TableContentWidth1}`}>Email</th>
                  <th className={` ${styles.TableHeading} ${styles.TableContentWidth1}`}>Country</th>
                  <th className={` ${styles.TableHeadingGender} ${styles.TableContentWidthborder2}`}>Gender</th>
                </tr>
              </thead>
              <tbody>
                {booking?.map((data, index) => {
                  return (
                    <tr
                      className={`${styles.CustomerContainer} mt-3 pt-3`}
                      style={rowID === index ? { backgroundColor: "#e1e5e5" } : null}
                      onClick={() => {
                        rowHandler(data, index);
                      }}
                      key={index}
                    >
                      <td className={`${styles.TableContentWidth} ${styles.CustomerDetailsborder} `}>
                        <div className="d-flex">
                          <img src={"/Images/tablepic.png"} className={`${styles.clientImg}`} />
                          <div className={`${styles.customerName} `}>{data?.cartItem?.cusId?.firstName}</div>
                        </div>
                      </td>
                      <td className={`${styles.TableContentWidth} ${styles.CustomerDetail} `}>
                        <div className={`${styles.customedetails} `}>{data?.cartItem?.cusId?.phoneNumber}</div>
                      </td>
                      <td className={`${styles.TableContentWidth} ${styles.CustomerDetail}  `}>
                        <div className={`${styles.customedetails} `}>{data?.cartItem?.cusId?.email}</div>
                      </td>
                      <td className={`${styles.TableContentWidth} ${styles.CustomerDetail}  `}>
                        <div className={`${styles.customedetails} `}>{data?.cartItem?.address}</div>
                      </td>
                      <td className={`${styles.TableContentWidth} ${styles.CustomerDetailsRightborder}  `}>
                        <div className="d-flex">
                          <div className={`${styles.customedetails} `}> {data?.cartItem?.cusId?.gender}</div>
                          <MoreHorizIcon className={`${styles.MoreHorizIcon} `} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
};
export default TabsTable;

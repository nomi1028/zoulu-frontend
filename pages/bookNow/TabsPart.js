import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "../../styles/profile.module.css";
import Rating from "@mui/material/Rating";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { LinearProgress } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestoreIcon from "@mui/icons-material/Restore";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import { IoIosShareAlt } from "react-icons/io";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

function TabsPart() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const normalise = (value) => 20;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="About"
            {...a11yProps(0)}
            className={
              value == 0 ? `${styles.BorderTab}` : `${styles.SimpleTab}`
            }
          />
          <Tab
            label="Treatments"
            {...a11yProps(1)}
            className={
              value == 1 ? `${styles.BorderTab}` : `${styles.SimpleTab}`
            }
          />
          <Tab
            label="Review"
            {...a11yProps(2)}
            className={
              value == 2 ? `${styles.BorderTab}` : `${styles.SimpleTab}`
            }
          />
          <Tab
            label="Portfolio"
            {...a11yProps(3)}
            className={
              value == 3 ? `${styles.BorderTab}` : `${styles.SimpleTab}`
            }
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className={`${styles.TabOne} row`}>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6">
            <span className={styles.ReviewText}>Reviews & Rating</span>
            <h4 className={styles.PointText}>4.8</h4>
            <Rating
              style={{ color: "#30D5C8" }}
              name="simple-controlled"
              value={value}
              readOnly
            />
            <br />
            <span className={styles.BasedText}>based on 215 reviews</span>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6">
            <ErrorOutlineIcon className={styles.ErrorIcon} />
            <div className={`${styles.ProgressContainer} `}>
              <div className="row mt-2">
                <div className="col-lg-2">
                  <span className={styles.ProgresNumber}>5</span>
                </div>
                <div className="col-lg-10 mt-2">
                  <LinearProgress
                    className={styles.LineStyle}
                    variant="determinate"
                    value={20}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-2">
                  <span className={styles.ProgresNumber}>4</span>
                </div>
                <div className="col-lg-10 mt-2">
                  <LinearProgress
                    className={styles.LineStyle}
                    variant="determinate"
                    value={20}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-2">
                  <span className={styles.ProgresNumber}>3</span>
                </div>
                <div className="col-lg-10 mt-2">
                  <LinearProgress
                    className={styles.LineStyle}
                    variant="determinate"
                    value={30}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-2">
                  <span className={styles.ProgresNumber}>2</span>
                </div>
                <div className="col-lg-10 mt-2">
                  <LinearProgress
                    className={styles.LineStyle}
                    variant="determinate"
                    value={40}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-2">
                  <span className={styles.ProgresNumber}>1</span>
                </div>
                <div className="col-lg-10 mt-2">
                  <LinearProgress
                    className={styles.LineStyle}
                    variant="determinate"
                    value={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ButtonsContainerLeft}>
          <div className="mt-3">
            <CalendarMonthIcon className={styles.CalenderIcon} />
            <span className={styles.ProfileRatingText}>
              201 Bookings completed
            </span>
          </div>

          <div className="mt-3">
            <FavoriteIcon className={styles.HeartIcon} />
            <span className={styles.ProfileRatingText}>
              30 Customers have favourited Christie
            </span>
          </div>

          <div className="mt-3">
            <RestoreIcon className={styles.CalenderIcon} />
            <span className={styles.ProfileRatingText}>5 Years Experience</span>
          </div>
          <div className="d-flex mb-4">
            <ZouluButton
              className={styles.ProfileWhiteButton}
              title="Share Profile"
              startIcon={<IoIosShareAlt />}
            />
            <ZouluButton
              className={styles.ProfileWhiteButton}
              title="Add Favourite"
              startIcon={<FavoriteIcon />}
            />
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </Box>
  );
}
export default TabsPart;

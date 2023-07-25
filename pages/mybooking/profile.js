import React from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/webversionmodals.module.css";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import style from "../../styles/dashboardProfile.module.css";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import { Button } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import EditIcon from "@mui/icons-material/Edit";
const Index = () => {
  return (
    <SidebarWrapper>
      <div className="container-fluid margin-sidebar">
        <div className="row">
          <div className="col-lg-9 pt-3">
            <div className={style.ContainerDiv}>
              <img src={"/Images/profile.png"} className={style.ProfileImage} />
              <EditIcon className={style.EditIcon} />
            </div>
            <div className={style.EditContainer}>
              <div className="row">
                <div className=" col-lg-12 ">
                  <div className={`${styles.InputLabel} pt-3`}>Full Name</div>
                  <TextField label="Full Name" fullWidth id="fullWidth" className={`${style.EditInput} mb-4`} placeholder="milan" />
                </div>
                <div className=" col-lg-12 ">
                  <div className={`${styles.InputLabel} pt-0`}>Email</div>
                  <TextField fullWidth id="fullWidth" className={`${style.EditInput} mb-4`} placeholder="milan@gmail.com" />
                </div>
                <div className=" col-lg-12 ">
                  <div className={`${styles.InputLabel} pt-0`}>Mobile Number</div>
                  <TextField fullWidth id="fullWidth" className={`${style.EditInput} mb-4`} placeholder="444-555-666-76" />
                </div>
                <div className=" col-lg-12 ">
                  <div className={`${styles.InputLabel} pt-0`}>I Want to work in :</div>
                  <TextField fullWidth id="fullWidth" className={`${style.EditInput} mb-4`} placeholder="City Name" />
                  <br />
                  <div>
                    <Button className={style.SeledtedCity}>Muchen</Button>
                    <Button className={style.SeledtedCity}>Berlin</Button>
                  </div>
                  <div>
                    <ZouluButton startIcon={<img src={"/Images/profilelocation.png"} />} title="Add Redius" className={`${style.RadiusButtons} mb-4`} />
                  </div>
                </div>
                <div className=" col-lg-12 ">
                  <div className={`${styles.InputLabel} pt-0`}>Country</div>
                  <TextField fullWidth id="fullWidth" className={`${style.EditInput} mb-4`} placeholder="Germany" />
                </div>
                <div className=" col-lg-12 ">
                  <div className={`${styles.InputLabel} pt-0`}>Password</div>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    className={`${style.EditInput}  ${style.PasswordClassPadding}  pl-3 mb-4`}
                    placeholder="*******"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start" className={style.EyeIcon}>
                          <AiOutlineEye />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-lg-12 mt-4">
                  <div className={style.DisplayContainer}>
                    <Button className={style.BackButton}>Back To Home</Button>
                    <Button className={style.SaveButton}>Save Changes</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};
export default Index;

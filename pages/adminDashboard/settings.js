import React, { useEffect, useState } from "react";
import AuthProtected from "../../utils/AuthProtected";
import SideBarWrapper from "./SideBarWrapper";
import { Api } from "../../utils/Api";
import Loader from "../../Components/Loader";
import { TextField } from "@mui/material";
import style from "../../styles/dashboardProfile.module.css";

const Index = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const getSetting = async () => {
    setLoading(true);
    const response = await Api("get", "api/admin/setting");
    if (response.status === 200) {
      setLoading(false);
      setValue(response.data.data[0]?.company_percentage);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSetting();
  }, []);
  const updateSetting = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("companyPercentage", value);
    const response = await Api("put", "api/admin/setting", formData);
    if (response.status === 200) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  return (
    <SideBarWrapper>
      {loading ? <Loader /> : null}
      <div className="containerFluidAdmin mt-5">
        <div className="row  mt-5">
          <div className="col-lg-8  mt-5 mx-auto">
            <div className="row  mt-5">
              <div className=" col-lg-12 ">
                <TextField
                  label={"Company Percentage"}
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  type={"number"}
                  min={0}
                  value={value || ""}
                  className={`${style.EditInput} mb-4 text-capitalize`}
                  onChange={(e) => {
                    let min = 0;
                    let max = 100;
                    let val = 0;
                    val = Math.max(min, Math.min(max, Number(e.target.value)));
                    setValue(val);
                  }}
                />
              </div>
            </div>
            <div className="col-lg-12 mt-4">
              <div className="add-category-btn" onClick={() => updateSetting()}>
                Update
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBarWrapper>
  );
};
export default AuthProtected(Index);

import React, { useEffect, useState } from "react";
import LeftSide from "./mybooking/home/LeftSide";
import RightSide from "./mybooking/home/RightSide";
import SidebarWrapper from "./mybooking/SideBarWrapper";
import styles from "../styles/dashboard.module.css";
import style from "../styles/adminPanelHome.module.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import Protected from "../utils/ProtectedRoute";
import AuthProtected from "../utils/AuthProtected";
var jwt = require("jsonwebtoken");
const mybookingIndex = () => {
  const router = useRouter();
  useEffect(() => {
    setLoginRole(localStorage.getItem(`Role`));
  });
  const [loginRole, setLoginRole] = useState();
  useEffect(() => {
    setLoginRole(localStorage.getItem(`Role`));
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));

    if (token?.data?.role !== "customer") {
      router.back();
    }
  });
  return (
    <Protected role={"customer"}>
      <SidebarWrapper>
        <div className="container-fluid">
          <div className="row pt-3 ">
            <div className="col-xl-12 col-lg-12 col-xl-12 col-md-12 pad-small-zero">
              <LeftSide />
            </div>
          </div>
        </div>
      </SidebarWrapper>
    </Protected>
  );
};

export default AuthProtected(mybookingIndex);

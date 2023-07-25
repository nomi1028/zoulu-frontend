import * as React from "react";
import style from "../../styles/dashSmallHeader.module.css";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import styles from "../../styles/dashboard.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import Router from "next/router";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AuthProtected from "../../utils/AuthProtected";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BsHeadset, BsBookmarkPlus } from "react-icons/bs";
import { RiCalendarCheckFill } from "react-icons/ri";
import { ImUsers, ImProfile } from "react-icons/im";
import RatingModalBookings from "../mybooking/home/RatingModalBookings";
import { SignalCellularNull } from "@mui/icons-material";
var jwt = require("jsonwebtoken");
function ResponsiveDrawer(props) {
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("zolu-auth-token");
  console.log(jwt.decode(isLoggedIn));
  const [values, setValues] = useState();
  useEffect(() => {
    let token = jwt.decode(localStorage.getItem("zolu-auth-token"));
    setValues(token?.data?._id);
  }, []);
  useEffect(() => {
    setLoginRole(localStorage.getItem(`Role`));
  }, []);
  const userHandler = () => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
  };
  useEffect(() => {
    setLoginRole(localStorage.getItem(`Role`));
  });
  const drawerWidth = 240;
  const router = useRouter();
  const { window: body } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [loginRole, setLoginRole] = useState();
  const [sideBar, setSideBar] = useState([
    {
      // label: "Instrumententafel",
      label: "Dashboard",
      icon: <RxDashboard className={styles.DashboardSideBarIcons} />,
      path: "/dashboard",
      activeIcon: <RxDashboard className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Behandlungen",
      // label: "Services",
      icon: <BsHeadset className={styles.DashboardSideBarIcons} />,
      path: "/dashboard/services",
      activeIcon: <BsHeadset className={styles.DashboardSideBarIconsActive} />,
    },
    // {
    //   label: "Kunden",
    //   label: "Customers",
    //   icon: <ImUsers className={styles.DashboardSideBarIcons} />,
    //   path: "/dashboard/customers",
    //   activeIcon: <ImUsers className={styles.DashboardSideBarIconsActive} />,
    // },
    // {
    //   label: "Meine Finanzen",
    //   icon: <HiOutlineCurrencyDollar className={styles.DashboardSideBarIcons} />,
    //   path: "/dashboard/finance",
    //   activeIcon: <HiOutlineCurrencyDollar className={styles.DashboardSideBarIconsActive} />,
    // },
    {
      label: "Kalender",
      // label: "Calender",
      icon: <FaCalendarAlt className={styles.DashboardSideBarIcons} />,
      path: "/dashboard/calender",
      activeIcon: <FaCalendarAlt className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Buchungen",
      // label: "Bookings",
      icon: <BsBookmarkPlus className={styles.DashboardSideBarIcons} />,
      path: "/dashboard/bookings",
      activeIcon: <BsBookmarkPlus className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Profil",
      // label: "Profile",
      icon: <BiUser className={styles.DashboardSideBarIcons} />,
      path: "/dashboard/profile",
      activeIcon: <BiUser className={styles.DashboardSideBarIconsActive} />,
      option: true,
    },
    {
      label: "Verfügbarkeit",
      // label: "Availability",
      icon: <RiCalendarCheckFill className={styles.DashboardSideBarIcons} />,
      path: "/dashboard/availability/Index",
      activeIcon: <RiCalendarCheckFill className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Portfolio",
      icon: <ImProfile className={styles.DashboardSideBarIcons} />,
      path: "/dashboard/portfolio",
      activeIcon: <ImProfile className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Ausloggen",
      // label: "Logout",
      icon: <MdOutlineLogout className={styles.DashboardSideBarIcons} />,
      path: "/webVersion",
    },
  ]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div style={{ height: "74%" }}>
      <div className={styles.DashboardSideBar}>
        <Toolbar />
        <div
          style={{
            marginTop: "-44px",
            marginBottom: "30px",
            marginLeft: "6px",
            cursor: "pointer",
          }}
          onClick={() => {
            Router.push("/");
          }}
        >
          <span
            onClick={() => {
              Router.push("/");
            }}
            style={{
              color: "#1A1A1B",
              fontWeight: 900,
              fontFamily: "PlusJakartaSans-Medium",
              fontSize: "30px",
            }}
          >
            ZOULU
          </span>
          {/* <img
            src={"/Images/logo.png"}
            style={{ width: "135px", cursor: "pointer" }}
            alt="abc"
            onClick={() => {
              Router.push("/");
            }}
          /> */}
        </div>
        <div
          className="d-flex"
          style={{ marginLeft: "-12px" }}
          onClick={() => {
            setShow(true);
          }}
        >
          <Avatar
            src={isLoggedIn && jwt.decode(isLoggedIn)?.data?.image !== undefined ? jwt.decode(isLoggedIn)?.data?.image : "/Images/avatarIcon.png"}
            className={styles.DashboardProfile}
            style={{ border: "2px solid #007FFF" }}
          />
          <div>
            <h2 className={styles.ProfileName}>{isLoggedIn && jwt.decode(isLoggedIn)?.data?.name} </h2>
            <Stack spacing={0} className="stackRating-profile mt-2" style={{ width: "80px" }}>
              <Rating value={isLoggedIn && jwt.decode(isLoggedIn)?.data?.rating} readOnly precision={0.5} style={{ color: "#ffffff" }} size="small" />
            </Stack>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List style={{ marginTop: "21px" }}>
          {sideBar?.map((text, index) =>
            text?.label !== "Ausloggen" ? (
              <Link key={index} href={text.path}>
                <ListItem disablePadding>
                  <ListItemButton
                    style={{ paddingLeft: "53px" }}
                    className={text.path === router.pathname ? `${styles.SideBarContentActive}` : `${styles.SideBarContent}`}
                    onClick={() => {
                      {
                        text.label === "Ausloggen" ? localStorage.clear() : null;
                      }
                    }}
                  >
                    <ListItemIcon>{text.path === router.pathname ? text.activeIcon : text.icon}</ListItemIcon>
                    <ListItemText primary={text.label} style={{ marginLeft: "-17px" }} />
                    {text.path === router.pathname ? <div className={styles.activeBorderColorDashboard}></div> : null}
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : null
          )}
        </List>
      </div>
      <div style={{ flex: 1 }}></div>
      <Link href={sideBar[sideBar.length - 1].path}>
        <ListItem
          disablePadding
          onClick={() => {
            localStorage.clear();
          }}
        >
          <ListItemButton style={{ paddingLeft: "55px" }} className={sideBar.path === router.pathname ? `${styles.SideBarContentActive}` : `${styles.SideBarContent}`}>
            <ListItemIcon>{sideBar[sideBar.length - 1].icon}</ListItemIcon>
            <ListItemText primary={sideBar[sideBar.length - 1].label} style={{ marginLeft: "-17px" }} />
          </ListItemButton>
        </ListItem>
      </Link>
    </div>
  );
  const container = body !== undefined ? () => body().document.body : undefined;
  function choosebackground() {
    if (router.pathname === "/dashboard" || router.pathname === "/dashboard/calender" || router.pathname === "/dashboard/bookings" || router.pathname === "/dashboard/profile") {
      return styles.BackgroundDiv;
    } else if (router.pathname === "/dashboard/services" || router.pathname === "/dashboard/finance" || router.pathname === "/dashboard/customers" || router.pathname === "/dashboard/chat") {
      return styles.BackgroundDiv;
    }
  }
  function HeaderBackgrouond() {
    if (
      router.pathname === "/dashboard" ||
      router.pathname === "/dashboard/calender" ||
      router.pathname === "/dashboard/bookings" ||
      router.pathname === "/dashboard/customers" ||
      router.pathname === "/dashboard/availability/Index" ||
      router.pathname === "/dashboard/finance" ||
      router.pathname === "/dashboard/portfolio"
    ) {
      return styles.ColorBackgroundHead;
    } else if (router.pathname === "/dashboard/services" || router.pathname === "/dashboard/chat" || router.pathname === "/dashboard/profile") {
      return styles.WhiteBackgroundHead;
    }
  }
  return (
    <Box className={`${choosebackground()} `}>
      <AppBar
        className={`${HeaderBackgrouond()} `}
        style={{ boxShadow: "none" }}
        position="absolute"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {(isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile[0] && jwt.decode(isLoggedIn)?.data?.profile[0]?.stripe_account_id === null) ||
        (isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile[0] && jwt.decode(isLoggedIn)?.data?.profile[0]?.radius <= 0) ||
        (isLoggedIn && jwt.decode(isLoggedIn)?.data && jwt.decode(isLoggedIn)?.data?.image === null) ||
        (isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile[0] && jwt.decode(isLoggedIn)?.data?.profile[0]?.availability?.length === 0) ? (
          <div className="paddingExpertHeader">
            {(isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile[0] && jwt.decode(isLoggedIn)?.data?.profile[0]?.stripe_account_id === null) ||
            (isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile[0] && jwt.decode(isLoggedIn)?.data?.profile[0]?.radius <= 0) ||
            // (isLoggedIn &&
            //   jwt.decode(isLoggedIn)?.data?.profile[0] &&
            //   jwt.decode(isLoggedIn)?.data?.profile[0]?.availability?.length ===
            //     0) ||
            (isLoggedIn && jwt.decode(isLoggedIn)?.data && jwt.decode(isLoggedIn)?.data?.image === null) ? (
              <>
                <div className="HeaderConditionBody">
                  {isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile[0] && jwt.decode(isLoggedIn)?.data?.profile[0]?.stripe_account_id === null && <>Fügen Sie Ihre Stripe-Konto-ID hinzu &</>}{" "}
                  {isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile[0] && jwt.decode(isLoggedIn)?.data?.profile[0]?.radius <= 0 ? <span> Radius </span> : null}
                  {isLoggedIn && jwt.decode(isLoggedIn)?.data && jwt.decode(isLoggedIn)?.data?.image === null ? <span>& Profilbild</span> : null}
                  <span className="headerUpdateLink" onClick={() => router.push("/dashboard/profile")}>
                    Klicken Sie hier, um zu aktualisieren
                  </span>
                  <span className="headerUpdateLinkSpacing"> ||</span>
                </div>
              </>
            ) : null}
            {isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile[0] && jwt.decode(isLoggedIn)?.data?.profile[0]?.availability?.length === 0 ? (
              <div className="HeaderConditionBody">
                Fügen Sie Ihre Verfügbarkeit hinzu.
                <span className="headerUpdateLink" onClick={() => router.push("/dashboard/availability/Index")}>
                  Klicken Sie hier, um zu aktualisieren
                </span>
                <span className="headerUpdateLinkSpacing"></span>
              </div>
            ) : null}
          </div>
        ) : null}
        <div className={`${style.Contain} container `}>
          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-3 col-sm-3 col-xs-3 col-3 mt-3 pt-2">
              <IconButton className={style.SmallDashHeader} color="inherit" aria-label="open drawer" edge="start" sx={{ mr: 2, display: { sm: "none" } }}>
                {/* <MenuIcon style={{ color: "black" }} /> */}
                <span className={styles.ZouluText}>ZOULU</span>
              </IconButton>
            </div>
            <div
              className="col-md-9 col-sm-9  col-xs-9 col-9"
              style={{
                textAlign: "right",
                paddingRight: "0px",
                justifyContent: "end",
              }}
            >
              <div style={{ justifyContent: "end", marginRight: "-20px" }}>
                <MenuIcon style={{ color: "#007FFF", marginTop: "20px" }} onClick={handleDrawerToggle} />
                {/* <img src={"/Images/dashnotificationicon.png"} className={`${styles.BellIcon}`} /> */}
              </div>
            </div>
          </div>
        </div>
        {isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile[0] && jwt.decode(isLoggedIn)?.data?.profile[0]?.stripe_account_id === null ? (
          <div className={styles.DisplaySpaceHide} style={{ width: "100%", paddingLeft: "25px", paddingRight: "20px" }}>
            <div></div>
            <div className={styles.DisplaySpace}></div>
          </div>
        ) : (
          <div className={styles.DisplaySpaceHide} style={{ width: "100%", paddingLeft: "25px", paddingRight: "20px" }}>
            <div></div>
            <div className={styles.DisplaySpace}></div>
          </div>
        )}
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% -${drawerWidth}px)` },
        }}
      >
        {props.children}
      </Box>
      <RatingModalBookings show={show} setShow={(e) => setShow(e)} userid={isLoggedIn && jwt.decode(isLoggedIn)?.data?._id} />
    </Box>
  );
}
ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};
export default AuthProtected(ResponsiveDrawer);

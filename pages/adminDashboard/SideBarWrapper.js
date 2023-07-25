import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/dashboard.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AppBar, Box, CssBaseline, Drawer, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import jwt from "jsonwebtoken";
import { BiCategoryAlt } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { AiOutlineProfile, AiOutlineSetting } from "react-icons/ai";
import { DiGitPullRequest } from "react-icons/di";
import { BsHeadset } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import AuthProtected from "../../utils/AuthProtected";
import Link from "next/link";
import { MdOutlineCategory, MdOutlineLogout, MdOutlineSpaceDashboard } from "react-icons/md";
function SideBarWrapper(props) {
  const { body: body } = props;
  const [sidebar, setSidebar] = React.useState([
    {
      label: "Dashboard",
      icon: <MdOutlineSpaceDashboard className={styles.DashboardSideBarIcons} />,
      path: "/adminDashboard",
      activeIcon: <MdOutlineSpaceDashboard className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Categories",
      icon: <BiCategoryAlt className={styles.DashboardSideBarIcons} />,
      path: "/adminDashboard/categories",
      activeIcon: <BiCategoryAlt className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Sub Categories",
      icon: <MdOutlineCategory className={styles.DashboardSideBarIcons} />,
      path: "/adminDashboard/subcategories",
      activeIcon: <MdOutlineCategory className={styles.DashboardSideBarIconsActive} />,
    },
    { label: "Services", icon: <BsHeadset className={styles.DashboardSideBarIcons} />, path: "/adminDashboard/services", activeIcon: <BsHeadset className={styles.DashboardSideBarIconsActive} /> },
    { label: "Customers", icon: <ImUsers className={styles.DashboardSideBarIcons} />, path: "/adminDashboard/customers", activeIcon: <ImUsers className={styles.DashboardSideBarIconsActive} /> },
    {
      label: "Bookings",
      icon: <FaCalendarAlt className={styles.DashboardSideBarIcons} />,
      path: "/adminDashboard/bookings",
      activeIcon: <FaCalendarAlt className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Experts",
      icon: <AiOutlineProfile className={styles.DashboardSideBarIcons} />,
      path: "/adminDashboard/experts",
      activeIcon: <AiOutlineProfile className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Requests",
      icon: <DiGitPullRequest className={styles.DashboardSideBarIcons} />,
      path: "/adminDashboard/requests",
      activeIcon: <DiGitPullRequest className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Settings",
      icon: <AiOutlineSetting className={styles.DashboardSideBarIcons} />,
      path: "/adminDashboard/settings",
      activeIcon: <AiOutlineSetting className={styles.DashboardSideBarIconsActive} />,
    },
    { label: "Logout", icon: <MdOutlineLogout className={styles.DashboardSideBarIcons} />, path: "/" },
  ]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [label, setLabel] = useState("Categories");
  const drawerWidth = 240;
  const router = useRouter();
  const { asPath } = router;
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const container = body !== undefined ? () => body().document.body : undefined;
  const user = typeof window !== "undefined" ? jwt.decode(localStorage.getItem("zolu-auth-token"))?.data : null;
  const drawer = (
    <div style={{ height: "70%" }}>
      <div style={{ marginLeft: "39px" }}>
        <Toolbar />
        <div style={{ marginTop: "-46px", marginBottom: "24px", marginLeft: "12px" }}>
          <span
            style={{
              color: "#1A1A1B",
              fontWeight: 900,
              fontFamily: "PlusJakartaSans-Medium",
              fontSize: "30px",
            }}
          >
            ZOULU
          </span>
          {/* <img src={"/Images/logo.png"} style={{ width: "135px" }} alt="abc"></img> */}
        </div>
        <div className="d-flex justfiy-content-center align-items-center" style={{ marginLeft: "9px" }}>
          <img src={"/Images/avatarIcon.png"} className={styles.DashboardProfile} style={{ border: "2px solid #007FFF" }} />
          <div>
            <h5 className={styles.ProfileName}>{user?.name}</h5>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List style={{ marginTop: "12px" }}>
          {sidebar?.map((ele, index) =>
            ele?.label !== "Logout" ? (
              <Link key={index} href={ele.path}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    if (ele.label === "Logout") {
                      localStorage.clear();
                    }
                    setLabel(ele.label);
                  }}
                >
                  <ListItemButton style={{ paddingLeft: "55px", marginBottom: "-2px" }} className={ele.path === router.pathname ? `${styles.SideBarContentActive}` : `${styles.SideBarContent}`}>
                    <ListItemIcon>{ele.path === router.pathname ? ele.activeIcon : ele.icon}</ListItemIcon>
                    <ListItemText primary={ele.label} style={{ marginLeft: "-20px" }} />
                    {ele.path === router.pathname ? <div className={styles.activeBorderColorDashboard}></div> : null}
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : null
          )}
        </List>
      </div>
      <div style={{ flex: 1 }}></div>
      <Link href={sidebar[sidebar.length - 1].path}>
        <ListItem disablePadding onClick={() => localStorage.clear()}>
          <ListItemButton style={{ paddingLeft: "55px" }}>
            <ListItemIcon>{sidebar[sidebar.length - 1].icon}</ListItemIcon>
            <ListItemText primary={sidebar[sidebar.length - 1].label} style={{ marginLeft: "-20px" }} />
          </ListItemButton>
        </ListItem>
      </Link>
    </div>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          background: "#FFFFFF !important",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{ textTransform: "capitalize" }}>
            {asPath?.match(/\/(\w+)$/)[1] === "adminDashboard" ? "Dashboard" : asPath?.match(/\/(\w+)$/)[1]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }, width: "-webkit-fill-available" }}
        >
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% -${drawerWidth}px)`, xs: "100%", md: "100%", lg: "100%" }, background: "#F5F5F5" }}>
        {props.children}
      </Box>
    </Box>
  );
}
SideBarWrapper.propTypes = {
  body: PropTypes.func,
};
export default AuthProtected(SideBarWrapper);

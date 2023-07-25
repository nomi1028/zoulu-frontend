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
import Link from "next/link";
import Loader from "../../Components/Loader";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import { BiUser } from "react-icons/bi";
function ResponsiveDrawer(props) {
  const { body: body } = props;
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = React.useState([
    {
      label: "Meine Buchungen",
      icon: <RxDashboard className={styles.DashboardSideBarIcons} />,
      path: "/mybooking",
      activeIcon: <RxDashboard className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Profil",
      icon: <BiUser className={styles.DashboardSideBarIcons} />,
      path: "/mybooking/CustomerProfile",
      activeIcon: <BiUser className={styles.DashboardSideBarIconsActive} />,
    },
    {
      label: "Ausloggen",
      icon: <MdOutlineLogout className={styles.DashboardSideBarIcons} />,
      path: "/",
      activeIcon: <MdOutlineLogout className={styles.DashboardSideBarIconsActive} />,
    },
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
    <div style={{ height: "71.5%" }}>
      <div style={{ marginLeft: "15px" }}>
        <Toolbar />
        <div
          style={{
            marginTop: "-40px",
            marginBottom: "30px",
            marginLeft: "32px",
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
        <div className="d-flex justfiy-content-center align-items-center" style={{ marginLeft: "14px" }}>
          <img src={user?.image ? user?.image : "/Images/avatarIcon.png"} className={styles.DashboardProfileBorder} />
          <div>
            <h5 className={`${styles.ProfileName} text-capitalize pt-3`}>{user?.name}</h5>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List style={{ marginTop: "21px" }}>
          {sidebar?.map((ele, index) =>
            ele?.label !== "Ausloggen" ? (
              <Link key={index} href={ele.path}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    if (ele.label === "Ausloggen") {
                      localStorage.clear();
                    }
                    setLabel(ele.label);
                  }}
                >
                  <ListItemButton style={{ paddingLeft: "50px", marginBottom: "-3px" }} className={ele.path === router.pathname ? `${styles.SideBarContentActive}` : `${styles.SideBarContent}`}>
                    <ListItemIcon>{ele.path === router.pathname ? ele.activeIcon : ele.icon}</ListItemIcon>
                    <ListItemText primary={ele.label} style={{ marginLeft: "-17px" }} />
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
        <ListItem
          disablePadding
          onClick={() => {
            localStorage.clear();
          }}
        >
          <ListItemButton style={{ paddingLeft: "50px" }}>
            <ListItemIcon>{sidebar[sidebar.length - 1].icon}</ListItemIcon>
            <ListItemText primary={sidebar[sidebar.length - 1].label} style={{ marginLeft: "-17px" }} />
          </ListItemButton>
        </ListItem>
      </Link>
    </div>
  );
  return (
    <Box sx={{ display: "flex" }}>
      {loading ? <Loader /> : null}
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          background: "#FDFAF4 !important",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          {asPath === "/mybooking" ? (
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="MeineBuchungen"
              // style={{
              //   textTransform: "capitalize",
              //   marginLeft: 11,
              //   marginTop: "-24px",
              // }}
            >
              {/* {asPath?.match(/\/(\w+)$/)[1]} */}Meine Buchungen
            </Typography>
          ) : (
            <Typography variant="h6" noWrap component="div" style={{ textTransform: "capitalize", marginLeft: 42 }}>
              {/* {asPath?.match(/\/(\w+)$/)[1]} */}Kunden profil
              {/* {console.log("asPath", asPath)} */}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            width: "-webkit-fill-available",
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
          width: {
            sm: `calc(100% -${drawerWidth}px)`,
            xs: "100%",
            md: "100%",
            lg: "100%",
          },
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
ResponsiveDrawer.propTypes = {
  body: PropTypes.func,
};
export default ResponsiveDrawer;

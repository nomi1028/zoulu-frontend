import "../styles/globals.css";
import Script from "next/script";
import Navbar from "../pages/Common/Navbar/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Api } from "../utils/Api";
function MyApp({ Component, pageProps }) {
  const [statics, setStatic] = useState(5);
  const [profileStatus, setProfileStatus] = useState();
  const [cartLength, setcartLength] = useState(0);
  const router = useRouter();
  const { asPath } = router;
  const noNav = [
    "/treatment/TreatmentDetail",
    "/dashboard/",
    "/dashboard/services/",
    "/dashboard/customers/",
    "/dashboard/finance/",
    "/dashboard/calender/",
    "/dashboard/bookings/",
    "/dashboard/profile/",
    "/adminDashboard",
    "/adminDashboard/categories",
    "/adminDashboard/subcategories",
    "/adminDashboard/services",
    "/adminDashboard/requests",
    "/adminDashboard/experts",
    "/adminDashboard/customers",
    "/adminDashboard/bookings",
    "/mybooking",
    "/mybooking/CustomerProfile",
    "/dashboard",
    "/dashboard/services",
    "/dashboard/customers",
    "/dashboard/finance",
    "/dashboard/calender",
    "/dashboard/bookings",
    "/dashboard/profile",
    "/dashboard/availability/Index",
    "/dashboard/portfolio",
    "/stripe",
  ];
  const routeRegex = /^([^?#]+)/;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const response = await Api("get", `api/category?page=${1}&limit=10`);
    if (response.status === 200) {
      console.log(response?.data?.data, "mainFile");
      setCategories(response?.data?.data);
      // servicesHandler();
    }
  };
  return (
    <>
      <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Zoulu</title>
        <link rel="shortcut icon" type="image/x-icon" href="/images/logo.png" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.syncfusion.com/ej2/material.css"
          rel="stylesheet"
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      </>
      <Script
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossOrigin="anonymous"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossOrigin="anonymous"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossOrigin="anonymous"
      ></Script>
      {profileStatus?.isProfileApproved === true ? (
        <div
          style={{
            background: "#ea8023",
            color: "white",
            textAlign: "center",
            fontFamily: "PlusJakartaSans-Medium",
            fontWeight: "600",
          }}
        >
          Profile is under review{" "}
        </div>
      ) : null}
      {noNav.includes(asPath.match(routeRegex)[1]) ? null : (
        <Navbar
          statics={statics}
          setStatic={(e) => setStatic(e)}
          setProfileStatus={(e) => setProfileStatus(e)}
          profileStatus={profileStatus}
          cartLength={cartLength}
        />
      )}
      <ToastContainer />
      <Component
        {...pageProps}
        statics={statics}
        setStatic={(e) => setStatic(e)}
        profileStatus={profileStatus}
        setcartLength={(e) => setcartLength(e)}
        categories={categories}
      />

      {/* {children} */}
      {/* <GoTop scrollStepInPx="100" delayInMs="10.50" /> */}
      {/* {/ <Sidebar /> /} */}
      {/* <Layout></Layout> */}
    </>
  );
}

export default MyApp;

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
var jwt = require("jsonwebtoken");

const adminProtected = ({ role, children }) => {
  const [value, setValue] = useState(null);
  const router = useRouter();
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    if (token?.data?.role !== "admin") {
      router.back();
    }
    setValue(token?.data?.role);
  }, []);
  const handleGoBack = () => {
    router.back();
  };
  return (
    <>
      {value == null ? (
        <>{children}</>
      ) : value === role ? (
        <>{children}</>
      ) : (
        <div onClick={handleGoBack()}></div>
      )}
    </>
  );
  // return (

  //   <>
  //     <h1>plz log in</h1>
  //   </>
  // );
};

export default adminProtected;

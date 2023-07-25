import { useEffect, useState } from "react";
import { useRouter } from "next/router";
var jwt = require("jsonwebtoken");

const Protected = ({ role, children }) => {
  const [value, setValue] = useState(null);
  const router = useRouter();
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));

    setValue(token?.data?.role);
  }, []);
  const handleGoBack = () => {
    router.push("/");
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

export default Protected;

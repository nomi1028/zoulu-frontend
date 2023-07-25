import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthProtected = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = typeof window !== "undefined" && localStorage.getItem("zolu-auth-token");
      if (!token) {
        router.push("/");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default AuthProtected;

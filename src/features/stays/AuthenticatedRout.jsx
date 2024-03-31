import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../auth/useUser";

function AuthenticatedRout({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //   const redirectTo = window.location.href;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      //   sessionStorage.setItem("redirectTo", redirectTo);
      navigate("/login");
    }
  }, [isLoading, navigate, isAuthenticated]);

  return !isLoading && isAuthenticated ? children : null;
}

export default AuthenticatedRout;

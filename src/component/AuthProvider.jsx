import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";

const AuthProvider = ({ children }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // const savedUserData = localStorage.getItem("user_data")
    const savedUserData = jsCookie.get("user_data");

    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: parsedUserData,
      });
    }

    setIsAuthChecked(true);
  }, []);

  if (!isAuthChecked) return <div>Loading...</div>;

  return children;
};

export default AuthProvider;

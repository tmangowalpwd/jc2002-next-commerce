import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import axiosInstance from "../lib/api";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    // const savedUserData = localStorage.getItem("user_data")
    const userToken = jsCookie.get("auth_token");

    if (userToken) {
      try {
        const userResponse = await axiosInstance.get(
          "/auth/session/refresh-token"
        );

        jsCookie.set("auth_token", userResponse?.data?.result?.token || "");

        dispatch({
          type: auth_types.LOGIN_USER,
          payload: userResponse.data.result.user,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return children;
};

export default AuthProvider;


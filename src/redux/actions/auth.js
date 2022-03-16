import jsCookie from "js-cookie";
import api from "../../lib/api";
import { auth_types } from "../types";

export const userLogin = (values) => {
  return async (dispatch) => {
    try {
      const res = await api.get("/users", {
        params: {
          username: values.username,
          // password: values.password,
        },
      });

      if (!res.data.length) {
        throw new Error("User not found");
      }

      if (res.data[0].password !== values.password) {
        throw new Error("Wrong password");
      }

      const userData = res.data[0];
      const stringifiedUserData = JSON.stringify(userData);

      jsCookie.set("user_data", stringifiedUserData);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: userData,
      });
    } catch (err) {
      console.log(err)

      dispatch({
        type: auth_types.AUTH_ERROR,
        payload: err.message
      })
    }
  }
}

export const testFn = () => {
  return 1 + 1
}
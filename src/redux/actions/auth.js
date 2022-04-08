import jsCookie from "js-cookie";
import api from "../../lib/api";
import { auth_types, network_types } from "../types";

export const userLogin = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/session/login", {
        username: values.username,
        password: values.password
      });

      const userResponse = res.data.result

      jsCookie.set("auth_token", userResponse.token)

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: userResponse.user,
      });

      setSubmitting(false)
    } catch (err) {
      console.log(err)

      dispatch({
        type: network_types.NETWORK_ERROR,
        payload: {
          title: "Login Failed",
          description: err.message
        }
      })
      setSubmitting(false)
    }
  }
}

export const testFn = () => {
  return 1 + 1
}
import axiosInstance from "../../lib/api";
import { cart_types } from "../types";

export const fetchUserCart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(`/carts`, {
        params: {
          userId: getState().auth.id,
          _expand: "product",
        },
      });

      dispatch({
        type: cart_types.GET_USER_CART,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
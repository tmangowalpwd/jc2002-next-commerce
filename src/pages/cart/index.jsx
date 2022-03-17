import { Box, Container, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../lib/api";
import requiresAuth from "../../lib/hoc/requiresAuth";
import { cart_types } from "../../redux/types";

const CartPage = ({ user }) => {
  const cartSelector = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const fetchUserCart = async () => {
    try {
      const res = await axiosInstance.get(`/carts`, {
        params: {
          userId: user.id,
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
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  return (
    <Container>
      <Box>
        {cartSelector?.items?.map((val) => {
          return <Text>{val?.product?.product_name}</Text>;
        })}
      </Box>
    </Container>
  );
};

export const getServerSideProps = requiresAuth((context) => {
  const userData = context.req.cookies.user_data;

  return {
    props: {
      user: userData,
    },
  };
});

export default CartPage;

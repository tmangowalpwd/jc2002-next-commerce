import { Box, Container, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import requiresAuth from "../../lib/hoc/requiresAuth";

const CartPage = ({ user }) => {
  const cartSelector = useSelector((state) => state.cart);

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

// 1. supaya bisa dapet data user sebelum masuk ke page
// 2. supaya data user dimasukkan ke component dari server (ssr)
export const getServerSideProps = requiresAuth((context) => {
  const userData = context.req.cookies.user_data;

  return {
    props: {
      user: userData,
    },
  };
});

export default CartPage;

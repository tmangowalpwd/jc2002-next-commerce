import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CartItem from "../../component/CartItem";
import requiresAuth from "../../lib/hoc/requiresAuth";

const CartPage = ({ user }) => {
  const cartSelector = useSelector((state) => state.cart);

  const renderCartItems = () => {
    return cartSelector.items.map((item, idx) => {
      return (
        <CartItem
          id={item?.id}
          imageUrl={item?.product?.image_url}
          category={item?.product?.category}
          price={item?.product?.price}
          quantity={item?.quantity}
          productName={item?.product?.product_name}
          stock={item?.product?.stock}
          cartIndex={idx}
        />
      );
    });
  };

  return (
    <Container minW={"5xl"}>
      <Box paddingTop={12}>
        <Heading mb={8}>Cart Items ({cartSelector.items.length})</Heading>
        {renderCartItems()}
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

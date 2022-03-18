import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../component/CartItem";
import requiresAuth from "../../lib/hoc/requiresAuth";
import { BsCart, BsCart2 } from "react-icons/bs";
import axiosInstance from "../../lib/api";
import moment from "moment";
import { useRouter } from "next/router";

const CartPage = ({ user }) => {
  const cartSelector = useSelector((state) => state.cart);
  const authSelector = useSelector((state) => state.auth);

  const toast = useToast();

  const dispatch = useDispatch();

  const router = useRouter();

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

  const deliveryCost = 12000;

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cartSelector.items.forEach((item) => {
      totalPrice += item?.quantity * item?.product?.price;
    });

    return totalPrice;
  };

  const calculateTax = () => {
    return calculateTotalPrice() / 10;
  };

  const calculateGrandTotal = () => {
    return calculateTotalPrice() + calculateTax() + deliveryCost;
  };

  const checkoutBtnHandler = async () => {
    try {
      const transaction_items = cartSelector.items.map((item) => {
        return {
          id: item.product.id,
          product_name: item.product.product_name,
          price: item.product.price,
          image_url: item.product.image_url,
          description: item.product.description,
          category: item.product.category,
          quantity: item.quantity,
        };
      });

      await axiosInstance.post("/transactions", {
        userId: authSelector.id,
        total_price: calculateGrandTotal(),
        transaction_date: moment().format("DD-MM-YYYY"),
        transaction_items,
      });

      for (const item of cartSelector.items) {
        await axiosInstance.delete(`/carts/${item.id}`);
      }

      dispatch({
        type: "EMPTY_CART",
      });

      router.push("/");

      toast({
        status: "success",
        title: "Transaction created!",
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container minW={"7xl"} paddingTop={12}>
      <Heading mb={8}>Cart Items ({cartSelector.items.length})</Heading>
      <Flex>
        <Box flex={9}>{renderCartItems()}</Box>
        <Box flex={3}>
          <Stack
            borderWidth={1}
            borderColor="gray.400"
            w="100%"
            borderRadius={8}
            padding={8}
            spacing={6}
          >
            <Text fontSize="xl" fontWeight="medium" color="gray.700">
              Order Summary
            </Text>

            <Stack spacing={2}>
              <Flex justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Subtotal
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Rp. {calculateTotalPrice().toLocaleString()}
                </Text>
              </Flex>

              <Flex justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Delivery Cost
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Rp. {deliveryCost.toLocaleString()}
                </Text>
              </Flex>

              <Flex justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Tax (10%)
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Rp. {calculateTax().toLocaleString()}
                </Text>
              </Flex>

              <Divider />

              <Flex justify="space-between">
                <Text fontSize="md" fontWeight="bold">
                  Grand Total
                </Text>

                <Text fontSize="md" fontWeight="bold">
                  Rp. {calculateGrandTotal().toLocaleString()}
                </Text>
              </Flex>
            </Stack>

            <Button
              colorScheme="green"
              rightIcon={<Icon fontWeight="bold" as={BsCart2} />}
              onClick={checkoutBtnHandler}
            >
              Checkout
            </Button>
          </Stack>
        </Box>
      </Flex>
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

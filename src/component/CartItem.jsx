import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import axiosInstance from "../lib/api";
import { fetchUserCart } from "../redux/actions/cart";
import { cart_types } from "../redux/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { useCallback } from "react";

const CartItem = ({
  imageUrl,
  productName,
  category,
  quantity,
  price,
  id,
  stock,
  cartIndex,
}) => {
  const dispatch = useDispatch();

  const deleteCartItem = async () => {
    try {
      await axiosInstance.delete(`/carts/${id}`);

      // Cara pertama: melakukan manipulasi store redux untuk update data "terbaru"
      dispatch({
        type: cart_types.DELETE_ITEM,
        payload: cartIndex,
      });

      // Cara kedua: fetch ke database lagi untuk update data cart terbaru
      // dispatch(fetchUserCart())
    } catch (err) {
      console.log(err);
    }
  };

  const debounceQtyInputHandler = useCallback(
    _.debounce(async (value) => {
      await axiosInstance.patch(`/carts/${id}`, {
        quantity: value,
      });

      dispatch({
        type: cart_types.EDIT_QTY,
        payload: {
          idx: cartIndex,
          quantity: value,
        },
      });
    }, 1500),
    []
  );

  const qtyInputHandler = (event) => {
    const { value } = event.target;

    if (value === "") {
      formik.setFieldValue("quantity", value);
      return;
    }

    const parsedValue = parseInt(value);

    if (isNaN(parsedValue)) return;

    if (parsedValue < 0) return;

    if (parsedValue > stock) return;

    try {
      debounceQtyInputHandler(parsedValue);
      formik.setFieldValue("quantity", parsedValue);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      quantity: quantity,
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number().required().min(1).max(stock),
    }),
  });

  return (
    <Grid templateColumns="repeat(7, 1fr)" my={4}>
      <GridItem w="100%" display="flex" alignItems="center">
        <Image
          objectFit="cover"
          boxSize="120px"
          borderRadius={8}
          src={imageUrl}
          fallbackSrc={"https://via.placeholder.com/120"}
        />
      </GridItem>
      <GridItem w="100%" colSpan={2} display="flex" alignItems="center">
        <Flex direction="column">
          <Text fontWeight="medium">{productName || "Product"}</Text>
          <Text color="gray.600" fontSize="sm">
            {category || "Category"}
          </Text>
        </Flex>
      </GridItem>

      <GridItem w="100%" display="flex" alignItems="center">
        <Input
          h={12}
          w={24}
          textAlign="center"
          type="number"
          value={formik.values.quantity}
          onChange={qtyInputHandler}
        />
      </GridItem>
      <GridItem
        w="100%"
        colSpan={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontWeight="medium">
          Rp {(price * formik.values.quantity).toLocaleString()}
        </Text>
      </GridItem>
      <GridItem w="100%" display="flex" alignItems="center">
        <IconButton
          onClick={deleteCartItem}
          colorScheme="red"
          icon={<Icon as={IoMdClose} />}
        />
      </GridItem>
    </Grid>
  );
};

export default CartItem;

import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import jsCookie from "js-cookie";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { auth_types } from "../redux/types";

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logoutBtnHandler = () => {
    dispatch({
      type: auth_types.LOGOUT_USER,
    });

    jsCookie.remove("user_data");
  };

  return (
    <Box
      paddingY={4}
      paddingX={8}
      borderBottom="1px solid"
      borderBottomColor="gray.200"
    >
      <Flex justifyContent="space-between">
        <Stack spacing={4} direction="row">
          <Link href="/">
            <Button>Home</Button>
          </Link>
          <Link href="/products">
            <Button>Products</Button>
          </Link>
          <Button>
            Cart{" "}
            <Badge ml={2} colorScheme="red">
              4
            </Badge>
          </Button>
        </Stack>

        <Stack spacing={4} direction="row">
          {authSelector.id ? (
            <Button onClick={logoutBtnHandler} colorScheme="blackAlpha">
              Logout
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button colorScheme="teal">Login</Button>
            </Link>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;

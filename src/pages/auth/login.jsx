import {
  Box,
  Container,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Icon,
  Button,
  FormControl,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import jsCookie from "js-cookie";
import api from "../../lib/api";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { auth_types } from "../../redux/types";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);

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

        router.push("/");
      } catch (err) {
        console.log(err);

        toast({
          status: "error",
          title: "Login Failed",
          description: err.message,
          duration: 2000,
        });

        setLoading(false);
      }
    },
  });

  return (
    <Container maxW="lg">
      <Stack py="10" spacing={12}>
        <Heading textAlign="center">Sign in to start shopping</Heading>
        <Box maxW="lg" backgroundColor="white" shadow="xl" p="8">
          <form>
            <FormControl isInvalid={formik.errors.username}>
              <FormLabel htmlFor="inputUsername">Username</FormLabel>
              <Input
                onChange={(event) =>
                  formik.setFieldValue("username", event.target.value)
                }
                id="inputUsername"
              />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.password}>
              <FormLabel mt="4" htmlFor="inputPassword">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  id="inputPassword"
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                />
                <InputRightElement
                  children={
                    <Icon
                      fontSize="xl"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      as={passwordVisible ? IoMdEyeOff : IoMdEye}
                      sx={{ _hover: { cursor: "pointer" } }}
                    />
                  }
                />
              </InputGroup>
              <FormHelperText>{formik.errors.password}</FormHelperText>
            </FormControl>

            <Stack mt="10">
              <Button
                onClick={formik.handleSubmit}
                type="submit"
                colorScheme="blue"
                disabled={loading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;

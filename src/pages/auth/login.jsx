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
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { auth_types } from "../../redux/types";
import { testFn, userLogin } from "../../redux/actions/auth";
import { useRequiresAuth } from "../../lib/hooks/useRequiresAuth";
import { useAuth } from "../../lib/hooks/useAuth";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  const authSelector = useSelector((state) => state.auth);

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
    onSubmit: (values) => {
      setTimeout(() => {
        dispatch(userLogin(values, formik.setSubmitting));
      }, 2000);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    if (authSelector.id) {
      router.push("/");
    }
  }, [authSelector.id]);

  return (
    <Container maxW="lg">
      <Stack py="10" spacing={12}>
        <Heading textAlign="center">
          Sign in to start shopping {authSelector.username}
        </Heading>
        <Box maxW="lg" backgroundColor="white" shadow="xl" p="8">
          <form>
            <FormControl isInvalid={formik.errors.username}>
              <FormLabel htmlFor="inputUsername">Username</FormLabel>
              <Input
                onChange={inputHandler}
                id="inputUsername"
                name="username"
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
                  onChange={inputHandler}
                  name="password"
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
                disabled={formik.isSubmitting}
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

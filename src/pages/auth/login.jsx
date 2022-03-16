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
} from "@chakra-ui/react";
import jsCookie from "js-cookie";
import api from "../../lib/api";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Container maxW="lg">
      <Stack py="10" spacing={12}>
        <Heading textAlign="center">Sign in to start shopping</Heading>
        <Box maxW="lg" backgroundColor="white" shadow="xl" p="8">
          <form>
            <FormLabel htmlFor="inputUsername">Username</FormLabel>
            <Input id="inputUsername" />

            <FormLabel mt="4" htmlFor="inputPassword">
              Password
            </FormLabel>
            <InputGroup>
              <Input
                type={passwordVisible ? "text" : "password"}
                id="inputPassword"
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

            <Stack>
              <Button mt="4" colorScheme="blue">
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

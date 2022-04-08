import { Center, Container, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jsCookie from "js-cookie";

const MagicLinkPage = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.sessionToken) {
      jsCookie.set("auth_token", props.sessionToken);
      router.push("/");
    }
  }, []);

  return (
    <Container py={10}>
      <Center>
        <Spinner />
      </Center>
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      sessionToken: context.query.session,
    },
  };
};

export default MagicLinkPage;


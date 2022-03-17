import {
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Icon,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { BiPlus, BiMinus, BiHeart } from "react-icons/bi";
import axiosInstance from "../../lib/api";

const ProductDetail = ({ productDetailData }) => {
  return (
    <Container minW="5xl" pt={20}>
      <Flex>
        <Box flex={4} pr={8} display="flex" alignItems="center">
          <Stack spacing={6}>
            <Heading fontWeight="medium">
              {productDetailData?.product_name}
            </Heading>
            <Text fontWeight="medium" fontSize="xl">
              Rp. {productDetailData?.price?.toLocaleString()}
            </Text>
            <Text color="gray.600">{productDetailData?.description}</Text>
            <Text fontWeight="medium">Stock: {productDetailData?.stock}</Text>

            <FormLabel htmlFor="inputQty">Quantity</FormLabel>
            <Flex>
              <Box>
                <InputGroup size="lg">
                  <InputLeftElement
                    children={<IconButton icon={<Icon as={BiMinus} />} />}
                  />
                  <Input
                    id="inputQty"
                    type="number"
                    textAlign="center"
                    _focus={{ outline: "none" }}
                    size="lg"
                    defaultValue={0}
                    min={0}
                  />
                  <InputRightElement
                    children={<IconButton icon={<Icon as={BiPlus} />} />}
                  />
                </InputGroup>
              </Box>

              <Button
                colorScheme="red"
                leftIcon={<Icon as={BiHeart} />}
                ml="6"
                size="lg"
              >
                Wishlist
              </Button>
            </Flex>

            <Button colorScheme="blue">Add to cart</Button>
          </Stack>
        </Box>

        <Box flex={6}>
          <Image
            objectFit="cover"
            width="100%"
            height="xl"
            src={productDetailData?.image_url}
          />
        </Box>
      </Flex>
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const productId = context.query.id;
    const res = await axiosInstance.get(`/products/${productId}`);

    return {
      props: {
        productDetailData: res.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export default ProductDetail;

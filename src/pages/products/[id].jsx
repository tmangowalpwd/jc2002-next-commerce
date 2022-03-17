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

const ProductDetail = () => {
  return (
    <Container minW="5xl" pt={20}>
      <Flex>
        <Box flex={4} pr={8} display="flex" alignItems="center">
          <Stack spacing={6}>
            <Heading fontWeight="medium">Product Name</Heading>
            <Text fontWeight="medium" fontSize="xl">
              Rp. {(380000).toLocaleString()}
            </Text>
            <Text color="gray.600">
              With a sleek design and a captivating essence, this is a modern
              Classic made for every occasion.
            </Text>
            <Text fontWeight="medium">Stock: 10</Text>

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
            src="https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/9999deeeddc8471743761964befbc60e9747d3eb_xxl-1.jpg"
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default ProductDetail;

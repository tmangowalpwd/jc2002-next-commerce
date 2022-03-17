import {
  AspectRatio,
  Box,
  Button,
  Image,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";

const ProductCard = ({ imageUrl, productName, price, id }) => {
  return (
    <Stack width="2xs" spacing={4}>
      {/* Image */}
      <AspectRatio ratio={4 / 3}>
        <Box position="relative">
          <Image borderRadius={8} src={imageUrl} />
          {/* <Button position="absolute" top={2} right={2}>
            Wishlist
          </Button> */}
        </Box>
      </AspectRatio>

      {/* Content */}
      <Box>
        <Text fontWeight="medium">{productName}</Text>
        <Text mt={1} fontWeight="medium">
          Rp. {price?.toLocaleString()}
        </Text>
      </Box>

      <Stack alignItems="center">
        <Button width="100%" colorScheme="blue">
          Add to Cart
        </Button>
        <NextLink href={`/products/${id}`} passHref>
          <ChakraLink textDecoration="underline">View Details</ChakraLink>
        </NextLink>
      </Stack>
    </Stack>
  );
};

export default ProductCard;

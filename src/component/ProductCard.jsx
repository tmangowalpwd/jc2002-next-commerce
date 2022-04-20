import {
  AspectRatio,
  Box,
  Button,
  Image,
  Stack,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import * as gtag from "../lib/gtag";

const ProductCard = ({ imageUrl, productName, price, id }) => {
  const toast = useToast();

  const addToCart = () => {
    toast({
      status: "success",
      title: "Add to cart",
      duration: 1000,
    });

    gtag.gaEvent({
      action: "add_to_cart",
      label: `atc product:${id}`,
      value: `product:${id}`,
      category: "cart",
      user_id: 13,
    });
  };
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
        <Button onClick={addToCart} width="100%" colorScheme="blue">
          Add to Cart
        </Button>
        <NextLink href={`/products/${id}`} passHref>
          View Details
        </NextLink>
      </Stack>
    </Stack>
  );
};

export default ProductCard;


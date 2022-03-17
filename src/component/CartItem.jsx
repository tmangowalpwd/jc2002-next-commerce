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

const CartItem = () => {
  return (
    <Grid templateColumns="repeat(7, 1fr)" my={4}>
      <GridItem w="100%" display="flex" alignItems="center">
        <Image
          objectFit="cover"
          boxSize="120px"
          borderRadius={8}
          src={
            "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/9999deeeddc8471743761964befbc60e9747d3eb_xxl-1.jpg"
          }
        />
      </GridItem>
      <GridItem w="100%" colSpan={2} display="flex" alignItems="center">
        <Flex direction="column">
          <Text fontWeight="medium">Product Name</Text>
          <Text color="gray.600" fontSize="sm">
            Category
          </Text>
        </Flex>
      </GridItem>

      <GridItem w="100%" display="flex" alignItems="center">
        <Input boxSize={12} textAlign="center" type="number" />
      </GridItem>
      <GridItem w="100%" colSpan={2} display="flex" alignItems="center">
        <Text fontWeight="medium">Rp {(120000).toLocaleString()}</Text>
      </GridItem>
      <GridItem w="100%" display="flex" alignItems="center">
        <IconButton colorScheme="red" icon={<Icon as={IoMdClose} />} />
      </GridItem>
    </Grid>
  );
};

export default CartItem;

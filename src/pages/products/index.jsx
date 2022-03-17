import { Box, Center, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../../component/ProductCard";
import axiosInstance from "../../lib/api";

const ProductsPage = () => {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    try {
      const res = await axiosInstance.get("/products");

      setProductList(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderProducts = () => {
    return productList.map((product) => {
      return (
        <Box m={4}>
          <ProductCard
            id={product.id}
            imageUrl={product.image_url}
            price={product.price}
            productName={product.product_name}
            key={product?.id?.toString()}
          />
        </Box>
      );
    });
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <Center>
      <Box paddingTop={10} width="4xl">
        <Flex wrap="wrap">{renderProducts()}</Flex>
      </Box>
    </Center>
  );
};

export default ProductsPage;

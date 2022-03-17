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
  useToast,
} from "@chakra-ui/react";
import { BiPlus, BiMinus, BiHeart, BiCopy } from "react-icons/bi";
import axiosInstance from "../../lib/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useRouter } from "next/router";
import Page from "../../component/Page";
import { useSelector } from "react-redux";
import { WEB_URL } from "../../configs/url";
import { useEffect } from "react";

const ProductDetail = ({ productDetailData, user }) => {
  const router = useRouter();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      quantity: 1,
    },
    onSubmit: () => {
      console.log(router.asPath);
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number().required().min(1).max(productDetailData.stock),
    }),
  });

  const qtyInputHandler = (event) => {
    const { value } = event.target;

    if (value === "") {
      formik.setFieldValue("quantity", event.target.value);
      return;
    }

    const parsedValue = parseInt(value);

    if (isNaN(parsedValue)) return;

    if (parsedValue < 0) return;

    if (parsedValue > productDetailData.stock) return;

    formik.setFieldValue("quantity", event.target.value);
  };

  const qtyBtnHandler = (dir) => {
    if (dir === "inc") {
      if (formik.values.quantity === "") {
        formik.setFieldValue("quantity", 1);
        return;
      }

      if (formik.values.quantity >= productDetailData.stock) return;

      formik.setFieldValue("quantity", parseInt(formik.values.quantity) + 1);
    } else if (dir === "dec") {
      if (formik.values.quantity < 1) return;

      formik.setFieldValue("quantity", formik.values.quantity - 1);
    }
  };

  const copyLinkBtnHandler = () => {
    navigator.clipboard.writeText(
      `https://grumpy-dolphin-14.loca.lt${router.asPath}`
    );

    toast({
      position: "top-right",
      status: "info",
      title: "Link copied",
    });
  };

  return (
    <Page
      title={`Beli ${productDetailData.product_name}`}
      description={productDetailData.description}
      image={productDetailData.image_url}
      url={`${WEB_URL}${router.asPath}`}
    >
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
                      children={
                        <IconButton
                          onClick={() => qtyBtnHandler("dec")}
                          icon={<Icon as={BiMinus} />}
                        />
                      }
                    />
                    <Input
                      id="inputQty"
                      type="number"
                      textAlign="center"
                      _focus={{ outline: "none" }}
                      size="lg"
                      defaultValue={1}
                      onChange={qtyInputHandler}
                      value={formik.values.quantity}
                    />
                    <InputRightElement
                      children={
                        <IconButton
                          onClick={() => qtyBtnHandler("inc")}
                          icon={<Icon as={BiPlus} />}
                        />
                      }
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

              <Button onClick={formik.handleSubmit} colorScheme="blue">
                Add to cart
              </Button>

              <Box>
                <Text fontWeight="medium">Share this to your friends!</Text>
                <Stack mt={2} direction="row">
                  <FacebookShareButton
                    url={`${WEB_URL}${router.asPath}`}
                    quote={`Cek ${productDetailData.product_name} sekarang juga!`}
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    title={`Beli ${productDetailData.product_name} sekarang juga!`}
                    url={`${WEB_URL}${router.asPath}`}
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={`${WEB_URL}${router.asPath}`}
                    title={`Beli ${productDetailData.product_name} sekarang juga!`}
                    summary={productDetailData.description}
                  >
                    <LinkedinIcon size={40} round />
                  </LinkedinShareButton>
                  <IconButton
                    onClick={copyLinkBtnHandler}
                    borderRadius="50%"
                    icon={<Icon as={BiCopy} />}
                  />
                </Stack>
              </Box>
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
    </Page>
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

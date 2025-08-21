"use client";

import { Container, Heading, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HeartIcon from "@/icons/HeartIcon";
import { useProductStore } from "@/store/product";
import { useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";

export const HomePage = () => {
  const { getProducts, products } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container maxW={"6xl"} py={12}>
      <VStack gap={6}>
        <Text
          as={"h2"}
          fontSize={"4xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          mb={7}
          letterSpacing={"wide"}
          display={"flex"}
          gap={2}
          alignItems={"flex-end"}
        >
          <Text as={"span"}>Current Products</Text>
          <HeartIcon />
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            lg: 3,
          }}
          gap={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={String(product._id)} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            color={"gray.500"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            No products found.{" "}
            <Link to={"/create"}>
              <Text
                color={"cyan.600"}
                as={"span"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import {
  Container,
  Heading,
  VStack,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster, Toaster } from "@/components/ui/toaster";

export const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log(success, message);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        closable: true,
        duration: 4000,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        closable: true,
        duration: 4000,
      });
    }

    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"2xl"}>
      <VStack gap={8}>
        <Heading as={"h1"} size={"5xl"} textAlign={"center"} mb={7}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          p={6}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack gap={4}>
            <Input
              variant={"subtle"}
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              variant={"subtle"}
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              variant={"subtle"}
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button w={"full"} onClick={handleAddProduct}>
              Add Product
            </Button>
            <Toaster />
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

"use client";

import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Portal,
  Button,
  CloseButton,
  VStack,
  Input,
} from "@chakra-ui/react";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import { useProductStore } from "@/store/product";
import { toaster, Toaster } from "@/components/ui/toaster";
import { Dialog } from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";

export const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const [open, setOpen] = useState(false);

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);

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
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct);
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
    setOpen(false);
  };

  return (
    <Box
      rounded="md"
      shadow="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        w="full"
        h="48"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" mb={4}>
          ${product.price}
        </Text>
        <HStack gap={3}>
          <IconButton
            colorPalette="cyan"
            variant="surface"
            onClick={() => setOpen(true)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            colorPalette="red"
            variant="surface"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <DeleteIcon />
          </IconButton>
        </HStack>
        <Toaster />
      </Box>
      <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              colorPalette="cyan"
              bg={useColorModeValue("white", "colorPalette.subtle")}
              borderColor="colorPalette.emphasized"
            >
              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack gap={4}>
                  <Input
                    variant="subtle"
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    variant="subtle"
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    variant="subtle"
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                  Update
                </Button>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

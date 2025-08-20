"use client";

import { Container, Flex, HStack, IconButton, Text, Separator } from "@chakra-ui/react";
import CartIcon from "../icons/CartIcon";
import { Link } from "react-router-dom";
import PlusIcon from "../icons/PlusIcon";
import { ColorModeButton } from "@/components/ui/color-mode";

export const Navbar = () => {
  return (
    <Container maxW={"1140px"} p={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{
            base: "22px",
            sm: "26px",
          }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          alignItems={"center"}
          flexDirection={"row"}
          display={"flex"}
          gap={2}
          letterSpacing={1.5}
        >
          Product Store
          <CartIcon />
        </Text>
        <HStack alignItems={"center"} gap={"4"}>
          <Link to="/create">
            <IconButton variant="surface" size={"lg"}>
              <PlusIcon />
            </IconButton>
          </Link>
          <ColorModeButton variant={"surface"} />
        </HStack>
      </Flex>
      <Separator variant="solid" my={3}/>
    </Container>
  );
};

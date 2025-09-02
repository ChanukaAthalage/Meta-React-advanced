import React from "react";
import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack
      as="article"
      bg="white"
      color="black"
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      spacing={0}
      align="stretch"
      role="group"
      transition="all .2s ease"
      _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
    >
      <Image
        src={imageSrc}
        alt={title}
        w="100%"
        h="220px"
        objectFit="cover"
        loading="lazy"
      />

      <VStack align="start" spacing={3} p={4}>
        <Heading as="h3" size="md">
          {title}
        </Heading>

        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>

        <HStack as="a" href="#" spacing={2} pt={2} _groupHover={{ textDecoration: "underline" }}>
          <Text fontWeight="semibold">See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;

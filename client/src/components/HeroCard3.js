import React from "react";
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import CardTitle from "./CardTitle.js";
import {
  Button,
  Text,
  Icon,
  chakra,
  useColorModeValue,
  Stack,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaBolt } from "react-icons/fa";

const HeroCard3 = ({ ...props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <Stack
          direction={{ base: "row", md: "column" }}
          spacing={4}
          align="flex-start"
        >
          <Box
            boxSize={10}
            borderRadius="full"
            p={3}
            bg={useColorModeValue("brand.50", "whiteAlpha.50")}
            d="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              as={FaBolt}
              boxSize={5}
              color={useColorModeValue("brand.500", "brand.200")}
            />
          </Box>
          <Box flex={1}>
            <CardTitle>Welcome!</CardTitle>
            <Text>
              <chakra.span
                fontWeight="semibold"
                color={useColorModeValue("brand.500", "brand.200")}
              >
                HeadyNet
              </chakra.span>
              &nbsp;is a place where you can discover and review your favorite
              Grateful Dead shows.
            </Text>
            <Button
              mt={2}
              variant="solid"
              isFullWidth
              as={Link}
              to="/auth/register?redirect=%2F"
            >
              Sign Up
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default HeroCard3;

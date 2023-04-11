import React from "react";
import {
  Container,
  Box,
  Text,
  Flex,
  Icon,
  Link,
  HStack,
  useStyleConfig,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaBolt } from "react-icons/fa";

const Footer = () => {
  return (
    <Box __css={useStyleConfig("Footer")} mt={16} as="footer">
      <Container>
        <Flex direction="column" align="center" justify="center" p={16}>
          {/* <Divider my={5}/> */}
          <Icon as={FaBolt} mb={4} />
          <Text fontSize="sm" mb={4}>
            © 2023 shakedown. All rights reserved.
          </Text>
          <HStack>
            <Link as={RouterLink} to="/about" fontSize="sm">
              About
            </Link>
            <Link as={RouterLink} to="/contact" fontSize="sm">
              Contact
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;

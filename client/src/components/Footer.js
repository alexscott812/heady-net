import React from 'react';
import {
  Container,
  Divider,
  Text,
  Flex,
  Icon,
  Link,
  HStack
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa';

const Footer = () => {
  return (
    // <Box __css={useStyleConfig("Footer")} mt={16} as="footer">
    <Container mt={16}>
      <Flex direction="column" align="center" justify="center">
        <Divider mb={10} />
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
    // </Box>
  );
};

export default Footer;

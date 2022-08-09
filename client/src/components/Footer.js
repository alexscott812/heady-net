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
    <Container>
      <Flex direction="column" align="center" justify="center">
        <Divider my={5}/>
        <Icon as={FaBolt} mb={4} />
        <Text fontSize="sm" mb={4}>
          © 2021 HeadyNet. All rights reserved
        </Text>
        <HStack mb={8}>
          <Link as={RouterLink} to="/about" fontSize="sm">
            About
          </Link>
          <Link as={RouterLink} to="/contact" fontSize="sm">
            Contact
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Footer;

import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button, Text, Icon, chakra, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa';

const HeroCard2 = ({ ...props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <CardTitle>
          {/* <Icon as={FaBolt} mr={2} /> */}
          Welcome!
        </CardTitle>
        <Text>
          <chakra.span
            fontWeight="semibold"
            color={useColorModeValue('brand.500', 'brand.200')}
          >
            HeadyNet
          </chakra.span>
          &nbsp;is a place where you can discover and review your favorite Grateful Dead shows.
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
      </CardBody>
    </Card>
  );
};

export default HeroCard2;

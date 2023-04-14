import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const SignUpCard = ({ ...props }) => {
  const { pathname, search } = useLocation();

  return (
    <Card {...props}>
      <CardBody>
        <CardTitle>New to shakedown?</CardTitle>
        <Text>Sign up to write reviews!</Text>
        <Button
          mt={2}
          // variant="solid"
          // colorScheme="gray"
          // isFullWidth
          py={1}
          variant="link"
          rightIcon={<FaArrowRight />}
          as={Link}
          to={`/auth/register?redirect=${encodeURIComponent(
            pathname + search
          )}`}
        >
          Sign Up
        </Button>
      </CardBody>
    </Card>
  );
};

export default SignUpCard;

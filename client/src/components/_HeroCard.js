import React from 'react';
import Card from './Card.js';
import { Button, Text, Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HeroCard = ({ ...props }) => {

  return (
    <Card py={[10,20,20,20]} px={4} justifyContent='center' { ...props }
      //bg={ useColorModeValue('brand.50', 'brand.900') }
      // bgGradient={ useColorModeValue(
      //   'linear(to-r, purple.100, purple.300)',
      //   'linear(to-r, purple.900, purple.700)'
      // ) }
      // bgGradient={useColorModeValue(
      //   'linear(to-r, brand.50, brand.200)',
      //   'linear(to-r, brand.900, brand.800)'
      // )}
    >
      {/*<Heading as="h1" size="2xl" mb={3} fontWeight={'extrabold'} letterSpacing={'tight'}>
        { 'Welcome to HeadyNet.' }
      </Heading>*/}
      <Heading as="h1" size="3xl" mb={5} fontWeight={'extrabold'} letterSpacing={'tight'} textAlign='center'>
        { 'Welcome to ' }
        <Text
          d='inline'
          color={ useColorModeValue('brand.500', 'brand.200') }
          textShadow={ '0 0 32px brand.500' }
          // bgClip='text'
          // bgGradient={
          //   useColorModeValue(
          //     `linear(to-r, red.500, brand.500, blue.600)`,
          //     `linear(to-r, red.400, brand.400, blue.500)`
          //   )
          // }
        >
          { 'HeadyNet' }
        </Text>
      </Heading>
      <Text fontSize='lg' variant='secondary' mb={5} textAlign='center'>
        { 'Discover and review your favorite Grateful Dead shows.' }
      </Text>
        <Stack mx={['none','auto','auto','auto']} direction={["column", "row", "row", "row"]}>
          <Button
            // size='lg'
            variant='solid'
            colorScheme='brand'
            as={ Link }
            to={ '/auth/register?redirect=%2F' }
          >
            { 'Sign Up' }
          </Button>
          <Button
            // size='lg'
            variant='solid'
            colorScheme='gray'
            as={ Link }
            to={ '/shows' }
          >
            { 'Discover Shows' }
          </Button>
        </Stack>
    </Card>
  );
};

export default HeroCard;


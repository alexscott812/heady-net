import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button, Icon, Text, Box, Stack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaRegCompass } from 'react-icons/fa'

const DiscoverCard = ({ props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <Stack spacing={4} align="flex-start">
          <Box
            boxSize={10}
            borderRadius="full" 
            p={3}
            //bg={useColorModeValue('red.50', 'whiteAlpha.200')}
            bg={useColorModeValue('brand.50', 'whiteAlpha.50')}
            //borderWidth={1}
            // boxShadow="base"
            d="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              as={FaRegCompass}
              boxSize={5}
              transform="rotate(-10deg)"
              color={useColorModeValue('brand.500', 'brand.200')}
            />
          </Box>
          <Box flex={1}>
            <CardTitle>Discover</CardTitle>
            <Text>
              Explore all Grateful Dead shows, venues, and songs ever played.
              <i>"You just gotta poke around!"</i>
            </Text>
            <Button
              mt={2}
              isFullWidth
              variant="solid"
              colorScheme="gray"
              as={Link}
              to="/shows"
              // leftIcon={<FaLocationArrow />}
            >
              Start Exploring
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default DiscoverCard;


import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import CardIcon from './CardIcon.js';
import { Button, Icon, Text, Box, Stack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaRegCompass } from 'react-icons/fa';

const DiscoverCard = ({ props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <Stack spacing={4} align="flex-start">
          <CardIcon icon={FaRegCompass} />
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
};

export default DiscoverCard;


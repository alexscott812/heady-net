import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Skeleton, Stack, Icon, Box, useColorModeValue } from '@chakra-ui/react';
import { FaRegCalendar } from 'react-icons/fa';

const TodaysShowsCardSkeleton = ({ ...props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <Stack direction={{ base: 'row', lg: 'column' }} spacing={4} align="flex-start">
          <Box
            boxSize={10}
            borderRadius="full" 
            p={3}
            bg={useColorModeValue('brand.50', 'whiteAlpha.50')}
            d="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              as={FaRegCalendar}
              boxSize={5}
              transform="rotate(10deg)"
              color={useColorModeValue('brand.500', 'brand.200')}
            />
          </Box>
          <Box flex={1} w="100%">
            <CardTitle>Today in History</CardTitle>
            <Stack>
              <Skeleton h={5} w="100%" />
              <Skeleton h={5} w="100%" />
              <Skeleton h={5} w="60%" />
            </Stack>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TodaysShowsCardSkeleton;
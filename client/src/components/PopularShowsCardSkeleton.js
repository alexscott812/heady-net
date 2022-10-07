import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import CardIcon from './CardIcon.js';
import { Box, Stack, Skeleton, VStack } from '@chakra-ui/react';
import { FaFire } from 'react-icons/fa';

const PopularShowsCardSkeleton = ({ ...props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <Stack direction={{ base: 'row', lg: 'column' }} spacing={4} align="flex-start">
          <CardIcon icon={FaFire} />
          <Box flex={1} w="100%">
            <CardTitle>Popular Shows</CardTitle>
            <VStack spacing={3} align="start">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} h={5} w="100%" />
              ))}
            </VStack>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PopularShowsCardSkeleton;


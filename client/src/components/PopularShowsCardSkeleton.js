import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Icon, Box, Stack, Skeleton, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaFire } from 'react-icons/fa';

const PopularShowsCardSkeleton = ({ restProps }) => {
  return (
    <Card {...restProps}>
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
              as={FaFire}
              boxSize={5}
              transform="rotate(10deg)"
              color={useColorModeValue('brand.500', 'brand.200')}
            />
          </Box>
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


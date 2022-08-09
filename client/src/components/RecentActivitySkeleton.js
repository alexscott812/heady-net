import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import { Box, Skeleton, SkeletonCircle, Divider, Flex, HStack } from '@chakra-ui/react';

const RecentActivitySkeleton = () => {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <Card key={i} mb={4}>
          <CardBody>
            <HStack spacing={2}>
              <SkeletonCircle />
              <Skeleton h={5} w="50%" />
            </HStack>
            <Divider mt={2} mb={3} />
            <Card variant="inner" mb={3} mx={0}>
              <Flex>
                <Skeleton h={28} w="33%" borderRadius="none" />
                <Box p={4} flex={1}>
                  <Skeleton h={5} w="30%" mb={2} />
                  <Skeleton h={5} w="50%" mb={2} />
                  <Skeleton h={5} w="40%" />
                </Box>
              </Flex>
            </Card>
            <Box>
              <Skeleton h={5} w="30%" mb={2} />
              <Skeleton h={5} w="100%" mb={2} />
              <Skeleton h={5} w="100%" mb={2} />
              <Skeleton h={5} w="50%" />
            </Box>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default RecentActivitySkeleton;

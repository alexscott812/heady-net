import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Box, Flex, Skeleton, Stack, SkeletonCircle } from '@chakra-ui/react';

const ReviewsCardSkeleton = ({ ...props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <CardTitle>Reviews</CardTitle>
        {[...Array(3)].map((_, i) => (
          <Box mb={i !== 2 ? 3 : 0} key={i}>
            <Flex align="flex-start">
              <SkeletonCircle size={8} mr={2} />
              <Card variant="inner" py={2} pl={3} pr={2}>
                <Stack>
                  <Skeleton h={5} w="30%" />
                  <Skeleton h={5} w="40%" />
                  <Skeleton h={5} w="50%" />
                </Stack>
              </Card>
            </Flex>
          </Box>
        ))}
      </CardBody>
    </Card>
  );
}

export default ReviewsCardSkeleton;

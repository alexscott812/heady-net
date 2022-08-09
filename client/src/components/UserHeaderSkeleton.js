import React from 'react';
import { VStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import Card from './Card.js';
import CardBody from './CardBody.js';

const UserHeaderSkeleton = () => {
  return (
    <Card>
      <CardBody>
        <VStack align="start">
          <SkeletonCircle size={16} mb={3} />
          <Skeleton h={5} w="70%" />
          <Skeleton h={5} w="50%" />
          <Skeleton h={5} w="40%" />
        </VStack>
      </CardBody>
    </Card>
  );
}

export default UserHeaderSkeleton;

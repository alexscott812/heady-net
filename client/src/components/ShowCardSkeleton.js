import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardFooter from './CardFooter.js';
import { Skeleton, Stack } from '@chakra-ui/react';

const ShowCardSkeleton = ({ includeRating }) => {
  return (
    <Card>
      <Skeleton height="150px" borderRadius="none" />
      <CardBody>
        <Stack mb={3}>
          <Skeleton h={5} w="50%" />
          <Skeleton h={5} w="80%" />
          <Skeleton h={5} w="60%" />
        </Stack>
      </CardBody>
      {includeRating && (
        <CardFooter>
          <Skeleton h={5} w="40%" />
        </CardFooter>
      )}
    </Card>
  );
};

export default ShowCardSkeleton;

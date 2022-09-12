import React from 'react';
import { Skeleton, Stack } from '@chakra-ui/react';
import Card from './Card.js';
import CardBody from './CardBody.js';

const ShowHeaderCardSkeleton = ({ ...props }) => {
  return (
    <Card {...props}>
      {/* <Skeleton height="150px" borderRadius='none' /> */}
      <CardBody>
        <Stack>
          <Skeleton h={12} w="50%" />
          <Skeleton h={5} w="80%" />
          <Skeleton h={5} w="60%" />
          <Skeleton h={10} w="70%" />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ShowHeaderCardSkeleton;

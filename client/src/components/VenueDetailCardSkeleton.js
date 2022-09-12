import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import { Skeleton } from '@chakra-ui/react';

const VenueDetailCardSkeleton = ({ ...props }) => {
  return (
    <Card {...props}>
      <CardBody>
        <Skeleton h={5} w="50%" />
      </CardBody>
    </Card>
  );
};

export default VenueDetailCardSkeleton;
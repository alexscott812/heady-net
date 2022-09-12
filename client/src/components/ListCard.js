import React from 'react';
import { Divider, List, VStack } from '@chakra-ui/react';
import Card from './Card.js';
import CardBody from './CardBody.js';

const ListCard = ({ children, ...restProps }) => {
  return (
    <Card {...restProps}>
      <CardBody py={0}>
        <VStack as={List} align="stretch" spacing={0} divider={<Divider />}>
          {children}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ListCard;
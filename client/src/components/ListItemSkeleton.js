import React from 'react';
import { ListItem, Skeleton } from '@chakra-ui/react';

const ListItemLink = ({ ...props }) => {
  return (
    <ListItem d="block" py={2} {...props}>
      <Skeleton h={6} w="50%" />
    </ListItem>
  );
};

export default ListItemLink;
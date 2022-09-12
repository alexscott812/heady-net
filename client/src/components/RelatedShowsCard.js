import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const RelatedShowsCard = ({
  month,
  day,
  year,
  ...restProps
}) => {
  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle>Related Shows</CardTitle>
        <Button
          variant="solid"
          colorScheme="gray"
          isFullWidth
          as={Link}
          to={`/shows?month=${month}&day=${day}`}
        >
          {`See shows on ${month}/${day}`}
        </Button>
        <Button
          variant="solid"
          colorScheme="gray"
          isFullWidth
          as={Link}
          mt={2}
          to={`/shows?year=${year}`}
        >
          {`See shows from ${year}`}
        </Button>
      </CardBody>
    </Card>
  );
};

export default RelatedShowsCard;

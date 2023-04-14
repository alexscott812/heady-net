import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const RelatedShowsCard = ({ month, day, year, ...restProps }) => {
  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle>Related Shows</CardTitle>
        <Button
          // variant="solid"
          // colorScheme="gray"
          // isFullWidth
          py={1}
          variant="link"
          rightIcon={<FaArrowRight />}
          as={Link}
          to={`/shows?month=${month}&day=${day}`}
        >
          {`See shows on ${month}/${day}`}
        </Button>
        <Button
          // variant="solid"
          // colorScheme="gray"
          // isFullWidth
          py={1}
          variant="link"
          rightIcon={<FaArrowRight />}
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

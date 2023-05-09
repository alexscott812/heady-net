import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import { Link, Text, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
// import pluralize from '../utils/pluralize.js';

const VenueDetailCard = ({ venue, ...restProps }) => {
  return (
    <Card {...restProps}>
      <CardBody>
        <Heading as="h1" size="lg" fontWeight="semibold" mb={2}>
          {venue.name}
        </Heading>
        <Text fontSize="lg" fontWeight="semibold">
          Total Performances
        </Text>
        <Link as={RouterLink} to={`/shows?venue=${venue._id}`} fontSize="3xl">
          {venue.show_count}
        </Link>
        {/* <SimpleGrid columns={[1, 1, 3, 3]} spacing={4}>
          <Card variant="inner">
            <CardBody>
              <CardTitle>Total Performances</CardTitle>
              <Text fontSize="2xl">{venue.show_count}</Text>
              <Button
                // isFullWidth
                mt={2}
                variant="solid"
                colorScheme="brand"
                as={RouterLink}
                to={`/shows?venue=${venue._id}`}
              >
                {`See ${venue.show_count} ${pluralize(
                  venue.show_count,
                  'Show',
                  'Shows'
                )}`}
              </Button>
            </CardBody>
          </Card>
        </SimpleGrid> */}
      </CardBody>
    </Card>
  );
};

export default VenueDetailCard;

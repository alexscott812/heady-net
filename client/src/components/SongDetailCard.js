import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button, Text, Heading, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import pluralize from '../utils/pluralize.js';

const SongDetailCard = ({ song, ...restProps }) => {
  return (
    <Card {...restProps}>
      <CardBody>
        <Text variant="subtle-bold">Song</Text>
        <Heading as="h1" size="lg" fontWeight="semibold" mb={2}>{song.name}</Heading>
        <SimpleGrid columns={[1,1,3,3]} spacing={4}>
          <Card variant="inner">
            <CardBody>
              <CardTitle>Total Performances</CardTitle>
              <Text fontSize="2xl">{song.show_count}</Text>
              <Button
                // isFullWidth
                mt={2}
                variant="solid"
                colorScheme="brand"
                as={RouterLink}
                to={`/shows?song=${song._id}`}
              >
                {`See ${song.show_count} ${pluralize(song.show_count, 'Show', 'Shows')}`}
              </Button>
            </CardBody>
          </Card>
          <Card variant="inner">
            <CardBody>
              <CardTitle>First Performance</CardTitle>
              <Text fontSize="2xl">{song.first_show.title}</Text>
              <Button
                // isFullWidth
                mt={2}
                variant="solid"
                colorScheme="gray"
                as={RouterLink}
                to={`/shows/${song.first_show._id}`}
              >
                See Show
              </Button>
            </CardBody>
          </Card>
          <Card variant="inner">
            <CardBody>
              <CardTitle>Last Performance</CardTitle>
              <Text fontSize="2xl">{song.last_show.title}</Text>
              <Button
                // isFullWidth
                mt={2}
                variant="solid"
                colorScheme="gray"
                as={RouterLink}
                to={`/shows/${song.last_show._id}`}
              >
                See Show
              </Button>
            </CardBody>
          </Card>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default SongDetailCard;
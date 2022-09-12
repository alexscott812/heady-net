import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button, Box, Text, Flex } from '@chakra-ui/react';
import Calendar from './_Calendar.js';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import pluralize from '../utils/pluralize.js';

const TodaysShowsCard = ({ month, day, showCount, ...restProps }) => {
  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle>Today in History</CardTitle>
        <Flex alignItems="center" justifyContent="space-between">
          <Box mr={3} w="33%">
            <Calendar month={month} day={day} />
          </Box>
          <Box flex={1}>
            <Text>
              {`...the Grateful Dead performed ${showCount} ${pluralize(showCount, 'show', 'shows')}.`}
            </Text>
          </Box>
        </Flex>
        {showCount > 0 && (
          <Button
            mt={4}
            variant="solid"
            colorScheme="brand"
            isFullWidth
            as={Link}
            to={`/shows?${qs.stringify({ month, day })}`}
          >
            {`See ${showCount} ${pluralize(showCount, 'Show', 'Shows')}`}
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default TodaysShowsCard;

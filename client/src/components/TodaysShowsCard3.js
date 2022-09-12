import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button, Icon, Text, Box, Stack, useColorModeValue } from '@chakra-ui/react';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import pluralize from '../utils/pluralize.js';
import { FaRegCalendar } from 'react-icons/fa';
import getMonthName from '../utils/get-month-name.js';
import getDateOrdinal from '../utils/get-date-ordinal.js';

const TodaysShowsCard3 = ({ month, day, showCount, ...restProps }) => {
  return (
    <Card {...restProps}>
      <CardBody>
        <Stack direction={{ base: 'row', lg: 'column' }} spacing={4} align="flex-start">
          <Box
            boxSize={10}
            borderRadius="full" 
            p={3}
            bg={useColorModeValue('brand.50', 'whiteAlpha.50')}
            d="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              as={FaRegCalendar}
              boxSize={5}
              transform="rotate(10deg)"
              color={useColorModeValue('brand.500', 'brand.200')}
            />
          </Box>
          <Box flex={1}>
            <CardTitle>Today in History</CardTitle>
            <Text>
              {`${showCount === 0 ? 'Unfortunately, the' : 'The'} Grateful Dead performed ${showCount} ${pluralize(showCount, 'show', 'shows')} on ${getMonthName(month)} ${day}${getDateOrdinal(day)}.`}
            </Text>
            {(showCount > 0) && (
              <Button
                mt={2}
                variant="solid"
                colorScheme="brand"
                isFullWidth
                as={Link}
                to={`/shows?${qs.stringify({ month, day })}`}
              >
                {`See ${showCount} ${pluralize(showCount, 'Show', 'Shows')}`}
              </Button>
            )}
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TodaysShowsCard3;


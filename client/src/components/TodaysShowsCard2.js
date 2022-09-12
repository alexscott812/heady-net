import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Button, Icon, Text } from '@chakra-ui/react';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import pluralize from '../utils/pluralize.js';
import { FaCalendarDay } from 'react-icons/fa';

const TodaysShowsCard2 = ({ month, day, showCount, ...restProps }) => {
  const getMonthName = (m) => {
    const monthMap = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };
    return monthMap[m];
  };

  const getDateOrdinal = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };

  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle>
          <Icon as={FaCalendarDay} mr={2} />
          Today in History
        </CardTitle>
        <Text>
          {`The Grateful Dead performed ${showCount} ${pluralize(showCount, 'show', 'shows')} on ${getMonthName(month)} ${day}${getDateOrdinal(day)}.`}
        </Text>
        {showCount > 0 && (
          <Button
            mt={2}
            variant="solid"
            colorScheme="brand"
            // isFullWidth
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

export default TodaysShowsCard2;


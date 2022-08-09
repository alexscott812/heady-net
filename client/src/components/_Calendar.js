import React from 'react';
import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react";

const Calendar = ({
  month = 1,
  day = 1,
  ...restProps
}) => {

  const monthMap = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };

  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' { ...restProps }>
      <Center bg={ useColorModeValue('brand.500', 'brand.200') }>
        <Text
          fontWeight='bold'
          color={ useColorModeValue('whiteAlpha.900', 'gray.800') }
        >
          { monthMap[month] }
        </Text>
      </Center>
      <Center bg={ 'whiteAlpha.900' }>
        <Text
          fontSize="3xl"
          fontWeight='bold'
          color={ 'gray.800' }
        >{ day }</Text>
      </Center>
    </Box>
  );
};

export default Calendar;

import React from 'react';
import { Box, Icon, useColorModeValue } from '@chakra-ui/react';

const CardIcon = ({ icon, ...restProps }) => {
  return (
    <Box
      boxSize={10}
      borderRadius="full" 
      p={3}
      bg={useColorModeValue('brand.50', 'whiteAlpha.100')}
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Icon
        as={icon}
        boxSize={5}
        color={useColorModeValue('brand.600', 'brand.200')}
        {...restProps}
      />
    </Box>
  );
};

export default CardIcon;
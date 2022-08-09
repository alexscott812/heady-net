import React from 'react';
import { Box, useStyleConfig } from '@chakra-ui/react';

const Main = ({ children }) => {
  return (
    <Box __css={useStyleConfig('Main')}>
      {children}
    </Box>
  );
}

export default Main;

import React from 'react';
import { Box, Container, useStyleConfig } from '@chakra-ui/react';

const Main = ({ children }) => {
  return (
    <Box __css={useStyleConfig('Main')}>
      <Container maxW={['5xl', '5xl', '5xl', '4xl']} px={0}>
        {children}
      </Container>
    </Box>
  );
  // return <Box __css={useStyleConfig("Main")}>{children}</Box>;
};

export default Main;

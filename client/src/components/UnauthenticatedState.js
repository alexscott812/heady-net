import React from 'react';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Alert, AlertTitle, AlertIcon, Button } from '@chakra-ui/react';

const UnauthenticatedState = ({ ...props }) => {
  const location = useLocation();
  
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height={56}
      borderRadius="xl"
      {...props}
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Please login to make changes!
      </AlertTitle>
      <Button
        colorScheme="blue"
        as={RouterLink}
        to={`/auth/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
        mt={4}
      >
        Login
      </Button>
    </Alert>
	);
};

export default UnauthenticatedState;

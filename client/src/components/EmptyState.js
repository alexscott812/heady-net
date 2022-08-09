import React from 'react';
import { Alert, AlertTitle, AlertIcon } from '@chakra-ui/react';

const EmptyState = ({ ...props }) => {
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
      {/* <Icon as={FaFrown} boxSize={10} /> */}
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Nothing to see here!
      </AlertTitle>
    </Alert>
		// <Box my={10} {...props}>
		// 	<Center color={useColorModeValue('brand.500', 'brand.200')}>
		// 		<Icon as={FaFrown} boxSize={28} />
		// 	</Center>
		// 	<Center >
		// 		<Heading
		// 			as="h5"
		// 			size="md"
		// 			fontWeight="semibold"
		// 			my={3}
		// 		>
		// 			Nothing to see here
		// 		</Heading>
		// 	</Center>
		// </Box>
	);
};

export default EmptyState;

import React from 'react';
import { Alert, AlertTitle, AlertIcon } from '@chakra-ui/react';

const FinishedState = ({ ...props }) => {
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
			<AlertIcon boxSize={10} mr={0} />
			<AlertTitle mt={4} mb={1} fontSize="lg">
				That's all there is to see here!
			</AlertTitle>
		</Alert>
	);
};

export default FinishedState;

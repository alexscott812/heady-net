import React from 'react';
import { Heading } from '@chakra-ui/react';

const CardTitle = ({ children, ...restProps }) => {
	return (
		<Heading
			as="h5"
			size="md"
			fontWeight="semibold"
			mb={2}
			d="flex"
			alignItems="center"
			{...restProps}
		>
			{children}
		</Heading>
	);
};

export default CardTitle;

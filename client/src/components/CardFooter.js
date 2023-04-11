import React from 'react';
import { Box } from '@chakra-ui/react';

const CardFooter = ({ children, ...restProps }) => {
	return (
		<Box pb={4} px={4} mt="auto" {...restProps}>
			{/*<Divider mb={3} />*/}
			{children}
		</Box>
	);
};

export default CardFooter;

import React from 'react';
import { Box, useStyleConfig } from '@chakra-ui/react';

const Card = ({ variant, children, ...restProps }) => {
	return (
		<Box __css={useStyleConfig('Card', { variant })} {...restProps}>
			{children}
		</Box>
	);
};

export default Card;

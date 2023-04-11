import React from 'react';
import { GridItem as ChakraGridItem } from '@chakra-ui/react';

const GridItem = ({ children, ...restProps }) => {
	return (
		<ChakraGridItem colSpan={12} {...restProps}>
			{children}
		</ChakraGridItem>
	);
};

export default GridItem;

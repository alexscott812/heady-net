import React from 'react';
import { Container } from '@chakra-ui/react';

const PageContainer = ({ children, ...restProps }) => {
	return (
		<Container p={4} {...restProps}>
			{children}
		</Container>
	);
};

export default PageContainer;

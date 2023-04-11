import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ShowCardSkeleton from './ShowCardSkeleton.js';

const ShowResultsSkeleton = () => {
	return (
		<SimpleGrid columns={[1, 2, 3, 4]} spacingX={4} spacingY={4} mb={4}>
			{[...Array(12)].map((_, i) => (
				<ShowCardSkeleton key={i} />
			))}
		</SimpleGrid>
	);
};

export default ShowResultsSkeleton;

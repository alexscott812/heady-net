import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import { Skeleton, SimpleGrid } from '@chakra-ui/react';

const ImageGalleryCardSkeleton = ({ ...props }) => {
	return (
		<Card {...props}>
			<CardBody>
				<CardTitle>Images</CardTitle>
				<SimpleGrid columns={[3, 4, 5, 5]} spacing={2}>
					{[...Array(2)].map((_, i) => (
						<Skeleton key={i} pt="100%" h={0} w="100%" borderRadius="md" />
					))}
				</SimpleGrid>
			</CardBody>
		</Card>
	);
};

export default ImageGalleryCardSkeleton;

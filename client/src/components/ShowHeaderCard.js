import React from 'react';
import StarRating from './StarRating.js';
import Card from './Card.js';
import CardBody from './CardBody.js';
import EmptyImage from './EmptyImage.js';
import {
	Button,
	Box,
	Flex,
	Heading,
	Text,
	Link,
	Stack,
	Image,
	Skeleton
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaVolumeUp, FaStar, FaShare } from 'react-icons/fa';
// import useAuth from '../hooks/useAuth.js';
import { useAuth } from '../lib/auth';
//import { DEFAULT_THUMBNAIL_MD } from '../constants.js';

const ShowHeaderCard = ({
	show,
	onWriteReviewButtonClick,
	onListenButtonClick,
	onShareButtonClick,
	...restProps
}) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	return (
		<Card {...restProps}>
			{show.images.length > 0 ? (
				<Image
					src={show.images[0].url}
					objectFit="cover"
					height="150px"
					width="100%"
					fallback={<Skeleton height="150px" />}
				/>
			) : (
				<EmptyImage h="150px" w="100%" />
			)}
			<CardBody>
				<Heading as="h1" size="2xl" fontWeight="semibold" mb={1}>
					{show.title}
				</Heading>
				<Box mb={1}>
					<Text>
						<Link as={RouterLink} to={`/venues/${show.venue._id}`}>
							{show.venue.name}
						</Link>
						{' \u00B7 '}
						<Link as={RouterLink} to={`/shows?city=${show.city._id}`}>
							{show.city.name}
						</Link>
						{', '}
						{show.state && (
							<>
								<Link as={RouterLink} to={`/shows?state=${show.state._id}`}>
									{show.state.name}
								</Link>
								{', '}
							</>
						)}
						<Link as={RouterLink} to={`/shows?country=${show.country._id}`}>
							{show.country.name}
						</Link>
					</Text>
				</Box>
				<Box mb={3}>
					<Flex>
						<StarRating
							rating={show.avg_rating}
							numberOfStars={5}
							editable={false}
							mr={2}
						/>
						<Text fontWeight="semibold" mr={1}>
							{show.avg_rating.toFixed(1)}
						</Text>
						<Text variant="secondary">
							{`(${show.review_count} ${
								show.review_count === 1 ? 'Review' : 'Reviews'
							})`}
						</Text>
					</Flex>
				</Box>
				<Stack direction={['column', 'column', 'row', 'row']}>
					{isAuthenticated ? (
						<Button
							variant="solid"
							colorScheme="brand"
							onClick={onWriteReviewButtonClick}
							leftIcon={<FaStar />}
						>
							Write a Review
						</Button>
					) : (
						<Button
							variant="solid"
							colorScheme="brand"
							as={RouterLink}
							to={`/auth/login?redirect=${encodeURIComponent(
								location.pathname + location.search
							)}`}
							leftIcon={<FaStar />}
						>
							Write a Review
						</Button>
					)}
					<Button
						variant="solid"
						colorScheme="gray"
						onClick={onListenButtonClick}
						leftIcon={<FaVolumeUp />}
					>
						Listen
					</Button>
					<Button
						variant="solid"
						colorScheme="gray"
						onClick={onShareButtonClick}
						leftIcon={<FaShare />}
					>
						Share
					</Button>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default ShowHeaderCard;

import React from 'react';
import Card from './Card.js';
import CardBody from './CardBody.js';
import {
  Box,
  Text,
  Divider,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  Image,
  VStack,
  Skeleton
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import StarRating from './StarRating.js';
import { useAuth } from '../lib/auth';
import getRelativeTime from '../utils/get-relative-time.js'
import EmptyImage from './EmptyImage.js';
import AvatarButton from './AvatarButton.js';

const RecentActivity = ({ recentActivity = [] }) => {
  const { user } = useAuth();
  // const [hoverUserId, setHoverUserId] = useState(null);

  const formatShowLocation = (city, state, country) => {
    return [city, state, country].filter(Boolean).join(', ');
  };
  
  return (
    <>
      {recentActivity.map(review => (
        <Card key={review._id} mb={4}>
          <CardBody>
            <Flex align="center">
              <AvatarButton 
                as={RouterLink}
                to={`/users/${review.user._id}`}
                name={`${review.user.first_name} ${review.user.last_name}`}
                mr={2}
              />
              <VStack align="start" spacing={-1}>
                <Box>
                  <Link fontWeight="medium" as={RouterLink} to={`/users/${review.user._id}`}>
                    {(review.user._id === user?._id)
                      ? 'You'
                      : `${review.user.first_name} ${review.user.last_name.charAt(0)}.`
                    }
                  </Link>
                  <Text d="inline">&nbsp;wrote a review.</Text>
                </Box>
                <Text variant="tertiary">{getRelativeTime(review.created_at)}</Text>
              </VStack>
            </Flex>
            {/* <Box ml={10}> */}
            <Divider mt={2} mb={3} />
            <Card as={LinkBox} variant="inner" mb={3} mx={0}>
              <Flex>
                {review.show.image
                  ? <Image
                      src={review.show.image.thumbnail_md_url}
                      objectFit="cover"
                      h={28}
                      w="33%"
                      fallback={<Skeleton h={28} w="33%" borderRadius="none" />}
                    />
                  : <EmptyImage h={28} w="33%" />
                }
                <Box p={4}>
                  <LinkOverlay
                    as={RouterLink}
                    to={`/shows/${review.show._id}`}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    <Text noOfLines={1} fontWeight="semibold" fontSize="lg">
                      {review.show.title}
                    </Text>
                  </LinkOverlay>
                  <Text noOfLines={1}>{review.show.venue.name}</Text>
                  <Text noOfLines={1} variant="secondary">
                    {formatShowLocation(
                      review.show.city.name,
                      review.show.state?.name || '',
                      review.show.country.name
                    )}
                  </Text>
                </Box>
              </Flex>
            </Card>
            <Box>
              <StarRating
                rating={review.rating}
                numberOfStars={5}
                editable={false}
                mb={1}
              />
              <Text>{review.text}</Text>
            </Box>
            {/* </Box> */}
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default RecentActivity;

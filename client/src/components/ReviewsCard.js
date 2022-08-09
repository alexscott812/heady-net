import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Card from './Card.js';
import CardBody from './CardBody.js';
import CardTitle from './CardTitle.js';
import {
  Button,
  Box,
  Text,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Spacer,
  VStack
} from '@chakra-ui/react';
import AvatarButton from './AvatarButton.js';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import StarRating from './StarRating.js'
import { useAuth } from '../lib/auth';
import getRelativeTime from '../utils/get-relative-time.js'

const ReviewsCard = ({
  reviews = [],
  hasMore = false,
  isFetchingMore = false,
  fetchMore = null,
  handleShowWriteReviewModal = null,
  handleShowEditReviewModal = null,
  handleShowDeleteReviewModal = null,
  onWriteReviewClick = null,
  ...restProps
}) => {
  const { user, isAuthenticated } = useAuth();
  const { pathname, search } = useLocation();

  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle>Reviews</CardTitle>
        {(reviews.length > 0)
          ? <>
              {reviews.map((review, i) => (
                <Box mb={i !== (reviews.length - 1) ? 3 : 0} key={review._id}>
                  <Flex alignItems="flex-start">
                    <AvatarButton 
                      as={RouterLink}
                      to={`/users/${review.user._id}`}
                      name={`${review.user.first_name} ${review.user.last_name}`}
                      mr={2}
                    />
                    <Card variant="inner" py={2} pl={3} pr={2}>
                      <Flex>
                        <VStack align="start" spacing={1}>
                          <Box>
                            <Link fontWeight="medium" as={RouterLink} to={`/users/${review.user._id}`}>
                              {(review.user._id === user?._id)
                                ? 'You'
                                : `${review.user.first_name} ${review.user.last_name.charAt(0)}.`
                              }
                            </Link>
                            <Text variant="tertiary" d="inline">
                              &nbsp;{getRelativeTime(review.created_at)}
                            </Text>
                          </Box>
                          <StarRating rating={review.rating} numberOfStars={5} />
                          <Text>{review.text}</Text>
                        </VStack>
                        <Spacer />
                        {(review.user._id === user?._id) && (
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              isRound
                              size="sm"
                              variant="ghost"
                              colorScheme="gray"
                              aria-label="Options"
                              //icon={<FontAwesomeIcon icon={faEllipsisH} />}
                              icon={<Text fontWeight="bold">···</Text>}
                            />
                            <MenuList>
                              <MenuItem
                                icon={<FaPen />}
                                onClick={() => handleShowEditReviewModal(review)}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                icon={<FaTrashAlt />}
                                onClick={() => handleShowDeleteReviewModal(review)}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        )}
                      </Flex>
                    </Card>
                  </Flex>
                </Box>
              ))}
              {hasMore && (
                <Flex justify="center">
                  <Button
                    isFullWidth
                    colorScheme="brand"
                    variant="link"
                    isLoading={isFetchingMore}
                    loadingText="Loading More..."
                    isDisabled={isFetchingMore}
                    onClick={fetchMore}
                  >
                    Load More
                  </Button>
                </Flex>
              )}
            </>
          : <Text>
              There are no reviews.&nbsp;
              {isAuthenticated
                ? <Link onClick={handleShowWriteReviewModal}>
                    Be the first to write one.
                  </Link>
                : <Link
                    as={RouterLink}
                    to={`/auth/login?redirect=${encodeURIComponent(pathname + search)}`}
                  >
                    Be the first to write one.
                  </Link>
              }
            </Text>
        }
      </CardBody>
    </Card>
  );
}

export default ReviewsCard;

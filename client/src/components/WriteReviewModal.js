import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Textarea,
  Flex,
  Avatar,
  VStack
} from '@chakra-ui/react';
import Card from './Card.js';
import StarRating from './StarRating.js';
import { useAuth } from '../lib/auth';
import useCreateReview from '../hooks/mutations/useCreateReview.js';

const initialReviewState = {
  rating: 0,
  text: ''
};

const WriteReviewModal = ({
  isOpen = false,
  onClose = null,
  showId = null
}) => {
  const { user, getToken } = useAuth();
  const [review, setReview] = useState(initialReviewState);
  const createReview = useCreateReview();

  const handleClose = () => {
    setReview(initialReviewState);
    createReview.reset();
    onClose();
  };

  const validate = () => {
    return review?.text?.length > 0
      && review?.rating > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value
    });
  };

  const handleCreateReview = () => {
    const reviewToCreate = {
      show_id: showId,
      rating: review?.rating,
      text: review?.text
    };
    createReview.mutate({
      review: reviewToCreate,
      tokenFn: getToken
    }, {
      onSuccess: handleClose
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Write a Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems="flex-start">
            <Avatar
              size="sm"
              name={user?.first_name}
              mr={2}
            />
            <Card variant="inner" py={2} pl={3} pr={2}>
              <VStack align="start" spacing={1} flex={1}>
                <Text fontWeight="medium">{`${user?.first_name} ${user?.last_name}`}</Text>
                <Box mb={3}>
                  <StarRating
                    editable
                    rating={review?.rating || 0}
                    numberOfStars={5}
                    onRatingChange={handleInputChange}
                  />
                </Box>
                <Textarea
                  name="text"
                  value={review?.text || ''}
                  onChange={handleInputChange}
                  placeholder="Write a review..."
                />
              </VStack>
            </Card>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={2} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleCreateReview}
            isLoading={createReview.isLoading}
            loadingText="Posting Review..."
            isDisabled={createReview.isLoading || !validate()}
          >
            Post Review
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WriteReviewModal;

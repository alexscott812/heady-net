import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
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
import StarRating from './StarRating.js'
import { useAuth } from '../lib/auth';
import useCreateReview from '../hooks/mutations/useCreateReview.js';

const initialReviewToBeCreatedState = {
  rating: 0,
  text: ''
};

const WriteReviewModal = ({
  isOpen = false,
  onClose = null,
  showId = null
}) => {
  const { user, isAuthenticated, getToken } = useAuth();
  const [reviewToBeCreated, setReviewToBeCreated] = useState(initialReviewToBeCreatedState);
  const createReview = useCreateReview();

  const handleClose = () => {
    setReviewToBeCreated(initialReviewToBeCreatedState);
    createReview.reset();
    onClose();
  };

  const validate = () => {
    return reviewToBeCreated?.text?.length > 0
      && reviewToBeCreated?.rating > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewToBeCreated({
      ...reviewToBeCreated,
      [name]: value
    });
  };

  const handleCreateReview = () => {
    const reviewToCreate = {
      show_id: showId,
      rating: reviewToBeCreated?.rating,
      text: reviewToBeCreated?.text
    };
    createReview.mutate({
      review: reviewToCreate,
      tokenFn: getToken
    }, {
      onSuccess: () => handleClose()
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Write a Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isAuthenticated
            ? <>
                <Flex alignItems="flex-start">
                  <Avatar
                    size="sm"
                    name={`${user.first_name} ${user.last_name}`}
                    mr={2}
                  />
                  <Card variant="inner" py={2} pl={3} pr={2}>
                    <VStack align="start" spacing={1} flex={1}>
                      <Text fontWeight="medium">{`${user.first_name} ${user.last_name}`}</Text>
                      <Box mb={3}>
                        <StarRating
                          editable
                          rating={reviewToBeCreated?.rating || 0}
                          numberOfStars={5}
                          onRatingChange={handleInputChange}
                        />
                      </Box>
                      <Textarea
                        name="text"
                        value={reviewToBeCreated?.text || ''}
                        onChange={handleInputChange}
                        placeholder="Write a review..."
                      />
                    </VStack>
                  </Card>
                </Flex>
                {/* <Text fontWeight="medium" mb={1}>{`${user.first_name} ${user.last_name}`}</Text>
                <Box mb={3}>
                  <StarRating
                    editable
                    rating={reviewToBeCreated?.rating || 0}
                    numberOfStars={5}
                    onRatingChange={handleInputChange}
                  />
                </Box>
                <Textarea
                  name="text"
                  value={reviewToBeCreated?.text || ''}
                  onChange={handleInputChange}
                  placeholder="Write a review..."
                /> */}
              </>
            : <Alert status="error" mb={3}>
                <AlertIcon />
                Not authorized to write review!
              </Alert>
          }
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
}

export default WriteReviewModal;

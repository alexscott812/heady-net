import React, { useState, useEffect } from 'react';
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
import Card from './Card.js'
import StarRating from './StarRating.js'
import { useAuth } from '../lib/auth';
import useSaveReview from '../hooks/mutations/useSaveReview.js';

const EditReviewModal = ({
  reviewToBeEdited = null,
  setReviewToBeEdited = null,
  isOpen = false,
  onClose = null,
}) => {
  const { user, isAuthenticated, getToken } = useAuth();
  const saveReview = useSaveReview();

  const handleClose = () => {
    setReviewToBeEdited(null);
    saveReview.reset();
    onClose();
  };

  const validate = () => {
    return reviewToBeEdited?.text?.length > 0
      && reviewToBeEdited.rating !== 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewToBeEdited({
      ...reviewToBeEdited,
      [name]: value
    });
  };

  const handleSaveReview = () => {
    const reviewToEdit = {
      _id: reviewToBeEdited?._id,
      show_id: reviewToBeEdited?.show._id,
      rating: reviewToBeEdited?.rating,
      text: reviewToBeEdited?.text
    };
    saveReview.mutate({
      review: reviewToEdit,
      tokenFn: getToken
    }, {
      onSuccess: handleClose
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Review</ModalHeader>
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
                          rating={reviewToBeEdited?.rating || 0}
                          numberOfStars={5}
                          onRatingChange={handleInputChange}
                        />
                      </Box>
                      <Textarea
                        name="text"
                        value={reviewToBeEdited?.text || ''}
                        onChange={handleInputChange}
                        placeholder="Edit review..."
                      />
                    </VStack>
                  </Card>
                </Flex>
                {/* <Text fontWeight="medium" mb={1}>{`${user.first_name} ${user.last_name}`}</Text>
                <Box mb={3}>
                  <StarRating
                    editable
                    rating={reviewToBeEdited?.rating || 0}
                    numberOfStars={5}
                    onRatingChange={handleInputChange}
                  />
                </Box>
                <Textarea
                  name="text"
                  value={reviewToBeEdited?.text || ''}
                  onChange={handleInputChange}
                  placeholder="Edit review..."
                /> */}
              </>
            : <Alert status="error" mb={3}>
                <AlertIcon />
                Not authorized to edit review!
              </Alert>
          }
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={2} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleSaveReview}
            isLoading={saveReview.isLoading}
            loadingText="Saving Review..."
            isDisabled={saveReview.isLoading || !validate()}
          >
            Save Review
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditReviewModal;

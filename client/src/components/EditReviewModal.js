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
  Textarea
} from '@chakra-ui/react';
import StarRating from './StarRating.js'
import { useAuth } from '../lib/auth';
import useSaveReview from '../hooks/mutations/useSaveReview.js';

const EditReviewModal = ({
  review = null,
  //setReviewToBeEdited = null,
  isOpen = false,
  onClose = null,
}) => {
  const { user, isAuthenticated, getToken } = useAuth();
  const [reviewToBeEdited, setReviewToBeEdited] = useState(review);
  const saveReview = useSaveReview();

  useEffect(() => setReviewToBeEdited(review), [review]);

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
    e.preventDefault();
    setReviewToBeEdited({
      ...reviewToBeEdited,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveReview = () => {
    saveReview.mutate({
      reviewToBeEdited,
      tokenFn: getToken
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isAuthenticated
            ? <>
                <Text fontWeight="medium" mb={1}>{`${user.first_name} ${user.last_name}`}</Text>
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

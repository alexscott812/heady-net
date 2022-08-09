import React, { useRef } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useAuth } from '../lib/auth';
import useDeleteReview from '../hooks/mutations/useDeleteReview.js';

const DeleteReviewModal = ({
  reviewToBeDeleted = null,
  setReviewToBeDeleted = null,
  isOpen = false,
  onClose = null,
  // mutation = null
}) => {
  const { isAuthenticated, getToken } = useAuth();
  const deleteReview = useDeleteReview();
  const cancelRef = useRef();

  const handleDeleteReview = () => {
    deleteReview.mutate({
      reviewId: reviewToBeDeleted._id,
      tokenFn: getToken
    });
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Delete Review</AlertDialogHeader>
          <AlertDialogBody>
            {isAuthenticated
              ? <Text mb={3}>Are you sure you want to delete this review?</Text>
              : <Alert status="error" mb={3}>
                  <AlertIcon />
                  Not authorized to delete review!
                </Alert>
            }
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="gray" mr={2} onClick={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteReview}
              isLoading={deleteReview.isLoading}
              loadingText="Deleting Review..."
              isDisabled={deleteReview.isLoading}
            >
              Delete Review
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteReviewModal;

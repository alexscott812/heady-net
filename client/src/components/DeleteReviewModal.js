import React, { useRef } from "react";
import {
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useAuth } from "../lib/auth";
import useDeleteReview from "../hooks/mutations/useDeleteReview.js";

const DeleteReviewModal = ({
  reviewToBeDeleted = null,
  setReviewToBeDeleted = null,
  isOpen = false,
  onClose = null,
}) => {
  const { isAuthenticated, getToken } = useAuth();
  const deleteReview = useDeleteReview();
  const cancelRef = useRef();

  const handleClose = () => {
    setReviewToBeDeleted(null);
    deleteReview.reset();
    onClose();
  };

  const handleDeleteReview = () => {
    deleteReview.mutate(
      {
        reviewId: reviewToBeDeleted._id,
        showId: reviewToBeDeleted.show._id,
        tokenFn: getToken,
      },
      {
        onSuccess: handleClose,
      }
    );
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={handleClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Delete Review</AlertDialogHeader>
          <AlertDialogBody>
            <Text mb={3}>Are you sure you want to delete this review?</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="gray"
              mr={2}
              onClick={handleClose}
              ref={cancelRef}
            >
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

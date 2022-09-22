import React, { useState, useRef } from 'react';
import {
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
import useDeleteUser from '../hooks/mutations/useDeleteUser.js';

const DeactivateUserModal = ({
  userToBeDeleted = null,
  setUserToBeDeleted = null,
  isOpen = false,
  onClose = null,
}) => {
  const cancelRef = useRef();
  const { isAuthenticated } = useAuth();
  const deleteUser = useDeleteUser();

  const [user] = useState(null);

  // useEffect(() => {
  //   setUser(props.user);
  // }, [props.user]);

  // const handleClose = () => {
  //   setUser(null);
  //   deleteUser.reset();
  //   onClose();
  // };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    deleteUser.mutate({ userId: user._id });
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Deactivate Account</AlertDialogHeader>
          <AlertDialogBody>
            <Text mb={3}>Are you sure you want to deactivate your account?</Text>
            <Text mb={3}>{user?._id || ''}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="gray" mr={2} onClick={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteUser}
              isLoading={deleteUser.isLoading}
              loadingText="Deleting Account..."
              isDisabled={deleteUser.isLoading}
            >
              Deactivate Account
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeactivateUserModal;

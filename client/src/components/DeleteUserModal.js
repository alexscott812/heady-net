import React, { useState, useRef } from 'react';
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
import useDeleteUser from '../hooks/mutations/useDeleteUser.js';

const DeleteUserModal = ({
  userToBeDeleted = null,
  setUserToBeDeleted = null,
  isOpen = false,
  onClose = null,
  mutation = null
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
    removeUser();
  };

  const removeUser = async () => {
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
          <AlertDialogHeader>Delete Account</AlertDialogHeader>
          <AlertDialogBody>
            {isAuthenticated
              ? <Text mb={3}>Are you sure you want to delete your account?</Text>
              : <Alert status="error" mb={3}>
                  <AlertIcon />
                  Not authorized to delete account!
                </Alert>
            }
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
              Delete Account
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteUserModal;

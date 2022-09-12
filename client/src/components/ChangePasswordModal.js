import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import { useAuth } from '../lib/auth';
import useChangePassword from '../hooks/mutations/useChangePassword.js';

const ChangePasswordModal = ({
  userToBeEdited = null,
  setUserToBeEdited = null,
  isOpen = false,
  user = null,
  onClose = null,
  onSuccess = null,
  mutation = null
}) => {
  const { isAuthenticated } = useAuth();
  const changePassword = useChangePassword();

  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  });

  // useEffect(() => {
  //   setUserToBeEdited(props.user);
  // }, [props.user]);

  // const handleClose = () => {
  //   setPasswords({
  //     old_password: '',
  //     new_password: '',
  //     confirm_new_password: ''
  //   });
  //   mutation.reset();
  //   props.onHide();
  // };

  const validate = () => {
    return passwords?.old_password.length > 0 &&
      passwords?.new_password.length > 0 &&
      passwords?.confirm_new_password.length > 0;
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!validate()) return;
    changePasswordSubmit();
  };

  const changePasswordSubmit = async () => {
    changePassword.mutate({ passwords });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            isAuthenticated
              ? <>
                  <Input
                    mt={2}
                    mb={3}
                    size="lg"
                    borderRadius="lg"
                    variant="filled"
                    type="old_password"
                    name="old_password"
                    value={passwords.old_password}
                    placeholder="Old Password"
                    onChange={handleInputChange}
                  />
                  <Input
                    mb={3}
                    size="lg"
                    borderRadius="lg"
                    variant="filled"
                    type="new_password"
                    name="new_password"
                    value={passwords.new_password}
                    placeholder="New Password"
                    onChange={handleInputChange}
                  />
                  <Input
                    mb={3}
                    size="lg"
                    borderRadius="lg"
                    variant="filled"
                    type="confirm_new_password"
                    name="confirm_new_password"
                    value={passwords.confirm_new_password}
                    placeholder="Confirm New Password"
                    onChange={handleInputChange}
                  />
                </>
              : <Alert status="error" mb={3}>
                  <AlertIcon />
                  Not authorized to change password!
                </Alert>
          }
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleChangePassword}
            isLoading={mutation.isLoading}
            loadingText="Changing Password..."
            isDisabled={mutation.isLoading || !validate()}
          >
            Change Password
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;

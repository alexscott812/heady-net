import React from 'react';
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
  ModalFooter,
} from '@chakra-ui/react';
import { useAuth } from '../lib/auth';
import useSaveUser from '../hooks/mutations/useSaveUser.js';

const EditUserModal = ({
  userToBeEdited = null,
  setUserToBeEdited = null,
  isOpen = false,
  onClose = null,
  mutation = null
}) => {
  const { isAuthenticated } = useAuth();
  const saveUser = useSaveUser();

  // const [user, setUser] = useState({
  //   _id: '',
  //   first_name: '',
  //   last_name: ''
  // });

  // useEffect(() => {
  //   setUser(props.user);
  // }, [props.user]);
  //
  // const handleClose = () => {
  //   setUser({
  //     _id: props.user._id,
  //     first_name: props.user.first_name,
  //     last_name: props.user.last_name
  //   });
  //   mutation.reset();
  //   props.onHide();
  // };

  const validate = () => {
    return userToBeEdited?.first_name?.length > 0 &&
      userToBeEdited?.last_name?.length > 0;
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserToBeEdited({
      ...userToBeEdited,
      [name]: value
    });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    console.log(userToBeEdited);
    if (!validate()) return;
    editUser();
  };

  const editUser = () => {
    saveUser.mutate({ user: userToBeEdited });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isAuthenticated
            ? <>
                <Input
                  mt={2}
                  mb={3}
                  size="lg"
                  borderRadius="lg"
                  variant="filled"
                  type="first_name"
                  name="first_name"
                  value={userToBeEdited?.first_name || ''}
                  placeholder="First Name"
                  onChange={handleInputChange}
                />
                <Input
                  mb={3}
                  size="lg"
                  borderRadius="lg"
                  variant="filled"
                  type="last_name"
                  name="last_name"
                  value={userToBeEdited?.last_name || ''}
                  placeholder="Last Name"
                  onChange={handleInputChange}
                />
              </>
            : <Alert status="error" mb={3}>
                <AlertIcon />
                Not authorized to edit user info!
              </Alert>
          }
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleSaveUser}
            isLoading={saveUser.isLoading}
            loadingText="Saving Info..."
            isDisabled={saveUser.isLoading || !validate()}
          >
            Save Info
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditUserModal;

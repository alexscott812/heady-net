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
  Text,
  Textarea
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
                <Text mb={1}>First name</Text>
                <Input
                  mb={3}
                  type="text"
                  name="first_name"
                  value={userToBeEdited?.first_name || ''}
                  placeholder="First Name"
                  onChange={handleInputChange}
                />
                <Text mb={1}>Last name</Text>
                <Input
                  mb={3}
                  type="text"
                  name="last_name"
                  value={userToBeEdited?.last_name || ''}
                  placeholder="Last Name"
                  onChange={handleInputChange}
                />
                <Text mb={1}>Bio</Text>
                <Textarea
                  value={userToBeEdited?.bio || ''}
                  placeholder="Enter a bit about yourself"
                  mb={3}
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
            loadingText="Updating Profile..."
            isDisabled={saveUser.isLoading || !validate()}
          >
            Update Profile
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditUserModal;

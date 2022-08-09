import React from 'react';
import {
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ListenModal = ({
  isOpen = false,
  dateString = '',
  onClose = null
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Listen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            This will take you to achive.org to listen to this show. Are you sure you want to proceed?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            as={Link}
            isExternal
            href={`https://archive.org/search.php?query=title%3A%28Grateful%20Dead%29%20AND%20date%3A${dateString}&sort=-downloads`}
            leftIcon={<FaExternalLinkAlt />}
          >
            Listen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ListenModal;

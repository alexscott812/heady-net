import React from 'react';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Input
} from '@chakra-ui/react';

const ShareModal = ({
	isOpen = false,
	url = null,
	onClose = null,
	onCopyLink = null
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Share</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input placeholder={url} isReadOnly />
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="gray" mr={2} onClick={onClose}>
						Cancel
					</Button>
					<Button colorScheme="brand" onClick={onCopyLink}>
						Copy Link
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ShareModal;

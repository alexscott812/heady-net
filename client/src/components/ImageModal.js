import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import {
	IconButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Text,
	Image,
	Skeleton
} from '@chakra-ui/react';

const ImageModal = ({
	isOpen = false,
	images = [],
	currentIndex = 0,
	setCurrentIndex = null,
	onClose = null
}) => {
	const onPrevButtonClick = (e) => {
		setCurrentIndex(
			currentIndex === 0
				? images.length - 1
				: (lightboxIndex) => lightboxIndex - 1
		);
	};

	const onNextButtonClick = (e) => {
		setCurrentIndex(
			currentIndex === images.length - 1
				? 0
				: (lightboxIndex) => lightboxIndex + 1
		);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={['full', 'xl', 'xl', 'xl']}
			scrollBehavior="inside"
		>
			<ModalOverlay />
			<ModalContent h="90vh" w="90vw">
				<ModalHeader>Images</ModalHeader>
				<ModalCloseButton />
				<ModalBody bg="black" p={0} d="flex" justifyContent="center">
					<Image
						objectFit="contain"
						src={images.length ? images[currentIndex].url : null}
						fallback={<Skeleton w="100%" borderRadius="none" />}
					/>
				</ModalBody>
				<ModalFooter justifyContent="space-between">
					<IconButton
						isRound
						variant="ghost"
						colorScheme="gray"
						aria-label="Previous Image"
						icon={<FaChevronLeft />}
						onClick={onPrevButtonClick}
						isDisabled={images.length === 1}
					/>
					<Text>{`${currentIndex + 1} of ${images.length}`}</Text>
					<IconButton
						isRound
						variant="ghost"
						colorScheme="gray"
						aria-label="Next Image"
						icon={<FaChevronRight />}
						onClick={onNextButtonClick}
						isDisabled={images.length === 1}
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ImageModal;

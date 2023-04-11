import { useToast as useChakraToast } from '@chakra-ui/react';

const useToast = () => {
	const toast = useChakraToast();

	const createToast = ({ id = 'toast', status = 'success', message = '' }) => {
		if (!toast.isActive(id)) {
			toast({
				id: id,
				variant: 'solid',
				position: 'bottom',
				title: message,
				status: status,
				duration: 5000,
				isClosable: false
			});
		}
	};

	return createToast;
};

export default useToast;

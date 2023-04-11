import { useQuery } from 'react-query';
import { getCurrentUser } from '../../services/user-service.js';

const useCurrentUser = (token, opts) => {
	const { data, isLoading, isError, error } = useQuery(
		['users', 'me'],
		() => getCurrentUser(token),
		opts
	);

	return {
		data,
		isLoading,
		isError,
		error
	};
};

export default useCurrentUser;

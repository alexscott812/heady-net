import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../../lib/auth';

// const useDeleteUser = ({ onSuccess = null, onError = null }) => {
const useDeleteUser = () => {
	const { deleteAccount } = useAuth();
	const queryClient = useQueryClient();
	return useMutation((data) => deleteAccount(data), {
		onSuccess: (data) => {
			queryClient.refetchQueries(['users', data.user._id]);
			//onSuccess && onSuccess();
		}
		// onError: onError
	});
};

export default useDeleteUser;

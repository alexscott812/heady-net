import { useMutation, useQueryClient } from 'react-query';
import { addReview } from '../../services/review-service.js';
import useToast from '../useToast.js';

const useCreateReview = (opts = {}) => {
	const queryClient = useQueryClient();
	const createToast = useToast();

	return useMutation(addReview, {
		onSuccess: (data) => {
			queryClient.refetchQueries(['shows', data.show_id]);
			queryClient.refetchQueries([
				'reviews',
				{
					show_id: data.show_id,
					sort: '-created_at'
				}
			]);
			createToast({
				id: 'create-show-review-success',
				status: 'success',
				message: 'Review submitted!'
			});
		},
		onError: (err) => {
			createToast({
				id: 'create-show-review-error',
				status: 'error',
				message: err
			});
		},
		...opts
	});
};

export default useCreateReview;

import { useMutation, useQueryClient } from 'react-query';
import { deleteReview } from '../../services/review-service.js';
import useToast from '../useToast.js';

const useDeleteReview = (opts = {}) => {
  const queryClient = useQueryClient();
  const createToast = useToast();

  return useMutation(deleteReview, {
    onSuccess: (data) => {
      queryClient.refetchQueries(['shows', data.show_id]);
      queryClient.refetchQueries(['reviews', {
        show_id: data.show_id, sort: '-created_at'
      }]);
      createToast({
        id: 'delete-show-review-success',
        status: 'success',
        message: 'Review deleted!'
      });
    },
    onError: (err) => {
      createToast({
        id: 'delete-show-review-error',
        status: 'error',
        message: err
      });
    },
    ...opts
  });
};

export default useDeleteReview;

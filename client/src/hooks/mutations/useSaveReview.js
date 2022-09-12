import { useMutation, useQueryClient } from 'react-query';
import { updateReview } from '../../services/review-service.js';
import useToast from '../useToast.js';

const useSaveReview = (opts = {}) => {
  const queryClient = useQueryClient();
  const createToast = useToast();

  return useMutation(updateReview, {
    onSuccess: (data) => {
      queryClient.refetchQueries(['shows', data.show_id]);
      queryClient.refetchQueries(['reviews', {
        show_id: data.show_id, sort: '-created_at'
      }]);
      createToast({
        id: 'edit-show-review-success',
        status: 'success',
        message: 'Review updated!'
      });
    },
    onError: (err) => createToast({
      id: 'edit-show-review-error',
      status: 'error',
      message: err
    }),
    ...opts
  });
};

export default useSaveReview;

import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../../lib/auth';
import useToast from '../useToast.js';

const useSaveUser = (opts = {}) => {
  const { updateAccount } = useAuth();
  const queryClient = useQueryClient();
  const createToast = useToast();

  return useMutation(
    (data) => updateAccount(data), {
      onSuccess: (data) => {
        queryClient.refetchQueries(['users', data._id]);
        queryClient.refetchQueries(['reviews', {
          user_id: data._id, sort: '-created_at'
        }]);
        createToast({
          id: 'edit-user-success',
          status: 'success',
          message: 'Profile updated!'
        });
      },
      onError: (err) => createToast({
        id: 'edit-user-error',
        status: 'error',
        message: err
      }),
      ...opts
    }
  );
};

export default useSaveUser;

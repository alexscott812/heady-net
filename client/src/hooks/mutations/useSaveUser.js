import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../../lib/auth';

// const useSaveUser = ({ onSuccess = null, onError = null }) => {
const useSaveUser = () => {
  const { updateAccount } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    (data) => updateAccount(data), {
      onSuccess: (data) => {
        console.log(data);
        queryClient.refetchQueries(['users', data._id]);
        queryClient.refetchQueries(['reviews', {
          user_id: data._id, sort: '-created_at'
        }]);
        //onSuccess && onSuccess();
      },
      onError: err => {
        console.log(err);
      }
    }
  );
}

export default useSaveUser;

import { useMutation } from 'react-query';
import { changePassword } from '../../services/user-service.js';
import useToast from '../useToast.js';

const useChangePassword = () => {
  const createToast = useToast();
  return useMutation(changePassword, {
    onSuccess: () => createToast({
      id: 'change-password-success',
      status: 'success',
      message: 'Password changed!'
    }),
    onError: (data) => createToast({
      id: 'change-password-error',
      status: 'error',
      message: data
    })
  });
};

export default useChangePassword;
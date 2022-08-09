import { useMutation } from 'react-query';
import { useAuth } from '../../lib/auth';

const useChangePassword = () => {
  const { changePassword } = useAuth();
  return useMutation(data => changePassword(data));
};

export default useChangePassword;
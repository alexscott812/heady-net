import { useMutation } from 'react-query';
import { useAuth } from '../../lib/auth';

const useForgotPassword = () => {
  const { forgotPassword } = useAuth();
  return useMutation(data => forgotPassword(data));
};

export default useForgotPassword;
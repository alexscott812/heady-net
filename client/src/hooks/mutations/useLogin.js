import { useMutation } from 'react-query';
import { useAuth } from '../../lib/auth';

const useLogin = () => {
  const { login } = useAuth();
  return useMutation(data => login(data));
};

export default useLogin;

import { useMutation } from 'react-query';
import { useAuth } from '../../lib/auth';

const useRegister = () => {
	const { register } = useAuth();
	return useMutation((data) => register(data));
};

export default useRegister;

import { useMutation } from 'react-query';
import { useAuth } from '../../lib/auth';

const useResetPassword = () => {
	const { resetPassword } = useAuth();
	return useMutation((data) => resetPassword(data));
};

export default useResetPassword;

import { useQuery } from 'react-query';
import { getUserById } from '../../services/user-service.js';
import useToast from '../useToast.js';

const useUser = (id, opts = {}) => {
  const createToast = useToast();

  return useQuery(
    ['users', id],
    () => getUserById(id), 
    {
      onError: (err) => createToast({
        id: 'get-user-error',
        status: 'error',
        message: err
      }),
      ...opts
    }
  );
}

export default useUser;

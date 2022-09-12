import { useQuery } from 'react-query';
import { getShowById } from '../../services/show-service.js';
import useToast from '../useToast.js';

const useShow = (id, opts = {}) => {
  const createToast = useToast();

  return useQuery(
    ['shows', id],
    () => getShowById(id),
    {
      onError: (err) => createToast({
        id: 'get-show-error',
        status: 'error',
        message: err
      }),
      ...opts
    }
  );
};

export default useShow;

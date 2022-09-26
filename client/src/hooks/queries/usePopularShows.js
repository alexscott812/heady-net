import { useQuery } from 'react-query';
import { getPopularShows } from '../../services/show-service.js';
import useToast from '../useToast.js';

const usePopularShows = (opts = {}) => {
  const createToast = useToast();

  return useQuery(
    ['popularShows'],
    () => getPopularShows(), 
    {
      onError: (err) => createToast({
        id: 'get-popular-shows-error',
        status: 'error',
        message: err
      }),
      ...opts
    }
  );
};

export default usePopularShows;

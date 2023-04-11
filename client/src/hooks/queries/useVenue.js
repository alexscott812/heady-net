import { useQuery } from 'react-query';
import { getVenueById } from '../../services/venue-service.js';
import useToast from '../useToast.js';

const useVenue = (id, opts = {}) => {
	const createToast = useToast();

	return useQuery(['venues', id], () => getVenueById(id), {
		onError: (err) =>
			createToast({
				id: 'get-venue-error',
				status: 'error',
				message: err
			}),
		...opts
	});
};

export default useVenue;

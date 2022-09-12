import axiosInstance from '../utils/axios-instance.js';
import handleError from '../utils/handle-error.js';

const getVenues = async (query) => {
  try {
    const { data } = await axiosInstance.get('/venues', {
      params: query
    });
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const getVenueById = async (venueId) => {
  try {
    const { data } = await axiosInstance.get(`/venues/${venueId}`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const addVenue = async ({ venue, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.post('/venues',
      venue, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const updateVenue = async ({ venue, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.put(`/venues/${venue._id}`,
      venue, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const deleteVenue = async ({ venueId, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.delete(`/venues/${venueId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

export {
  getVenues,
  getVenueById,
  addVenue,
  updateVenue,
  deleteVenue
};

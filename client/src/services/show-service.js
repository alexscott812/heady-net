import axiosInstance from '../utils/axios-instance.js';
import handleError from '../utils/handle-error.js';

const getShows = async (query) => {
  try {
    const { data } = await axiosInstance.get('/shows', {
      params: query
    });
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const getShowById = async (showId) => {
  try {
    const { data } = await axiosInstance.get(`/shows/${showId}`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

export {
  getShows,
  getShowById
};

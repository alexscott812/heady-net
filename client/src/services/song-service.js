import axiosInstance from '../utils/axios-instance.js';
import handleError from '../utils/handle-error.js';

const getSongs = async (query) => {
  try {
    const { data } = await axiosInstance.get('/songs', {
      params: query
    });
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const getSongById = async (songId) => {
  try {
    const { data } = await axiosInstance.get(`/songs/${songId}`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const addSong = async ({ song, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.post('/songs',
      song, {
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

const updateSong = async ({ song, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.put(`/songs/${song._id}`,
      song, {
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

const deleteSong = async ({ songId, tokenFn }) => {
  try {
    const token = await tokenFn();
    const { data } = await axiosInstance.delete(`/songs/${songId}`,
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
  getSongs,
  getSongById,
  addSong,
  updateSong,
  deleteSong
}

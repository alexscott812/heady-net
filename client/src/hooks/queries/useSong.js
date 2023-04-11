import { useQuery } from "react-query";
import { getSongById } from "../../services/song-service.js";
import useToast from "../useToast.js";

const useSong = (id, opts = {}) => {
  const createToast = useToast();

  return useQuery(["songs", id], () => getSongById(id), {
    onError: (err) =>
      createToast({
        id: "get-song-error",
        status: "error",
        message: err,
      }),
    ...opts,
  });
};

export default useSong;

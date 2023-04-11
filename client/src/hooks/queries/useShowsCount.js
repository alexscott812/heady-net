import { useQuery } from "react-query";
import { getShows } from "../../services/show-service.js";
import useToast from "../useToast.js";

const useShowsCount = (query, opts = {}) => {
  const createToast = useToast();

  const { data, isLoading, isError, error } = useQuery(
    ["todaysShows", query],
    () => getShows(query),
    {
      onError: (err) =>
        createToast({
          id: "get-shows-count-error",
          status: "error",
          message: err,
        }),
      ...opts,
    }
  );

  // const count = data?.meta.total_results || undefined;
  const count = data?.meta.total_results;

  return {
    data: count,
    isLoading,
    isError,
    error,
  };
};

export default useShowsCount;

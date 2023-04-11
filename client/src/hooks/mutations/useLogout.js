import { useMutation } from "react-query";
import { useAuth } from "../../lib/auth";

const useLogout = () => {
  const { logout } = useAuth();
  return useMutation((data) => logout(data));
};

export default useLogout;

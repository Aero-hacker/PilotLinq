import { useAuth } from "../../store";
import apiEndpoints from "../endpoints";
import apiClient from "../exportClient";

const usersApis = ({ id } = {}) => {
  const user_id = useAuth().user.user_id;

  return {
    getStudentsByParent: {
      queryKey: ["get-students"],
      queryFn: () => {
        return apiClient.get(
          `${apiEndpoints.users.getStudentsByParent}${user_id}`
        );
      },
    },
  };
};

export default usersApis;
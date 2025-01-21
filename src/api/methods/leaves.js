import { useAuth } from "../../store";
import apiEndpoints from "../endpoints";
import apiClient from "../exportClient";

const leaveApis = ({ id } = {}) => {
  const user_id = useAuth.getState().user.user_id;
  return {
    getParentLeaveRequests: {
      queryKey: ["Get-list-leave-requests", user_id],
      queryFn: () => {
        return apiClient.get(apiEndpoints.leaves.parentRequestList + user_id);
      },
    },
    raiseLeaveRequest: {
      mk: ["Create-leave-request"],
      mf: async (values) => {
        return apiClient.post(
          apiEndpoints.leaves.raiseRequest + user_id + "/",
          values
        );
      },
    },
  };
};

export default leaveApis;

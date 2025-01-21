import apiEndpoints from "../endpoints";
import apiClient from "../exportClient";

const authApis = ({ id } = {}) => {
  return {
    getProfile: {
      queryKey: ["get-user-profile"],
      queryFn: () => {
        return apiClient.get(apiEndpoints.auth.getProfile);
      },
    },
    login: {
      mutationKey: ["login"],
      mutationFn: async (apiParams) => {
        const payload = {
          email: apiParams.email,
          password: apiParams.password,
        };
        return apiClient.post(apiEndpoints.auth.login, payload);
      },
    },
  };
};

export default authApis;

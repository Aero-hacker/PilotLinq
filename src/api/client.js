import axios from "axios";
import { message } from "antd";
import apiEndpoints from "./endpoints";
import apiClient from "./exportClient";
import { useAuth } from "../store";

const NoAccessTokenURL = [
  "user/login/",
  "user/forgot-password/",
  "user/reset-password/",
];

const noAlerts = [];

const handleAlerts = (error) => {
  if (!noAlerts.includes(window.location.pathname)) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // Handle 401 errors
      } else if (status === 500) {
        // message.error("Sorry, Internal server error.").then(() => {
        //   window.history.back();
        // });
      } else {
        if (error.response.data.errors) {
          if (error.response.data.errors.email) {
            message.error(`${error.response.data.errors.email}`);
          } else if (error.response.data.errors.non_field_errors) {
            message.error(`${error.response.data.errors.non_field_errors}`);
          } else {
            message.error(`${error.response.data.errors}`);
          }
        }
      }
    } else {
      message.error("An error occurred");
    }
  }
};

const handleSuccess = (response) => {
  if (!noAlerts.includes(window.location.pathname)) {
    if (response.status === 200 || response.status === 201) {
      if (response.data.message) {
        message.success(response.data.message);
      }
    }
  }
};

let isRefreshing = false;

const refreshAccessToken = async () => {
  const isAuthenticated = useAuth.getState().isAuthenticated;
  const refreshToken = useAuth.getState().user.refresh;
  isRefreshing = true;
  try {
    let newAccessToken;
    if (isAuthenticated) {
      const response = await apiClient
        .post(apiEndpoints.auth.refresh, {
          refresh: refreshToken,
        })
        .catch((err) => {
          console.log("refreshAccessTokenError: ", err);
          window.location.href = "/login";
        });
      newAccessToken = response?.data?.access;
      useAuth.setState((state) => ({
        user: { ...state.user, token: newAccessToken },
      }));
    } else {
      window.location.href = "/login";
    }
    isRefreshing = false;
    return newAccessToken;
  } catch (error) {
    isRefreshing = false;
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

axios.interceptors.request.use(
  (config) => {
    const accessToken = useAuth.getState().user.token;

    let AccessTokenNeeded = true;
    NoAccessTokenURL.map((data) => {
      if (config.url === data) {
        AccessTokenNeeded = false;
      }
    });

    if (accessToken && AccessTokenNeeded) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    handleSuccess(response);
    return response;
  },
  async (error) => {
    handleAlerts(error);
    if (error.response) {
      const status = error.response.status;
      const originalRequest = error.config;

      if (status === 401 && isRefreshing !== true) {
        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); // Retry the original request with the new token
        } catch (refreshError) {
          // Handle refresh token error (e.g., redirect to login page)
          console.error("Error refreshing access token:", refreshError);
        }
      }
    } else if (error.request) {
      // Handle request errors
    } else {
      // Handle other errors
    }

    return Promise.reject(error);
  }
);

export default axios;

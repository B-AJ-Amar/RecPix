import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const port = 3000;
export const baseUrl = `http://localhost:${port}`

// from cookie
const refreshToken = () => {
    return axios.post(`${baseUrl}/authToken/refreshToken`).then((response) => {
      console.log("refresh success: ", response.data);
      localStorage.setItem("access-token", response.data.accessToken);
      return response.data.accessToken; // Pass the new access token to the calling code
    }).catch((err) => {
      console.log(err);
      return Promise.reject(err); // Reject the promise if refresh fails
    });
  };
  
  const httpClient = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'client-type': 'web'
    }
  });
  
  httpClient.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("access-token");
      let isValidate = false;
  
      if (token) {
        const decoded = jwtDecode(token);
        let currentDate = new Date();
  
        // JWT exp is in seconds
        if (decoded.exp * 1000 < currentDate.getTime()) {
          console.log("Token expired.");
        } else {
          console.log("Valid token");
          config.headers['access-token'] = token;
          isValidate = true;
        }
      }
  
      if (!isValidate) {
        try {
          const newToken = await refreshToken();
          config.headers['access-token'] = newToken;
          console.log("Request token refreshed successfully.");
        } catch (refreshError) {
          console.error("Failed to refresh token. Aborting request.");
          return Promise.reject(refreshError); // Stop the request if token refresh fails
        }
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
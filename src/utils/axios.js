import axios from "axios";

const axiosApiIntaces = axios.create({
  baseURL: process.env.REACT_APP_API,
});

// Add a request interceptor
axiosApiIntaces.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // ======
    config.headers = {
      "app-id": `${process.env.REACT_APP_ID_API}`,
    };

    // ======
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiIntaces.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosApiIntaces;

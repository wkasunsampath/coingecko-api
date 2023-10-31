import axios from "axios";

const useAxios = () => {
  return axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default useAxios;

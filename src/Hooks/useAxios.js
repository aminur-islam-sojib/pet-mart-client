import axios from "axios";

const instance = axios.create({
  baseURL: "https://paw-mart-ten.vercel.app",
});

const useAxios = () => {
  return instance;
};

export default useAxios;

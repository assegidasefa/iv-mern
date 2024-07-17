import axios from "../axios";
import { API_URL } from "../environment/config";

export const getProducts = () => {
  return axios.get(API_URL + "/products");
};

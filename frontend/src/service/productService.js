import axios from "../axios";
import { API_URL } from "../environment/config";

export const getProducts = () => {
  return axios.get(API_URL + "/products");
};

export const addProducts = (productData) => {
  return axios.post(API_URL + "/products", productData);
};

export const deleteProduct = (id) => {
  return axios.delete(API_URL + `/products/${id}`);
};

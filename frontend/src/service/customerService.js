import axios from "../axios";
import { API_URL } from "../environment/config";

export const getProducts = (page, pageSize) => {
  return axios.get(API_URL + `/products?page=${page}&pageSize=${pageSize}`);
};

export const addCustomer = (customerData) => {
    console.log("customer data",customerData)
  return axios.post(API_URL + "/customer", customerData);
};

export const deleteProduct = (id) => {
  return axios.delete(API_URL + `/products/${id}`);
};
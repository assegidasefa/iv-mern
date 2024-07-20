import axios from "../axios";
import { API_URL } from "../environment/config";


export const createSupplier = (obj) => {
  return axios.post(API_URL + "/supplier", obj);
};

export const getAllSupplier = () => {
    return axios.get(API_URL+"/supplier")
}
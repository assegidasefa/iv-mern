import axios from "../axios";
import { API_URL } from "../environment/config";



export const addCategory = (obj) => {
  console.log("category", obj);
  return axios.post(API_URL + "/categories", obj);
};


export const getAllCategory = () => {
  return axios.get(API_URL + "/categories")
}
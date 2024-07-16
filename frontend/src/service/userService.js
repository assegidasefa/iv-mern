import axios from "../axios";
import { API_URL } from "../environment/config";

console.log(API_URL + "/auth/login");
export const login = (obj) => {
  console.log("base url", API_URL + "/auth/login");
  return axios.post(API_URL + "/users/login", obj);
};

export const signUp = (obj) => {
  console.log("sign up ", obj);
  return axios.post(API_URL + "/users", obj);
};

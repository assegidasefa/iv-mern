import User from "../models/User.js";

export const createUser = (body) => {
    return User.create(body)
  };

  export const getUserByEmail = (email) => {
    return User.findOne({ email }).lean()
   // lean() is used for remove extra information
    // return User.findOne( {where: { email },raw:true})
  };
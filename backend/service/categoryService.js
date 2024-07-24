import Category from "../models/Category.js";

export const createCategory = (body) => {
    return Category.create(body)
  };

  export const getCategoryByName = (name) => {
    return Category.findOne({ name }).lean()
  };

  export const getAllCategory = () => {
    return Category.find().lean()
  }

  export const deleteCategoryById = (_id) => {
    return Category.findByIdAndDelete(_id);
  };
  
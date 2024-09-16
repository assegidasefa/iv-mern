import Customer from "../models/Customer.js";
import Product from "../models/Product.js";

// export const getProduct = () => {
//   return Product.find({}).lean();
// };

export const getCustomer = (
  page,
  pageSize,
) => {

  const _pageIndex = Number(page)
  const _pageSize = Number(pageSize)


  return Customer.find()
    .skip(_pageIndex > 0 ? (_pageIndex - 1) * _pageSize : 0)
    .limit(_pageSize)
    .sort('-createdAt')
    .lean();
};

export const countCustomers = () => {
  return Customer.countDocuments().lean()
}

export const deleteProductById = (_id) => {
  return Product.findByIdAndDelete(_id);
};

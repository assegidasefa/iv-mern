import Supplier from "../models/Supplier.js";

export const createSupplier = (body) => {
    return Supplier.create(body)
  };

  export const getSupplierByName = (supplierName) => {
    return Supplier.findOne({ supplierName }).lean()
  };

  export const getAllSupplier = () => {
    return Supplier.find().lean()
  };
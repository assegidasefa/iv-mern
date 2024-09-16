import Customer from "../models/Customer.js";
import { countCustomers, deleteCustomerById, getCustomer } from "../service/customerService.js";
import {
  countProduct,
  deleteProductById,
  getProduct,
} from "../service/productService.js";

export const getCustomers = async (req, res) => {
  const _page = req?.query?.page || 1;
  const _pageSize = req?.query?.pageSize || 10;
  try {
    const customers = await getCustomer(_page, _pageSize);
    const _countCustomers = await countCustomers();
    res.json({ customers: customers, total: _countCustomers, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addCustomer = async (req, res) => {
  const { address, city, contactName, country, customer, phone, postalCode } =
    req.body;
  // const image = req.file.path;

  try {
    const newCustomer = new Customer({
        address, city, contactName, country, customer, phone , postalCode 
    });

    const createdCustomer = await newCustomer.save();
    if (createdCustomer) {
      res.status(201).json({ success: true, message: "add succssfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const deleteCustomer = (req, res) => {
  const id = req.params.id;
  deleteCustomerByIdHandler(id)
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send({ success: false, error: "Something went worng" });
    });
};

const deleteCustomerByIdHandler = async (id) => {
  await deleteCustomerById(id);
  return { success: true, message: "Delete Successfully!!!" };
};


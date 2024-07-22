import React, { useEffect, useState } from "react";
import axios from "../axios";
import Sidebar from "../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table } from "antd";
import { Breadcrumb } from "antd";
import { addCategory, getAllCategory } from "../service/categoryService";
import { getProducts } from "../service/productService";
import { getAllSupplier } from "../service/supplierService";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState([])
  const [suppliers,setSuppliers] = useState([])
  const navigate = useNavigate()

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Category",
      dataIndex: "categoryID",
      key: "categoryID",
      render: (text) =>
        categories.find((category) => category._id === text)?.name || "Unknown",
    },
    {
      title: "Supplier",
      dataIndex: "supplierID",
      key: "supplierID",
      render: (text) =>
        suppliers.find((supplier) => supplier._id === text)?.supplierName ||
        "Unknown",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  useEffect(() => {
    getAllSupplier().then((res) => {
      const success = res?.data;
      if (success) {
        setSuppliers(res?.data?.supplier);
      }
    });
    getAllCategory().then((res) => {
      const success = res?.data;
      if (success) {
        setCategories(res?.data?.category);
      }
    });

    getProducts().then((res) => {
      console.log("product", res);
      const success = res?.data?.success;
      if (success) {
        setProducts(res?.data?.products);
      }
    });
  }, []);

  const addProduct = () => {
    navigate("/products/add-product")
  };


  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className="flex gap-6">
      <Sidebar />

      <div className="w-full flex flex-col items-start my-10 gap-4">
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined />,
            },
            {
              title: (
                <div className="flex hover:text-gray-600 justify-center items-center gap-1">
                  <span>Product</span>
                </div>
              ),
            },
            {
              title: "Product List",
            },
          ]}
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-end mr-20">
            <Button className="bg-black text-white" onClick={addProduct}>
              Add Product
            </Button>
          </div>
          <div className="w-full flex justify-center ">
            <Table
              dataSource={products}
              columns={columns}
              className="w-full mt-5 mr-5 border border-t-4 rounded"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ProductListScreen;

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

const ProductCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState([])
  const [suppliers,setSuppliers] = useState([])

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (values) => {
    console.log("Form values:", values);
    addCategory(values).then((res) => {
      console.log("response", res);
    });
    setIsModalOpen(false);
    // You can also add your form submission logic here, e.g., sending data to an API
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
            <Button className="bg-black text-white" onClick={showModal}>
              Add Category
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
        {isModalOpen && (
          <Modal
            title="Add Category"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              name="basic"
              onFinish={handleOk}
              layout="vertical"
              className="w-full"
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your description!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item className="flex justify-end">
                <Button type="primary" htmlType="submit">
                  Add Category
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default ProductCategory;

import React, { useEffect, useState } from "react";
import axios from "../axios";
import Sidebar from "../components/Sidebar";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  Button,
  Checkbox,
  Form,
  Select,
  Input,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import { Breadcrumb } from "antd";
import { getAllSupplier } from "../service/supplierService";
import { getAllCategory } from "../service/categoryService";

const { Option } = Select;

const AddProductScreen = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    getAllSupplier().then((res) => {
      console.log("resp supplier", res);
      const success = res?.data;
      if (success) {
        setSuppliers(res?.data?.supplier);
      }
    });
    getAllCategory().then((res) => {
      console.log("resp category", res);
      const success = res?.data;
      if (success) {
        setCategories(res?.data?.category);
      }
    });
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
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
              // href: "",
              title: <HomeOutlined />,
            },
            {
              // href: "",
              title: (
                <div className="flex  hover:text-gray-600 gap-1">
                  {/* <UserOutlined /> */}
                  <span>Product</span>
                </div>
              ),
            },
            {
              title: "Add product",
            },
          ]}
        />
        <div className="self-center w-3/4 border border-t-4 p-10 max-h-min rounded-md">
          <h1 className="text-2xl font-bold mb-2">Add Product</h1>
          <Form
            name="basic"
            onFinish={onFinish}
            layout="vertical"
            className="w-full"
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={16}>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
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
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input your price!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input your quantity!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="categoryID"
                  rules={[
                    {
                      required: true,
                      message: "Please select a category!",
                    },
                  ]}
                >
                  <Select placeholder="Select a category">
                    {categories?.map((category) => (
                      <Option key={category._id} value={category._id}>
                        {category?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Supplier"
                  name="supplierID"
                  rules={[
                    {
                      required: true,
                      message: "Please select a supplier!",
                    },
                  ]}
                >
                  <Select placeholder="Select a supplier">
                    {suppliers?.map((supplier) => (
                      <Option key={supplier._id} value={supplier._id}>
                        {supplier?.supplierName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please select a image!",
                },
              ]}
            >
              <Upload {...props}>
                <Button className="flex justify-center items-center">
                  <FaCloudUploadAlt/> Click to Upload
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AddProductScreen;

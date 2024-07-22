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
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

const AddProductScreen = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [form] = Form.useForm();

  const handleImageUpload = async (file) => {
    console.log("file ", file);
    const formData = new FormData();
    formData.append("image", file);
    console.log("file image", file);

    try {
      const response = await axios.post("/api/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res----", response);
      if (response?.data?.image) {
        return response.data.image; // Ensure this is the correct field
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      message.error("Image upload failed");
      return null;
    }
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

  const onFinish = async (values) => {
    try {
      const imageFile =
        form.getFieldValue("image")?.fileList?.[0]?.originFileObj;
      if (!imageFile) {
        throw new Error("No image file selected");
      }

      const image = await handleImageUpload(imageFile);
      console.log("image",image)
      if (image) {
        const productData = {
          ...values,
          image: image.path, // Adjust based on the actual response field
        };

        // Submit the product data along with the image URL
        await axios.post("/api/products", productData);
        message.success("Product added successfully");
      }
    } catch (error) {
      message.error("Product addition failed");
      console.error("Error adding product:", error);
    }
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
            form={form}
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
              <Upload
                beforeUpload={() => false}
                onChange={(info) => {
                  form.setFieldsValue({ image: info.fileList });
                }}
                customRequest={({ file, onSuccess }) => {
                  // Handling custom request (e.g., manually upload the file)
                  handleImageUpload(file).then((image) => {
                    onSuccess(null, file);
                    console.log("Uploaded image:", image);
                  });
                }}
              >
                <Button className="flex justify-center items-center">
                  <FaCloudUploadAlt /> Click to Upload
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

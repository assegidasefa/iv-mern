import React, { useState } from "react";
import axios from "../axios";
import Sidebar from "../components/Sidebar";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Breadcrumb } from "antd";
import { createSupplier } from "../service/supplierService";

const AddSupplierScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");


  const onFinish = (values) => {
    console.log("Success:", values);
    createSupplier(values).then((res)=>{
        console.log("res",res)
    })
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
                  <span>Supplier</span>
                </div>
              ),
            },
            {
              title: "Add Supplier",
            },
          ]}
        />
        <div className="self-center w-1/2 border border-t-4 p-10 max-h-min rounded-md">
          <h1 className="text-2xl font-bold mb-2">Add Supplier</h1>
          <Form
            name="basic"
            onFinish={onFinish}
            layout="vertical"
            className="w-full"
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="SupplierName"
              name="supplierName"
              rules={[
                {
                  required: true,
                  message: "Please input your Supplier Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ContactName"
              name="contactName"
              rules={[
                {
                  required: true,
                  message: "Please input your Contact Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your City!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="PostalCode"
              name="postalCode"
              rules={[
                {
                  required: true,
                  message: "Please input your PostalCode!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please input your Country!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
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

export default AddSupplierScreen;

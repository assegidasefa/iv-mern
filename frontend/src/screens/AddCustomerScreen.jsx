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
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../service/customerService";

const { Option } = Select;

const AddCustomerScreen = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate()

  const [form] = Form.useForm();



  const onFinish = async (values) => {
    try {

      if (values) {
        const customerDate = {
          ...values,
        };

        const response = await addCustomer(customerDate);
        console.log("respones add p ", response);
        const success = response?.data?.success;
        if (success) {
          message.success(response?.data?.message);
          navigate("/customers/view-customers")
        } else {
          message.error(response?.data?.error);
        }
      }
    } catch (error) {
      message.error("customer addition failed");
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
                  <span>Customers</span>
                </div>
              ),
            },
            {
              title: "Add Customer",
            },
          ]}
        />
        <div className="self-center w-3/4 border border-t-4 p-10 max-h-min rounded-md">
          <h1 className="text-2xl font-bold mb-2">Add Customers</h1>
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
                  label="Customer Name"
                  name="customer"
                  rules={[
                    {
                      required: true,
                      message: "Please input your customer!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Contact Name"
                  name="contactName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your constact name!",
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
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please input your city!",
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
                  label="Country"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "Please input your country!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            <Col span={12}>
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
              </Col>
              
              
            </Row>
            <Row gutter={16}>
            
              <Col span={12}>
                <Form.Item
                  label="Postal Code"
                  name="postalCode"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Postal Code!",
                    },
                  ]}
                >
                  <Input type="Number"/>
                </Form.Item>
              </Col>
              
            </Row>
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

export default AddCustomerScreen;

import React, { useState } from "react";
import axios from "../axios";
import Sidebar from "../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table } from "antd";
import { Breadcrumb } from "antd";
import { addCategory } from "../service/categoryService";

const CategoryListScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (values) => {
    console.log("Form values:", values);
    addCategory(values).then((res)=>{
      console.log("response",res)
    })
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
                  <span>Category</span>
                </div>
              ),
            },
            {
              title: "Add Category",
            },
          ]}
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-end mr-20">
            <Button className="bg-black text-white" onClick={showModal}>
              Add Category
            </Button>
          </div>
          <div className="w-full flex justify-center bg-red-400">
            <Table
              dataSource={dataSource}
              columns={columns}
              className="w-3/4 mt-5"
            />
          </div>
        </div>
        {isModalOpen && (
          <Modal title="Add Category" open={isModalOpen} onCancel={handleCancel} footer={null}>
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

export default CategoryListScreen;

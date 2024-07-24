import React, { useEffect, useState } from "react";
import axios from "../axios";
import Sidebar from "../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Popconfirm, Table, Tooltip } from "antd";
import { Breadcrumb } from "antd";
import {
  addCategory,
  deleteCategoryById,
  getAllCategory,
} from "../service/categoryService";
import moment from "moment";

const CategoryListScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getAllCategory().then((res) => {
      console.log("res", res);
      const success = res?.data?.success;
      if (success) {
        setCategories(res?.data?.category);
      }
    });
  }, [refresh]);

  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e) => {
   
  };

  const deleteCategoryHandler = (id) => {
    deleteCategoryById(id).then((res) => {
      console.log("response id", res);
      const success = res?.data?.success;
      if (success) {
        message.success(res?.data?.message);
        setRefresh(!refresh);
      } else {
        message.error(res?.data?.error);
      }
    });
  };

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
      // render: (text) => {
      //   if (text?.length > 45) {
      //     return `${text.substring(0, 45)}...`;
      //   }
      //   return text;
      // },
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 45 ? `${text.substring(0, 45)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Action",
      // dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this Category?"
          onConfirm={()=>deleteCategoryHandler(record?._id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button 
          // onClick={() => deleteCategoryHandler(record?._id)}
          >
            Remove
          </Button>
          ,
        </Popconfirm>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (values) => {
    console.log("Form values:", values);
    addCategory(values).then((res) => {
      console.log("response", res);
      const success = res?.data?.success;
      if (success) {
        message.success(res?.data?.message);
        setRefresh(!refresh);
      } else {
        message.error(res?.data?.error);
      }
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
                  <span>Category</span>
                </div>
              ),
            },
            {
              title: "Category List",
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
              dataSource={categories}
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

export default CategoryListScreen;

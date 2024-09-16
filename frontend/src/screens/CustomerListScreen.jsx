import React, { useEffect, useState } from "react";
import axios from "../axios";
import Sidebar from "../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Popconfirm, Table } from "antd";
import { Breadcrumb } from "antd";
import { addCategory, getAllCategory } from "../service/categoryService";
import { deleteProduct, getProducts } from "../service/productService";
import { getAllSupplier } from "../service/supplierService";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { deleteCustomer, getCutomers } from "../service/customerService";

const CustomerListScreen = () => {
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading,setLoading] = useState(true)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 3, total: 0 });
  const navigate = useNavigate();

  const deleteCustomerHandler = (id) => {
    deleteCustomer(id).then((res) => {
      console.log("response", res);
      const success = res?.data?.success;
      if (success) {
        setRefresh(!refresh);
        message.success(res?.data?.message)
      }
    });
  };
  const cancel = (e) => {
   
  };

  const columns = [
    {
      title: "Contact Name",
      dataIndex: "contactName",
      key: "contactName",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Postal Code",
      dataIndex: "postalCode",
      key: "postalCode"
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
      key: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this Customer?"
          onConfirm={()=> deleteCustomerHandler(record?._id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >

        <Button >
          Romove
        </Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    
    fetchCustomers(pagination.current, pagination.pageSize);

  }, [refresh,pagination.current, pagination.pageSize]);

  const fetchCustomers = (page, pageSize) => {
    getCutomers(page, pageSize).then((res) => {
      setLoading(true)
      const success = res?.data?.success;
      console.log("pro result",res)
      if (success) {
        setCustomers(res?.data?.customers);
        setPagination({ ...pagination, total: res?.data?.total });
        setLoading(false)
      }
    });
  };

  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const addProduct = () => {
    navigate("/customers/add-customers");
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
                  <span>Customer</span>
                </div>
              ),
            },
            {
              title: "Customers List",
            },
          ]}
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-end mr-20">
            <Button className="bg-black text-white" onClick={addProduct}>
              Add Customer
            </Button>
          </div>
          <div className="w-full flex justify-center ">
            <Table
              dataSource={customers}
              columns={columns}
              className="w-full mt-5 mr-5 border border-t-4 rounded"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
              }}
              onChange={handleTableChange}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerListScreen;

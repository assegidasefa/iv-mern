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

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 3, total: 0 });
  const navigate = useNavigate();

  const deleteProductHandler = (id) => {
    deleteProduct(id).then((res) => {
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
    {
      title: "Action",
      // dataIndex: "createdAt",
      key: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this Product?"
          onConfirm={()=> deleteProductHandler(record?._id)}
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

    // getProducts().then((res) => {
    //   console.log("product", res);
    //   const success = res?.data?.success;
    //   if (success) {
    //     setProducts(res?.data?.products);
    //   }
    // });
    fetchProducts(pagination.current, pagination.pageSize);

  }, [refresh,pagination.current, pagination.pageSize]);

  const fetchProducts = (page, pageSize) => {
    getProducts(page, pageSize).then((res) => {
      const success = res?.data?.success;
      console.log("pro result",res)
      if (success) {
        setProducts(res?.data?.products);
        setPagination({ ...pagination, total: res?.data?.total });
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
    navigate("/products/add-product");
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
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
              }}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListScreen;

import React, { useState } from "react";
import { Alert, Button, Checkbox, Form, Input } from "antd";
import { login } from "../service/userService";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = (values) => {
    console.log("Success:", values);
    login(values).then((res) => {
      console.log("response", res);
      const success = res?.data?.success;
      console.log("enter here", success);
      if (success) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setError("");
        navigate("/");
      } else {
        setError(res?.data?.error);
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen bg-red-500 mt-2 mx-10">
      <div className="w-1/2 flex flex-col justify-center items-center">
        {error && <Alert message={error} type="error" />}

        <Form
          name="basic"
          //   labelCol={{
          //     span: 8,
          //   }}
          //   wrapperCol={{
          //     span: 16,
          //   }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="w-1/2 h-full">
        <img src="/th.jpeg" className="w-full h-screen" />
      </div>
    </div>
  );
};

export default LoginScreen;

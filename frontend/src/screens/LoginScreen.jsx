import React from "react";
import { Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginScreen = () => {
  return (
    <div className="flex min-h-screen bg-red-500 mt-2 mx-10">
      <div className="w-1/2 flex flex-col justify-center items-center">
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
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
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

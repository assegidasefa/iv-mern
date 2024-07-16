import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input , message} from "antd";
import { signUp } from "../service/userService";
import { useNavigate } from "react-router-dom";

// const [passwordVisible, setPasswordVisible] = useState(false);

const SignUpScreen = () => {
  const [error, setError] = useState("");
   
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log("Success:", values);
    const comfirmPassword = values?.comfirmPassword;
    const password = values?.password;
    if (comfirmPassword !== password) {
      console.log("ererere");
      return setError("password doesnt  match ");
    }
    signUp(values).then((res)=>{
      console.log("response",res)
      const success = res?.data?.success
      const _message = res?.data?.message
      if(success){
        message.success(_message)
        setError("")
        navigate("/login")
      } else{
        setError(res?.data?.error)
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen  mt-2 mx-10">
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
          className="w-3/4"
          layout="vertical"
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
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Comfirm Password"
            name="comfirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your comfirm password!",
              },
            ]}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
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
              Register
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

export default SignUpScreen;

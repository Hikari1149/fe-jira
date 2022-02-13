import React, { FormEvent } from "react";
import qs from "qs";
import { cleanObject } from "../utils";
import { useAuth } from "../context/auth-context";
import { Form, Input, Button } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = () => {
  const { login, user, register } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    // register({username,password})
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>login success : {user?.name}</div> : null}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "username is required." }]}
      >
        <Input placeholder={"username"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[
          {
            required: true,
            message: "password is required.",
          },
        ]}
      >
        <Input placeholder={"password"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          login
        </Button>
      </Form.Item>
    </Form>
  );
};

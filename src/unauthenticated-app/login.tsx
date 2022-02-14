import React, { FormEvent } from "react";
import qs from "qs";
import { cleanObject } from "../utils";
import { useAuth } from "../context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";

const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user, register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e as Error);
    }
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
        <Input placeholder={"Password"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"} loading={isLoading}>
          login
        </LongButton>
      </Form.Item>
    </Form>
  );
};

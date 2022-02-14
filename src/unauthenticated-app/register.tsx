import React, { FormEvent } from "react";
import qs from "qs";
import { cleanObject } from "../utils";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";

const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user, register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("密码不一致"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e as Error);
    }

    // login(values);
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
      <Form.Item
        name={"cpassword"}
        rules={[
          {
            required: true,
            message: "confirm password is required.",
          },
        ]}
      >
        <Input
          placeholder={"Confirm password"}
          type="password"
          id={"cpassword"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"} loading={isLoading}>
          register
        </LongButton>
      </Form.Item>
    </Form>
  );
};

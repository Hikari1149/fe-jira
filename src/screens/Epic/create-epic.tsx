import React, { useEffect } from "react";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import styled from "@emotion/styled";
import { ErrorBox } from "../../components/lib";
import { useAddEpic } from "../../utils/Epic";
import { useEpicsQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { useProjectIdInUrl } from "../Kanban/util";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const [form] = useForm();
  const projectId = useProjectIdInUrl();
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const onFinish = async (values: any) => {
    await addEpic({
      ...values,
      projectId,
    });
    props.onClose();
  };
  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);
  return (
    <Drawer
      visible={props.visible}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
      onClose={props.onClose}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Container>
            <h1>{`Create epic`}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: `40rem` }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名" }]}
              >
                <Input placeholder={"请输入任务组名"} />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Container>
        )}
        <Button onClick={props.onClose}>{`Close`}</Button>
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

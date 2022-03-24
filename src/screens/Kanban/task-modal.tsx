import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useTasksModal, useTasksQueryKey } from "./util";
import { useEditTask } from "../../utils/task";
import { Form, Input, Modal } from "antd";
import { UserSelect } from "../../components/use-select";
import { TaskTypeSelect } from "../../components/task-type-select";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export const TaskModal = () => {
  const [form] = useForm();
  const { editingTask, editingTaskId, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({
      ...editingTask,
      ...form.getFieldsValue(),
    });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      okText={`确认`}
      cancelText={`取消`}
      confirmLoading={editLoading}
      title={"编辑任务"}
      onCancel={onCancel}
      visible={!!editingTaskId}
      onOk={onOk}
      forceRender={true}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={`人物名`}
          name={`name`}
          rules={[{ required: true, message: `请输入任务名` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={`经办人`}
          name={`processorId`}
          rules={[{ required: true, message: `请输入经办人` }]}
        >
          <UserSelect defaultOptionName={`经办人`} />
        </Form.Item>
        <Form.Item
          label={`类型`}
          name={`typeId`}
          rules={[{ required: true, message: `请输入类型` }]}
        >
          <TaskTypeSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};

import React from "react";
import { Form, Input } from "antd";
import { UserSelect } from "../../components/use-select";
import { Project } from "../../types/project";
import { User } from "../../types/user";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({
  param,
  setParam,
  users = [],
}: SearchPanelProps) => {
  return (
    <Form layout={"inline"} style={{ marginBottom: `2rem` }}>
      <Form.Item>
        <Input
          placeholder={"Project name"}
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};

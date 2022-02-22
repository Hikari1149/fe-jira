import React, { useState, useEffect } from "react";
import { Input, Select, Form } from "antd";
import { Project } from "./list";
import { UserSelect } from "../../components/use-select";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token?: string;
}

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

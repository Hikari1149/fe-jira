import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import React, { useEffect, useState } from "react";
import {
  cleanObject,
  useDebounce,
  useDocumentTitle,
  useMount,
} from "../../utils";
import qs from "qs";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { Helmet } from "react-helmet";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectSearchParams } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("project list");
  const [param, setParam] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 300));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React, { useEffect, useState } from "react";
import {
  cleanObject,
  useDebounce,
  useDocumentTitle,
  useMount,
} from "../../utils";
import qs from "qs";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { Helmet } from "react-helmet";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "../../components/lib";
import { Project } from "../../types/project";

export const ProjectListScreen = () => {
  useDocumentTitle("project list");
  const [param, setParam] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    // retry,
  } = useProjects(useDebounce(param, 300));
  const { data: users } = useUsers();

  const { open } = useProjectModal();
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <ErrorBox error={error} /> : null}
      <List
        // refresh={retry}
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

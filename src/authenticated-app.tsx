import { ProjectListScreen } from "./screens/project-list";
import React, { useState } from "react";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import softwareLogo from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";
import { UserPopover } from "./components/user-popover";
const Main = styled.div`
  display: flex;
  overflow: hidden;
`;
export default () => {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />

            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route
              index
              element={<Navigate to={"projects"} replace={true} />}
            />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type="link" onClick={logout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};
const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={resetRoute}>
          <img src={softwareLogo} alt="" />
        </Button>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <User />
    </Header>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
`;

const HeaderLeft = styled(Row)`
  img {
    width: 100%;
    height: 100%;
  }
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

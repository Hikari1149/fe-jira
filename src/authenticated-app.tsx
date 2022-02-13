import { ProjectListScreen } from "./screens/project-list";
import React from "react";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <header>
        <HeaderLeft gap={true}>
          <h3>Logo</h3>
          <h3>Project</h3>
          <h3>User</h3>
        </HeaderLeft>
        <button onClick={() => logout()}>logout</button>
      </header>
      <main>
        <ProjectListScreen />
      </main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
`;

const HeaderLeft = styled(Row)``;

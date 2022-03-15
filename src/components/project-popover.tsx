import React from "react";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "../screens/project-list/util";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();
  const { close } = useProjectModal();
  const pinnedProjects = projects?.filter((p) => p.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>

      <List>
        {pinnedProjects?.map?.((p) => (
          <List.Item>
            <List.Item.Meta title={p.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type={"link"} onClick={close}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      proeject
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;

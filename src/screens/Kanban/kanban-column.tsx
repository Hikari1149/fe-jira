import React from "react";
import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import styled from "@emotion/styled";
import {
  useKanbansQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "./util";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "../../types/task";
import { Mark } from "../../components/mark";
import { useDeleteKanban } from "../../utils/kanban";
import { Row } from "../../components/lib";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }

  return (
    <img
      src={name === "task" ? taskIcon : bugIcon}
      width={20}
      height={20}
      alt={""}
    />
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
      onClick={() => startEdit(task.id)}
    >
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter?.((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => {
          return <TaskCard task={task} />;
        })}

        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());

  const startEdit = () => {
    Modal.confirm({
      title: "确定删除看板吗",
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button onClick={startEdit} type={"link"}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  padding: 0.7rem 0.7rem 1rem;
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
`;

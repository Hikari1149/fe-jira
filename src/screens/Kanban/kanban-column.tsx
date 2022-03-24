import React from "react";
import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import styled from "@emotion/styled";
import { useTasksModal, useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Card } from "antd";
import { CreateTask } from "./create-task";

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
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter?.((task) => task.kanbanId === kanban.id);
  const { startEdit } = useTasksModal();
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
            key={task.id}
            onClick={() => startEdit(task.id)}
          >
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}

        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
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

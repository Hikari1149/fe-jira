import React from "react";
import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import {
  useKanbanSearchParams,
  useProjectIdInUrl,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );

  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());

  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />

        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={`kanban`}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans.map((kanban, index) => (
                  <Drag
                    draggableId={`kanan ${kanban.id}`}
                    index={index}
                    key={kanban.id}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}

        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};
export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  margin-right: 2rem;
`;

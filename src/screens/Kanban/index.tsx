import React from "react";
import { useDocumentTitle } from "../../utils";
import { useKanbans, useReorderKanban } from "../../utils/kanban";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectIdInUrl,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useReorderTask, useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );

  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());

  const isLoading = taskIsLoading || kanbanIsLoading;

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />z
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

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  return ({ source, destination, type }: DropResult) => {
    if (!destination) {
      return;
    }

    //kabnan
    if (type === "COLUMN") {
      const fromId = kanbans?.[source.index].id;
      const toId = kanbans?.[destination.index].id;

      if (!fromId || !toId || fromId === toId) {
        return;
      }
      const type = destination.index > source.index ? "after" : "before";
      reorderKanban({ fromId, referenceId: toId, type });
    }

    //task
    if (type === "ROW") {
      const fromKanbanId = +source.droppableId;
      const toKanbanId = +destination.droppableId;

      //
      if (fromKanbanId === toKanbanId) {
        return;
      }
      const fromTask = allTasks.filter(
        (task) => task.kanbanId === fromKanbanId
      )[source.index];
      const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
        destination.index
      ];

      if (toTask.id === fromTask.id) {
        return;
      }

      reorderTask({
        fromId: fromTask?.id,
        referenceId: toTask?.id,
        fromKanbanId,
        toKanbanId,
        type:
          fromKanbanId === toKanbanId && destination.index > source.index
            ? "after"
            : "before",
      });
    }
  };
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  margin-right: 2rem;
`;

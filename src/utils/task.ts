import { Project } from "../types/project";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { useTasksQueryKey } from "../screens/Kanban/util";
import { useAddConfig, useEditConfig } from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const queryKey = useTasksQueryKey();
  return useQuery<Task[]>(queryKey, () => client("tasks", { data: param }));
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "patch",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

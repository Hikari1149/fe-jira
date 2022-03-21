import { useUrlQueryParam } from "../../utils/url";
import { useMemo, useState } from "react";
import { useProject } from "../../utils/project";
import { isVoid, useSetUrlSearchParam } from "../../utils";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(() => {
      console.log("in param dchange ", param);
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParams();
  return [`projects`, params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  const projectModalOpen =
    projectCreate === "true" || !isVoid(editingProjectId);
  return {
    projectModalOpen,
    open,
    close,
    startEdit,
    isLoading,
    editingProject,
  };
};

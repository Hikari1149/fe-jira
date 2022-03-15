import { useUrlQueryParam } from "../../utils/url";
import { useMemo, useState } from "react";

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

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: false });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};

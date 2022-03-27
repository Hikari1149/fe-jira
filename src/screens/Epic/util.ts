import { useProjectIdInUrl } from "../Kanban/util";

export const useEpicsSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useEpicsQueryKey = () => ["epics", useEpicsSearchParams()];

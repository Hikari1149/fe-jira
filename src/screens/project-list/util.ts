import { useUrlQueryParam } from "../../utils/url";
import { useMemo, useState } from "react";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, []),
    setParam,
  ] as const;
};

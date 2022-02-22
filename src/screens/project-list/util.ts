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

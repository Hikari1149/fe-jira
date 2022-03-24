import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { Project } from "../types/project";
import { User } from "../types/user";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};

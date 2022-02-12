import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import qs from "qs";
import { useHttp } from "../../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const client = useHttp();

  const debouncedParam = useDebounce(param, 300);
  useEffect(() => {
    client("users").then(setUsers);
  }, []);
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

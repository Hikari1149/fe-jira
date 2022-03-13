import { useReducer, useState } from "react";
import { useMountedRef } from "./index";
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0);
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({
      ...state,
      ...action,
    }),
    { ...defaultState, ...initialState }
  );

  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    safeDispatch({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) => {
    safeDispatch({
      error,
      stat: "error",
      data: null,
    });
  };
  // run: trigger req
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error(`Promise param required!!!`);
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry());
      }
    });
    safeDispatch({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        } else {
          return error;
        }
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    //
    retry,
    setData,
    setError,
    ...state,
  };
};

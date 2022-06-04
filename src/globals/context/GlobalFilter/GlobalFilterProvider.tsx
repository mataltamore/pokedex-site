import React, { useReducer } from "react";
import { initialState, filterReducer } from "./reducer";
import { GlobalFilterContext } from "./context";

export const GlobalFilterProvider = (props: { children: React.ReactNode }) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialState);

  return (
    <GlobalFilterContext.Provider
      value={{ state: filterState, dispatch: filterDispatch }}
    >
      {props.children}
    </GlobalFilterContext.Provider>
  );
};

import React, { createContext, useContext } from "react";
import { StateType, ACTION } from "./reducer";

export type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<{ type: ACTION; payload: any }>;
};

export const GlobalFilterContext = createContext<ContextType>({
  state: {
    generationTypeRadioBtn: 0,
    regionNumberCheckBtn: [],
    pokemonTypeCheckBtn: [],
  },
  dispatch: () => {},
});

export const useGlobalFilter = () => useContext(GlobalFilterContext);

import { createContext } from "react";

type contextType = {
  value: number;
  setValue: Function;
};

export const GenerationFilterContext = createContext<contextType | undefined>(
  undefined
);

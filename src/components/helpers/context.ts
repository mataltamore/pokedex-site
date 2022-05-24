import { createContext } from "react";
import { GenerationNumber } from "../../globals/types";

type contextType<T> = {
  value: T;
  setValue: Function;
};

export const GenerationTypeFilterContext = createContext<
  contextType<number> | undefined
>(undefined);

export const RegionFilterContext = createContext<
  contextType<Array<GenerationNumber>> | undefined
>(undefined);

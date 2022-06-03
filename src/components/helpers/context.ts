import { createContext } from "react";
import { GenerationNumber } from "../../globals/types";

type contextType<T> = {
  value: T;
  setValue: Function;
};

export const GenerationTypeFilterContext = createContext<contextType<number>>({
  value: 0,
  setValue: () => {},
});

export const RegionFilterContext = createContext<
  contextType<Array<GenerationNumber>>
>({
  value: [],
  setValue: () => {},
});

export const PokemonTypeContext = createContext<contextType<Array<string>>>({
  value: [],
  setValue: () => {},
});

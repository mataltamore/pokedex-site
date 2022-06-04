/* eslint-disable no-unused-vars */
import React, { createContext, useReducer, useContext } from "react";
import { GenerationNumber, PokemonTypeName } from "../../globals/types";

type StateType = {
  generationTypeRadioBtn: number;
  regionNumberCheckBtn: Array<GenerationNumber>;
  pokemonTypeCheckBtn: Array<PokemonTypeName>;
};

export enum ACTION {
  GENERATION,
  REGION,
  TYPE,
}

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

const initialState: StateType = {
  generationTypeRadioBtn: 6,
  regionNumberCheckBtn: [
    "generation-i",
    "generation-ii",
    "generation-iii",
    "generation-iv",
    "generation-v",
    "generation-vi",
    "generation-vii",
    "generation-viii",
  ],
  pokemonTypeCheckBtn: [
    "normal",
    "fire",
    "fighting",
    "water",
    "flying",
    "grass",
    "poison",
    "electric",
    "ground",
    "psychic",
    "rock",
    "ice",
    "bug",
    "dragon",
    "ghost",
    "dark",
    "steel",
    "fairy",
  ],
};

const filterReducer = (
  state: StateType,
  action: { type: ACTION; payload: any }
) => {
  switch (action.type) {
    case ACTION.GENERATION:
      return (state = { ...state, generationTypeRadioBtn: action.payload });
    case ACTION.REGION:
      if (action.payload.isChecked)
        return (state = {
          ...state,
          regionNumberCheckBtn: [
            ...state.regionNumberCheckBtn,
            action.payload.regionNumber,
          ],
        });
      return (state = {
        ...state,
        regionNumberCheckBtn: state.regionNumberCheckBtn.filter(
          (item: GenerationNumber) => item !== action.payload.regionNumber
        ),
      });
    case ACTION.TYPE:
      if (action.payload.isChecked)
        return (state = {
          ...state,
          pokemonTypeCheckBtn: [
            ...state.pokemonTypeCheckBtn,
            action.payload.pokemonType,
          ],
        });
      return (state = {
        ...state,
        pokemonTypeCheckBtn: state.pokemonTypeCheckBtn.filter(
          (item: string) => item !== action.payload.pokemonType
        ),
      });
    default:
      return state;
  }
};

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

export const useGlobalFilter = () => useContext(GlobalFilterContext);

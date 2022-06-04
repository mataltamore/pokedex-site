/* eslint-disable no-unused-vars */
import { GenerationNumber, PokemonTypeName } from "../../types";
import {
  DEFAULT_GENERATION_RADIO_BUTTON,
  DEFAULT_REGION_CHECKBOX_BUTTON,
  DEFAULT_TYPE_CHECKBOX_BUTTON,
} from "../../constants";

export type StateType = {
  generationTypeRadioBtn: number;
  regionNumberCheckBtn: Array<GenerationNumber>;
  pokemonTypeCheckBtn: Array<PokemonTypeName>;
};

export enum ACTION {
  GENERATION,
  REGION,
  TYPE,
}

export const initialState: StateType = {
  generationTypeRadioBtn: DEFAULT_GENERATION_RADIO_BUTTON,
  regionNumberCheckBtn: DEFAULT_REGION_CHECKBOX_BUTTON,
  pokemonTypeCheckBtn: DEFAULT_TYPE_CHECKBOX_BUTTON,
};

export const filterReducer = (
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
